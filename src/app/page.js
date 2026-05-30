"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Home() {
  const pathname = usePathname();

  return (
    <><nav className="navbar" style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
      <h2>⚔️ Pepper's Sanctuary</h2>
      <div style={{ display: "flex", gap: "15px" }}>
        <Link href="/" style={{ color: pathname === "/" ? "#f41ee9" : "inherit" }}>Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/osrs">OSRS Stats</Link>
        <Link href="/calendar">Calendar</Link>
      </div>
    </nav>



      <div style={{ fontFamily: "Arial", maxWidth: "100%", margin: "0 500px 20px", padding: "20px" }}>




        <video
          src="https://64.media.tumblr.com/b1aab6376f891a07adbb12f2a95afedb/tumblr_pfmx8u08sf1xhotgvo1_500.gifv"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />
        <section style={{ marginBottom: "60px" }}>
          <h1>Welcome to my digital lair</h1>
          <p>Projects, experiments, and OSRS knowledge dumps collected in one place.</p>
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
            This is my personal hub for dev projects and RuneScape knowledge dumping.
          </p>
        </section>


        <footer style={{ marginTop: "80px", opacity: 0.7 }}>
          <p>Built with questionable decisions and too much caffeine.</p>
        </footer>

        <main>
          <h1>Drumroll Calendar</h1>
          <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FBudapest&showPrint=0&src=MTI4NGE0MjM3MzY5NjM0NDg2YTJhNjFlNWE5NDU0MjUyZWFiNDUyZDIwMTY0MjVmMWVhNDdjM2EwZjMyOGU5ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=aHVuZ2FyaWFuX25hbWVkYXlzX19odUBob2xpZGF5LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23f4511e&color=%237cb342"
            style={{
              border: "1px solid #777",
              width: "100%", height: "600px"
            }}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </main>


      </div>
    </>
  );
}