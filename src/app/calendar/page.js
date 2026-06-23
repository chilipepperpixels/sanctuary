"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Calendar() {
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
          <Link
            href="/csvmerger"
            style={{
              color: pathname === "/csvmerger" ? "#f41ee9" : "inherit",
            }}
          >
            CSV Merger
          </Link>
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
      <div className="page-shell">
        <main>
          <h1>Drumroll Calendar</h1>
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FBudapest&showPrint=0&src=MTI4NGE0MjM3MzY5NjM0NDg2YTJhNjFlNWE5NDU0MjUyZWFiNDUyZDIwMTY0MjVmMWVhNDdjM2EwZjMyOGU5ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=aHVuZ2FyaWFuX25hbWVkYXlzX19odUBob2xpZGF5LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23f4511e&color=%237cb342"
            className="calendar-frame"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </main>
        <section style={{ marginBottom: "60px" }}>
          <p>Other Important Documents</p>
          <p>
            <a
              href="https://forms.gle/BfgANq49tsSfVYsM8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Absence Form
            </a>
          </p>
          <p>
            <a
              href="https://forms.gle/uZoUZGKY6osi3Gpc6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consumable Request Form
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
