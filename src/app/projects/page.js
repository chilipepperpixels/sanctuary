"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Projects() {
    const pathname = usePathname();

    return (
        <><nav className="navbar" style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
            <h2>⚔️ Pepper's Sanctuary</h2>
            <div style={{ display: "flex", gap: "15px" }}>
                <Link href="/" style={{ color: pathname === "/" ? "#f41ee9" : "inherit" }}>Home</Link>
                <Link href="/projects" style={{ color: pathname === "/projects" ? "#f41ee9" : "inherit" }}>Projects</Link>
                <Link href="/osrs" style={{ color: pathname === "/osrs" ? "#f41ee9" : "inherit" }}>OSRS Stats</Link>
                <Link href="/calendar" style={{ color: pathname === "/calendar" ? "#f41ee9" : "inherit" }}>Calendar</Link>
            </div>
        </nav>

            <div style={{ fontFamily: "Arial", maxWidth: "100%", margin: "0 500px 20px", padding: "20px" }}>

                <section>
                    <h1>Github Projects</h1>

                    <a href="https://github.com/chilipepperpixels" target="_blank">
                        <img
                            src="https://githubcard.com/chilipepperpixels.svg?d=LFvFX7uM&theme=github-light"
                            alt="GitHub profile card for chilipepperpixels"
                            style={{ maxWidth: "100%", height: "auto" }} />
                    </a>
                </section>
            </div></>
    );
}