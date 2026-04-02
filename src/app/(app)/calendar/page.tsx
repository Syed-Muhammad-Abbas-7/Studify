"use client";
import { useState, useMemo } from "react";

interface CalEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: "exam" | "deadline" | "seminar" | "study" | "meeting";
  time?: string;
  location?: string;
}

const typeColors: Record<string, { bg: string; text: string }> = {
  exam: { bg: "bg-red-100", text: "text-red-700" },
  deadline: { bg: "bg-orange-100", text: "text-orange-700" },
  seminar: { bg: "bg-blue-100", text: "text-blue-700" },
  study: { bg: "bg-teal-100", text: "text-teal-700" },
  meeting: { bg: "bg-purple-100", text: "text-purple-700" },
};

const initialEvents: CalEvent[] = [
  { id: "ce1", title: "Bio-Medical Ethics Exam", date: "2023-10-03", type: "exam", time: "10:00 AM", location: "Room 204" },
  { id: "ce2", title: "Seminar 04", date: "2023-10-07", type: "seminar", time: "2:00 PM", location: "Lecture Hall C" },
  { id: "ce3", title: "Thesis Draft Due", date: "2023-10-11", type: "deadline" },
  { id: "ce4", title: "Advanced Algorithms Final", date: "2023-10-12", type: "exam", time: "2:00 PM", location: "Hall B" },
  { id: "ce5", title: "Lab Report Due", date: "2023-10-15", type: "deadline" },
  { id: "ce6", title: "Group Study Session", date: "2023-10-05", type: "study", time: "4:00 PM" },
  { id: "ce7", title: "Faculty Meeting", date: "2023-10-18", type: "meeting", time: "11:00 AM" },
  { id: "ce8", title: "Physics Problem Set", date: "2023-10-22", type: "deadline" },
  { id: "ce9", title: "Midterm Review", date: "2023-10-25", type: "study", time: "3:00 PM" },
  { id: "ce10", title: "CS Project Demo", date: "2023-10-28", type: "meeting", time: "10:00 AM" },
];

type CalView = "month" | "week" | "day";

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalEvent[]>(initialEvents);
  const [calView, setCalView] = useState<CalView>("month");
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(9); // October (0-indexed)
  const [selectedDate, setSelectedDate] = useState("2023-10-12");
  const [weekStart, setWeekStart] = useState(new Date(2023, 9, 1)); // Oct 1
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newType, setNewType] = useState<CalEvent["type"]>("study");
  const [newTime, setNewTime] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [showAiSuggestion, setShowAiSuggestion] = useState(true);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); };

  const weekDays = useMemo(() => {
    const start = new Date(weekStart);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const prevWeek = () => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d); };
  const nextWeek = () => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d); };

  const fmtDate = (d: Date) => `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  const eventsForDate = (dateStr: string) => events.filter((e) => e.date === dateStr);

  const selectedDateEvents = eventsForDate(selectedDate);

  const addEvent = () => {
    if (!newTitle.trim() || !newDate) return;
    setEvents((p) => [...p, { id: `ce${Date.now()}`, title: newTitle, date: newDate, type: newType, time: newTime || undefined, location: newLocation || undefined }]);
    setShowAddModal(false);
    setNewTitle(""); setNewDate(""); setNewTime(""); setNewLocation("");
  };

  const deleteEvent = (id: string) => { setEvents((p) => p.filter((e) => e.id !== id)); };

  return (
    <div className="p-6 animate-fade-in flex gap-6" style={{ height: "calc(100vh - 60px)" }}>
      {/* Main Calendar */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button onClick={calView === "month" ? prevMonth : prevWeek} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">{MONTH_NAMES[month]} {year}</h1>
            <button onClick={calView === "month" ? nextMonth : nextWeek} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-xl p-1 text-sm">
              {(["month", "week", "day"] as CalView[]).map((v) => (
                <button key={v} onClick={() => setCalView(v)} className={`px-4 py-1.5 rounded-lg cursor-pointer transition-all ${calView === v ? "bg-white font-semibold text-gray-800 shadow-sm" : "text-gray-500 hover:bg-white/60"}`}>{v.charAt(0).toUpperCase() + v.slice(1)}</button>
              ))}
            </div>
            <button onClick={() => setShowAddModal(true)} className="btn-primary cursor-pointer">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" /><line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
              Add Event
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        {calView === "month" && (
          <div className="card flex-1 overflow-hidden flex flex-col">
            <div className="grid grid-cols-7 border-b border-gray-100">
              {DAY_NAMES.map((d) => (<div key={d} className="p-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">{d}</div>))}
            </div>
            <div className="grid grid-cols-7 flex-1">
              {Array.from({ length: firstDay }).map((_, i) => (<div key={`empty-${i}`} className="p-1.5 border-b border-r border-gray-50 bg-gray-50/30"></div>))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                const dayEvts = eventsForDate(dateStr);
                const isSelected = selectedDate === dateStr;
                const isToday = day === 12; // mock
                return (
                  <div key={day} onClick={() => setSelectedDate(dateStr)} className={`calendar-day p-1.5 border-b border-r border-gray-50 cursor-pointer transition-colors ${isSelected ? "bg-teal-50 ring-1 ring-teal-200" : ""}`}>
                    <div className={`text-xs font-medium mb-1 ${isToday ? "w-6 h-6 rounded-full flex items-center justify-center bg-teal-500 text-white mx-auto" : isSelected ? "text-teal-600 font-bold" : "text-gray-600"}`}>{day}</div>
                    {dayEvts.slice(0, 2).map((ev) => {
                      const c = typeColors[ev.type];
                      return (<div key={ev.id} className={`event-chip ${c.bg} ${c.text} truncate`}>{ev.title}</div>);
                    })}
                    {dayEvts.length > 2 && (<div className="text-[10px] text-gray-400 text-center">+{dayEvts.length - 2} more</div>)}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {calView === "week" && (
          <div className="card flex-1 overflow-auto">
            <div className="grid grid-cols-8 border-b border-gray-100">
              <div className="p-3 border-r border-gray-100 text-xs text-gray-400 text-center">TIME</div>
              {weekDays.map((d, i) => {
                const dateStr = fmtDate(d);
                return (
                  <div key={i} onClick={() => { setSelectedDate(dateStr); setCalView("day"); }} className="p-2 text-center border-r border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="text-xs text-gray-400">{DAY_NAMES[d.getDay()]}</div>
                    <div className="text-sm font-semibold text-gray-700">{d.getDate()}</div>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-8" style={{ minHeight: 768 }}>
              <div className="border-r border-gray-100">
                {Array.from({ length: 16 }, (_, i) => i + 7).map((h) => (<div key={h} className="text-xs text-gray-400 pr-2 text-right" style={{ height: 48, lineHeight: "48px" }}>{`${h.toString().padStart(2, "0")}:00`}</div>))}
              </div>
              {weekDays.map((d, ci) => {
                const dateStr = fmtDate(d);
                const dayEvts = eventsForDate(dateStr);
                return (
                  <div key={ci} className="relative border-r border-gray-50">
                    {Array.from({ length: 16 }).map((_, hi) => (<div key={hi} className="border-b border-gray-50" style={{ height: 48 }}></div>))}
                    {dayEvts.map((ev, ei) => {
                      const c = typeColors[ev.type];
                      return (
                        <div key={ev.id} className={`absolute left-1 right-1 ${c.bg} rounded-lg p-1.5 text-xs z-10`} style={{ top: (ei * 2 + 1) * 48 + 2, height: 44 }}>
                          <div className={`font-semibold ${c.text} truncate`}>{ev.title}</div>
                          {ev.time && <div className="text-gray-500 text-[10px]">{ev.time}</div>}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {calView === "day" && (
          <div className="card flex-1 overflow-auto">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <button onClick={() => { const d = new Date(selectedDate); d.setDate(d.getDate() - 1); setSelectedDate(fmtDate(d)); }} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center cursor-pointer"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" /></svg></button>
                <h2 className="font-bold text-gray-900">{new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</h2>
                <button onClick={() => { const d = new Date(selectedDate); d.setDate(d.getDate() + 1); setSelectedDate(fmtDate(d)); }} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center cursor-pointer"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" /></svg></button>
              </div>
            </div>
            <div className="grid grid-cols-[60px_1fr]" style={{ minHeight: 768 }}>
              <div className="border-r border-gray-100">
                {Array.from({ length: 16 }, (_, i) => i + 7).map((h) => (<div key={h} className="text-xs text-gray-400 pr-2 text-right" style={{ height: 48, lineHeight: "48px" }}>{`${h.toString().padStart(2, "0")}:00`}</div>))}
              </div>
              <div className="relative">
                {Array.from({ length: 16 }).map((_, hi) => (<div key={hi} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors" style={{ height: 48 }}></div>))}
                {selectedDateEvents.map((ev, i) => {
                  const c = typeColors[ev.type];
                  return (
                    <div key={ev.id} className={`absolute left-2 right-2 ${c.bg} rounded-xl p-3 z-10 cursor-pointer hover:shadow-md transition-shadow group`} style={{ top: (i * 2 + 1) * 48 + 4, minHeight: 60 }}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className={`font-bold text-sm ${c.text}`}>{ev.title}</div>
                          {ev.time && <div className="text-xs text-gray-500 mt-0.5">{ev.time}{ev.location ? ` · ${ev.location}` : ""}</div>}
                          <span className={`tag ${c.bg} ${c.text} mt-1 inline-block`}>{ev.type}</span>
                        </div>
                        <button onClick={() => deleteEvent(ev.id)} className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg hover:bg-white/60 flex items-center justify-center cursor-pointer transition-all">
                          <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#666" strokeWidth="2.5" strokeLinecap="round" /></svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
                {selectedDateEvents.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center"><span className="text-3xl block mb-2">📅</span><div className="text-sm text-gray-400">No events for this day</div><button onClick={() => { setNewDate(selectedDate); setShowAddModal(true); }} className="text-sm text-teal-600 font-semibold mt-2 cursor-pointer hover:text-teal-700">+ Add Event</button></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-64 flex-shrink-0 flex flex-col gap-4 overflow-y-auto">
        {/* Selected Date Events */}
        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-3">
            {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} Events
          </h3>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-2">
              {selectedDateEvents.map((ev) => {
                const c = typeColors[ev.type];
                return (
                  <div key={ev.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${c.bg.replace("100", "500")}`} style={{ background: c.text.includes("red") ? "#ef4444" : c.text.includes("orange") ? "#f97316" : c.text.includes("blue") ? "#3b82f6" : c.text.includes("teal") ? "#0D9488" : "#9333ea" }}></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-800">{ev.title}</div>
                      {ev.time && <div className="text-xs text-gray-400">{ev.time}{ev.location ? ` · ${ev.location}` : ""}</div>}
                    </div>
                    <button onClick={() => deleteEvent(ev.id)} className="opacity-0 group-hover:opacity-100 cursor-pointer">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#999" strokeWidth="2.5" strokeLinecap="round" /></svg>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-gray-400 text-center py-4">No events</div>
          )}
          <button onClick={() => { setNewDate(selectedDate); setShowAddModal(true); }} className="w-full mt-3 py-2 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-500 hover:border-teal-300 hover:text-teal-600 transition-all cursor-pointer">+ Add Event</button>
        </div>

        {/* AI Suggestion */}
        {showAiSuggestion && (
          <div className="card p-5 bg-gradient-to-br from-teal-50 to-white border-teal-100 animate-fade-in">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#0D9488" }}>
                  <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                </div>
                <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">AI Suggestion</span>
              </div>
              <button onClick={() => setShowAiSuggestion(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Focused Study Block Needed</h4>
            <p className="text-xs text-gray-500 mb-3">Based on your upcoming exams and current progress, I recommend scheduling a 3-hour focused block for Algorithms review this Thursday afternoon.</p>
            <div className="flex gap-2">
              <button onClick={() => {
                setEvents((p) => [...p, { id: `ce${Date.now()}`, title: "Algorithms Focused Study", date: "2023-10-05", type: "study", time: "2:00 PM", location: "Library" }]);
                setShowAiSuggestion(false);
              }} className="btn-primary text-xs px-3 py-1.5 cursor-pointer">Accept</button>
              <button onClick={() => setShowAiSuggestion(false)} className="btn-outline text-xs px-3 py-1.5 cursor-pointer">Dismiss</button>
            </div>
          </div>
        )}

        {/* Upcoming */}
        <div className="card p-5">
          <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">Upcoming</h3>
          <div className="space-y-2">
            {events.filter(e => e.type === "exam").slice(0, 3).map((ev) => (
              <div key={ev.id} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="flex-1 min-w-0"><div className="text-sm text-gray-700 truncate">{ev.title}</div></div>
                <span className="text-xs text-gray-400">{ev.date.split("-")[2]}/{ev.date.split("-")[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowAddModal(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Add Calendar Event</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Title *</label>
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all" placeholder="Event title" autoFocus />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Date *</label>
                  <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Type</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value as CalEvent["type"])} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 cursor-pointer">
                    {["study", "exam", "deadline", "seminar", "meeting"].map((t) => (<option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Time</label>
                  <input value={newTime} onChange={(e) => setNewTime(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all" placeholder="e.g. 2:00 PM" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Location</label>
                  <input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all" placeholder="e.g. Room 204" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowAddModal(false)} className="btn-outline cursor-pointer">Cancel</button>
                <button onClick={addEvent} className="btn-primary cursor-pointer" disabled={!newTitle.trim() || !newDate}>Create Event</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
