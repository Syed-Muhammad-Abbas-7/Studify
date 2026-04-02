"use client";
import { useState } from "react";

const days = [
  { day: "MON", date: 13 },
  { day: "TUE", date: 14 },
  { day: "WED", date: 15, today: true },
  { day: "THU", date: 16 },
  { day: "FRI", date: 17 },
  { day: "SAT", date: 18 },
  { day: "SUN", date: 19 },
];

const allHours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

interface PlannerEvent {
  id: string;
  day: number;
  startHour: number;
  duration: number;
  bg: string;
  border: string;
  labelColor: string;
  label: string;
  title: string;
  subtitle: string;
  italic?: boolean;
  progress?: number;
}

const colorPresets = [
  { bg: "#e0f2fe", border: "#0284c7", labelColor: "text-blue-700", name: "Blue" },
  { bg: "#fef3c7", border: "#d97706", labelColor: "text-yellow-700", name: "Yellow" },
  { bg: "#f0fdfa", border: "#0D9488", labelColor: "text-teal-700", name: "Teal" },
  { bg: "#fce7f3", border: "#db2777", labelColor: "text-pink-700", name: "Pink" },
  { bg: "#dcfce7", border: "#16a34a", labelColor: "text-green-700", name: "Green" },
  { bg: "#faf5ff", border: "#9333ea", labelColor: "text-purple-700", name: "Purple" },
];

const initialEvents: PlannerEvent[] = [
  { id: "e1", day: 0, startHour: 9, duration: 1.5, bg: "#e0f2fe", border: "#0284c7", labelColor: "text-blue-700", label: "Physics 101", title: "Quantum Mechanics", subtitle: "Lecture · Hall A" },
  { id: "e2", day: 1, startHour: 10, duration: 2.5, bg: "#fef3c7", border: "#d97706", labelColor: "text-yellow-700", label: "Calculus II", title: "Integration Methods", subtitle: "10:30 – 12:30", progress: 95 },
  { id: "e3", day: 2, startHour: 9, duration: 2, bg: "#f0fdfa", border: "#0D9488", labelColor: "text-teal-700", label: "Self Study ⭐", title: "AI Model Architecture Review", subtitle: '"Focus on Transformers…"', italic: true },
  { id: "e4", day: 3, startHour: 14, duration: 1.5, bg: "#fce7f3", border: "#db2777", labelColor: "text-pink-700", label: "Seminar", title: "Ethics in Technology", subtitle: "Lecture Hall C" },
  { id: "e5", day: 4, startHour: 9, duration: 2, bg: "#dcfce7", border: "#16a34a", labelColor: "text-green-700", label: "Lab Work", title: "Systems Engineering Lab 4", subtitle: "Team Alpha" },
  { id: "e6", day: 0, startHour: 14, duration: 1, bg: "#fef3c7", border: "#d97706", labelColor: "text-yellow-700", label: "Tutorial", title: "Physics Tutorial", subtitle: "Room 204" },
  { id: "e7", day: 2, startHour: 14, duration: 2, bg: "#e0f2fe", border: "#0284c7", labelColor: "text-blue-700", label: "Lab", title: "CS Systems Lab", subtitle: "Building D" },
  { id: "e8", day: 3, startHour: 9, duration: 1.5, bg: "#f0fdfa", border: "#0D9488", labelColor: "text-teal-700", label: "Self Study", title: "Discrete Math Review", subtitle: "Library" },
  { id: "e9", day: 5, startHour: 10, duration: 2, bg: "#fce7f3", border: "#db2777", labelColor: "text-pink-700", label: "Group Study", title: "Exam Prep Session", subtitle: "CS Deep Dive" },
  { id: "e10", day: 1, startHour: 15, duration: 1, bg: "#dcfce7", border: "#16a34a", labelColor: "text-green-700", label: "Office Hours", title: "Prof. Johnson", subtitle: "Faculty Building" },
  { id: "e11", day: 6, startHour: 11, duration: 1.5, bg: "#f0fdfa", border: "#0D9488", labelColor: "text-teal-700", label: "Self Study", title: "Weekly Review", subtitle: "Personal block" },
];

type ViewMode = "day" | "week" | "custom";

export default function PlannerPage() {
  const [events, setEvents] = useState<PlannerEvent[]>(initialEvents);
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [selectedDayIndex, setSelectedDayIndex] = useState(2);
  const [customDays, setCustomDays] = useState(3);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newDay, setNewDay] = useState(0);
  const [newStartHour, setNewStartHour] = useState(9);
  const [newDuration, setNewDuration] = useState(1);
  const [newColorIdx, setNewColorIdx] = useState(0);

  const ROW_HEIGHT = 48;

  const getVisibleDays = () => {
    if (viewMode === "day") return [days[selectedDayIndex]];
    if (viewMode === "custom") return days.slice(0, customDays);
    return days;
  };
  const getVisibleDayIndices = () => {
    if (viewMode === "day") return [selectedDayIndex];
    if (viewMode === "custom") return Array.from({ length: customDays }, (_, i) => i);
    return days.map((_, i) => i);
  };

  const visibleDays = getVisibleDays();
  const visibleIndices = getVisibleDayIndices();
  const gridCols = viewMode === "day" ? "grid-cols-2" : viewMode === "custom" ? `grid-cols-[60px_repeat(${customDays},1fr)]` : "grid-cols-[60px_repeat(7,1fr)]";

  const addEvent = () => {
    if (!newTitle.trim()) return;
    const c = colorPresets[newColorIdx];
    const ev: PlannerEvent = {
      id: `e${Date.now()}`, day: newDay, startHour: newStartHour, duration: newDuration,
      bg: c.bg, border: c.border, labelColor: c.labelColor,
      label: newLabel || "Event", title: newTitle, subtitle: newSubtitle,
    };
    setEvents((p) => [...p, ev]);
    setShowAddModal(false);
    setNewTitle(""); setNewLabel(""); setNewSubtitle("");
  };

  const deleteEvent = (id: string) => {
    setEvents((p) => p.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 space-y-4 animate-fade-in flex flex-col" style={{ height: "calc(100vh - 60px)" }}>
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-widest">November 2023</div>
          <h1 className="text-2xl font-bold text-gray-900">Week 46</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-xl p-1 text-sm">
            {(["day", "week", "custom"] as ViewMode[]).map((mode) => (
              <button key={mode} onClick={() => setViewMode(mode)} className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${viewMode === mode ? "bg-white font-semibold text-gray-800 shadow-sm" : "text-gray-500 hover:bg-white/60"}`}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          <button className="btn-primary cursor-pointer">
            <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            AI Generate Timetable
          </button>
        </div>
      </div>

      {viewMode === "day" && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm text-gray-500 mr-2">Select day:</span>
          {days.map((d, i) => (
            <button key={i} onClick={() => setSelectedDayIndex(i)} className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${selectedDayIndex === i ? "bg-teal-500 text-white font-semibold shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{d.day}</button>
          ))}
        </div>
      )}
      {viewMode === "custom" && (
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-sm text-gray-500">Show days:</span>
          {[2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setCustomDays(n)} className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${customDays === n ? "bg-teal-500 text-white font-semibold" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{n} days</button>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button onClick={() => setShowAddModal(true)} className="btn-outline cursor-pointer">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          Add Event
        </button>
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-teal-300 border-2 border-white flex items-center justify-center text-xs font-bold text-teal-800">A</div>
          <div className="w-8 h-8 rounded-full bg-pink-300 border-2 border-white flex items-center justify-center text-xs font-bold text-pink-800">B</div>
          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">+4</div>
        </div>
        <span className="text-sm text-gray-500">Study Group: CS Deep Dive</span>
      </div>

      {/* Timetable Grid */}
      <div className="card overflow-hidden flex-1 flex flex-col min-h-0">
        <div className={`grid ${gridCols} border-b border-gray-100 flex-shrink-0`}>
          <div className="p-3 border-r border-gray-100 text-xs text-gray-400 text-center">TIME</div>
          {visibleDays.map((d, i) => (
            <div key={i} className={`p-3 text-center border-r border-gray-50 cursor-pointer transition-colors ${d.today ? "bg-teal-50" : "hover:bg-gray-50"}`} onClick={() => { setSelectedDayIndex(visibleIndices[i]); setViewMode("day"); }}>
              <div className={`text-xs ${d.today ? "text-teal-600 font-semibold" : "text-gray-400"}`}>{d.day}</div>
              {d.today ? (<div className="w-7 h-7 rounded-full mx-auto flex items-center justify-center text-sm font-bold text-white" style={{ background: "#0D9488" }}>{d.date}</div>) : (<div className="text-sm font-semibold text-gray-700">{d.date}</div>)}
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className={`grid ${gridCols}`} style={{ minHeight: allHours.length * ROW_HEIGHT }}>
            <div className="border-r border-gray-100">
              {allHours.map((t) => (<div key={t} className="text-xs text-gray-400 pr-2 text-right" style={{ height: ROW_HEIGHT, lineHeight: `${ROW_HEIGHT}px` }}>{t}</div>))}
            </div>
            {visibleDays.map((d, colIdx) => {
              const dayIdx = visibleIndices[colIdx];
              const dayEvents = events.filter((e) => e.day === dayIdx);
              return (
                <div key={colIdx} className={`relative border-r border-gray-50 ${d.today ? "bg-teal-50/20" : ""}`}>
                  {allHours.map((_, hi) => (<div key={hi} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors" style={{ height: ROW_HEIGHT }}></div>))}
                  {dayEvents.map((ev) => (
                    <div key={ev.id} className="absolute left-1 right-1 rounded-xl p-2 text-xs cursor-pointer hover:shadow-lg transition-shadow z-10 overflow-hidden group" style={{ top: ev.startHour * ROW_HEIGHT + 2, height: ev.duration * ROW_HEIGHT - 4, background: ev.bg, borderLeft: `3px solid ${ev.border}` }}>
                      <div className="flex items-start justify-between">
                        <div className={`font-semibold ${ev.labelColor} text-[10px] uppercase leading-tight`}>{ev.label}</div>
                        <button onClick={(e) => { e.stopPropagation(); deleteEvent(ev.id); }} className="opacity-0 group-hover:opacity-100 w-4 h-4 rounded flex items-center justify-center hover:bg-white/60 transition-all cursor-pointer flex-shrink-0">
                          <svg width="8" height="8" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#666" strokeWidth="2.5" strokeLinecap="round" /></svg>
                        </button>
                      </div>
                      <div className="font-bold text-gray-800 text-xs mt-0.5 leading-tight">{ev.title}</div>
                      {ev.subtitle && ev.duration >= 1.5 && (<div className={`text-gray-500 mt-0.5 text-[10px] leading-tight ${ev.italic ? "italic" : ""}`}>{ev.subtitle}</div>)}
                      {ev.progress !== undefined && ev.duration >= 2 && (<><div className="mt-1.5 h-1 bg-yellow-200 rounded-full"><div className="h-full bg-yellow-500 rounded-full" style={{ width: `${ev.progress}%` }}></div></div><div className="text-right text-yellow-700 font-bold text-[10px] mt-0.5">{ev.progress}%</div></>)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-8 bg-white rounded-2xl p-4 border border-gray-100 flex-shrink-0">
        {[{ emoji: "⏱", label: "Total Focused", value: "24.5 hrs", c: "" }, { emoji: "🎯", label: "Completion", value: "88%", c: "" }, { emoji: "📈", label: "Efficiency", value: "+12%", c: "text-teal-600" }].map((s, i) => (
          <div key={i} className="flex items-center gap-3"><span className="text-xl">{s.emoji}</span><div><div className="text-xs text-gray-400">{s.label}</div><div className={`font-bold ${s.c || "text-gray-900"}`}>{s.value}</div></div></div>
        ))}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowAddModal(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Event</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Event Title *</label>
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all" placeholder="e.g. Calculus Lecture" autoFocus />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Category</label>
                  <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all" placeholder="e.g. Lecture" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Location</label>
                  <input value={newSubtitle} onChange={(e) => setNewSubtitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all" placeholder="e.g. Hall A" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Day</label>
                  <select value={newDay} onChange={(e) => setNewDay(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 cursor-pointer">
                    {days.map((d, i) => (<option key={i} value={i}>{d.day}</option>))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Start</label>
                  <select value={newStartHour} onChange={(e) => setNewStartHour(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 cursor-pointer">
                    {allHours.map((h, i) => (<option key={i} value={i}>{h}</option>))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Duration</label>
                  <select value={newDuration} onChange={(e) => setNewDuration(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 cursor-pointer">
                    {[0.5, 1, 1.5, 2, 2.5, 3, 4].map((d) => (<option key={d} value={d}>{d}h</option>))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Color</label>
                <div className="flex gap-2">
                  {colorPresets.map((c, i) => (
                    <button key={i} onClick={() => setNewColorIdx(i)} className={`w-8 h-8 rounded-lg cursor-pointer transition-all ${newColorIdx === i ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-105"}`} style={{ background: c.bg, border: `2px solid ${c.border}` }} title={c.name}></button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowAddModal(false)} className="btn-outline cursor-pointer">Cancel</button>
                <button onClick={addEvent} className="btn-primary cursor-pointer" disabled={!newTitle.trim()}>Add Event</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
