import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 shadow-md hover:shadow-lg dark:shadow-primary-900/20 active:scale-95",
    secondary:
      "bg-white text-gray-800 border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 active:scale-95",
    danger:
      "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 shadow-md active:scale-95",
    ghost:
      "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10 active:scale-95",
    outline:
      "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-950/50 active:scale-95",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
