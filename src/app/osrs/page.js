"use client";

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

function skillLevel(stats, name) {
  return stats.find((skill) => skill.name === name)?.level ?? 1;
}

function computeCombatLevel(stats) {
  if (!stats || stats.length === 0) {
    return null;
  }

  const base =
    0.25 *
    (skillLevel(stats, "Defence") +
      skillLevel(stats, "Hitpoints") +
      Math.floor(skillLevel(stats, "Prayer") / 2));
  const melee =
    0.325 * (skillLevel(stats, "Attack") + skillLevel(stats, "Strength"));
  const ranged = 0.325 * Math.floor(skillLevel(stats, "Ranged") * 1.5);
  const magic = 0.325 * Math.floor(skillLevel(stats, "Magic") * 1.5);

  return Math.floor(base + Math.max(melee, ranged, magic));
}

function OsrsPanel({ data, title }) {
  const stats = data.stats || [];
  const overall = stats[0];
  const skills = stats.slice(1);
  const combatLevel = computeCombatLevel(stats);

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
                  {skill.rank > 0 ? `#${skill.rank.toLocaleString()}` : "—"}
                </span>
              </div>
            ))}
          </div>

          <div className="osrs-footer-stats">
            <div>
              <span>Combat</span>
              <strong>{combatLevel ?? "?"}</strong>
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
    <div className="page-shell osrs-shell">
      <main>
        <h1>OSRS Stats</h1>

        <div className="osrs-panels">
          <OsrsPanel data={mainData} title="Main" />
          <OsrsPanel data={ironmanData} title="Ironman" />
        </div>
      </main>
    </div>
  );
}
