"use client";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/60 px-6 py-3 flex items-center gap-4">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-100 transition-all focus-within:border-teal-200 focus-within:bg-white focus-within:shadow-sm">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-gray-400 flex-shrink-0">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search resources, notes, or groups…"
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 w-full outline-none"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications */}
        <button className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors relative">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Quick Add */}
        <button className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
            <line x1="5" y1="12" x2="19" y2="12" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* User */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-gray-800">Alex Rivera</div>
            <div className="text-xs text-gray-400">Senior Scholar</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-teal-200 flex items-center justify-center text-teal-800 font-bold text-sm cursor-pointer hover:ring-2 hover:ring-teal-300 transition-all">
            AR
          </div>
        </div>
      </div>
    </header>
  );
}
