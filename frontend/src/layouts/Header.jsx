import { Activity } from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Enterprise Knowledge Assistant
            </h1>

            <p className="text-xs text-slate-500">
              AI-Powered Knowledge Retrieval
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
          <Activity size={14} />
          Connected
        </div>
      </div>
    </header>
  );
}
