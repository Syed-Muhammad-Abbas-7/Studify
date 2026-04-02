"use client";
import { useState, useCallback } from "react";

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface Note {
  id: string;
  title: string;
  subject: string;
  course: string;
  tag: string;
  tagColor: string;
  updatedAt: string;
  content: string;
  keyConceptTitle: string;
  keyConcept: string;
  studyTipTitle: string;
  studyTip: string;
  flashcards: Flashcard[];
  status: string;
}

interface Collection {
  name: string;
  icon: string;
  count: number;
  highlight: boolean;
}

const initialCollections: Collection[] = [
  { name: "Calculus III", icon: "📁", count: 3, highlight: true },
  { name: "Ethics & Law", icon: "📁", count: 2, highlight: false },
  { name: "Modern History", icon: "📁", count: 1, highlight: false },
  { name: "Computer Science", icon: "📁", count: 2, highlight: false },
];

const initialNotes: Note[] = [
  {
    id: "n1",
    title: "Vector Fields and Line Integrals",
    subject: "Mathematics",
    course: "MATH-302",
    tag: "#math",
    tagColor: "text-teal-600",
    updatedAt: "2 hours ago",
    content: `A vector field is a function that assigns a vector to each point in space. In physics, these are often used to represent gravitational or electromagnetic fields. When we talk about line integrals over a vector field, we are essentially calculating the work done by that field as a particle moves along a specific curve C.

The fundamental theorem for line integrals states that if F = ∇f is a conservative vector field, then the line integral depends only on the endpoints of the path. This simplifies calculations significantly.

Green's theorem relates a line integral around a simple closed curve C to a double integral over the region D enclosed by C. This is particularly powerful in applied mathematics.`,
    keyConceptTitle: "Key Concept",
    keyConcept: "Conservative fields always have zero curl. This is a quick way to check if a potential function exists.",
    studyTipTitle: "Study Tip",
    studyTip: "Relate Line Integrals to Work-Energy theorem from Physics 101 to visualize the flow better.",
    flashcards: [
      { id: "f1", front: "What is a conservative vector field?", back: "A vector field F where F = ∇f for some scalar function f, meaning the line integral is path-independent." },
      { id: "f2", front: "State Green's Theorem", back: "∮C (P dx + Q dy) = ∬D (∂Q/∂x − ∂P/∂y) dA" },
      { id: "f3", front: "How to check if a field is conservative?", back: "Verify that curl F = 0, i.e., ∂P/∂y = ∂Q/∂x for 2D fields." },
    ],
    status: "Reviewing",
  },
  {
    id: "n2",
    title: "Utilitarianism vs Deontology",
    subject: "Philosophy",
    course: "PHI-201",
    tag: "#philosophy",
    tagColor: "text-purple-600",
    updatedAt: "Yesterday",
    content: `Utilitarianism (Bentham/Mill) judges actions by their consequences — the greatest good for the greatest number. It is a consequentialist theory focusing on outcomes.

Deontology (Kant) judges actions by whether they follow moral rules or duties — regardless of outcome. The categorical imperative states: "Act only according to that maxim by which you can at the same time will that it should become a universal law."

Key Differences:
• Utilitarianism is flexible but can justify morally questionable acts if the outcome is good
• Deontology provides clear rules but can be rigid in complex situations
• Modern ethics often blends both approaches`,
    keyConceptTitle: "Key Concept",
    keyConcept: "The trolley problem perfectly illustrates the tension between utilitarian (pull lever to save 5) and deontological (don't actively cause harm) reasoning.",
    studyTipTitle: "Study Tip",
    studyTip: "Use real-world dilemmas (autonomous vehicles, medical triage) to understand how both theories apply differently.",
    flashcards: [
      { id: "f4", front: "Who founded Utilitarianism?", back: "Jeremy Bentham, later refined by John Stuart Mill." },
      { id: "f5", front: "What is Kant's Categorical Imperative?", back: "Act only according to maxims you could will to become universal laws." },
    ],
    status: "Complete",
  },
  {
    id: "n3",
    title: "Binary Search Trees & AVL Trees",
    subject: "Computer Science",
    course: "CSC-301",
    tag: "#cs",
    tagColor: "text-blue-600",
    updatedAt: "3 days ago",
    content: `A Binary Search Tree (BST) is a tree data structure where for each node, all values in the left subtree are less than the node's value, and all values in the right subtree are greater.

Operations (average case):
• Search: O(log n)
• Insert: O(log n)
• Delete: O(log n)

However, a BST can degenerate to O(n) if elements are inserted in sorted order.

AVL Trees solve this by maintaining a balance factor (height difference between left and right subtrees) of at most 1. They use rotations (left, right, left-right, right-left) to rebalance after insertions and deletions.`,
    keyConceptTitle: "Key Concept",
    keyConcept: "AVL trees guarantee O(log n) for all operations by maintaining strict balance through rotations after every modification.",
    studyTipTitle: "Study Tip",
    studyTip: "Practice drawing rotations by hand — LL, RR, LR, RL cases. This will be on the exam.",
    flashcards: [],
    status: "Draft",
  },
  {
    id: "n4",
    title: "The Cold War: Origins and Key Events",
    subject: "Modern History",
    course: "HIS-204",
    tag: "#history",
    tagColor: "text-orange-600",
    updatedAt: "Last week",
    content: `The Cold War (1947-1991) was a period of geopolitical tension between the United States and the Soviet Union and their respective allies.

Key Events:
• 1947 — Truman Doctrine, Marshall Plan
• 1949 — NATO formed, Soviet Union tests first atomic bomb
• 1950-53 — Korean War
• 1961 — Berlin Wall constructed
• 1962 — Cuban Missile Crisis (closest to nuclear war)
• 1969 — Moon landing / Space Race victory
• 1989 — Fall of Berlin Wall
• 1991 — Dissolution of Soviet Union

The Cold War reshaped global politics, led to numerous proxy wars, and established the bipolar world order that defined the second half of the 20th century.`,
    keyConceptTitle: "Key Concept",
    keyConcept: "Mutually Assured Destruction (MAD) was the paradoxical doctrine that prevented nuclear war — both sides knew launching an attack would guarantee their own destruction.",
    studyTipTitle: "Exam Focus",
    studyTip: "Focus on causation and consequence chains. The essay question will likely ask about how one event led to another.",
    flashcards: [
      { id: "f6", front: "When did the Cold War end?", back: "1991, with the dissolution of the Soviet Union." },
    ],
    status: "Complete",
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState("n1");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [showNewFlashcardForm, setShowNewFlashcardForm] = useState(false);
  const [newCardFront, setNewCardFront] = useState("");
  const [newCardBack, setNewCardBack] = useState("");
  const [savedMsg, setSavedMsg] = useState(false);
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteSubject, setNewNoteSubject] = useState("Mathematics");
  const [newNoteCourse, setNewNoteCourse] = useState("");

  const selectedNote = notes.find((n) => n.id === selectedNoteId)!;

  // Map collection names to subjects for filtering
  const collectionSubjectMap: Record<string, string> = {
    "Calculus III": "Mathematics",
    "Ethics & Law": "Philosophy",
    "Modern History": "Modern History",
    "Computer Science": "Computer Science",
  };

  // Dynamic collection counts
  const collections: Collection[] = initialCollections.map((c) => ({
    ...c,
    count: notes.filter((n) => n.subject === collectionSubjectMap[c.name]).length,
    highlight: selectedCollection === c.name,
  }));

  // Filter notes by search AND collection
  const filteredNotes = notes.filter((n) => {
    const matchesSearch = !searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCollection = !selectedCollection || n.subject === collectionSubjectMap[selectedCollection];
    return matchesSearch && matchesCollection;
  });

  const startEditing = useCallback(() => {
    setEditContent(selectedNote.content);
    setEditTitle(selectedNote.title);
    setIsEditing(true);
  }, [selectedNote]);

  const saveNote = useCallback(() => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === selectedNoteId ? { ...n, title: editTitle, content: editContent, updatedAt: "Just now" } : n
      )
    );
    setIsEditing(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  }, [selectedNoteId, editTitle, editContent]);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  const createNewNote = useCallback(() => {
    if (!newNoteTitle.trim()) return;
    const tagMap: Record<string, { tag: string; color: string }> = {
      Mathematics: { tag: "#math", color: "text-teal-600" },
      Philosophy: { tag: "#philosophy", color: "text-purple-600" },
      "Computer Science": { tag: "#cs", color: "text-blue-600" },
      "Modern History": { tag: "#history", color: "text-orange-600" },
      "Ethics & Law": { tag: "#ethics", color: "text-red-600" },
    };
    const t = tagMap[newNoteSubject] || { tag: "#note", color: "text-gray-600" };
    const newNote: Note = {
      id: `n${Date.now()}`,
      title: newNoteTitle,
      subject: newNoteSubject,
      course: newNoteCourse || "GENERAL",
      tag: t.tag,
      tagColor: t.color,
      updatedAt: "Just now",
      content: "",
      keyConceptTitle: "Key Concept",
      keyConcept: "",
      studyTipTitle: "Study Tip",
      studyTip: "",
      flashcards: [],
      status: "Draft",
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
    setShowNewNoteModal(false);
    setNewNoteTitle("");
    setNewNoteCourse("");
    setIsEditing(true);
    setEditTitle(newNote.title);
    setEditContent("");
  }, [newNoteTitle, newNoteSubject, newNoteCourse]);

  const addFlashcard = useCallback(() => {
    if (!newCardFront.trim() || !newCardBack.trim()) return;
    const card: Flashcard = { id: `f${Date.now()}`, front: newCardFront, back: newCardBack };
    setNotes((prev) =>
      prev.map((n) => (n.id === selectedNoteId ? { ...n, flashcards: [...n.flashcards, card] } : n))
    );
    setNewCardFront("");
    setNewCardBack("");
    setShowNewFlashcardForm(false);
  }, [selectedNoteId, newCardFront, newCardBack]);

  const deleteFlashcard = useCallback((cardId: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === selectedNoteId ? { ...n, flashcards: n.flashcards.filter((f) => f.id !== cardId) } : n
      )
    );
  }, [selectedNoteId]);

  const deleteNote = useCallback(() => {
    setNotes((prev) => prev.filter((n) => n.id !== selectedNoteId));
    setSelectedNoteId(notes[0]?.id === selectedNoteId ? notes[1]?.id || "" : notes[0]?.id || "");
  }, [selectedNoteId, notes]);

  return (
    <div className="flex animate-fade-in" style={{ height: "calc(100vh - 60px)" }}>
      {/* Notes sidebar */}
      <div className="w-64 border-r border-gray-100 bg-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100 focus-within:border-teal-200 transition-colors">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" className="text-gray-400 flex-shrink-0"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            <input
              type="text"
              placeholder="Search vault…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-gray-500 placeholder-gray-400 w-full outline-none"
            />
          </div>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Collections</div>
          <div className="space-y-1 mb-3">
            {collections.map((c, i) => (
              <div key={i} onClick={() => setSelectedCollection(selectedCollection === c.name ? null : c.name)} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${c.highlight ? "bg-teal-50 border-l-4 border-teal-500" : "hover:bg-gray-50"}`}>
                <div className="flex items-center gap-2">
                  <span className={c.highlight ? "text-teal-500" : ""}>📁</span>
                  <span className={`text-sm ${c.highlight ? "text-teal-700 font-semibold" : "text-gray-700"}`}>{c.name}</span>
                </div>
                <span className={`tag ${c.highlight ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-500"}`}>{c.count}</span>
              </div>
            ))}
          </div>
          {selectedCollection && (
            <button onClick={() => setSelectedCollection(null)} className="text-xs text-teal-600 font-semibold mb-3 cursor-pointer hover:text-teal-700 transition-colors">← Show All Notes</button>
          )}
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            {selectedCollection ? `${selectedCollection} (${filteredNotes.length})` : searchQuery ? `Search Results (${filteredNotes.length})` : `All Notes (${filteredNotes.length})`}
          </div>
          <div className="space-y-2">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => { setSelectedNoteId(note.id); setIsEditing(false); setShowFlashcards(false); }}
                className={`p-3 rounded-xl cursor-pointer transition-all ${selectedNoteId === note.id ? "border border-teal-100 bg-teal-50" : "border border-gray-100 hover:bg-gray-50"}`}
              >
                <div className="text-sm font-semibold text-gray-800 leading-tight">{note.title}</div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{note.content.slice(0, 80)}…</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">{note.updatedAt}</span>
                  <span className={`text-xs font-semibold ${note.tagColor}`}>{note.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 border-t border-gray-100">
          <button onClick={() => setShowNewNoteModal(true)} className="btn-primary w-full cursor-pointer justify-center">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" /><line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
            New Note
          </button>
        </div>
      </div>

      {/* Note Content */}
      {selectedNote ? (
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-8 py-3 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{selectedNote.subject}</span><span>›</span><span className="text-gray-600 font-medium">{selectedNote.title}</span>
            </div>
            <div className="flex items-center gap-2">
              {savedMsg && <span className="text-xs text-teal-600 font-semibold animate-fade-in">✓ Saved!</span>}
              {isEditing ? (
                <>
                  <button onClick={saveNote} className="btn-primary text-xs px-4 py-1.5 cursor-pointer">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
                    Save
                  </button>
                  <button onClick={cancelEditing} className="btn-outline text-xs px-4 py-1.5 cursor-pointer">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={startEditing} className="btn-outline text-xs px-3 py-1.5 cursor-pointer">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    Edit
                  </button>
                  <button onClick={() => setShowFlashcards(!showFlashcards)} className={`btn-outline text-xs px-3 py-1.5 cursor-pointer ${showFlashcards ? "bg-teal-50 border-teal-200 text-teal-700" : ""}`}>
                    🃏 Flashcards ({selectedNote.flashcards.length})
                  </button>
                  <button onClick={deleteNote} className="btn-outline text-xs px-3 py-1.5 cursor-pointer text-red-400 hover:text-red-600 hover:border-red-200">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto p-8">
            {isEditing ? (
              /* Edit Mode */
              <div className="space-y-4">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="text-3xl font-bold text-gray-900 w-full bg-transparent border-b-2 border-gray-200 focus:border-teal-400 pb-2 outline-none transition-colors"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                  placeholder="Note title..."
                />
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-400">📅 {new Date().toLocaleDateString()}</span>
                  <span className={`tag bg-teal-100 ${selectedNote.tagColor}`}>{selectedNote.subject}</span>
                </div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full min-h-[400px] text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-6 border border-gray-200 focus:border-teal-300 outline-none resize-y text-sm transition-colors"
                  placeholder="Start writing your notes here..."
                />
              </div>
            ) : showFlashcards ? (
              /* Flashcard Mode */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">🃏 Flashcards — {selectedNote.title}</h2>
                  <button onClick={() => setShowNewFlashcardForm(true)} className="btn-primary text-xs cursor-pointer">+ Add Card</button>
                </div>

                {showNewFlashcardForm && (
                  <div className="card p-5 border-2 border-teal-100 animate-fade-in">
                    <h3 className="font-semibold text-sm text-gray-800 mb-3">Create New Flashcard</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 mb-1 block">Front (Question)</label>
                        <input value={newCardFront} onChange={(e) => setNewCardFront(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all" placeholder="What is...?" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 mb-1 block">Back (Answer)</label>
                        <textarea value={newCardBack} onChange={(e) => setNewCardBack(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all resize-none h-20" placeholder="The answer is..." />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={addFlashcard} className="btn-primary text-xs cursor-pointer">Add Card</button>
                        <button onClick={() => setShowNewFlashcardForm(false)} className="btn-outline text-xs cursor-pointer">Cancel</button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedNote.flashcards.length > 0 ? (
                  <>
                    {/* Interactive card viewer */}
                    <div
                      className="card p-8 text-center cursor-pointer min-h-[200px] flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
                      onClick={() => setCardFlipped(!cardFlipped)}
                    >
                      <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">{cardFlipped ? "Answer" : "Question"} · Card {currentCardIdx + 1}/{selectedNote.flashcards.length}</div>
                      <div className={`text-lg font-semibold ${cardFlipped ? "text-teal-700" : "text-gray-800"} max-w-md leading-relaxed`}>
                        {cardFlipped ? selectedNote.flashcards[currentCardIdx]?.back : selectedNote.flashcards[currentCardIdx]?.front}
                      </div>
                      <div className="text-xs text-gray-400 mt-4">{cardFlipped ? "Click to see question" : "Click to reveal answer"}</div>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => { setCurrentCardIdx(Math.max(0, currentCardIdx - 1)); setCardFlipped(false); }}
                        disabled={currentCardIdx === 0}
                        className="btn-outline text-xs px-4 cursor-pointer disabled:opacity-40"
                      >← Previous</button>
                      <button
                        onClick={() => { setCurrentCardIdx(Math.min(selectedNote.flashcards.length - 1, currentCardIdx + 1)); setCardFlipped(false); }}
                        disabled={currentCardIdx === selectedNote.flashcards.length - 1}
                        className="btn-outline text-xs px-4 cursor-pointer disabled:opacity-40"
                      >Next →</button>
                    </div>

                    {/* Card list */}
                    <div className="space-y-2 mt-4">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">All Cards</div>
                      {selectedNote.flashcards.map((card, i) => (
                        <div key={card.id} className="card p-4 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-800">Q: {card.front}</div>
                            <div className="text-xs text-gray-500 mt-1">A: {card.back}</div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button onClick={() => { setCurrentCardIdx(i); setCardFlipped(false); }} className="text-xs text-teal-600 font-semibold cursor-pointer hover:text-teal-700">View</button>
                            <button onClick={() => deleteFlashcard(card.id)} className="text-xs text-red-400 font-semibold cursor-pointer hover:text-red-600 ml-2">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <span className="text-4xl mb-4 block">🃏</span>
                    <h3 className="font-semibold text-gray-700 mb-1">No flashcards yet</h3>
                    <p className="text-sm text-gray-400 mb-4">Create flashcards from your notes to study more effectively.</p>
                    <button onClick={() => setShowNewFlashcardForm(true)} className="btn-primary text-sm cursor-pointer">Create First Card</button>
                  </div>
                )}
              </div>
            ) : (
              /* Read Mode */
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'DM Serif Display', serif" }}>{selectedNote.title}</h1>
                <div className="flex items-center gap-3 mb-6 text-sm">
                  <span className="text-gray-400">📅 {selectedNote.updatedAt}</span>
                  <span className="tag bg-teal-100 text-teal-700">{selectedNote.subject}</span>
                  <span className={`tag ${selectedNote.status === "Complete" ? "bg-green-50 text-green-700" : selectedNote.status === "Draft" ? "bg-gray-100 text-gray-600" : "bg-yellow-50 text-yellow-700"}`}>{selectedNote.status}</span>
                </div>
                <div className="max-w-none text-gray-700 leading-relaxed space-y-4 whitespace-pre-wrap text-sm">
                  {selectedNote.content}
                </div>
                {(selectedNote.keyConcept || selectedNote.studyTip) && (
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {selectedNote.keyConcept && (
                      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                        <div className="flex items-center gap-2 mb-2"><span>💡</span><span className="font-semibold text-sm text-gray-800">{selectedNote.keyConceptTitle}</span></div>
                        <p className="text-xs text-gray-600">{selectedNote.keyConcept}</p>
                      </div>
                    )}
                    {selectedNote.studyTip && (
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-center gap-2 mb-2"><span>🎯</span><span className="font-semibold text-sm text-gray-800">{selectedNote.studyTipTitle}</span></div>
                        <p className="text-xs text-gray-600">{selectedNote.studyTip}</p>
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-8 border-t border-gray-100 pt-4 text-sm text-gray-400 italic cursor-pointer hover:text-teal-500 transition-colors" onClick={startEditing}>
                  Click to edit this note or press the Edit button above…
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center">
            <span className="text-4xl block mb-3">📝</span>
            <h3 className="font-semibold text-gray-700">Select a note or create a new one</h3>
          </div>
        </div>
      )}

      {/* Right panel */}
      <div className="w-48 border-l border-gray-100 bg-white p-4 overflow-y-auto hidden lg:block flex-shrink-0">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Page Outline</div>
        {selectedNote && (
          <>
            <div className="space-y-1 mb-5">
              <div className="text-sm text-teal-600 font-semibold border-l-2 border-teal-500 pl-2">Introduction</div>
              {selectedNote.content.split("\n").filter(l => l.trim()).slice(0, 4).map((line, i) => (
                <div key={i} className="text-xs text-gray-500 pl-3 truncate">{line.slice(0, 30)}…</div>
              ))}
            </div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Properties</div>
            <div className="space-y-2 mb-5 text-xs">
              <div className="flex justify-between"><span className="text-gray-400">Author</span><span className="text-gray-700">You</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Status</span><span className={`tag ${selectedNote.status === "Complete" ? "bg-green-50 text-green-700" : selectedNote.status === "Draft" ? "bg-gray-100 text-gray-600" : "bg-yellow-50 text-yellow-700"}`}>{selectedNote.status}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Course</span><span className="text-teal-600 font-semibold">{selectedNote.course}</span></div>
            </div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Flashcards ({selectedNote.flashcards.length})</div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <span className="text-2xl">🃏</span>
              <div className="text-xs text-gray-500 mt-1">{selectedNote.flashcards.length > 0 ? "Click to study" : "None yet"}</div>
              <button onClick={() => setShowFlashcards(true)} className="text-xs text-teal-600 font-semibold mt-1 cursor-pointer hover:text-teal-700 transition-colors">
                {selectedNote.flashcards.length > 0 ? "View Deck" : "Create Cards"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* New Note Modal */}
      {showNewNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowNewNoteModal(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Create New Note</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Title</label>
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all"
                  placeholder="Note title..."
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Subject</label>
                <select
                  value={newNoteSubject}
                  onChange={(e) => setNewNoteSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all cursor-pointer"
                >
                  {["Mathematics", "Computer Science", "Philosophy", "Modern History", "Ethics & Law"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Course Code (optional)</label>
                <input
                  type="text"
                  value={newNoteCourse}
                  onChange={(e) => setNewNoteCourse(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-teal-300 transition-all"
                  placeholder="e.g. MATH-302"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowNewNoteModal(false)} className="btn-outline cursor-pointer">Cancel</button>
                <button onClick={createNewNote} className="btn-primary cursor-pointer" disabled={!newNoteTitle.trim()}>Create Note</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
