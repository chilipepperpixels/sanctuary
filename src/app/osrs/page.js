import Link from "next/link";

const MAIN_USERNAME = "Bowosette";
const IRONMAN_USERNAME = "Ironsette";

async function getOsrsStats(username, type = "normal") {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/osrs?username=${encodeURIComponent(username)}&type=${type}`,
    { cache: "no-store" }
  );

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

            {data.error && (
                <div className="osrs-error">
                    Could not load {title} stats.
                </div>
            )}

            {!data.error && overall && (
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
                                <span className="osrs-skill-rank">#{skill.rank.toLocaleString()}</span>
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

export default async function Osrs() {
    const [mainData, ironmanData] = await Promise.all([
        getOsrsStats(MAIN_USERNAME),
        getOsrsStats(IRONMAN_USERNAME, "ironman"),
    ]);

    return (

        <><nav className="navbar" style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
            <h2>Pepper's Sanctuary</h2>
            <div style={{ display: "flex", gap: "15px" }}>
                <Link href="/">Home</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/osrs" style={{ color: "#f41ee9" }}>OSRS Stats</Link>
                <Link href="/calendar">Calendar</Link>
            </div>
        </nav>

            <div style={{ fontFamily: "Arial", maxWidth: "100%", margin: "0 0 20px 500px", padding: "20px" }}>

                <main>
                    <h1>OSRS Stats</h1>

                    <div className="osrs-panels">
                        <OsrsPanel data={mainData} title="Main" combatLevel={126} />
                        <OsrsPanel data={ironmanData} title="Ironman" combatLevel="?" />
                    </div>
                </main>
            </div></>
    );
}
