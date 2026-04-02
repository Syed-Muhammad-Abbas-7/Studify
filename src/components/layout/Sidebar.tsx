'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', iconPath: 'rect' },
  { href: '/study-planner', label: 'Study Planner', iconPath: 'planner' },
  { href: '/calendar', label: 'Calendar', iconPath: 'calendar' },
  { href: '/deadlines', label: 'Deadlines', iconPath: 'clock' },
  { href: '/groups', label: 'Groups', iconPath: 'groups' },
  { href: '/notes', label: 'Notes', iconPath: 'notes' },
  { href: '/analytics', label: 'Analytics', iconPath: 'analytics' },
  { href: '/gpa-calculator', label: 'GPA Calculator', iconPath: 'gpa' },
];

function NavIcon({ type, color }: { type: string; color: string }) {
  switch (type) {
    case 'rect': return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="1.8"/><rect x="13" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="1.8"/><rect x="3" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="1.8"/><rect x="13" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="1.8"/></svg>;
    case 'planner': return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="3" stroke={color} strokeWidth="1.8"/><path d="M8 2v4M16 2v4M3 9h18" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>;
    case 'calendar': return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="3" stroke={color} strokeWidth="1.8"/><path d="M8 2v4M16 2v4M3 9h18M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>;
    case 'clock': return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8"/><path d="M12 7v5l3 3" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>;
    case 'groups': return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.8"/><path d="M3 21c0-4 2.7-7 6-7s6 3 6 7" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><circle cx="17" cy="8" r="3" stroke={color} strokeWidth="1.8"/><path d="M21 21c0-3-1.3-5.5-4-6" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>;
    case 'notes': return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="3" stroke={color} strokeWidth="1.8"/><path d="M8 8h8M8 12h8M8 16h5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>;
    case 'analytics': return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M3 17l4-6 4 3 3-5 4 8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.8"/></svg>;
    case 'gpa': return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="3" stroke={color} strokeWidth="1.8"/><path d="M9 7h6M9 11h6M9 15h4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>;
    default: return null;
  }
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col py-6 px-3 overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 mb-8">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#0D9488' }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M12 3L2 9l10 6 10-6-10-6z" fill="white"/>
            <path d="M2 17l10 6 10-6M2 13l10 6 10-6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div className="font-bold text-gray-900 text-sm leading-tight">Studify</div>
          <div className="text-xs text-gray-400 uppercase tracking-widest">Academic Hub</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <div className={`sidebar-link w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${isActive ? 'active' : 'text-gray-600'}`}>
                <NavIcon type={item.iconPath} color={isActive ? '#0D9488' : 'currentColor'} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* AI Planner Button */}
      <div className="mt-4 mb-4">
        <Link href="/study-planner">
          <div className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white" style={{ background: '#0D9488' }}>
            <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            AI Planner
          </div>
        </Link>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3 px-2 pt-4 border-t border-gray-100">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">AX</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-800 truncate">Alex Chen</div>
          <div className="text-xs text-gray-400 truncate">Computer Science</div>
        </div>
      </div>

      {/* Settings + Logout */}
      <div className="mt-4 space-y-1">
        <Link href="/settings">
          <div className="sidebar-link w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-gray-500">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.8"/></svg>
            Settings
          </div>
        </Link>
        <Link href="/">
          <div className="sidebar-link w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-gray-500">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Logout
          </div>
        </Link>
      </div>
    </aside>
  );
}
