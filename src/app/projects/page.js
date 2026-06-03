"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PROJECT_SECTIONS = [
  { id: "form-to-discord", label: "Form to Discord" },
  { id: "dealersette", label: "Discord Bot" },
];

export default function Projects() {
  const pathname = usePathname();

  return (
    <>
      <nav className="navbar">
        <h2>Pepper&apos;s Sanctuary</h2>
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

      <main className="page-shell projects-shell">
        <div className="projects-docs-layout">
          <aside className="project-toc" aria-label="Project contents">
            <p>Contents</p>
            <nav className="project-page-nav" aria-label="Project sections">
              {PROJECT_SECTIONS.map((section) => (
                <a href={`#${section.id}`} key={section.id}>
                  {section.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="projects-content">
            <section
              className="project-section"
              id="form-to-discord"
              aria-labelledby="form-to-discord-title"
            >
              <div className="project-card">
                <div className="project-card-media">
                  <img
                    src="/ChatGPT Image Jun 3, 2026, 02_27_30 PM.png"
                    alt="Google Form to Discord"
                  />
                </div>

                <div className="project-card-body">
                  <p className="project-eyebrow">Automation project</p>
                  <h2 id="form-to-discord-title">
                    Google Form - Discord Notifications
                  </h2>

                  <p>
                    Automatically sends Google Form submissions to Discord
                    through a webhook. Designed for communities, guilds, staff
                    teams, and attendance tracking, with rich embeds, retry
                    handling, and zero manual intervention.
                  </p>

                  <div className="project-highlights">
                    <span>Live form alerts</span>
                    <span>Rich Discord embeds</span>
                    <span>Zero manual copy-paste</span>
                  </div>

                  <div className="tags">
                    <span>JavaScript</span>
                    <span>Google Apps Script</span>
                    <span>Discord Webhooks</span>
                    <span>Automation</span>
                  </div>

                  <div className="links project-links">
                    <a
                      href="https://ko-fi.com/chilipepperpixels"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/kofi_logo.png" alt="Ko-fi" />
                    </a>
                    <a
                      href="https://github.com/chilipepperpixels/google-form-to-discord"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/GitHub_Invertocat_White.png" alt="GitHub" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="project-section"
              id="dealersette"
              aria-labelledby="dealersette-title"
            >
              <div className="project-card bot-project-card">
                <div className="project-card-media">
                  <img
                    src="/dealersette-discord-bot.png"
                    alt="Dealersette bot to Discord"
                  />
                </div>

                <div className="project-card-body">
                  <p className="project-eyebrow">Discord bot project</p>
                  <h2 id="dealersette-title">Dealersette</h2>

                  <p>
                    A Discord gamba bot built for server-side game commands, bot
                    invite flow, support links, and a cleaner app profile
                    experience for community members.
                  </p>

                  <div className="project-highlights">
                    <span>Discord bot commands</span>
                    <span>Server invite and support flow</span>
                    <span>Community-first utility panel</span>
                  </div>

                  <div className="tags">
                    <span>JavaScript</span>
                    <span>Discord.js</span>
                    <span>Bot Automation</span>
                    <span>Community Tools</span>
                  </div>
                </div>
              </div>

              <div className="discord-card">
                <div className="banner"></div>

                <div className="avatar-wrap">
                  <img
                    src="/e3958c97-804f-4b78-a680-b3a7f13536e9.png"
                    alt="Dealersette avatar"
                    className="avatar"
                  />
                  <span className="status"></span>
                </div>

                <div className="content">
                  <h2>
                    Dealersette <span className="app-badge">APP</span>
                  </h2>

                  <p className="subline">Dealersette · Gamba Bot#5455</p>

                  <a
                    className="invite-btn"
                    href="https://discord.com/oauth2/authorize?client_id=1511360890476302386&permissions=68608&integration_type=0&scope=bot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    + Add App
                  </a>

                  <div className="links">
                    <a
                      href="https://ko-fi.com/chilipepperpixels"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/kofi_logo.png" alt="Ko-fi" />
                    </a>
                    <a
                      href="https://github.com/chilipepperpixels"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/GitHub_Invertocat_White.png" alt="GitHub" />
                    </a>
                    <span className="discord-widget-trigger">
                      <a
                        href="https://discord.gg/2t8u4UHanz"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="/Discord-Symbol-Blurple.png"
                          alt="Support Discord Server"
                        />
                      </a>
                      <span className="discord-widget-popover">
                        <iframe
                          src="https://discord.com/widget?id=1511547007918018721&theme=dark"
                          width="350"
                          height="500"
                          allowTransparency="true"
                          frameBorder="0"
                          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                          title="Discord server widget"
                        ></iframe>
                      </span>
                    </span>
                  </div>

                  <div className="section">
                    <h4>Roles</h4>
                    <span className="role bot-role">Bots</span>
                    <span className="role">Your dream dealer</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
