"use client";
import { useState } from "react";

interface Task {
  id: string;
  subject: string;
  task: string;
  duration: string;
  completed: boolean;
  priority: "normal" | "high";
}

const initialTasks: Task[] = [
  { id: "t1", subject: "Organic Chemistry", task: "Review Notes", duration: "Chapters 4–5 • 43 mins", completed: true, priority: "normal" },
  { id: "t2", subject: "Calculus II", task: "Math Problem Set #12", duration: "Calculus II • 1 hour", completed: true, priority: "normal" },
  { id: "t3", subject: "Computer Science", task: "Data Structures Lab Prep", duration: "CS-301 • 1.5 hours", completed: false, priority: "high" },
  { id: "t4", subject: "Philosophy", task: "Ethics & Society Reading", duration: "Philosophy • 56 mins", completed: false, priority: "normal" },
];

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDuration, setNewTaskDuration] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"normal" | "high">("normal");

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addTask = () => {
    if (!newTaskName.trim()) return;
    const t: Task = {
      id: `t${Date.now()}`,
      subject: "",
      task: newTaskName,
      duration: newTaskDuration || "No duration set",
      completed: false,
      priority: newTaskPriority,
    };
    setTasks((prev) => [...prev, t]);
    setNewTaskName("");
    setNewTaskDuration("");
    setNewTaskPriority("normal");
    setShowAddTask(false);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const completionPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Good morning, Alex.</h1>
          <p className="text-gray-500 text-sm mt-1">You have {tasks.filter((t) => !t.completed).length} tasks to complete today and an exam in 2 days.</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-4 py-2">
          <span className="text-lg">🔥</span>
          <span className="font-bold text-orange-600 text-sm">12 Day Streak</span>
        </div>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Study Plan */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Today&apos;s Study Plan</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-teal-600">{completionPct}%</span>
              <span className="text-xs text-gray-400">Done</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="progress-bar mb-4"><div className="progress-fill" style={{ width: `${completionPct}%` }}></div></div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all group ${task.completed ? "bg-gray-50" : task.priority === "high" ? "border-2 border-teal-100 bg-teal-50/30 hover:border-teal-200" : "bg-gray-50 hover:bg-gray-100/70"}`}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${task.completed ? "" : "border-2 border-gray-300 hover:border-teal-400"}`}
                  style={task.completed ? { background: "#0D9488" } : {}}
                >
                  {task.completed && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${task.completed ? "text-gray-500 line-through" : "text-gray-800"}`}>{task.task}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{task.duration}</span>
                    {task.priority === "high" && !task.completed && (
                      <span className="text-xs font-bold text-red-500">HIGH PRIORITY</span>
                    )}
                  </div>
                </div>
                {/* Delete button (visible on hover) */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg hover:bg-red-50 flex items-center justify-center cursor-pointer transition-all flex-shrink-0"
                >
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
              </div>
            ))}
          </div>

          {/* Add Task */}
          {showAddTask ? (
            <div className="mt-3 p-4 bg-gray-50 rounded-xl space-y-3 animate-fade-in border border-gray-200">
              <input
                type="text"
                placeholder="Task name…"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:border-teal-300 transition-colors"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && addTask()}
              />
              <input
                type="text"
                placeholder="Duration (e.g. 1 hour)…"
                value={newTaskDuration}
                onChange={(e) => setNewTaskDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:border-teal-300 transition-colors"
              />
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500">Priority:</label>
                <button onClick={() => setNewTaskPriority("normal")} className={`text-xs px-3 py-1 rounded-lg cursor-pointer transition-all ${newTaskPriority === "normal" ? "bg-gray-200 text-gray-700 font-semibold" : "bg-gray-100 text-gray-500"}`}>Normal</button>
                <button onClick={() => setNewTaskPriority("high")} className={`text-xs px-3 py-1 rounded-lg cursor-pointer transition-all ${newTaskPriority === "high" ? "bg-red-100 text-red-600 font-semibold" : "bg-gray-100 text-gray-500"}`}>High</button>
              </div>
              <div className="flex gap-2">
                <button onClick={addTask} className="btn-primary text-xs px-4 py-1.5 cursor-pointer">Add Task</button>
                <button onClick={() => setShowAddTask(false)} className="btn-outline text-xs px-4 py-1.5 cursor-pointer">Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowAddTask(true)} className="mt-3 w-full py-2 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-500 hover:border-teal-300 hover:text-teal-600 transition-all cursor-pointer">+ Add New Task</button>
          )}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Next Event */}
          <div className="card p-6">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Next Event</div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Advanced Algorithms Final</h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  Physics Lab · 2:00 PM, Hall B
                </div>
              </div>
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg viewBox="0 0 80 80" className="w-20 h-20"><circle cx="40" cy="40" r="32" fill="none" stroke="#e5e7eb" strokeWidth="7" /><circle cx="40" cy="40" r="32" fill="none" stroke="#0D9488" strokeWidth="7" strokeDasharray="201" strokeDashoffset="36" className="donut-ring" /></svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-base font-bold text-gray-900">82%</span><span className="text-[10px] text-gray-400 uppercase font-semibold">Ready</span></div>
              </div>
            </div>
          </div>
          {/* Streak */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4"><div><h3 className="font-bold text-gray-900">Study Streak</h3><p className="text-xs text-gray-400">Don&apos;t break the chain!</p></div><span className="text-2xl">🔥</span></div>
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 11 }).map((_, i) => (<div key={i} className="streak-box"></div>))}
              <div className="streak-box empty"></div>
            </div>
            <div className="flex items-center justify-between mt-3"><span className="text-sm font-semibold text-gray-700">12 Days Total</span><span className="text-xl">🏆</span></div>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Deadlines */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4"><h2 className="font-bold text-gray-900">Critical Deadlines</h2><button className="text-sm text-teal-600 font-semibold hover:text-teal-700 transition-colors cursor-pointer">View All</button></div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {[
              { urgency: "DUE TOMORROW", urgencyColor: "text-red-500", name: "Macroeconomics Essay", code: "ECN-201" },
              { urgency: "IN 5 DAYS", urgencyColor: "text-orange-500", name: "Linear Algebra Quiz", code: "MAT-105" },
              { urgency: "IN 5 DAYS", urgencyColor: "text-orange-500", name: "OS Project Part 1", code: "CSC-310" },
            ].map((d, i) => (
              <div key={i} className="flex-shrink-0 w-44 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                <div className={`text-xs font-semibold ${d.urgencyColor} mb-1`}>{d.urgency}</div>
                <div className="font-bold text-gray-900 text-sm">{d.name}</div>
                <div className="text-xs text-gray-400 mt-2">{d.code}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Group Sync */}
        <div className="card p-6">
          <h2 className="font-bold text-gray-900 mb-4">Group Sync</h2>
          <div className="space-y-3">
            {[
              { initials: "JS", bg: "bg-blue-100", color: "text-blue-700", name: "Jamie Smith", time: "2m ago", msg: 'Shared: "FinalReview_V2.pdf"' },
              { initials: "KL", bg: "bg-pink-100", color: "text-pink-700", name: "Kayia Lee", time: "1h ago", msg: '"Has anyone checked the grade…"' },
              { initials: "BM", bg: "bg-purple-100", color: "text-purple-700", name: "Ben Miller", time: "5h ago", msg: "Started a study session: Join Room" },
            ].map((g, i) => (
              <div key={i} className="flex items-start gap-3 hover:bg-gray-50 rounded-lg p-1 -mx-1 transition-colors cursor-pointer">
                <div className={`w-8 h-8 rounded-full ${g.bg} flex items-center justify-center text-xs font-bold ${g.color} flex-shrink-0`}>{g.initials}</div>
                <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-gray-800">{g.name} <span className="text-xs text-gray-400 font-normal">{g.time}</span></div><div className="text-xs text-gray-500 truncate">{g.msg}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
