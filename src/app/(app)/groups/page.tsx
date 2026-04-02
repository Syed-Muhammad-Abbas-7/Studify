"use client";
import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  id: string;
  sender: string;
  initials: string;
  bg: string;
  color: string;
  time: string;
  text: string;
  me: boolean;
  file?: { name: string; size: string };
}

interface Group {
  id: string;
  initials: string;
  name: string;
  lastMsg: string;
  bg: string;
  unread: number;
}

const initialGroups: Group[] = [
  { id: "cs", initials: "CS", name: "Computer Science", lastMsg: "Alex: Let's review the API…", bg: "#0D9488", unread: 0 },
  { id: "bl", initials: "BL", name: "Bio Lab", lastMsg: 'Sarah shared "Lab_Report_V2…', bg: "#3b82f6", unread: 0 },
  { id: "ph", initials: "PH", name: "Philosophy 101", lastMsg: "3 new messages", bg: "#a855f7", unread: 3 },
  { id: "ma", initials: "MA", name: "Advanced Math", lastMsg: "Last active 2 days ago", bg: "#f97316", unread: 0 },
];

const initialMessages: Record<string, ChatMessage[]> = {
  cs: [
    { id: "m1", sender: "Alex Rivers", initials: "AR", bg: "bg-blue-200", color: "text-blue-700", time: "2:14 PM", text: "Has anyone managed to finish the recursion assignment? I'm hitting a stack overflow on the third test case.", me: false },
    { id: "m2", sender: "Maya Zhang", initials: "MZ", bg: "bg-pink-200", color: "text-pink-700", time: "2:18 PM", text: "Check my documentation notes on the base case handling. Might help!", me: false, file: { name: "Recursion_Tips_Week4.pdf", size: "1.2 MB · PDF" } },
    { id: "m3", sender: "Me", initials: "Me", bg: "bg-teal-200", color: "text-teal-700", time: "2:25 PM", text: "Thanks Maya! Fixed the issue. It was a redundant loop in my helper function.", me: true },
    { id: "m4", sender: "Alex Rivers", initials: "AR", bg: "bg-blue-200", color: "text-blue-700", time: "2:30 PM", text: "Awesome. Anyone free for a quick Zoom review at 4 PM? 🚀", me: false },
  ],
  bl: [
    { id: "bm1", sender: "Sarah Kim", initials: "SK", bg: "bg-green-200", color: "text-green-700", time: "11:00 AM", text: "Just uploaded the revised lab report. Please review before tomorrow.", me: false, file: { name: "Lab_Report_V2.pdf", size: "3.4 MB · PDF" } },
  ],
  ph: [
    { id: "pm1", sender: "Jordan Park", initials: "JP", bg: "bg-purple-200", color: "text-purple-700", time: "9:00 AM", text: "Has anyone read the Kantian ethics chapter for tomorrow's discussion?", me: false },
    { id: "pm2", sender: "Lena Torres", initials: "LT", bg: "bg-yellow-200", color: "text-yellow-700", time: "9:15 AM", text: "Just finished it. The categorical imperative section is really interesting.", me: false },
    { id: "pm3", sender: "Chris Lee", initials: "CL", bg: "bg-gray-200", color: "text-gray-700", time: "9:30 AM", text: "I'll share my notes after class today.", me: false },
  ],
  ma: [
    { id: "mm1", sender: "Prof. Adams", initials: "PA", bg: "bg-orange-200", color: "text-orange-700", time: "Mon", text: "Reminder: midterm covers chapters 5-8. Study groups are recommended.", me: false },
  ],
};

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [selectedGroup, setSelectedGroup] = useState("cs");
  const [allMessages, setAllMessages] = useState<Record<string, ChatMessage[]>>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const messages = allMessages[selectedGroup] || [];
  const currentGroup = groups.find((g) => g.id === selectedGroup)!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, selectedGroup]);

  const sendMessage = () => {
    if (!inputValue.trim() && !attachedFile) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: ChatMessage = {
      id: `msg${Date.now()}`, sender: "Me", initials: "Me", bg: "bg-teal-200", color: "text-teal-700",
      time: now, text: inputValue, me: true,
      file: attachedFile ? { name: attachedFile.name, size: `${(attachedFile.size / 1024 / 1024).toFixed(1)} MB` } : undefined,
    };
    setAllMessages((prev) => ({ ...prev, [selectedGroup]: [...(prev[selectedGroup] || []), newMsg] }));
    setGroups((prev) => prev.map((g) => g.id === selectedGroup ? { ...g, lastMsg: `You: ${inputValue || attachedFile?.name || ""}` } : g));
    setInputValue("");
    setAttachedFile(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setAttachedFile(e.target.files[0]);
  };

  const selectGroup = (id: string) => {
    setSelectedGroup(id);
    setGroups((prev) => prev.map((g) => g.id === id ? { ...g, unread: 0 } : g));
  };

  return (
    <div className="flex animate-fade-in" style={{ height: "calc(100vh - 60px)" }}>
      {/* Groups List */}
      <div className="w-64 border-r border-gray-100 flex flex-col bg-white flex-shrink-0">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Study Groups</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {groups.map((g) => (
            <div key={g.id} onClick={() => selectGroup(g.id)} className={`p-3 mx-2 my-1 rounded-xl cursor-pointer transition-all ${selectedGroup === g.id ? "bg-teal-50 border-l-4 border-teal-500" : "hover:bg-gray-50"}`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white flex-shrink-0" style={{ background: g.bg }}>{g.initials}</div>
                <div className="flex-1 min-w-0"><div className="font-semibold text-sm text-gray-800">{g.name}</div><div className="text-xs text-gray-500 truncate">{g.lastMsg}</div></div>
                {g.unread > 0 && (<span className="w-5 h-5 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center font-bold">{g.unread}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white" style={{ background: currentGroup.bg }}>{currentGroup.initials}</div>
          <div><div className="font-bold text-gray-900">{currentGroup.name}</div><div className="text-xs text-teal-500">● Active now</div></div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex items-start gap-3 ${m.me ? "justify-end" : ""}`}>
              {!m.me && <div className={`w-8 h-8 rounded-full ${m.bg} flex items-center justify-center text-xs font-bold ${m.color} flex-shrink-0`}>{m.initials}</div>}
              <div className={m.me ? "max-w-md" : "max-w-md"}>
                <div className={`text-xs text-gray-400 mb-1 ${m.me ? "text-right" : ""}`}>{m.me ? `${m.time} · Me` : `${m.sender} · ${m.time}`}</div>
                {m.text && <div className={m.me ? "chat-bubble-me" : "chat-bubble-other"}><div className="text-sm">{m.text}</div></div>}
                {m.file && (
                  <div className="mt-2 bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-100 max-w-xs cursor-pointer hover:shadow-sm transition-shadow">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#0D9488" strokeWidth="1.8" /><polyline points="14 2 14 8 20 8" stroke="#0D9488" strokeWidth="1.8" /></svg>
                    </div>
                    <div><div className="text-sm font-semibold text-gray-800">{m.file.name}</div><div className="text-xs text-gray-400">{m.file.size}</div></div>
                  </div>
                )}
              </div>
              {m.me && <div className={`w-8 h-8 rounded-full ${m.bg} flex items-center justify-center text-xs font-bold ${m.color} flex-shrink-0`}>{m.initials}</div>}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Attached file preview */}
        {attachedFile && (
          <div className="bg-white border-t border-gray-100 px-4 py-2 flex items-center gap-3 animate-fade-in">
            <div className="flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-lg flex-1">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#0D9488" strokeWidth="1.8" /></svg>
              <span className="text-sm text-teal-700 font-medium truncate">{attachedFile.name}</span>
              <span className="text-xs text-gray-400">({(attachedFile.size / 1024).toFixed(0)} KB)</span>
            </div>
            <button onClick={() => setAttachedFile(null)} className="w-6 h-6 rounded-lg hover:bg-red-50 flex items-center justify-center cursor-pointer">
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </button>
          </div>
        )}

        {/* Chat Input */}
        <div className="bg-white border-t border-gray-100 p-3 flex-shrink-0">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-100 focus-within:border-teal-200 transition-colors">
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="w-7 h-7 rounded-lg hover:bg-gray-200 flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors" title="Attach file">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
            <input
              type="text"
              placeholder={`Message ${currentGroup.name}…`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
            />
            <button className="text-lg cursor-pointer">😊</button>
            <button onClick={sendMessage} className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow disabled:opacity-40" style={{ background: '#0D9488' }} disabled={!inputValue.trim() && !attachedFile}>
              <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right Info Panel */}
      <div className="w-56 border-l border-gray-100 bg-white p-5 overflow-y-auto hidden xl:block flex-shrink-0">
        <h3 className="font-bold text-gray-900 mb-4">Group Info</h3>
        <div className="mb-4">
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">Members</div>
          <div className="space-y-3">
            {[
              { initials: "JS", bg: "bg-gray-200", name: "Jordan Smith (You)" },
              { initials: "AR", bg: "bg-blue-200", name: "Alex Rivers" },
              { initials: "MZ", bg: "bg-pink-200", name: "Maya Zhang" },
              { initials: "CM", bg: "bg-gray-100", name: "Chris Miller" },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-2"><div className={`w-8 h-8 rounded-full ${m.bg} flex items-center justify-center text-xs font-bold`}>{m.initials}</div><span className="text-sm text-gray-700">{m.name}</span></div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">Shared Files</div>
          <div className="space-y-2">
            {["Algorithms_CheatSheet.pdf", "Whiteboard_Notes_Oct12.png", "Assignment_Brief.pdf"].map((f, i) => (
              <div key={i} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg p-1 -mx-1 transition-colors">
                <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center"><svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#0D9488" strokeWidth="2" /></svg></div>
                <div className="text-xs text-gray-700 truncate">{f}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
