import { getViewStats, recordView } from "@/app/lib/viewCounter";

export const runtime = "nodejs";

const DEV_STATS_TOKEN = "pepper-dev-views";

function hasStatsAccess(request) {
  const token = process.env.VIEW_COUNTER_TOKEN;
  const fallbackToken =
    process.env.NODE_ENV === "production" ? null : DEV_STATS_TOKEN;
  const expectedToken = token || fallbackToken;

  if (!expectedToken) {
    return false;
  }

  const requestUrl = new URL(request.url);
  const suppliedToken =
    requestUrl.searchParams.get("key") ||
    request.headers.get("x-view-counter-key");

  return suppliedToken === expectedToken;
}

export async function POST(request) {
  let body = {};

  try {
    body = await request.json();
  } catch {}

  const result = await recordView({
    pagePath: body.path,
    visitorId: body.visitorId,
  });

  return Response.json(result);
}

export async function GET(request) {
  if (!hasStatsAccess(request)) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(await getViewStats());
}
