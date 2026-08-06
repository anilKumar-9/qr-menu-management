import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-8 h-8 text-gray-900 dark:text-white animate-spin" />
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 font-medium">{text}</p>
    </div>
  );
}
