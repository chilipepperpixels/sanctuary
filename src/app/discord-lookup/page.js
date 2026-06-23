"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const DISCORD_EPOCH = 1420070400000n;

function getAgeLabel(date) {
  const now = new Date();

  let years = now.getFullYear() - date.getFullYear();
  let months = now.getMonth() - date.getMonth();

  if (now.getDate() < date.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years <= 0 && months <= 0) {
    const days = Math.max(
      0,
      Math.floor((now.getTime() - date.getTime()) / 86400000),
    );

    return `${days} day${days === 1 ? "" : "s"} old`;
  }

  const parts = [];

  if (years > 0) {
    parts.push(`${years} year${years === 1 ? "" : "s"}`);
  }

  if (months > 0) {
    parts.push(`${months} month${months === 1 ? "" : "s"}`);
  }

  return `${parts.join(", ")} old`;
}

function formatAccentColor(color) {
  if (!color) {
    return null;
  }

  return `#${color.toString(16).padStart(6, "0")}`;
}

function decodeSnowflake(value) {
  const cleaned = value.trim();

  if (!/^\d{17,20}$/.test(cleaned)) {
    return null;
  }

  const snowflake = BigInt(cleaned);
  const timestamp = Number((snowflake >> 22n) + DISCORD_EPOCH);
  const date = new Date(timestamp);

  return {
    id: cleaned,
    timestamp,
    iso: date.toISOString(),
    local: date.toLocaleString(),
    unix: Math.floor(timestamp / 1000),
    discordFull: `<t:${Math.floor(timestamp / 1000)}:F>`,
    discordRelative: `<t:${Math.floor(timestamp / 1000)}:R>`,
    age: getAgeLabel(date),
  }
}

export default function DiscordLookupPage() {
  const pathname = usePathname();
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState(null);
  const [profileStatus, setProfileStatus] = useState("idle");
  const [profileError, setProfileError] = useState("");
  const result = useMemo(() => decodeSnowflake(input), [input]);

  useEffect(() => {
    if (!result) {
      setProfile(null);
      setProfileStatus("idle");
      setProfileError("");
      return;
    }

    const controller = new AbortController();

    async function loadProfile() {
      setProfileStatus("loading");
      setProfileError("");

      try {
        const response = await fetch(`/api/discord/user?id=${result.id}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Discord user lookup failed.");
        }

        setProfile(data);
        setProfileStatus("ready");
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setProfile(null);
        setProfileStatus("error");
        setProfileError(error.message);
      }
    }

    loadProfile();

    return () => controller.abort();
  }, [result]);

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="brand-link">
          <img src="/2bpepperlogo.png" alt="Pepper's Sanctuary" />
        </Link>
        <div className="navbar-links">
          <Link
            href="/"
            style={{ color: pathname === "/" ? "#f41ee9" : "inherit" }}
          >
            Home
          </Link>
          <Link href="/projects">Projects</Link>
          <Link href="/osrs">OSRS Stats</Link>
          <Link href="/calendar">Calendar</Link>
          <Link href="/csvmerger">CSV Merger</Link>
          <Link
            href="/discord-lookup"
            style={{
              color: pathname === "/discord-lookup" ? "#f41ee9" : "inherit",
            }}
          >
            Discord Lookup
          </Link>
        </div>
      </nav>

      <main className="discord-lookup-shell">
        <div className="discord-lookup-workspace">
          <aside className="discord-lookup-inspector" aria-hidden="true">
            <img src="/inspector2b.png" alt="" />
          </aside>

          <section className="discord-lookup-panel">
          <p className="project-eyebrow">Discord Lookup</p>
          <h1>Snowflake Inspector</h1>

          <label className="discord-lookup-field">
            <span>Discord ID</span>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Paste a user, server, channel, or message ID"
            />
          </label>

          {input && !result && (
            <p className="discord-lookup-error">
              That does not look like a valid Discord snowflake.
            </p>
          )}

          {result && (
            <div className="discord-profile-card">
              {profile?.bannerUrl ? (
                <img
                  className="discord-profile-banner"
                  src={profile.bannerUrl}
                  alt="Discord profile banner"
                />
              ) : (
                <div
                  className="discord-profile-banner discord-profile-banner-fallback"
                  style={{
                    background: formatAccentColor(profile?.accentColor) || "",
                  }}
                />
              )}

              <div className="discord-profile-main">
                {profile?.avatarUrl && (
                  <a
                    href={profile.avatarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open avatar"
                  >
                    <img
                      className="discord-profile-avatar"
                      src={profile.avatarUrl}
                      alt="Discord avatar"
                    />
                  </a>
                )}

                <div className="discord-profile-copy">
                  <p className="project-eyebrow">
                    {profileStatus === "loading"
                      ? "Loading Discord profile"
                      : profileStatus === "ready"
                        ? profile.bot
                          ? "Discord Bot"
                          : "Discord User"
                        : "Snowflake decoded"}
                  </p>
                  <h2>
                    {profile?.globalName || profile?.username || result.id}
                  </h2>
                  {profile?.username && (
                    <p className="discord-profile-username">
                      @{profile.username}
                    </p>
                  )}
                  {profileStatus === "error" && (
                    <p className="discord-lookup-error">{profileError}</p>
                  )}
                  {profile?.avatarUrl && (
                    <a
                      className="discord-avatar-download"
                      href={profile.avatarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open avatar
                    </a>
                  )}
                </div>
              </div>

              {profile?.badges?.length > 0 && (
                <div className="tags">
                  {profile.badges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>
              )}
            </div>
          )}

          {result && (
            <div className="discord-lookup-result">
              <div>
                <span>ID</span>
                <strong>{result.id}</strong>
              </div>
              <div>
                <span>Created</span>
                <strong>{result.local}</strong>
              </div>
              <div>
                <span>ISO</span>
                <strong>{result.iso}</strong>
              </div>
              <div>
                <span>Unix</span>
                <strong>{result.unix}</strong>
              </div>
              <div>
                <span>Age</span>
                <strong>{result.age}</strong>
              </div>
              <div>
                <span>Discord Full Timestamp</span>
                <strong>{result.discordFull}</strong>
              </div>
              <div>
                <span>Discord Relative Timestamp</span>
                <strong>{result.discordRelative}</strong>
              </div>
            </div>
          )}
          </section>
        </div>
      </main>
    </>
  );
}
