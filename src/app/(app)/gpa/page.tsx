"use client";
import { useState, useCallback } from "react";

const gradePoints: Record<string, number> = {
  'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'D': 1.0, 'F': 0.0
};

interface Course {
  id: number;
  name: string;
  credits: number;
  grade: string;
}

const initialCourses: Course[] = [
  { id: 1, name: "Advanced Data Structures", credits: 4, grade: "A-" },
  { id: 2, name: "Microeconomics 101", credits: 3, grade: "A" },
  { id: 3, name: "Discrete Mathematics", credits: 4, grade: "B" },
  { id: 4, name: "Digital Marketing Ethics", credits: 3, grade: "A-" },
  { id: 5, name: "English Literature", credits: 4, grade: "B-" },
];

export default function GPAPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [nextId, setNextId] = useState(6);

  const calcGPA = useCallback(() => {
    let totalPoints = 0, totalCredits = 0;
    courses.forEach((c) => {
      const gp = gradePoints[c.grade] || 0;
      totalPoints += c.credits * gp;
      totalCredits += c.credits;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits) : 0;
  }, [courses]);

  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const gpa = calcGPA();

  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const removeCourse = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const addCourse = () => {
    setCourses((prev) => [...prev, { id: nextId, name: "", credits: 3, grade: "A" }]);
    setNextId((n) => n + 1);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Current GPA</div>
          <div className="text-3xl font-bold text-gray-900">{gpa.toFixed(2)} <span className="text-lg text-gray-400 font-normal">/ 4.0</span></div>
          <div className="progress-bar mt-3"><div className="progress-fill" style={{ width: `${(gpa / 4) * 100}%` }}></div></div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total Credits</div>
          <div className="text-3xl font-bold text-gray-900">{totalCredits} <span className="text-lg text-gray-400 font-normal">units</span></div>
          <div className="text-sm text-gray-400 mt-2">Full-time enrollment status</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Courses</div>
          <div className="text-3xl font-bold text-gray-900">{courses.length} <span className="text-lg text-gray-400 font-normal">active</span></div>
          <div className="text-sm text-gray-400 mt-2">Spring Semester 2024</div>
        </div>
      </div>

      {/* Course Table */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Course Calculations</h2>
          <button onClick={addCourse} className="btn-primary cursor-pointer">
            <svg width="13" height="13" fill="white" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
            Add Course
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="text-left pb-3">Course Name</th>
                <th className="text-center pb-3">Credits</th>
                <th className="text-center pb-3">Grade</th>
                <th className="text-center pb-3">Grade Point</th>
                <th className="text-center pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4">
                    {course.name ? (
                      <span className="text-sm font-medium text-gray-800">{course.name}</span>
                    ) : (
                      <input
                        type="text"
                        placeholder="Course name…"
                        className="text-sm font-medium text-gray-800 bg-transparent border-b border-gray-200 focus:border-teal-400 outline-none w-full"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                      />
                    )}
                  </td>
                  <td className="py-4 text-center">
                    <select
                      className="bg-gray-100 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 cursor-pointer outline-none focus:ring-2 focus:ring-teal-200"
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, "credits", parseInt(e.target.value))}
                    >
                      {[4, 3, 2, 1].map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td className="py-4 text-center">
                    <select
                      className="bg-gray-100 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 cursor-pointer outline-none focus:ring-2 focus:ring-teal-200"
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                    >
                      {Object.keys(gradePoints).map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </td>
                  <td className="py-4 text-center font-semibold text-gray-800">{(gradePoints[course.grade] || 0).toFixed(1)}</td>
                  <td className="py-4 text-center">
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center mx-auto cursor-pointer transition-colors"
                    >
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6" stroke="#9ca3af" strokeWidth="2" />
                        <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Scale */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-xs text-teal-700 font-bold">i</span>
          <h3 className="font-bold text-gray-900">Grade Scale Reference</h3>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {Object.entries(gradePoints).filter(([g]) => g !== 'F').map(([grade, points]) => (
            <div key={grade} className="text-center p-3 bg-gray-50 rounded-xl hover:bg-teal-50 transition-colors cursor-default">
              <div className="font-bold text-gray-800">{grade}</div>
              <div className="text-sm font-semibold text-teal-600 mt-1">{points.toFixed(1)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
