"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Calendar() {
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
        </nav><div style={{ fontFamily: "Arial", maxWidth: "100%", margin: "0 500px 20px", padding: "20px" }}>


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
            </div></>
    );
}