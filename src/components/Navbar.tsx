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
    handleScroll();
    window.addEventListener("scroll", handleScroll);

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
    className="relative group transition cursor-pointer"
  >
    <span
      className={`${
        active === id ? "text-white" : "text-gray-300"
      } group-hover:text-white transition`}
    >
      {label}
    </span>

    <span
      className={`absolute left-0 -bottom-1 h-[2px] bg-pink-500 transition-all duration-300 ${
        active === id ? "w-full" : "w-0 group-hover:w-full"
      }`}
    ></span>
  </a>
);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Lucky Digital Tech Logo"
            width={90}
            height={90}
            className="object-contain h-10 w-auto md:h-12"
          />

          <span className="text-white font-bold text-xl hidden sm:block">
            Lucky <span className="text-primary">Digital Tech</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 font-medium">
          {navLink("home", "Home")}
          {navLink("founder", "Founder")}
          {navLink("about", "About")}
          {navLink("services", "Services")}
          {navLink("featured-projects", "Projects")}
          {navLink("testimonials", "Testimonials")}
          {navLink("contact", "Contact")}
        </div>

        {/* Hamburger Menu Button */}
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