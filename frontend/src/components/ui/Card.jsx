export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-200/40 dark:shadow-none ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
