"use client";
import { useState } from "react";

interface Deadline {
  id: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  pColor: string;
  name: string;
  sub: string;
  date: string;
  status: "To-do" | "In Progress" | "Submitted";
  sColor: string;
  progress?: number;
}

const initialDeadlines: Deadline[] = [
  { id: "d1", priority: "HIGH", pColor: "bg-red-50 text-red-600", name: "Final Thesis: Neural Networks", sub: "Advanced AI (CS402)", date: "Due in 14 hours", status: "In Progress", sColor: "bg-yellow-50 text-yellow-700", progress: 85 },
  { id: "d2", priority: "MEDIUM", pColor: "bg-yellow-50 text-yellow-700", name: "Microeconomics Quiz", sub: "Principles of Macro Theory", date: "Oct 24, 2023", status: "To-do", sColor: "bg-blue-50 text-blue-600" },
  { id: "d3", priority: "LOW", pColor: "bg-green-50 text-green-700", name: "Organic Chem Lab Report", sub: "Laboratory Analysis Vol. 4", date: "Oct 28, 2023", status: "Submitted", sColor: "bg-gray-100 text-gray-600" },
  { id: "d4", priority: "HIGH", pColor: "bg-red-50 text-red-600", name: "Modern History Essay", sub: "Post-War Societal Shifts", date: "Oct 25, 2023", status: "In Progress", sColor: "bg-yellow-50 text-yellow-700" },
  { id: "d5", priority: "MEDIUM", pColor: "bg-yellow-50 text-yellow-700", name: "UI/UX Design Mockup", sub: "Mobile App Prototype", date: "Nov 02, 2023", status: "To-do", sColor: "bg-blue-50 text-blue-600" },
];

export default function DeadlinesPage() {
  const [deadlines, setDeadlines] = useState<Deadline[]>(initialDeadlines);
  const [viewMode, setViewMode] = useState<"board" | "list">("board");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSub, setNewSub] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newPriority, setNewPriority] = useState<"HIGH" | "MEDIUM" | "LOW">("MEDIUM");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const addDeadline = () => {
    if (!newName.trim()) return;
    const pColorMap = { HIGH: "bg-red-50 text-red-600", MEDIUM: "bg-yellow-50 text-yellow-700", LOW: "bg-green-50 text-green-700" };
    const d: Deadline = {
      id: `d${Date.now()}`, priority: newPriority, pColor: pColorMap[newPriority],
      name: newName, sub: newSub, date: newDate || "No date set",
      status: "To-do", sColor: "bg-blue-50 text-blue-600",
    };
    setDeadlines((p) => [...p, d]);
    setShowAddModal(false);
    setNewName(""); setNewSub(""); setNewDate("");
  };

  const updateStatus = (id: string, status: Deadline["status"]) => {
    const sColors = { "To-do": "bg-blue-50 text-blue-600", "In Progress": "bg-yellow-50 text-yellow-700", "Submitted": "bg-gray-100 text-gray-600" };
    setDeadlines((p) => p.map((d) => d.id === id ? { ...d, status, sColor: sColors[status] } : d));
  };

  const deleteDeadline = (id: string) => { setDeadlines((p) => p.filter((d) => d.id !== id)); };

  const filteredDeadlines = filterPriority === "all" ? deadlines : deadlines.filter((d) => d.priority === filterPriority);
  const featured = deadlines.find((d) => d.progress);

  return (
    <div className="p-6 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upcoming Deadlines</h1>
          <p className="text-sm text-gray-400 mt-1">You have {deadlines.filter((d) => d.status !== "Submitted").length} priorities requiring attention.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary cursor-pointer">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" /><line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
          Add Deadline
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex bg-gray-100 rounded-xl p-1 text-sm">
          <button onClick={() => setViewMode("board")} className={`px-4 py-1.5 rounded-lg cursor-pointer transition-all ${viewMode === "board" ? "bg-white font-semibold text-gray-800 shadow-sm" : "text-gray-500"}`}>Board</button>
          <button onClick={() => setViewMode("list")} className={`px-4 py-1.5 rounded-lg cursor-pointer transition-all ${viewMode === "list" ? "bg-white font-semibold text-gray-800 shadow-sm" : "text-gray-500"}`}>List</button>
        </div>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="btn-outline text-sm cursor-pointer">
          <option value="all">All Priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 flex flex-col gap-4">
          {/* Featured */}
          {featured && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="tag bg-red-50 text-red-600 border border-red-100">HIGH PRIORITY</span>
                <span className="flex items-center gap-1 text-red-500 text-sm font-semibold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  {featured.date}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{featured.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{featured.sub}</p>
              <div>
                <div className="flex justify-between mb-1"><span className="text-sm text-gray-700">Mastery Progress</span><span className="text-sm font-bold text-teal-600">{featured.progress}%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${featured.progress}%` }}></div></div>
              </div>
            </div>
          )}

          {/* Grid/List */}
          {viewMode === "board" ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredDeadlines.filter((d) => d.id !== featured?.id).map((d) => (
                <div key={d.id} className="card p-5 group hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`tag ${d.pColor}`}>{d.priority}</span>
                    <button onClick={() => deleteDeadline(d.id)} className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg hover:bg-red-50 flex items-center justify-center cursor-pointer transition-all">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" /></svg>
                    </button>
                  </div>
                  <h3 className="font-bold text-gray-900">{d.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{d.sub}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-400">{d.date}</span>
                    <select value={d.status} onChange={(e) => updateStatus(d.id, e.target.value as Deadline["status"])} className={`tag ${d.sColor} cursor-pointer text-xs border-0`}>
                      <option value="To-do">To-do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Submitted">Submitted</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead><tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100"><th className="text-left p-4">Name</th><th className="text-center p-4">Priority</th><th className="text-center p-4">Due</th><th className="text-center p-4">Status</th><th className="text-center p-4">Action</th></tr></thead>
                <tbody>
                  {filteredDeadlines.map((d) => (
                    <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-4"><div className="font-semibold text-sm text-gray-800">{d.name}</div><div className="text-xs text-gray-400">{d.sub}</div></td>
                      <td className="p-4 text-center"><span className={`tag ${d.pColor}`}>{d.priority}</span></td>
                      <td className="p-4 text-center text-sm text-gray-500">{d.date}</td>
                      <td className="p-4 text-center">
                        <select value={d.status} onChange={(e) => updateStatus(d.id, e.target.value as Deadline["status"])} className={`tag ${d.sColor} cursor-pointer text-xs border-0`}>
                          <option value="To-do">To-do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Submitted">Submitted</option>
                        </select>
                      </td>
                      <td className="p-4 text-center"><button onClick={() => deleteDeadline(d.id)} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center mx-auto cursor-pointer"><svg width="12" height="12" fill="none" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke="#9ca3af" strokeWidth="2" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" /></svg></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="w-60 flex flex-col gap-4 flex-shrink-0">
          <div className="card p-5">
            <h3 className="font-bold text-gray-900 mb-3">Mastery Snapshot</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" /></svg></div><div className="flex-1"><div className="text-sm font-semibold text-gray-800">{deadlines.filter((d) => d.status === "Submitted").length} Completed</div><div className="text-xs text-gray-400">This Month</div></div></div>
              <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#ef4444" strokeWidth="1.8" /></svg></div><div className="flex-1"><div className="text-sm font-semibold text-gray-800">{deadlines.filter((d) => d.priority === "HIGH" && d.status !== "Submitted").length} Pending</div><div className="text-xs text-gray-400">High Priority</div></div><span className="text-xs font-bold text-red-500">Today</span></div>
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-gray-900 mb-3">Semester Average</h3>
            <div className="relative w-28 h-28 mx-auto mb-3"><svg viewBox="0 0 112 112" className="w-28 h-28"><circle cx="56" cy="56" r="44" fill="none" stroke="#e5e7eb" strokeWidth="9" /><circle cx="56" cy="56" r="44" fill="none" stroke="#0D9488" strokeWidth="9" strokeDasharray="276" strokeDashoffset="48" className="donut-ring" /></svg><div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl font-bold text-gray-900">3.8</span></div></div>
            <div className="text-center text-xs font-semibold text-teal-600 uppercase tracking-wide">GPA TRENDING UPWARDS ↑</div>
          </div>
          <div className="card p-5">
            <p className="text-sm text-gray-600 italic leading-relaxed">&ldquo;Focus on being productive instead of busy. The curator doesn&apos;t just collect; they refine.&rdquo;</p>
            <div className="flex items-center gap-2 mt-3"><div className="w-8 h-0.5" style={{ background: '#0D9488' }}></div><span className="text-xs text-teal-600 font-semibold uppercase tracking-widest">Daily Wisdom</span></div>
          </div>
        </div>
      </div>

      {/* Add Deadline Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowAddModal(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Deadline</h2>
            <div className="space-y-4">
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Name *</label><input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all" placeholder="Assignment name" autoFocus /></div>
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Course / Description</label><input value={newSub} onChange={(e) => setNewSub(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all" placeholder="e.g. CS-402" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Due Date</label><input value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all" placeholder="e.g. Oct 30, 2023" /></div>
                <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Priority</label>
                  <div className="flex gap-2">
                    {(["HIGH", "MEDIUM", "LOW"] as const).map((p) => (<button key={p} onClick={() => setNewPriority(p)} className={`flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${newPriority === p ? (p === "HIGH" ? "bg-red-100 text-red-600" : p === "MEDIUM" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700") : "bg-gray-100 text-gray-500"}`}>{p}</button>))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2"><button onClick={() => setShowAddModal(false)} className="btn-outline cursor-pointer">Cancel</button><button onClick={addDeadline} className="btn-primary cursor-pointer" disabled={!newName.trim()}>Add Deadline</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
