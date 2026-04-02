'use client';

import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <TopBar />
        <div className="p-6 flex flex-col gap-6">
          {children}
        </div>
      </div>
    </div>
  );
}
