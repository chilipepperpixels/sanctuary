"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Projects() {
  const pathname = usePathname();

  return (
    <>
      <nav className="navbar">
        <h2>⚔️ Pepper's Sanctuary</h2>
        <div className="navbar-links">
          <Link
            href="/"
            style={{ color: pathname === "/" ? "#f41ee9" : "inherit" }}
          >
            Home
          </Link>
          <Link
            href="/projects"
            style={{ color: pathname === "/projects" ? "#f41ee9" : "inherit" }}
          >
            Projects
          </Link>
          <Link
            href="/osrs"
            style={{ color: pathname === "/osrs" ? "#f41ee9" : "inherit" }}
          >
            OSRS Stats
          </Link>
          <Link
            href="/calendar"
            style={{ color: pathname === "/calendar" ? "#f41ee9" : "inherit" }}
          >
            Calendar
          </Link>
        </div>
      </nav>

      <main className="page-shell">
        <div className="project-card">
          <img
            src="/ChatGPT Image Jun 3, 2026, 02_27_30 PM.png"
            alt="Google Form to Discord"
          />

          <h2>Google Form → Discord Notifications</h2>

          <p>
            Automatically sends Google Form submissions to Discord through a
            webhook. Designed for communities, guilds, staff teams, and
            attendance tracking, with rich embeds, retry handling, and zero
            manual intervention.
          </p>

          <div className="tags">
            <span>JavaScript</span>
            <span>Google Apps Script</span>
            <span>Discord Webhooks</span>
            <span>Automation</span>
          </div>

          <div className="project-links">
            <a
              href="https://github.com/chilipepperpixels/google-form-to-discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>


      </main>
    </>
  );
}
