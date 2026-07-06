import Link from "next/link";

const PROJECT_PATHS = [
  { label: "Google to Discord", href: "/projects#form-to-discord" },
  { label: "Discord Bot Project", href: "/projects#dealersette" },
  { label: "CSV Merger", href: "/csvmerger" },
];

export default function Home() {
  return (
    <div className="page-shell">
      <section className="home-path-hero" aria-labelledby="home-path-title">
        <div className="path-panel">
          <p className="path-kicker">Choose your path</p>
          <h1 id="home-path-title">Projects</h1>

          <nav className="path-menu" aria-label="Featured projects">
            {PROJECT_PATHS.map((path) => (
              <Link href={path.href} key={path.href}>
                {path.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="path-character">
          <img
            src="/download-background-removed-cropped.gif"
            alt="2B animated character"
          />
        </div>
      </section>

      <section style={{ marginBottom: "60px" }}>
        <h2>Welcome to my digital lair</h2>
        <p>
          Projects, experiments, and OSRS knowledge dumps collected in one
          place.
        </p>
      </section>

      <section id="projects" style={{ marginBottom: "60px" }}>
        <h2>🧪 Projects</h2>
        <ul>
          <li>Discord webhook automation tool</li>
          <li>Google Sheets → Discord integration</li>
          <li>Random dev experiments that may or may not work</li>
        </ul>
      </section>

      <section id="about" style={{ marginBottom: "60px" }}>
        <h2>🧠 About</h2>
        <p>
          This is my personal hub for dev projects and RuneScape knowledge
          dumping.
        </p>
      </section>

      <span hidden data-secret="Traps are not gay! nya~ UwU"></span>
    </div>
  );
}
