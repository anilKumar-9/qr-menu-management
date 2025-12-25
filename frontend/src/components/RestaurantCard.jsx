import { Download } from "lucide-react";
// API Imports (Ensure these paths match your folder structure)
import { getMe, logoutOwner } from "../api/auth.api";
import { getRestaurants, getRestaurantQR } from "../api/restaurant.api";

/**
 * CHILD COMPONENT: RestaurantCard
 * Handles individual restaurant display and QR logic
 */
function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  const [qr, setQr] = useState("");
  const [loadingQR, setLoadingQR] = useState(true);

  useEffect(() => {
    if (!restaurant?._id) return;

    async function fetchQR() {
      try {
        const res = await getRestaurantQR(restaurant._id);
        setQr(res.data.data.qrCode);
      } catch (err) {
        console.error(`Failed to load QR for ${restaurant.name}`, err);
      } finally {
        setLoadingQR(false);
      }
    }

    fetchQR();
  }, [restaurant?._id, restaurant.name]);

  const handleDownloadQR = () => {
    if (!qr) return;
    const link = document.createElement("a");
    link.href = qr;
    link.download = `${restaurant.name}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between transition-hover hover:shadow-md">
      <div>
        <h3 className="text-lg font-bold truncate">{restaurant.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Status:{" "}
          <span
            className={
              restaurant.isActive
                ? "text-green-600 font-medium"
                : "text-red-500 font-medium"
            }
          >
            {restaurant.isActive ? "Active" : "Inactive"}
          </span>
        </p>

        <div className="h-40 flex items-center justify-center bg-gray-50 rounded-xl mt-4 border border-dashed border-gray-200">
          {loadingQR ? (
            <p className="text-xs text-gray-400 animate-pulse">Loading QR...</p>
          ) : qr ? (
            <img src={qr} alt="QR Code" className="w-32 h-32 object-contain" />
          ) : (
            <p className="text-xs text-gray-400">QR Unavailable</p>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/restaurant/${restaurant._id}`)}
            className="flex-1 border border-gray-300 rounded-xl py-2 text-sm font-medium hover:bg-gray-50 transition"
          >
            Manage
          </button>
          <button
            onClick={() => navigate(`/menu/${restaurant._id}`)}
            className="flex-1 bg-black text-white rounded-xl py-2 text-sm font-medium hover:bg-gray-800 transition"
          >
            Menu
          </button>
        </div>

        {qr && (
          <button
            onClick={handleDownloadQR}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold border border-gray-200 rounded-xl py-2 hover:bg-gray-100 transition"
          >
            <Download size={16} />
            Download QR
          </button>
        )}
      </div>
    </div>
  );
}
