import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import { getRestaurantQR } from "../api/restaurant.api";

export default function RestaurantCard({ restaurant }) {
  if (!restaurant) return null;

  const navigate = useNavigate();
  const [qr, setQr] = useState("");
  const [loadingQR, setLoadingQR] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!restaurant?._id || fetchedRef.current) return;
    fetchedRef.current = true;

    async function fetchQR() {
      try {
        const res = await getRestaurantQR(restaurant._id);
        setQr(res?.data?.data?.qrCode || "");
      } catch (err) {
        console.error("QR fetch failed", err);
      } finally {
        setLoadingQR(false);
      }
    }

    fetchQR();
  }, [restaurant?._id]);

  /* =========================
     DOWNLOAD QR AS PDF
  ========================= */
  const downloadQRAsPDF = () => {
    if (!qr) return;

    const pdf = new jsPDF("p", "mm", "a4");

    pdf.setFontSize(18);
    pdf.text(restaurant.name, 105, 20, { align: "center" });

    pdf.setFontSize(11);
    pdf.text("Scan to view digital menu", 105, 28, {
      align: "center",
    });

    pdf.addImage(qr, "PNG", 55, 40, 100, 100);

    pdf.setFontSize(10);
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, 105, 150, {
      align: "center",
    });

    pdf.save(`${restaurant.name}-QR.pdf`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col justify-between">
      {/* TOP */}
      <div>
        <h3 className="text-lg font-bold truncate">{restaurant.name}</h3>

        <p className="text-sm text-gray-500 mt-1">
          Status:{" "}
          <span
            className={restaurant.isActive ? "text-green-600" : "text-red-500"}
          >
            {restaurant.isActive ? "Active" : "Inactive"}
          </span>
        </p>

        <div className="h-40 flex items-center justify-center mt-4 bg-gray-50 rounded-xl">
          {loadingQR ? (
            <p className="text-xs text-gray-400 animate-pulse">Loading QR...</p>
          ) : (
            qr && <img src={qr} alt="QR" className="w-32 h-32 object-contain" />
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-4 space-y-2">
        {/* ROW 1 */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/restaurant/${restaurant._id}`)}
            className="flex-1 border rounded-xl py-2 text-sm"
          >
            Manage
          </button>

          <button
            onClick={() =>
              navigate(`/manage/restaurant/${restaurant._id}/menu/create`)
            }
            className="flex-1 bg-black text-white rounded-xl py-2 text-sm"
          >
            Create Menu
          </button>
        </div>

        {/* ROW 2 */}
        <div className="flex gap-2">
          <button
            onClick={() =>
              navigate(`/manage/restaurant/${restaurant._id}/menus`)
            }
            className="flex-1 border rounded-xl py-2 text-sm font-semibold"
          >
            Show Menus
          </button>

          {/* ✅ PUBLIC MENU (QR PREVIEW) */}
          <button
            onClick={() => navigate(`/menu/${restaurant._id}`)}
            className="flex-1 border rounded-xl py-2 text-sm font-semibold"
          >
            View Public Menu
          </button>
        </div>

        {/* QR DOWNLOAD */}
        {qr && (
          <button
            onClick={downloadQRAsPDF}
            className="w-full flex items-center justify-center gap-2 border rounded-xl py-2 text-sm font-semibold hover:bg-gray-100"
          >
            <Download size={16} />
            Download QR (PDF)
          </button>
        )}
      </div>
    </div>
  );
}
