import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

/**
 * Enhanced Data Configurations
 */
const FEATURES = [
  {
    title: "Secure Owner Authentication",
    desc: "Restaurant owners register and log in using JWT-based authentication. All sensitive operations are protected with industry-standard encryption.",
    icon: "🔐",
    gradient: "from-blue-500/10 to-purple-500/10",
  },
  {
    title: "Menu & Item Management",
    desc: "Create unlimited menus, add items with rich descriptions, manage prices, and control availability in real time with instant updates.",
    icon: "📋",
    gradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    title: "Public QR Access",
    desc: "Clean separation between public APIs (QR menu access) and private owner APIs. Lightning-fast load times for customer-facing menus.",
    icon: "📱",
    gradient: "from-orange-500/10 to-red-500/10",
  },
  {
    title: "Real-Time Updates",
    desc: "Change prices, update availability, or add new items instantly. Customers always see the most current menu without refreshing.",
    icon: "⚡",
    gradient: "from-yellow-500/10 to-amber-500/10",
  },
  {
    title: "Multi-Menu Support",
    desc: "Create separate menus for breakfast, lunch, dinner, drinks, or seasonal specials. Perfect for restaurants with diverse offerings.",
    icon: "🍽️",
    gradient: "from-pink-500/10 to-rose-500/10",
  },
  {
    title: "Analytics Dashboard",
    desc: "Track menu views, popular items, and peak access times. Make data-driven decisions to optimize your offerings.",
    icon: "📊",
    gradient: "from-indigo-500/10 to-blue-500/10",
  },
];

const STEPS = [
  {
    id: "01",
    title: "Create Restaurant",
    desc: "Owner registers with email and creates a restaurant profile with details, logo, and branding.",
    color: "text-blue-600",
  },
  {
    id: "02",
    title: "Build Your Menu",
    desc: "Add menus, categories, and items with descriptions, prices, and images. Organize everything intuitively.",
    color: "text-green-600",
  },
  {
    id: "03",
    title: "Generate QR",
    desc: "System generates a unique QR code linked to your live menu. Download and print it anywhere.",
    color: "text-purple-600",
  },
  {
    id: "04",
    title: "Scan & View",
    desc: "Customers scan the code and instantly view your menu on any device. No app installation needed.",
    color: "text-orange-600",
  },
];

const STATS = [
  { value: "< 2s", label: "Average Load Time", icon: "⚡" },
  { value: "100%", label: "Mobile Compatible", icon: "📱" },
  { value: "24/7", label: "Menu Availability", icon: "🌐" },
  { value: "0", label: "Apps Required", icon: "✨" },
];

const BENEFITS = [
  {
    title: "For Restaurant Owners",
    points: [
      "Reduce printing costs by 90%",
      "Update menus instantly without reprinting",
      "No technical knowledge required",
      "Track customer engagement",
      "Manage multiple locations from one dashboard",
    ],
    icon: "👨‍🍳",
  },
  {
    title: "For Customers",
    points: [
      "View menu in seconds with one scan",
      "No app downloads or account creation",
      "See real-time prices and availability",
      "Works on any smartphone",
      "Accessible and easy to navigate",
    ],
    icon: "🙋‍♂️",
  },
];

const TECH_STACK = [
  { name: "React", desc: "Modern UI framework", color: "bg-blue-500" },
  { name: "Node.js", desc: "Backend runtime", color: "bg-green-500" },
  { name: "MongoDB", desc: "NoSQL database", color: "bg-green-600" },
  { name: "JWT", desc: "Secure authentication", color: "bg-purple-500" },
  { name: "REST API", desc: "Clean architecture", color: "bg-orange-500" },
];

const FAQS = [
  {
    question: "How much does it cost?",
    answer:
      "QR Menu is free to start with basic features. Premium plans with analytics and multiple locations start at just $19/month.",
  },
  {
    question: "Do my customers need to download an app?",
    answer:
      "No! Customers simply scan the QR code and the menu opens instantly in their phone's web browser. It works on any modern smartphone without any downloads.",
  },
  {
    question: "Can I update my menu in real-time?",
    answer:
      "Absolutely! You can update prices, availability, descriptions, and add new items anytime. Changes appear instantly for all customers viewing your menu.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply register your restaurant, create your menu items, and generate your QR code. The whole process takes less than 15 minutes!",
  },
  {
    question: "Can I manage multiple restaurants?",
    answer:
      "Yes! Our platform supports multiple restaurant locations under one account. Perfect for restaurant chains or owners with multiple establishments.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const demoRestaurantId = "69466a900b39c0b9a7c48e2d";

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white font-sans antialiased">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <Link to="/#" className="flex items-center gap-3 group">
            
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold rounded group-hover:rotate-12 transition-transform">
              Q
            </div>
            <span className="font-bold tracking-tight text-xl">QR Menu</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            {[
              "Demo",
              "Features",
              "How it works",
              "Benefits",
              "Architecture",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-black transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-sm font-medium">
            <Link
              to="/login"
              className="text-gray-600 hover:text-black transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 -z-10" />

          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block mb-6 px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-700"
            >
              ✨ The Future of Restaurant Menus
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1]"
            >
              Modern Menus. <br />
              <span className="text-gray-400">Powered by QR.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto text-xl text-gray-500 leading-relaxed mb-12"
            >
              The bridge between your kitchen and your customers' smartphones.
              No apps, no hardware, just a simple scan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <button
                onClick={() => navigate(`/menu/${demoRestaurantId}`)}
                className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg shadow-black/10"
              >
                View Live Demo →
              </button>
              <Link
                to="/register"
                className="border border-gray-200 bg-gray-50/50 px-8 py-4 rounded-xl font-semibold hover:bg-white transition-colors"
              >
                Register Restaurant
              </Link>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-16 bg-white border-y">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-black mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* QR DEMO SECTION */}
        <section
          id="demo"
          className="h-screen flex items-center bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                Experience
              </span>
              <h2 className="text-4xl font-bold tracking-tight">
                Zero Friction. <br />
                Infinite Possibilities.
              </h2>
              <p className="text-gray-600 text-lg">
                Customers scan the QR code and the menu opens instantly in their
                mobile browser. Perfect for contactless dining and real-time
                price updates.
              </p>
              <ul className="space-y-3 font-medium text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  Works on all modern smartphones
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  Instant menu synchronization
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  No login required for diners
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  Multilingual support ready
                </li>
              </ul>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl rounded-full scale-75" />
              <div className="relative bg-white border border-gray-100 rounded-[2.5rem] p-12 shadow-2xl">
                <img
                  src="/scanner.png"
                  alt="QR"
                  className="w-64 h-64 grayscale contrast-125"
                />
              </div>
            </div>
          </div>
        </section>
        {/* --- FEATURES SECTION --- */}
        <section
          id="features"
          className="min-h-screen flex items-center bg-white pt-20"
        >
          <div className="max-w-6xl mx-auto px-4 w-full py-8">
            <div className="text-center mb-4 space-y-1">
              <h2 className="text-4xl font-bold tracking-tight">
                Full-Stack Control
              </h2>
              <p className="text-gray-500 text-lg">
                Everything you need to run a digital-first restaurant.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <FeatureCard key={i} {...f} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* --- HOW IT WORKS SECTION --- */}
        <section
          id="how-it-works"
          className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-24"
        >
          {/* Background decorative blur */}
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-black/5 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-black/5 blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 w-full py-16">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-20">
              
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                Simple Setup
              </h2>

              <p className="mt-4 text-lg text-gray-700">
                Get your restaurant online in minutes, not days
              </p>
            </div>

            {/* Steps */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <StepCard key={s.id} {...s} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section id="benefits" className="py-32 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-20 tracking-tight">
              Built for Everyone
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              {BENEFITS.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100"
                >
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold mb-6">{benefit.title}</h3>
                  <ul className="space-y-3">
                    {benefit.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <span className="text-green-500 mt-1">→</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section
          id="architecture"
          className="min-h-screen flex items-center bg-gray-900 text-white scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto px-6 w-full py-20">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">
                Built with Modern Technology
              </h2>
              <p className="text-gray-400 text-lg">
                Enterprise-grade architecture for reliability and performance
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {TECH_STACK.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors text-center"
                >
                  <div
                    className={`w-12 h-12 ${tech.color} rounded-lg mx-auto mb-4`}
                  />
                  <h4 className="font-bold mb-1">{tech.name}</h4>
                  <p className="text-sm text-gray-400">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* FAQ SECTION */}
        <section className="py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-500 mb-16">
              Everything you need to know about QR Menu
            </p>

            <div className="space-y-6">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} {...faq} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.1),transparent_50%)]" />

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold">
                  🚀 Join 1000+ Restaurants
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  Ready to Go Digital?
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Transform your menu experience today. Setup takes less than 15
                  minutes, and you'll wonder why you didn't switch sooner.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    to="/register"
                    className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-xl text-center"
                  >
                    Start Free Trial →
                  </Link>
                  <button
                    onClick={() => navigate(`/menu/${demoRestaurantId}`)}
                    className="border-2 border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors text-center"
                  >
                    See Demo
                  </button>
                </div>
                <p className="text-sm text-gray-400 pt-2">
                  ✨ No credit card required • Cancel anytime
                </p>
              </div>

              <div className="hidden md:block">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">
                      ✓
                    </div>
                    <span className="font-semibold">Instant Setup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">
                      ✓
                    </div>
                    <span className="font-semibold">Real-Time Updates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">
                      ✓
                    </div>
                    <span className="font-semibold">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">
                      ✓
                    </div>
                    <span className="font-semibold">No Hidden Fees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold rounded">
                  Q
                </div>
                <span className="font-bold tracking-tight text-xl">
                  QR Menu
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Modern restaurant menus powered by QR technology. Simple, fast,
                and always up to date.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">
                Product
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-white transition"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#demo" className="hover:text-white transition">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 QR Menu. Built by{" "}
              <span className="text-white font-semibold">Anil</span> •
              Full-Stack Engineer
            </p>
            <div className="flex gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span className="hover:text-white transition cursor-pointer">
                React
              </span>
              <span className="hover:text-white transition cursor-pointer">
                Node.js
              </span>
              <span className="hover:text-white transition cursor-pointer">
                MongoDB
              </span>
              <span className="hover:text-white transition cursor-pointer">
                JWT
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Enhanced Sub-components
 */
function FeatureCard({ title, desc, icon, gradient, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`p-8 rounded-3xl border border-gray-100 hover:border-black/10 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 bg-gradient-to-br ${gradient}`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function StepCard({ id, title, desc, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group text-center relative"
    >
      {index < 3 && (
        <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent -z-10" />
      )}
      <div
        className={`text-6xl font-black text-gray-100 group-hover:${color} transition-colors mb-4 italic`}
      >
        {id}
      </div>
      <h4 className="font-bold mb-2 text-xl">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed px-4">{desc}</p>
    </motion.div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">{question}</h3>
        <span
          className={`text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>
      {isOpen && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 text-gray-600 leading-relaxed"
        >
          {answer}
        </motion.p>
      )}
    </div>
  );
}
