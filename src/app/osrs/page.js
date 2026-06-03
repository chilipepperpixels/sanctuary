"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const MAIN_USERNAME = "Bowosette";
const IRONMAN_USERNAME = "Ironsette";

const EMPTY_PANEL = {
  loading: true,
  error: false,
  stats: [],
};

async function loadOsrsStats(username, type = "normal") {
  const res = await fetch(
    `/api/osrs?username=${encodeURIComponent(username)}&type=${type}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Could not load OSRS stats");
  }

  return res.json();
}

function OsrsPanel({ data, title, combatLevel }) {
  const stats = data.stats || [];
  const overall = stats[0];
  const skills = stats.slice(1);

  return (
    <section className="osrs-panel">
      <div className="osrs-search">
        <span className="osrs-search-icon">&#128269;</span>
        <span>{data.username || title}</span>
        <span className="osrs-close"></span>
      </div>

      {data.loading && (
        <div className="osrs-error">Loading {title} stats...</div>
      )}

      {data.error && (
        <div className="osrs-error">Could not load {title} stats.</div>
      )}

      {!data.loading && !data.error && overall && (
        <>
          <div className="osrs-overall">
            <span>Overall</span>
            <strong>{overall.level.toLocaleString()}</strong>
            <span>{overall.xp.toLocaleString()} XP</span>
          </div>

          <div className="osrs-skill-grid">
            {skills.map((skill) => (
              <div className="osrs-skill" key={skill.name}>
                <span className="osrs-skill-name">{skill.name}</span>
                <strong>{skill.level.toLocaleString()}</strong>
                <span className="osrs-skill-rank">
                  #{skill.rank.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="osrs-footer-stats">
            <div>
              <span>Combat</span>
              <strong>{combatLevel}</strong>
            </div>
            <div>
              <span>Total</span>
              <strong>{overall.level.toLocaleString()}</strong>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default function Osrs() {
  const [mainData, setMainData] = useState({
    ...EMPTY_PANEL,
    username: MAIN_USERNAME,
  });
  const [ironmanData, setIronmanData] = useState({
    ...EMPTY_PANEL,
    username: IRONMAN_USERNAME,
  });

  useEffect(() => {
    loadOsrsStats(MAIN_USERNAME)
      .then((data) => setMainData(data))
      .catch(() =>
        setMainData({
          username: MAIN_USERNAME,
          error: true,
          stats: [],
        }),
      );

    loadOsrsStats(IRONMAN_USERNAME, "ironman")
      .then((data) => setIronmanData(data))
      .catch(() =>
        setIronmanData({
          username: IRONMAN_USERNAME,
          error: true,
          stats: [],
        }),
      );
  }, []);

  return (
    <>
      <nav className="navbar">
        <h2>Pepper's Sanctuary</h2>
        <div className="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/osrs" style={{ color: "#f41ee9" }}>
            OSRS Stats
          </Link>
          <Link href="/calendar">Calendar</Link>
        </div>
      </nav>

      <div className="page-shell">
        <main>
          <h1>OSRS Stats</h1>

          <div className="osrs-panels">
            <OsrsPanel data={mainData} title="Main" combatLevel={126} />
            <OsrsPanel data={ironmanData} title="Ironman" combatLevel="?" />
          </div>
        </main>
      </div>
    </>
  );
}
