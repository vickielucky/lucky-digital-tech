"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const sections = ["home", "about", "services", "featured-projects", "testimonials", "contact"];
    let current = "home";

    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();

        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          current = section;
        }
      }
    });

    setActive(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

 const navLink = (id: string, label: string) => (
  <a
    href={`#${id}`}
    onClick={(e) => {
      e.preventDefault();
      setMenuOpen(false);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }}
    className="relative group transition cursor-pointer text-sm font-semibold"
  >
    <span
      className={`${
        active === id ? "text-white" : "text-gray-300"
      } group-hover:text-white transition`}
    >
      {label}
    </span>

    <span
      className={`absolute left-0 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 transition-all duration-300 ${
        active === id ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-90"
      }`}
    ></span>
    <span
      className={`absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-emerald-300/30 blur-sm transition-opacity duration-300 ${
        active === id ? "opacity-100" : "opacity-0 group-hover:opacity-70"
      }`}
    ></span>
  </a>
);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/Lucky Digital Tech Logo.png"
            alt="Lucky Digital Tech Logo"
            width={44}
            height={44}
            className="object-contain h-11 w-11"
          />
          <Link href="/" className="text-white font-semibold text-lg tracking-wide">
            Lucky Digital Tech
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center gap-8">
          {navLink("home", "Home")}
          {navLink("founder", "Founder")}
          {navLink("about", "About")}
          {navLink("services", "Services")}
          {navLink("featured-projects", "Projects")}
          {navLink("testimonials", "Testimonials")}
          {navLink("contact", "Contact")}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#contact" className="rounded-full bg-emerald-400 px-5 py-3 text-black text-sm font-semibold hover:opacity-90 transition">
            Get started
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 font-medium">
            {navLink("home", "Home")}
            {navLink("founder", "Founder")}
            {navLink("about", "About")}
            {navLink("services", "Services")}
            {navLink("featured-projects", "Projects")}
            {navLink("testimonials", "Testimonials")}
            {navLink("contact", "Contact")}
          </div>
        </div>
      )}
    </nav>
  );
}