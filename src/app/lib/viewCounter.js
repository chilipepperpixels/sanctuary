import crypto from "crypto";
import { Redis } from "@upstash/redis";

const KEY_PREFIX = "views";
let redisClient;

function getRedis() {
  if (redisClient) {
    return redisClient;
  }

  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.UPSTASH_REDIS_KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.UPSTASH_REDIS_KV_REST_API_TOKEN;

  if (!url || !token) {
    return null;
  }

  redisClient = new Redis({ url, token });
  return redisClient;
}

function key(...parts) {
  return [KEY_PREFIX, ...parts].join(":");
}

function cleanPath(input) {
  if (typeof input !== "string" || !input.startsWith("/")) {
    return "/";
  }

  return input.slice(0, 160);
}

function pathKey(pathname, suffix) {
  return key("path", encodeURIComponent(pathname), suffix);
}

function hashVisitor(visitorId) {
  if (typeof visitorId !== "string" || visitorId.length < 12) {
    return null;
  }

  return crypto.createHash("sha256").update(visitorId).digest("hex");
}

function toNumber(value) {
  return Number(value || 0);
}

export async function recordView({ pagePath, visitorId }) {
  const redis = getRedis();

  if (!redis) {
    return { ok: false, configured: false, totalViews: 0 };
  }

  const now = new Date().toISOString();
  const pathname = cleanPath(pagePath);
  const visitorHash = hashVisitor(visitorId);

  const [totalViews, pathViews] = await Promise.all([
    redis.incr(key("total")),
    redis.incr(pathKey(pathname, "total")),
    redis.sadd(key("paths"), pathname),
    redis.set(key("lastSeen"), now),
    redis.set(pathKey(pathname, "lastSeen"), now),
  ]);

  const setupWrites = [];

  if (totalViews === 1) {
    setupWrites.push(redis.set(key("firstSeen"), now));
  }

  if (pathViews === 1) {
    setupWrites.push(redis.set(pathKey(pathname, "firstSeen"), now));
  }

  if (visitorHash) {
    setupWrites.push(
      redis.sadd(key("visitors"), visitorHash),
      redis.sadd(pathKey(pathname, "visitors"), visitorHash),
    );
  }

  await Promise.all(setupWrites);

  return {
    ok: true,
    configured: true,
    totalViews,
  };
}

export async function getPublicViewStats() {
  const redis = getRedis();

  if (!redis) {
    return { configured: false, totalViews: 0 };
  }

  return {
    configured: true,
    totalViews: toNumber(await redis.get(key("total"))),
  };
}

export async function getViewStats() {
  const redis = getRedis();

  if (!redis) {
    return {
      configured: false,
      totalViews: 0,
      uniqueVisitors: 0,
      firstSeen: null,
      lastSeen: null,
      topPaths: [],
    };
  }

  const [totalViews, uniqueVisitors, firstSeen, lastSeen, paths] =
    await Promise.all([
      redis.get(key("total")),
      redis.scard(key("visitors")),
      redis.get(key("firstSeen")),
      redis.get(key("lastSeen")),
      redis.smembers(key("paths")),
    ]);

  const topPaths = await Promise.all(
    paths.map(async (pathname) => {
      const [views, pathUniqueVisitors, pathFirstSeen, pathLastSeen] =
        await Promise.all([
          redis.get(pathKey(pathname, "total")),
          redis.scard(pathKey(pathname, "visitors")),
          redis.get(pathKey(pathname, "firstSeen")),
          redis.get(pathKey(pathname, "lastSeen")),
        ]);

      return {
        pathname,
        views: toNumber(views),
        uniqueVisitors: toNumber(pathUniqueVisitors),
        firstSeen: pathFirstSeen,
        lastSeen: pathLastSeen,
      };
    }),
  );

  topPaths.sort((left, right) => right.views - left.views);

  return {
    configured: true,
    totalViews: toNumber(totalViews),
    uniqueVisitors: toNumber(uniqueVisitors),
    firstSeen,
    lastSeen,
    topPaths,
  };
}
