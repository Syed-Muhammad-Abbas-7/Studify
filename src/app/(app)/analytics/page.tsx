"use client";

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">Academic Performance</div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Overview</h1>
        </div>
        <div className="flex gap-3">
          <button className="btn-outline cursor-pointer">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" /><path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            This Semester
          </button>
          <button className="btn-primary cursor-pointer">
            <svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Row 1: Chart + Mastery Goal */}
      <div className="grid grid-cols-3 gap-6">
        {/* Study Hours Chart */}
        <div className="card p-6 col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-900">Study Hours Intensity</h3>
              <p className="text-xs text-gray-400">Weekly focus distribution across active modules</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-teal-500 inline-block"></span>Actual</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-teal-200 inline-block"></span>Projected</span>
            </div>
          </div>
          <div className="relative h-48 mt-4">
            <svg viewBox="0 0 500 180" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 140 C60 100 90 60 130 50 C170 40 190 110 240 120 C290 130 310 30 360 20 C410 10 450 80 500 70 V180 H0Z" fill="url(#areaGrad)" />
              <path d="M0 140 C60 100 90 60 130 50 C170 40 190 110 240 120 C290 130 310 30 360 20 C410 10 450 80 500 70" fill="none" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
              {/* Data points */}
              <circle cx="0" cy="140" r="4" fill="#0D9488" />
              <circle cx="130" cy="50" r="4" fill="#0D9488" />
              <circle cx="240" cy="120" r="4" fill="#0D9488" />
              <circle cx="360" cy="20" r="5" fill="#0D9488" stroke="white" strokeWidth="2" />
              <circle cx="500" cy="70" r="4" fill="#0D9488" />
            </svg>
            <div className="flex justify-between px-2 mt-1 text-xs text-gray-400">
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => <span key={d}>{d}</span>)}
            </div>
          </div>
        </div>

        {/* Mastery Goal */}
        <div className="card p-6 flex flex-col items-center justify-center">
          <h3 className="font-bold text-gray-900 mb-4 self-start">Mastery Goal Progress</h3>
          <div className="relative w-32 h-32 mb-4">
            <svg viewBox="0 0 128 128" className="w-32 h-32">
              <circle cx="64" cy="64" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
              <circle cx="64" cy="64" r="50" fill="none" stroke="#0D9488" strokeWidth="10" strokeDasharray="314" strokeDashoffset="79" className="donut-ring" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">75%</span>
              <span className="text-xs text-gray-400 uppercase font-semibold">Achieved</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center">You are <strong className="text-gray-900">12% ahead</strong> of your quarterly learning milestone.</p>
        </div>
      </div>

      {/* Row 2: Academic Standing + Research */}
      <div className="grid grid-cols-2 gap-6">
        {/* Academic Standing */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-4">Academic Standing</h3>
          <div className="space-y-4">
            {[
              { emoji: "💻", name: "Computer Science", sub: "Advanced Algorithms & Data Structures", grade: "A+", gpa: "GPA 4.0", progress: 100 },
              { emoji: "Σ", name: "Mathematics", sub: "Multivariable Calculus", grade: "A-", gpa: "GPA 3.7", progress: 92 },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-sm">{s.emoji}</div>
                    <div><div className="text-sm font-semibold text-gray-800">{s.name}</div><div className="text-xs text-gray-400">{s.sub}</div></div>
                  </div>
                  <div className="text-right"><div className="font-bold text-teal-600">{s.grade}</div><div className="text-xs text-gray-400">{s.gpa}</div></div>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${s.progress}%` }}></div></div>
              </div>
            ))}
          </div>
        </div>

        {/* Research & Resources */}
        <div className="rounded-2xl p-6 text-white" style={{ background: '#0f172a' }}>
          <h3 className="font-bold mb-4">Research & Resources</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "124", label: "PAPERS READ" },
              { value: "42", label: "LECTURES LOGGED" },
              { value: "8.4GB", label: "CLOUD STORAGE" },
              { value: "12", label: "CERTIFICATES" },
            ].map((r, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <div className="text-2xl font-bold">{r.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{r.label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-teal-300 border-2 border-gray-900 flex items-center justify-center text-xs font-bold text-teal-900">A</div>
              <div className="w-7 h-7 rounded-full bg-pink-300 border-2 border-gray-900 flex items-center justify-center text-xs font-bold text-pink-900">B</div>
              <div className="w-7 h-7 rounded-full bg-gray-600 border-2 border-gray-900 flex items-center justify-center text-xs text-gray-300">+8</div>
            </div>
            <span className="text-xs text-gray-400">Collaboration active with 10 peers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
