"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PROJECT_PATHS = [
  { label: "Google to Discord", href: "/projects#form-to-discord" },
  { label: "Discord Bot Project", href: "/projects#dealersette" },
  { label: "CSV Merger", href: "/csvmerger" },
];

export default function Home() {
  const pathname = usePathname();

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
        </div>
      </nav>

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
              src="download-background-removed-cropped.gif"
              alt="2B animated character"
            />
          </div>
        </section>

        <section style={{ marginBottom: "60px" }}>
          <h1>Welcome to my digital lair</h1>
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

        <section id="osrs" style={{ marginBottom: "60px" }}>
          <h2>📜 OSRS Guides</h2>
          <ul>
            <li>Early Ironman progression path</li>
            <li>Money making methods (no scams included)</li>
            <li>Boss mechanics breakdowns</li>
          </ul>
        </section>

        <section id="about" style={{ marginBottom: "60px" }}>
          <h2>🧠 About</h2>
          <p>
            This is my personal hub for dev projects and RuneScape knowledge
            dumping.
          </p>
        </section>

        <footer style={{ marginTop: "80px", opacity: 0.7 }}>
          <p>App Scripts project.</p>
        </footer>

        <main>
          <h1>Drumroll Calendar</h1>
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FBudapest&showPrint=0&src=MTI4NGE0MjM3MzY5NjM0NDg2YTJhNjFlNWE5NDU0MjUyZWFiNDUyZDIwMTY0MjVmMWVhNDdjM2EwZjMyOGU5ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=aHVuZ2FyaWFuX25hbWVkYXlzX19odUBob2xpZGF5LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23f4511e&color=%237cb342"
            className="calendar-frame"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </main>

        <span hidden data-secret="Traps are not gay"></span>
      </div>
    </>
  );
}
