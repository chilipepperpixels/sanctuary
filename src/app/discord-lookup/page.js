"use client";
import { useMemo, useState } from "react";

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
  const [input, setInput] = useState("");
  const result = useMemo(() => decodeSnowflake(input), [input]);
  return (
    <main className="discord-lookup-shell">
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
    </main>
  );
}
