import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function Home() {
  const navigate = useNavigate();
  const demoRestaurantId = "69466a900b39c0b9a7c48e2d";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-sans antialiased transition-colors">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-bold rounded">
              Q
            </div>
            <span className="font-bold tracking-tight">QR Menu</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-full"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="pt-28 pb-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold mb-4"
            >
              Modern Menus. Simple QR.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
            >
              A fast, contactless menu your customers can open with one scan. No
              apps, no friction.
            </motion.p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate(`/menu/${demoRestaurantId}`)}
                className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                View Demo
              </button>
              <Link
                to="/register"
                className="border-2 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Register
              </Link>
            </div>
          </div>
        </section>

        <section id="demo" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Scan to view the menu</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Print or display this QR code and customers will instantly see
                your live menu on their phones.
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Works on all modern smartphones</li>
                <li>• Instant updates without reprinting</li>
                <li>• No app or login required for diners</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow">
                <img
                  src="/scanner.png"
                  alt="QR"
                  className="w-56 h-56 object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} QR Menu — Simple contactless menus.
        </div>
      </footer>
    </div>
  );
}
