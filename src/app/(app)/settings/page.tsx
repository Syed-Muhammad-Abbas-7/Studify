"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Alex Chen",
    email: "alex.chen@university.edu",
    department: "Computer Science",
    semester: "Spring 2024",
    university: "Standard University",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    deadlineReminders: true,
    groupMessages: false,
    weeklyReport: true,
  });
  const [appearance, setAppearance] = useState({
    theme: "light",
    sidebarCollapse: true,
    compactMode: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your account preferences and configurations.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 text-sm text-teal-700 font-medium animate-fade-in">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" /><polyline points="8 12 11 15 16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          Settings saved successfully!
        </div>
      )}

      {/* Profile Section */}
      <div className="card p-6">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="5" stroke="#0D9488" strokeWidth="1.8" /><path d="M3 21c0-4.5 4-8 9-8s9 3.5 9 8" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </div>
          Profile Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Full Name", key: "name" },
            { label: "Email Address", key: "email" },
            { label: "Department", key: "department" },
            { label: "Current Semester", key: "semester" },
            { label: "University", key: "university" },
          ].map((field) => (
            <div key={field.key} className={field.key === "university" ? "col-span-2" : ""}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">{field.label}</label>
              <input
                type="text"
                value={profile[field.key as keyof typeof profile]}
                onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 bg-gray-50 focus:bg-white focus:border-teal-300 transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-6">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </div>
          Notifications
        </h2>
        <div className="space-y-4">
          {[
            { key: "email", label: "Email Notifications", desc: "Receive email updates about deadlines and reports" },
            { key: "push", label: "Push Notifications", desc: "Browser notifications for real-time updates" },
            { key: "deadlineReminders", label: "Deadline Reminders", desc: "Get reminders 24h and 1h before deadlines" },
            { key: "groupMessages", label: "Group Messages", desc: "Notify on new messages in study groups" },
            { key: "weeklyReport", label: "Weekly Report", desc: "Receive a weekly performance summary" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-semibold text-gray-800">{item.label}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${notifications[item.key as keyof typeof notifications] ? "bg-teal-500" : "bg-gray-300"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${notifications[item.key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0.5"}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="card p-6">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" stroke="#a855f7" strokeWidth="1.8" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </div>
          Appearance
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Theme</label>
            <div className="flex gap-3">
              {["light", "dark", "system"].map((t) => (
                <button
                  key={t}
                  onClick={() => setAppearance({ ...appearance, theme: t })}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${appearance.theme === t ? "bg-teal-50 text-teal-700 border-2 border-teal-200" : "bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100"}`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {[
            { key: "sidebarCollapse", label: "Auto-collapse Sidebar", desc: "Sidebar collapses on mouse leave" },
            { key: "compactMode", label: "Compact Mode", desc: "Reduce spacing for more content" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-semibold text-gray-800">{item.label}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </div>
              <button
                onClick={() => setAppearance({ ...appearance, [item.key]: !appearance[item.key as keyof typeof appearance] })}
                className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${appearance[item.key as keyof typeof appearance] ? "bg-teal-500" : "bg-gray-300"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${appearance[item.key as keyof typeof appearance] ? "translate-x-5" : "translate-x-0.5"}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button className="text-sm text-red-500 font-medium hover:text-red-600 transition-colors cursor-pointer">Delete Account</button>
        <button onClick={handleSave} className="btn-primary px-8 cursor-pointer">Save Changes</button>
      </div>
    </div>
  );
}
