import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, UtensilsCrossed } from "lucide-react";
import { getPublicMenu } from "../api/public.api";

export default function PublicMenu() {
  const { restaurantId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await getPublicMenu(restaurantId);
        setData(res.data.data);
        if (res.data.data.menus.length > 0) {
          setActiveCategory(res.data.data.menus[0]._id);
        }
      } catch (err) {
        console.error("API error", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, [restaurantId]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <UtensilsCrossed className="w-10 h-10 text-orange-500" />
        </motion.div>
        <p className="mt-4 text-gray-500 font-semibold animate-pulse">
          Loading Menu...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Menu not found
      </div>
    );
  }

  const { restaurant, menus, items } = data;

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      {/* ================= HERO ================= */}
      <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center text-3xl font-black shadow-lg">
            {restaurant.name.charAt(0)}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
            {restaurant.name}
          </h1>

          <div className="flex justify-center items-center gap-2 mt-2 text-orange-100 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{restaurant.address || "Serving Fresh & Hot"}</span>
          </div>
        </div>
      </div>

      {/* ================= CATEGORY NAV ================= */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {menus.map((menu) => (
            <button
              key={menu._id}
              onClick={() => {
                setActiveCategory(menu._id);
                document
                  .getElementById(menu._id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeCategory === menu._id
                  ? "bg-orange-500 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {menu.title}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MENU SECTIONS ================= */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {menus.map((menu) => {
          const menuItems = items.filter(
            (item) => item.menuId.toString() === menu._id.toString()
          );

          return (
            <section
              key={menu._id}
              id={menu._id}
              className="mb-14 scroll-mt-24"
            >
              <h2 className="text-xl font-extrabold text-gray-800 mb-6 tracking-wide">
                {menu.title}
              </h2>

              <div className="space-y-4">
                {menuItems.map((item) => (
                  <motion.div
                    key={item._id}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </p>
                        {!item.isAvailable && (
                          <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded">
                            SOLD OUT
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-lg font-bold text-orange-600">
                          ₹{item.price}
                        </span>
                        {item.isAvailable && (
                          <span className="text-xs text-green-600 font-semibold">
                            Available
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-20 h-20 bg-orange-50 rounded-lg flex items-center justify-center">
                      <UtensilsCrossed className="w-7 h-7 text-orange-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ================= FOOTER (BEST VERSION) ================= */}
      <footer className="mt-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Brand */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl font-black shadow-sm">
              {restaurant.name.charAt(0)}
            </div>

            <h3 className="mt-4 text-lg font-extrabold text-gray-800">
              {restaurant.name}
            </h3>

            <p className="mt-2 text-sm text-gray-500 max-w-xs">
              Serving delicious food with quality ingredients and authentic
              taste.
            </p>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gray-100" />

          {/* Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm text-gray-500">
            <div>
              <p className="font-semibold text-gray-700">Location</p>
              <p className="mt-1">{restaurant.address || "City Center"}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Service</p>
              <p className="mt-1">Dine-In • Takeaway</p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Experience</p>
              <p className="mt-1">Safe • Digital • Contactless</p>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 text-center text-xs text-gray-400">
            <p>
              © {new Date().getFullYear()} {restaurant.name}. All rights
              reserved.
            </p>
            <p className="mt-1 tracking-widest uppercase font-semibold">
              Powered by QR Menu
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
