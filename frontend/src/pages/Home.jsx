import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();
  const demoRestaurantId = "69466a900b39c0b9a7c48e2d";

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold rounded">
              Q
            </div>
            <span className="font-bold tracking-tight">QR Menu</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-gray-600 hover:text-black">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-black text-white px-4 py-2 rounded-full"
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
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
            >
              A fast, contactless menu your customers can open with one scan. No
              apps, no friction.
            </motion.p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate(`/menu/${demoRestaurantId}`)}
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold"
              >
                View Demo
              </button>
              <Link
                to="/register"
                className="border border-gray-200 px-6 py-3 rounded-lg"
              >
                Register
              </Link>
            </div>
          </div>
        </section>

        <section id="demo" className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Scan to view the menu</h2>
              <p className="text-gray-600 mb-6">
                Print or display this QR code and customers will instantly see
                your live menu on their phones.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Works on all modern smartphones</li>
                <li>• Instant updates without reprinting</li>
                <li>• No app or login required for diners</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow">
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

      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} QR Menu — Simple contactless menus.
        </div>
      </footer>
    </div>
  );
}
