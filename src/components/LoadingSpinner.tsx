import { Map } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  message = "Loading parks and trails...",
  fullScreen = true,
}: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#E9F5EC] flex items-center justify-center z-50">
        <div className="text-center">
          {/* Animated Logo */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-4 border-[#0C6A3D]/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-[#0C6A3D] rounded-full animate-spin" />

            {/* Inner pulsing circle */}
            <div className="absolute inset-3 bg-[#0C6A3D] rounded-full flex items-center justify-center animate-pulse">
              <Map className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <p className="text-[#0C6A3D]">{message}</p>
            <div className="flex items-center justify-center gap-1">
              <div
                className="w-2 h-2 bg-[#0C6A3D] rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-[#0C6A3D] rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-[#0C6A3D] rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-[#0C6A3D]/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-[#0C6A3D] rounded-full animate-spin" />
      </div>
      {message && <p className="ml-4 text-gray-600 text-sm">{message}</p>}
    </div>
  );
}
