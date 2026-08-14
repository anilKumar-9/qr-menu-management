export default function Input({ label, error, icon: Icon, className = "", ...props }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
        )}
        <input
          className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3 rounded-2xl border bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/50 dark:bg-red-950/20"
              : "border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600"
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
