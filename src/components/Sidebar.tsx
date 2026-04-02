"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    id: "dashboard", label: "Dashboard", href: "/dashboard",
    icon: <><rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" /><rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" /><rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" /><rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" /></>
  },
  {
    id: "planner", label: "Study Planner", href: "/planner",
    icon: <><rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>
  },
  {
    id: "calendar", label: "Calendar", href: "/calendar",
    icon: <><rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M8 2v4M16 2v4M3 9h18M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>
  },
  {
    id: "deadlines", label: "Deadlines", href: "/deadlines",
    icon: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>
  },
  {
    id: "groups", label: "Groups", href: "/groups",
    icon: <><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M3 21c0-4 2.7-7 6-7s6 3 6 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle cx="17" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M21 21c0-3-1.3-5.5-4-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>
  },
  {
    id: "notes", label: "Notes", href: "/notes",
    icon: <><rect x="4" y="3" width="16" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>
  },
  {
    id: "analytics", label: "Analytics", href: "/analytics",
    icon: <><path d="M3 17l4-6 4 3 3-5 4 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" /><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" /></>
  },
  {
    id: "gpa", label: "GPA Calculator", href: "/gpa",
    icon: <><rect x="4" y="2" width="16" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M9 7h6M9 11h6M9 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const handleMouseEnter = useCallback(() => setCollapsed(false), []);
  const handleMouseLeave = useCallback(() => setCollapsed(true), []);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`sidebar flex flex-col py-5 px-3 h-screen ${collapsed ? "collapsed" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-2 mb-7 min-h-[40px]">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#0D9488' }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M12 3L2 9l10 6 10-6-10-6z" fill="white" />
            <path d="M2 17l10 6 10-6M2 13l10 6 10-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <div className="sidebar-brand-text min-w-0">
          <div className="font-bold text-gray-900 text-sm leading-tight">Studify</div>
          <div className="text-[10px] text-gray-400 uppercase tracking-[0.15em]">Academic Hub</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-0.5 flex-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`sidebar-link ${isActive(item.href) ? "active" : ""}`}
          >
            <span className="sidebar-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                {item.icon}
              </svg>
            </span>
            <span className="sidebar-link-text text-sm">{item.label}</span>
            {collapsed && (
              <span className="sidebar-tooltip">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-100/60 pt-3">
        <div className="flex items-center gap-2.5 px-2 mb-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm flex-shrink-0">
            AX
          </div>
          <div className="sidebar-user-info min-w-0">
            <div className="text-sm font-semibold text-gray-800 truncate">Alex Chen</div>
            <div className="text-xs text-gray-400 truncate">Computer Science</div>
          </div>
        </div>

        <div className="space-y-0.5">
          <Link href="/settings" className="sidebar-link text-xs text-gray-500">
            <span className="sidebar-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </span>
            <span className="sidebar-link-text">Settings</span>
          </Link>
          <Link href="/" className="sidebar-link text-xs text-gray-500">
            <span className="sidebar-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="sidebar-link-text">Logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
