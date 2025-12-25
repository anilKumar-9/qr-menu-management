export default function Dashboard() {
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Parallel fetching for performance
      const [meRes, restRes] = await Promise.all([getMe(), getRestaurants()]);

      setOwner(meRes?.data?.data || null);
      // Accessing the 'restaurant' array specifically from your API response
      setRestaurants(restRes?.data?.data?.restaurant || []);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
      if (err?.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Unable to load your dashboard. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    try {
      await logoutOwner();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <p className="text-red-500 font-medium mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Welcome, {owner?.ownername || "Owner"}
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your restaurants & QR menus
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate("/create-restaurant")}
            className="flex-1 sm:flex-none bg-black text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all active:scale-95"
          >
            + Create Restaurant
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 sm:flex-none border border-gray-300 bg-white px-6 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto">
        {restaurants.length === 0 ? (
          <section className="bg-white p-16 rounded-3xl text-center shadow-sm border border-gray-100">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No restaurants yet
              </h2>
              <p className="text-gray-500 mb-8">
                Ready to digitize your menu? Create your first restaurant
                profile to generate a custom QR code.
              </p>
              <button
                onClick={() => navigate("/create-restaurant")}
                className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition"
              >
                Get Started
              </button>
            </div>
          </section>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
