import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, UtensilsCrossed, Phone } from "lucide-react";

export default function PublicMenu() {
  const { restaurantId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/public/menu/${restaurantId}`,
          { credentials: "include" }
        );
        const json = await res.json();
        const apiData = json.data;

        const normalizedData = {
          restaurant: apiData?.restaurant || {},
          menus: Array.isArray(apiData?.menus) ? apiData.menus : [],
          items: Array.isArray(apiData?.items) ? apiData.items : [],
        };

        setData(normalizedData);

        if (normalizedData.menus.length > 0) {
          setActiveCategory(normalizedData.menus[0]._id);
        }
      } catch (err) {
        console.error("Failed to load public menu", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <UtensilsCrossed className="w-10 h-10 text-gray-900 dark:text-white" />
        </motion.div>
        <p className="mt-4 text-gray-500 dark:text-gray-400 font-semibold animate-pulse">
          Loading Menu...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Menu not found
      </div>
    );
  }

  const { restaurant, menus, items } = data;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans transition-colors">
      {/* HERO */}
      <div className="relative bg-gray-900 dark:bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto px-6 py-14 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl font-black shadow-xl border border-white/20"
          >
            {restaurant?.name?.charAt(0)}
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            {restaurant?.name}
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-4 mt-4 text-gray-300 text-sm"
          >
            {restaurant?.address && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {restaurant.address}
              </span>
            )}
            {restaurant?.contactNumber && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                {restaurant.contactNumber}
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* CATEGORY NAV */}
      {menus.length > 0 && (
        <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
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
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === menu._id
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {menu.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MENU SECTIONS */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {menus.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UtensilsCrossed className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No menu available at the moment.
            </p>
          </div>
        ) : (
          menus.map((menu) => {
            const menuItems = items.filter(
              (item) => item.menuId?.toString() === menu._id?.toString()
            );

            return (
              <section
                key={menu._id}
                id={menu._id}
                className="mb-14 scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gray-900 dark:bg-white rounded-full" />
                  <h2 className="text-xl font-extrabold text-gray-800 dark:text-white tracking-wide">
                    {menu.title}
                  </h2>
                </div>

                {menuItems.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 pl-4">
                    No items in this category
                  </p>
                ) : (
                  <div className="space-y-4">
                    {menuItems.map((item) => (
                      <motion.div
                        key={item._id}
                        whileHover={{ y: -2 }}
                        className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex justify-between gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">
                              {item.name}
                            </p>
                            {!item.isAvailable && (
                              <span className="text-[10px] font-bold bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
                                SOLD OUT
                              </span>
                            )}
                            {item.category && (
                              <span className="text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                                {item.category}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                            {item.description}
                          </p>

                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              ₹{item.price}
                            </span>
                            {item.isAvailable && (
                              <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                                ● Available
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center shrink-0">
                          <UtensilsCrossed className="w-7 h-7 text-gray-400 dark:text-gray-500" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>
            );
          })
        )}
      </div>

      {/* FOOTER */}
      <footer className="mt-20 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <div className="w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto shadow-sm">
            {restaurant?.name?.charAt(0)}
          </div>

          <h3 className="mt-4 text-lg font-extrabold text-gray-800 dark:text-white">
            {restaurant?.name}
          </h3>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Serving delicious food with quality ingredients.
          </p>

          <div className="mt-8 text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} {restaurant?.name}. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
