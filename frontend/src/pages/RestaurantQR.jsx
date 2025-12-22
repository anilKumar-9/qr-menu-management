import { useEffect, useState } from "react";
import { getRestaurantQR } from "../api/qr.api";
import { useParams } from "react-router-dom";


export default function RestaurantQR() {
  const { restaurantId } = useParams();
  const [qr, setQr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQR() {
      try {
        const res = await getRestaurantQR(restaurantId);
        setQr(res.data.data.qrCode);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchQR();
  }, [restaurantId]);

  if (loading) return <p>Loading QR...</p>;
  if (!qr) return <p>QR not found</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Restaurant QR Code</h2>

      <img
        src={qr}
        alt="Restaurant QR"
        style={{ width: "250px", marginTop: "20px" }}
      />

      <p style={{ marginTop: "10px" }}>Scan to view menu</p>

      <a href={qr} download="restaurant-qr.png">
        Download QR
      </a>
    </div>
  );
}
