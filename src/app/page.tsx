"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Code, Palette, Settings } from "lucide-react";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const testimonials = [
    {
      name: "DJ Alekie 254",
      role: "DJ and An Engineer",
      image: "/part4.jpeg",
      rating: 5,
      message:
        "Lucky Digital Tech transformed our business with a modern website that boosted our online presence and customer engagement.",
    },
    {
      name: "Amina Hassan",
      role: "E-commerce Owner",
      image: "/amina.jpeg",
      rating: 5,
      message:
        "The team delivered beyond expectations. Clean design, fast performance, and excellent support throughout the project.",
    },
    {
      name: "Krrish P-Kay",
      role: "Clinical Officer",
      image: "/krrish.png",
      rating: 4,
      message:
        "Professional, creative, and reliable. They built us a Clinic Management Information System that made operations much more efficient.",
    },
  ];

  const renderStars = (rating : number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-600"}>
        <i className="fa-solid fa-star"></i>
      </span>
    ));
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  setMessage("");
  setMessageType("");

  const form = e.currentTarget;

  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    honeypot: formData.get("honeypot"),
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok && result.success) {
      setMessage("Message sent successfully!");
      setMessageType("success");
      form.reset();
    } else {
      setMessage(result.error || "Failed to send message.");
      setMessageType("error");
    }
  } catch (error) {
    setMessage("Network error. Try again.");
    setMessageType("error");
  } finally {
    setIsLoading(false);
  }
};
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <main id="home" className="min-h-screen bg-black text-white flex items-center px-6 pt-24 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* LEFT SIDE */}
          <div>
            <p className="text-red-500 text-2xl font-bold uppercase tracking-widest mb-4">
              Digital Solutions Agency
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              We Build Modern <br />
              <span className="text-purple-500">Web Experiences</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Lucky Digital Tech helps businesses grow with powerful websites,
              systems, and digital solutions built for performance and style.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <button className="bg-primary text-black px-6 py-3 rounded-full font-semibold hover:opacity-80 transition">
                Get Started
              </button>
              <a href="#featured-projects">
                <button className="bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition">
                  View Projects
                </button>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          {/* RIGHT SIDE */}
<div className="relative flex justify-center items-center w-full h-[300px] md:h-full">
  {/* TECH BACKGROUND */}
  <div
    className="absolute inset-0 bg-center bg-cover opacity-60"
    style={{ backgroundImage: "url('/tech-back.jpg')" }}
  />
  {/* SOFT FADE */}
  <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black/80" />
</div>
        </div>
      </main>

      {/* FOUNDER SECTION */}
      <section className="relative bg-black text-white py-24 px-6 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute w-[400px] h-[400px] bg-pink-500/10 blur-3xl rounded-full top-0 left-0"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full bottom-0 right-0"></div>
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-2xl"></div>
              <Image
                src="/luc.png"
                alt="Founder"
                width={420}
                height={420}
                className="rounded-full object-cover border-4 border-pink-500 relative z-10"
              />
            </div>
          </div>
          {/* Content */}
          <div id="founder" className="space-y-6">
            <p className="text-purple-500 uppercase tracking-widest mb-3">
              Founder & CEO
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Victor<span className="text-pink-500"> Murithi</span>
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              I am a passionate web developer and tech entrepreneur focused on building
              modern digital solutions that solve real-world problems.  
              At Lucky Digital Tech, we believe in innovation, creativity, and delivering
              high-quality systems that help businesses grow.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              My mission is to bridge the gap between technology and business by creating
              scalable, efficient, and user-friendly digital products.
            </p>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 text-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-pink-500">2+</h3>
                <p className="text-gray-400 text-sm">Years Experience</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-500">20+</h3>
                <p className="text-gray-400 text-sm">Projects</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-500">15+</h3>
                <p className="text-gray-400 text-sm">Clients</p>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-pink-500/20 border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white transition"
              >
                Contact Me
              </a>
              <a
                href="#"
                className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
              >
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="relative w-full bg-black text-white py-24 px-6 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute inset-0">
          <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-600/30 blur-3xl rounded-full"></div>
          <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"></div>
          
        </div>
        <div className="relative max-w-6xl mx-auto">
          {/* Heading */}
          <div id="about" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              About <span className="text-purple-500">Our Company</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              We are a forward-thinking tech company building modern digital
              solutions that help businesses scale, automate, and grow in the digital era.
            </p>
          </div>
          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition">
              <div className="text-purple-500 text-3xl mb-4">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h3 className="text-xl text-blue-500 font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-400 text-sm">
                To deliver scalable, secure, and innovative digital solutions
                that empower businesses to thrive in a competitive world.
              </p>
            </div>
            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition">
              <div className="text-blue-500 text-3xl mb-4">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
              <h3 className="text-xl text-pink-500 font-semibold mb-2">Our Vision</h3>
              <p className="text-gray-400 text-sm">
                To become a leading tech partner known for creativity, reliability,
                and cutting-edge digital transformation.
              </p>
            </div>
            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition">
              <div className="text-pink-500 text-3xl mb-4">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h3 className="text-xl text-pink-500 font-semibold mb-2">What We Do</h3>
              <p className="text-gray-400 text-sm">
                Web development, system design, UI/UX design, and scalable backend
                solutions tailored for modern businesses.
              </p>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
            <div>
              <h3 className="text-3xl font-bold text-purple-500">20+</h3>
              <p className="text-gray-400 text-sm">Projects</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-500">15+</h3>
              <p className="text-gray-400 text-sm">Clients</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-pink-500">2+</h3>
              <p className="text-gray-400 text-sm">Years Experience</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-500">99.99%</h3>
              <p className="text-gray-400 text-sm">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative bg-black text-white py-24 px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute w-[400px] h-[400px] bg-primary/20 blur-3xl rounded-full top-0 left-0"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full bottom-0 right-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
           <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-600/30 blur-3xl rounded-full"></div>
          <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"></div>
          {/* Header */}
          <div id="services" className="text-center mb-20">
            <p className="text-primary uppercase tracking-widest mb-3">Our Services</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What We <span className="text-5xl font-bold text-pink-500">Offer</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide modern digital solutions to help businesses grow, scale,
              and stand out in the digital world.
            </p>
          </div>
          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl transition duration-300 overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="absolute inset-0 bg-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative z-10">
                <div className="text-primary mb-6">
                  <Code size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-pink-500 transition">
                  Web Development
                </h3>
                <p className="text-gray-400">
                  We build fast, responsive, and modern websites tailored to your business needs.
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl transition duration-300 overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="absolute inset-0 bg-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative z-10">
                <div className="text-primary mb-6">
                  <Palette size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-pink-400 transition">
                  UI/UX Design
                </h3>
                <p className="text-gray-400">
                  Clean, user-friendly interfaces designed to improve user experience.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl transition duration-300 overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="absolute inset-0 bg-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative z-10">
                <div className="text-primary mb-6">
                  <Settings size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-pink-400 transition">
                  System Development
                </h3>
                <p className="text-gray-400">
                  Custom systems like voting platforms, dashboards, and business tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="featured-projects" className="bg-black text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-primary uppercase tracking-widest mb-3">Our Work</p>
            <h2 className="text-5xl font-bold text-purple-500">
              Featured <span className="text-5xl font-bold text-purple-500">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here are some of the projects we've worked on, showcasing our expertise
              in design and development.
            </p>
          </div>
          {/* Project Grid */}
          <div className="grid md:grid-cols-3 gap-10">
            {/* Project 1 */}
            <div className="group relative overflow-hidden rounded-2xl">
              <img
                src="/dj-website.jpeg"
                alt="DJ Website"
                className="w-full h-[250px] object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center p-4">
                <h3 className="text-xl font-semibold mb-2">DJ Website</h3>
                <p className="text-gray-300 text-sm mb-4">
                  A modern DJ booking and portfolio website.
                </p>
                <button className="bg-primary text-black px-4 py-2 rounded-full text-sm">
                  View Project
                </button>
              </div>
            </div>
            {/* Project 2 */}
            <div className="group relative overflow-hidden rounded-2xl">
              <img
                src="/online-voting.jpeg"
                alt="Voting System"
                className="w-full h-[250px] object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center p-4">
                <h3 className="text-xl font-semibold mb-2">Online Voting System</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Secure student voting platform with authentication.
                </p>
                <button className="bg-primary text-black px-4 py-2 rounded-full text-sm">
                  View Project
                </button>
              </div>
            </div>
            {/* Project 3 */}
            <div className="group relative overflow-hidden rounded-2xl">
              <img
                src="/real-estate.png"
                alt="Real Estate Website"
                className="w-full h-[250px] object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center p-4">
                <h3 className="text-xl font-semibold mb-2">Real Estate Website</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Modern property listing and showcase platform.
                </p>
                <button className="bg-primary text-black px-4 py-2 rounded-full text-sm">
                  View Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="w-full bg-black text-white py-24 px-6">
        
        <div className="max-w-6xl mx-auto"> 
          
          {/* Heading */}
          <div id="testimonials" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              What Our <span className="text-purple-500">Clients Say</span>
            </h2>
            <p className="text-gray-400 mt-4">
              Real feedback from people we've worked with
            </p>
          </div>
          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-6 hover:bg-white/10 transition"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-purple-500 mb-4"
                  />
                  <div className="flex gap-1 mb-3">
                    {renderStars(t.rating)}
                  </div>
                  <p className="text-gray-300 text-sm mb-6">"{t.message}"</p>
                  <h4 className="font-semibold text-pink-500">{t.name}</h4>
                  <span className="text-gray-400 text-sm">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="relative bg-black text-white py-24 px-6 overflow-hidden">
  
        {/* Glow Background */}
        <div className="absolute w-[400px] h-[400px] bg-primary/20 blur-3xl rounded-full top-0 right-0"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full bottom-0 left-0"></div>
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-600/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"></div>

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Header */}
          <div id="contact" className="text-center mb-16">
            <p className="text-primary uppercase tracking-widest mb-3">
              Contact Us
            </p>
            <h2 className="text-3xl md:text-5xl text-purple-500 font-bold mb-4">
              Let's Work <span className="text-pink-500">Together</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Have a project in mind? Reach out and let's build something amazing.
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12">

            {/* LEFT SIDE */}
            <div className="space-y-6">
              <h3 className="text-2xl  text-pink-500 font-semibold">
                Get in Touch
              </h3>

              <p className="text-gray-400">
                Whether you need a website, system, or design, Lucky Digital Tech is ready to help you bring your ideas to life.
              </p>

              <div className="space-y-4 text-gray-300">

                <div className="flex items-center gap-3">
                  <Mail className="text-primary" size={20} />
                  <span>luckydigitaltech@gmail.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-primary" size={20} />
                  <span>+254 704 930 645</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-primary" size={20} />
                  <span>Nairobi, Kenya</span>
                </div>

              </div>
            </div>

            {/* RIGHT SIDE (FORM) */}
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 space-y-6">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary"
              />
              <input type="text" name="honeypot" className="hidden" />

              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary"
              ></textarea>

              {message && (
                <div className={`p-3 rounded-lg text-sm font-semibold ${
                  messageType === "success" 
                    ? "bg-green-500/20 text-green-300 border border-green-500" 
                    : "bg-red-500/20 text-red-300 border border-red-500"
                }`}>
                  {message}
                </div>
              )}

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-pink-500 py-3 rounded-full font-semibold
                             hover:scale-105 hover:shadow-lg hover:shadow-primary/40
                             transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </div>

            </form>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-black text-white pt-20 pb-10 px-6 overflow-hidden border-t border-white/10">
  
        {/* Glow */}
        <div className="absolute w-[400px] h-[400px] bg-primary/10 blur-3xl rounded-full top-0 left-0"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-3 gap-12">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl  text-pink-500 font-bold mb-4">
              Lucky <span className="text-primary">Digital Tech</span>
            </h2>
            <p className="text-gray-400 mb-6">
              We build modern websites, systems, and digital experiences that help
              businesses grow and stand out.
            </p>

            {/* Socials */}
            <div className="flex gap-4 text-xl">

             <a href="https://web.facebook.com/victor.murithi.7927?rdid=bTnD6h5fuGY85X2g&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1KadH82BnT%2F%3F_rdc%3D1%26_rdr#" target="_blank" rel="noopener noreferrer">
    <FaFacebook className="cursor-pointer text-gray-400 hover:text-[#1877F2] transition duration-300" />
  </a>

              <a href="https://x.com/Vickielucky3" target="_blank" rel="noopener noreferrer">
    <FaTwitter className="cursor-pointer text-gray-400 hover:text-[#1DA1F2] transition duration-300" />
  </a>

              <FaInstagram className="cursor-pointer text-gray-400 hover:text-[#E4405F] transition duration-300" />

              <a href="https://www.linkedin.com/in/victor-murithi-a073b532a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">
  <FaLinkedin className="cursor-pointer text-gray-400 hover:text-[#0A66C2] transition duration-300" />
</a>

            </div>
          </div>

          <div>
            <h3 className="text-lg  text-pink-500 font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#home" className="hover:text-primary transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-primary transition">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg text-pink-500 font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>luckydigitaltech@gmail.com</li>
              <li>+254 704 930 645</li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="text-center text-gray-500 text-sm mt-12 border-t border-white/10 pt-6">
          © {new Date().getFullYear()} Lucky Digital Tech. All rights reserved.
        </div>

      </footer>
    </>
  );
}