import { Link } from "react-router-dom";
import { QrCode, Home, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex flex-col items-center justify-center px-4">
      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-500/20">
        <QrCode className="w-10 h-10 text-white" />
      </div>

      <h1 className="text-7xl md:text-8xl font-black text-gray-900 tracking-tighter">
        404
      </h1>
      <p className="text-xl font-bold text-gray-800 mt-4">
        Page Not Found
      </p>
      <p className="text-gray-500 mt-2 max-w-md text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex gap-3 mt-8">
        <Link to="/">
          <Button variant="secondary" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Home
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
