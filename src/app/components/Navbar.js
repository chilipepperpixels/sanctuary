"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/osrs", label: "OSRS Stats" },
  { href: "/calendar", label: "Calendar" },
  { href: "/csvmerger", label: "CSV Merger" },
  { href: "/discord-lookup", label: "Discord Lookup" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <Link href="/" className="brand-link">
        <img src="/2bpepperlogo.png" alt="Pepper's Sanctuary" />
      </Link>
      <div className="navbar-links">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            style={{ color: pathname === link.href ? "#f41ee9" : "inherit" }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
