import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Download, MapPin, Phone, QrCode, UtensilsCrossed, Trash2 } from "lucide-react";
import jsPDF from "jspdf";
import { getRestaurantQR } from "../api/restaurant.api";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

export default function RestaurantCard({ restaurant, onDelete }) {
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

  if (!restaurant) return null;

  const downloadQRAsPDF = () => {
    if (!qr) return;

    const pdf = new jsPDF("p", "mm", "a4");

    pdf.setFontSize(18);
    pdf.text(restaurant.name, 105, 20, { align: "center" });

    pdf.setFontSize(11);
    pdf.text("Scan to view digital menu", 105, 28, { align: "center" });

    pdf.addImage(qr, "PNG", 55, 40, 100, 100);

    pdf.setFontSize(10);
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, 105, 150, {
      align: "center",
    });

    pdf.save(`${restaurant.name}-QR.pdf`);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-gray-900 font-bold text-lg shrink-0">
              {restaurant.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white truncate">
                {restaurant.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{restaurant.address}</span>
              </div>
            </div>
          </div>
          <Badge color={restaurant.isActive ? "green" : "red"}>
            {restaurant.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {restaurant.contactNumber && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-3">
            <Phone className="w-3 h-3" />
            {restaurant.contactNumber}
          </div>
        )}
      </div>

      {/* QR Code */}
      <div className="p-5 bg-gray-50 dark:bg-gray-800/50">
        <div className="h-44 flex items-center justify-center bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
          {loadingQR ? (
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-gray-900 dark:border-white border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Loading QR...</p>
            </div>
          ) : qr ? (
            <img src={qr} alt="QR" className="w-36 h-36 object-contain" />
          ) : (
            <div className="text-center text-gray-400 dark:text-gray-500">
              <QrCode className="w-10 h-10 mx-auto mb-2" />
              <p className="text-xs">QR not available</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 pt-4 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/manage/restaurant/${restaurant._id}/menus`)}
          >
            <UtensilsCrossed className="w-4 h-4" />
            Manage Menus
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/menu/${restaurant._id}`)}
          >
            View Menu
          </Button>
        </div>
        {onDelete && (
          <div className="mt-3">
            <Button
              variant="danger"
              size="sm"
              className="w-full"
              onClick={() => onDelete(restaurant._id)}
            >
              <Trash2 className="w-4 h-4" />
              Delete Restaurant
            </Button>
          </div>
        )}

        {qr && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={downloadQRAsPDF}
          >
            <Download className="w-4 h-4" />
            Download QR (PDF)
          </Button>
        )}
      </div>
    </div>
  );
}
