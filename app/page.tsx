
"use client";

import { useState } from "react";

const services = [
  {
    icon: "🌱",
    category: "Technology",
    title: "Smart Farming",
    description:
      "Discover modern farming techniques to improve crop growth and productivity.",
    details:
      "Explore crop planning, irrigation, soil health, farm technology, and practical ways to improve your farming decisions.",
  },
  {
    icon: "🚜",
    category: "Support",
    title: "Agricultural Support",
    description:
      "Find useful resources and guidance for your agricultural journey.",
    details:
      "Discover farming guides, agricultural resources, and practical information to help you manage your farm.",
  },
  {
    icon: "🌍",
    category: "Sustainability",
    title: "Sustainable Agriculture",
    description:
      "Protect the land while building a healthier future for farming.",
    details:
      "Learn about composting, crop rotation, water conservation, and environmentally responsible farming.",
  },
  {
    icon: "🌾",
    category: "Technology",
    title: "Crop Management",
    description:
      "Plan planting activities and learn to care for crops throughout the season.",
    details:
      "Explore crop planning, planting schedules, pest prevention, crop monitoring, and harvesting practices.",
  },
  {
    icon: "💧",
    category: "Sustainability",
    title: "Water Management",
    description:
      "Discover practical approaches to using water more efficiently.",
    details:
      "Learn about irrigation planning, rainwater collection, soil moisture, and water conservation.",
  },
  {
    icon: "🤝",
    category: "Support",
    title: "Farmer Community",
    description:
      "Discover ideas and opportunities that support farming communities.",
    details:
      "Explore collaboration opportunities, exchange agricultural knowledge, and discover ways to strengthen farming communities.",
  },
];

const filters = [
  "All",
  "Technology",
  "Support",
  "Sustainability",
];

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const visibleServices = services.filter((service) => {
    const matchesFilter =
      filter === "All" || service.category === filter;

    const term = search.trim().toLowerCase();

    const matchesSearch =
      service.title.toLowerCase().includes(term) ||
      service.description.toLowerCase().includes(term) ||
      service.category.toLowerCase().includes(term) ||
      service.details.toLowerCase().includes(term);

    return matchesFilter && matchesSearch;
  });

  
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setSubmitted(false);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Could not send your message.");
      return;
    }

    setSubmitted(true);
  } catch {
    alert("Unable to send your message. Please try again.");
  }
}


  function resetForm() {
    setForm({ name: "", email: "", message: "" });
    setSubmitted(false);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f2] text-[#173f2b]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-green-950/10 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a
            href="#home"
            className="flex items-center gap-2 text-2xl font-extrabold tracking-tight"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-3xl text-green-700">🌿</span>
            Zuri<span className="text-green-700">Agri</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-gray-600 transition hover:text-green-700"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#services"
            className="hidden rounded-full bg-[#173f2b] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-800 md:inline-flex"
          >
            Get Started <span className="ml-2">↗</span>
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-green-900/15 px-4 py-2 text-xl md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-green-900/10 bg-white p-4 md:hidden">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 font-medium transition hover:bg-green-50"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#services"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-xl bg-[#173f2b] px-4 py-3 text-center font-bold text-white"
            >
              Explore ZuriAgri →
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative isolate scroll-mt-20 overflow-hidden bg-[#173f2b] text-white"
      >
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102e20]/95 via-[#173f2b]/80 to-[#173f2b]/20" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:grid-cols-2 md:px-10 md:py-28">
          <div className="animate-[fadeIn_.8s_ease-out]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-widest backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              GROW SMARTER. LIVE GREENER.
            </span>

            <h1 className="mt-7 max-w-2xl text-5xl font-extrabold leading-[1.08] tracking-tight md:text-7xl">
              The future of farming starts{" "}
              <span className="text-lime-300">here.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
              Discover smarter farming techniques, sustainable
              solutions, and practical knowledge to help African
              agriculture thrive.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#services"
                className="rounded-full bg-lime-400 px-7 py-4 font-bold text-[#173f2b] shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-lime-300"
              >
                Explore Our Services ↗
              </a>

              <a
                href="#about"
                className="rounded-full border border-white/40 px-7 py-4 font-semibold transition hover:bg-white/10"
              >
                Discover Our Mission
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/90">
              <span>✓ Sustainable solutions</span>
              <span>✓ Practical knowledge</span>
              <span>✓ Community growth</span>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-sm rounded-[2rem] border border-white/25 bg-white/10 p-7 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-lime-200">
                  THE ZURIAGRI VISION
                </span>
                <span className="text-3xl">🌱</span>
              </div>

              <h2 className="mt-10 text-3xl font-extrabold">
                Grow with purpose.
              </h2>

              <p className="mt-4 leading-7 text-white/80">
                Better farming decisions begin with better
                agricultural knowledge.
              </p>

              <a
                href="#services"
                className="mt-8 flex items-center justify-between rounded-2xl bg-white p-4 font-bold text-[#173f2b] transition hover:bg-lime-100"
              >
                Discover our services <span>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/10">
          <div className="h-full w-1/3 bg-lime-400" />
        </div>
      </section>

      {/* Highlights */}
      <section className="relative z-10 mx-auto -mt-1 max-w-7xl px-5 py-10 md:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "🌱", title: "Smarter Farming", subtitle: "Practical knowledge" },
            { icon: "🤝", title: "Community", subtitle: "Shared opportunities" },
            { icon: "🌍", title: "Sustainability", subtitle: "A greener future" },
            { icon: "📚", title: "Learning", subtitle: "Useful farm resources" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-green-900/5 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                {item.icon}
              </span>
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="scroll-mt-24 bg-white px-5 py-20 md:px-10 md:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-xs font-bold tracking-widest text-green-800">
              ABOUT ZURIAGRI
            </span>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Agriculture for a{" "}
              <span className="text-green-700">
                sustainable tomorrow.
              </span>
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              We believe agriculture can create opportunities,
              strengthen communities, and contribute to a more
              sustainable future. ZuriAgri brings useful farming
              knowledge and practical resources together in one place.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center rounded-full bg-[#173f2b] px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-green-800"
            >
              Connect With Us <span className="ml-3">→</span>
            </a>

            <div className="mt-10 grid grid-cols-2 gap-5 border-t border-gray-100 pt-7">
              <div>
                <p className="text-2xl font-extrabold">🌿</p>
                <p className="mt-2 font-bold">Healthy Soil</p>
                <p className="mt-1 text-sm text-gray-500">
                  Care for the land.
                </p>
              </div>
              <div>
                <p className="text-2xl font-extrabold">🌾</p>
                <p className="mt-2 font-bold">Better Harvests</p>
                <p className="mt-1 text-sm text-gray-500">
                  Learn better practices.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="min-h-[390px] rounded-[2rem] bg-cover bg-center shadow-xl md:min-h-[480px]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=85')",
              }}
              role="img"
              aria-label="Young green plants growing in fertile soil"
            />

            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-white/70 bg-white/95 p-5 shadow-xl backdrop-blur md:-left-8 md:right-10">
              <p className="font-extrabold">Our mission</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Sharing knowledge that supports farmers and helps
                build a greener future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="scroll-mt-20 px-5 py-20 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-xs font-bold tracking-widest text-green-800">
                DISCOVER ZURIAGRI
              </span>

              <h2 className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl">
                Explore Our Services
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-gray-600">
                Find practical resources and discover new ways
                to grow with confidence.
              </p>
            </div>

            <span className="text-sm font-semibold text-green-800">
              {visibleServices.length} of {services.length} services
            </span>
          </div>

          {/* Search */}
          <div className="mt-9">
            <label htmlFor="service-search" className="sr-only">
              Search services
            </label>
            <input
              id="service-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search farming, crops, water..."
              className="w-full rounded-2xl border border-green-900/10 bg-white px-5 py-4 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10 md:max-w-xl"
            />
          </div>

          {/* Filters */}
          <div className="mt-5 flex flex-wrap gap-3">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                  filter === item
                    ? "bg-[#173f2b] text-white shadow-lg"
                    : "border border-green-900/10 bg-white hover:border-green-700 hover:bg-green-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleServices.map((service) => (
              <article
                key={service.title}
                className="group flex flex-col rounded-3xl border border-[#e3eadf] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-[0_20px_50px_rgba(25,61,43,0.12)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-100 to-green-200 text-4xl transition duration-300 group-hover:rotate-3 group-hover:scale-110">
                  {service.icon}
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                  {service.category}
                </p>

                <h3 className="mt-2 text-2xl font-bold tracking-tight">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 leading-7 text-gray-600">
                  {service.description}
                </p>

                {expanded === service.title && (
                  <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-4 text-sm leading-7 text-gray-700">
                    {service.details}
                  </div>
                )}

                <button
                  type="button"
                  aria-expanded={expanded === service.title}
                  onClick={() =>
                    setExpanded(
                      expanded === service.title
                        ? null
                        : service.title
                    )
                  }
                  className="mt-6 flex items-center justify-between rounded-xl border border-green-900/10 px-4 py-3 text-left font-bold text-green-800 transition hover:bg-green-50"
                >
                  {expanded === service.title
                    ? "Show Less"
                    : "Learn More"}
                  <span>
                    {expanded === service.title ? "↑" : "↗"}
                  </span>
                </button>
              </article>
            ))}
          </div>

          {visibleServices.length === 0 && (
            <div className="mt-8 rounded-3xl border border-green-900/10 bg-white px-6 py-14 text-center">
              <p className="text-3xl">🔎</p>
              <h3 className="mt-4 text-xl font-bold">
                No matching services found
              </h3>
              <p className="mt-2 text-gray-600">
                Try a different search or select another category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
                className="mt-6 rounded-full bg-[#173f2b] px-6 py-3 font-bold text-white hover:bg-green-800"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-20 bg-[#173f2b] px-5 py-20 text-white md:px-10 md:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-12 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-widest text-lime-200">
              LET'S CONNECT
            </span>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
              Let&apos;s grow{" "}
              <span className="text-lime-300">together.</span>
            </h2>

            <p className="mt-5 max-w-lg leading-8 text-white/75">
              Have a question or an idea about agriculture?
              We&apos;d love to hear from you.
            </p>

            <div className="mt-8 space-y-4 text-white/90">
              <p>🌱 Sustainable farming</p>
              <p>🤝 Agricultural collaboration</p>
              <p>🌍 A greener future</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 text-[#173f2b] shadow-2xl md:p-8">
            {submitted ? (
              <div role="status" className="py-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                  ✓
                </div>

                <h3 className="mt-6 text-2xl font-extrabold">
                  Thank you, {form.name}!
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  Your message has been sent successfully.
                  We will get back to you as soon as possible.
                </p>

                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-7 rounded-full bg-[#173f2b] px-6 py-3 font-bold text-white transition hover:bg-green-800"
                >
                  Write Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-extrabold">
                  Send Us a Message
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Fill in your details below.
                </p>

                <label
                  htmlFor="name"
                  className="mt-6 block text-sm font-bold"
                >
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  minLength={2}
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                />

                <label
                  htmlFor="email"
                  className="mt-5 block text-sm font-bold"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                />

                <label
                  htmlFor="message"
                  className="mt-5 block text-sm font-bold"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  required
                  minLength={5}
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell us how we can help..."
                  className="mt-2 w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                />

                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-[#173f2b] px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-800"
                >
                  Submit Message <span className="ml-2">→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#102e20] px-5 py-10 text-white md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <a href="#home" className="text-2xl font-extrabold">
              🌿 ZuriAgri
            </a>
            <p className="mt-2 text-sm text-white/65">
              Growing opportunities. Nurturing the future.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/75">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-lime-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © 2026 ZuriAgri. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
