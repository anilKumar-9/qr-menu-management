import { Link } from "react-router-dom";
import { QrCode, Home, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-20 h-20 bg-gray-900 dark:bg-white rounded-3xl flex items-center justify-center mb-8 shadow-sm">
        <QrCode className="w-10 h-10 text-white dark:text-gray-900" />
      </div>

      <h1 className="text-7xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter">
        404
      </h1>
      <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-4">
        Page Not Found
      </p>
      <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md text-center">
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
