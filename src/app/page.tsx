"use client";

import { useState, type FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import { Code, Palette, Settings, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-600"}>
        <i className="fa-solid fa-star"></i>
      </span>
    ));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setMessage("Message sent successfully. We’ll be in touch soon.");
        setMessageType("success");
        form.reset();
      } else {
        setMessage(result.error || "Failed to send message. Please try again.");
        setMessageType("error");
      }
    } catch {
      setMessage("Network error. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <main id="home" className="min-h-screen bg-transparent text-white flex items-center justify-center px-6 pt-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
          <p className="text-white-500 text-xl md:text-2xl font-bold uppercase tracking-widest mb-4">
            Lucky Digital Tech
          </p>
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none"></div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 tracking-tight">
            We build digital experiences that help businesses
            <span className="block mt-2 text-emerald-300">grow and stand out.</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Websites, branding, and custom digital solutions designed to look premium, work smoothly, and deliver real results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact">
              <button className="bg-gradient-to-r from-emerald-400 to-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-emerald-500/20 hover:opacity-90 transition">
                Get Started
              </button>
            </a>
            <a href="#featured-projects">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:opacity-90 transition shadow-lg shadow-purple-500/20">
                View Projects
              </button>
            </a>
          </div>
        </div>
      </main>

      {/* FOUNDER SECTION */}
      <section id="founder" className="relative text-white py-24 px-6 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute w-[400px] h-[400px] bg-pink-500/10 blur-3xl rounded-full top-0 left-0"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full bottom-0 right-0"></div>
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-2xl"></div>
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 z-0 bg-black/30 pointer-events-none"></div>

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
          <div>
            <p className="text-purple-500 uppercase tracking-widest mb-3">
              Founder & CEO
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Vickie <span className="text-pink-500">Lucky</span>
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
                href="#"
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
      <section id="about" className="relative w-full text-white py-24 px-6 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute inset-0">
          <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-600/30 blur-3xl rounded-full"></div>
          <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"></div>
        </div>
        <div className="relative max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              About <span className="text-purple-500">Our Company</span>
            </h2>
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 z-0 bg-black/25 pointer-events-none"></div>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              We are a forward-thinking tech company building modern digital
              solutions that help businesses scale, automate, and grow in the digital era.
            </p>
          </div>
          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-transparent border border-white/10 backdrop-blur transition">
              <div className="text-purple-500 text-3xl mb-4">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-400 text-sm">
                To deliver scalable, secure, and innovative digital solutions
                that empower businesses to thrive in a competitive world.
              </p>
            </div>
            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-transparent border border-white/10 backdrop-blur transition">
              <div className="text-blue-500 text-3xl mb-4">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-gray-400 text-sm">
                To become a leading tech partner known for creativity, reliability,
                and cutting-edge digital transformation.
              </p>
            </div>
            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-transparent border border-white/10 backdrop-blur transition">
              <div className="text-pink-500 text-3xl mb-4">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">What We Do</h3>
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
      <section id="services" className="relative text-white py-24 px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute w-[400px] h-[400px] bg-primary/20 blur-3xl rounded-full top-0 left-0"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full bottom-0 right-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-primary uppercase tracking-widest mb-3">Our Services</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What We <span className="text-5xl font-bold text-pink-500">Offer</span>
            </h2>
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 z-0 bg-black/20 pointer-events-none"></div>

            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide modern digital solutions to help businesses grow, scale,
              and stand out in the digital world.
            </p>
          </div>
          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="group relative bg-transparent border border-white/10 rounded-2xl p-8 backdrop-blur-xl transition duration-300 overflow-hidden hover:-translate-y-2">
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
            <div className="group relative bg-transparent border border-white/10 rounded-2xl p-8 backdrop-blur-xl transition duration-300 overflow-hidden hover:-translate-y-2">
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
            <div className="group relative bg-transparent border border-white/10 rounded-2xl p-8 backdrop-blur-xl transition duration-300 overflow-hidden hover:-translate-y-2">
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
      <section id="featured-projects" className="text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-primary uppercase tracking-widest mb-3">Our Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-500">
              Featured <span className="text-purple-500">Projects</span>
            </h2>
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 z-0 bg-black/18 pointer-events-none"></div>

            <p className="text-gray-400 max-w-2xl mx-auto">
              Here are some of the projects we&apos;ve worked on, showcasing our expertise
              in design and development.
            </p>
          </div>
          {/* Project Grid */}
          <div className="grid md:grid-cols-3 gap-10">
            {/* Project 1 */}
            <div className="group relative overflow-hidden rounded-2xl">
              <Image
                src="/dj-website.jpeg"
                alt="DJ Website"
                width={800}
                height={250}
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
              <Image
                src="/online-voting.jpeg"
                alt="Voting System"
                width={800}
                height={250}
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
              <Image
                src="/real-estate.png"
                alt="Real Estate Website"
                width={800}
                height={250}
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
      <section id="testimonials" className="w-full text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              What Our <span className="text-purple-500">Clients Say</span>
            </h2>
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 z-0 bg-black/22 pointer-events-none"></div>

            <p className="text-gray-400 mt-4">
              Real feedback from people we&apos;ve worked with
            </p>
          </div>
          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div
                  key={index}
                  className="bg-transparent border border-white/10 backdrop-blur rounded-2xl p-6 transition"
                >
                <div className="flex flex-col items-center text-center">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover border-2 border-purple-500 mb-4"
                  />
                  <div className="flex gap-1 mb-3">
                    {renderStars(t.rating)}
                  </div>
                  <p className="text-gray-300 text-sm mb-6">&ldquo;{t.message}&rdquo;</p>
                  <h4 className="font-semibold text-white">{t.name}</h4>
                  <span className="text-gray-400 text-sm">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="w-full text-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-emerald-300 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked <span className="text-emerald-300">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "What services do you offer?",
                answer:
                  "We build websites, custom systems, UI/UX design, branding support, and digital solutions tailored to business growth.",
              },
              {
                question: "How long does a project take?",
                answer:
                  "Timelines depend on scope and complexity, but most projects range from a few weeks to a couple of months.",
              },
              {
                question: "Can you redesign an existing website?",
                answer:
                  "Yes. We can refresh old websites, improve performance, update branding, and build a more modern user experience.",
              },
              {
                question: "Do you work with businesses outside Kenya?",
                answer:
                  "Absolutely. We work with clients remotely and are happy to support businesses locally and internationally.",
              },
            ].map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={item.question} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-white">{item.question}</h3>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-emerald-300">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="mt-3 text-sm sm:text-base text-gray-300">{item.answer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative text-white py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-purple-800/30 blur-3xl rounded-full -translate-x-1/3 -translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-300 uppercase tracking-widest">CONTACT US</p>
            <h2 className="text-5xl md:text-6xl font-extrabold mt-4 mb-2">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Let&apos;s Work Together</span>
            </h2>
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

            <p className="text-gray-400 max-w-2xl mx-auto">Have a project in mind? Reach out and let&apos;s build something amazing.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mt-12 items-start">
            <div className="space-y-6">
              <h3 className="text-2xl text-pink-500 font-semibold">Get in Touch</h3>
              <p className="text-gray-300 max-w-md">Whether you need a website, system, or design, Lucky Digital Tech is ready to help you bring your ideas to life.</p>

              <div className="mt-6 space-y-4 text-gray-300">
                <div className="flex items-center gap-3">
                  <span className="bg-white/6 p-3 rounded-md text-pink-400">
                    <Mail size={18} />
                  </span>
                  <span>luckydigitaltech@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-white/6 p-3 rounded-md text-pink-400">
                    <Phone size={18} />
                  </span>
                  <span>+254 704 930 645</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-white/6 p-3 rounded-md text-pink-400">
                    <MapPin size={18} />
                  </span>
                  <span>Nairobi, Kenya</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <a className="text-gray-300 hover:text-white" href="#"><FaFacebook /></a>
                <a className="text-gray-300 hover:text-white" href="#"><FaTwitter /></a>
                <a className="text-gray-300 hover:text-white" href="#"><FaInstagram /></a>
                <a className="text-gray-300 hover:text-white" href="#"><FaLinkedin /></a>
              </div>
            </div>

            <div className="rounded-2xl p-8 bg-transparent border border-white/8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
                <input name="name" type="text" required placeholder="Your Name" className="w-full rounded-lg bg-black/40 border border-white/8 px-4 py-3 text-gray-200 placeholder-gray-500 outline-none" />
                <input name="email" type="email" required placeholder="Your Email" className="w-full rounded-lg bg-black/40 border border-white/8 px-4 py-3 text-gray-200 placeholder-gray-500 outline-none" />
                <textarea name="message" required rows={6} placeholder="Your Message" className="w-full rounded-lg bg-black/40 border border-white/8 px-4 py-3 text-gray-200 placeholder-gray-500 outline-none"></textarea>
                {message ? (
                  <p className={`text-sm ${messageType === "success" ? "text-emerald-300" : "text-rose-300"}`}>
                    {message}
                  </p>
                ) : null}
                <button type="submit" disabled={isLoading} className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold px-6 py-3 hover:opacity-95 transition disabled:opacity-60">
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-500 to-purple-500 opacity-90" />
      </div>

      {/* FOOTER */}
      <Chatbot />
      <footer className="text-white py-16 px-6 mt-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/Lucky Digital Tech Logo.png"
                alt="Lucky Digital Tech Logo"
                width={40}
                height={40}
                className="object-contain h-10 w-10"
              />
              <h4 className="text-2xl font-bold text-pink-500">Lucky Digital Tech</h4>
            </div>
            <p className="text-gray-400 mt-4 max-w-sm">We build modern websites, systems, and digital experiences that help businesses grow and stand out.</p>
            <div className="flex items-center gap-3 mt-6 text-gray-300">
              <a className="hover:text-white" href="#"><FaFacebook /></a>
              <a className="hover:text-white" href="#"><FaTwitter /></a>
              <a className="hover:text-white" href="#"><FaInstagram /></a>
              <a className="hover:text-white" href="#"><FaLinkedin /></a>
            </div>
          </div>

          <div>
            <h5 className="text-pink-500 font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#featured-projects" className="hover:text-white">Projects</a></li>
              <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-pink-500 font-semibold mb-4">Contact</h5>
            <p className="text-gray-300">luckydigitaltech@gmail.com</p>
            <p className="text-gray-300 mt-2">+254 704 930 645</p>
            <p className="text-gray-300 mt-2">Nairobi, Kenya</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 border-t border-white/6 pt-6 text-center text-gray-500 text-sm">
          © 2026 Lucky Digital Tech. All rights reserved.
        </div>
      </footer>
    </>
  );
}