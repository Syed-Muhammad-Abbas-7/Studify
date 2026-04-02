"""
Studify Backend - FastAPI Application
Serves mock data for the Smart Student Dashboard.
Database and AI integrations to be added later.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import random

app = FastAPI(
    title="Studify API",
    description="Smart Student Dashboard Backend",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============ RESPONSE HELPERS ============
def success(data, message="Request successful"):
    return {"success": True, "data": data, "message": message}


def error(msg, status=400):
    return {"success": False, "error": msg}


# ============ MOCK DATA ============
MOCK_USER = {
    "id": "usr_001",
    "name": "Alex Rivera",
    "email": "alex.rivera@university.edu",
    "department": "Computer Science",
    "semester": "Spring 2024",
    "avatar_initials": "AR",
    "streak": 12,
}

MOCK_COURSES = [
    {"id": "c1", "name": "Advanced Data Structures", "code": "CSC-301", "credits": 4, "grade": "A-"},
    {"id": "c2", "name": "Microeconomics 101", "code": "ECN-201", "credits": 3, "grade": "A"},
    {"id": "c3", "name": "Discrete Mathematics", "code": "MAT-205", "credits": 4, "grade": "B"},
    {"id": "c4", "name": "Digital Marketing Ethics", "code": "MKT-110", "credits": 3, "grade": "A-"},
    {"id": "c5", "name": "English Literature", "code": "ENG-102", "credits": 4, "grade": "B-"},
]

MOCK_STUDY_PLAN = [
    {"id": "sp1", "subject": "Organic Chemistry", "task": "Review Notes", "duration": "43 mins", "completed": True, "priority": "normal"},
    {"id": "sp2", "subject": "Calculus II", "task": "Math Problem Set #12", "duration": "1 hour", "completed": True, "priority": "normal"},
    {"id": "sp3", "subject": "Computer Science", "task": "Data Structures Lab Prep", "duration": "1.5 hours", "completed": False, "priority": "high"},
    {"id": "sp4", "subject": "Philosophy", "task": "Ethics & Society Reading", "duration": "56 mins", "completed": False, "priority": "normal"},
]

MOCK_DEADLINES = [
    {"id": "d1", "name": "Macroeconomics Essay", "course": "ECN-201", "due": "tomorrow", "priority": "high", "status": "in_progress", "progress": 85},
    {"id": "d2", "name": "Linear Algebra Quiz", "course": "MAT-105", "due": "5 days", "priority": "medium", "status": "todo", "progress": 0},
    {"id": "d3", "name": "OS Project Part 1", "course": "CSC-310", "due": "5 days", "priority": "medium", "status": "todo", "progress": 30},
    {"id": "d4", "name": "Final Thesis: Neural Networks", "course": "CS-402", "due": "14 hours", "priority": "high", "status": "in_progress", "progress": 85},
]

MOCK_EVENTS = [
    {"id": "e1", "title": "Advanced Algorithms Final", "type": "exam", "date": "2024-10-12", "time": "14:00", "location": "Hall B"},
    {"id": "e2", "title": "Bio-Medical Ethics Exam", "type": "exam", "date": "2024-10-03", "location": "Room 204"},
    {"id": "e3", "title": "Seminar 04", "type": "seminar", "date": "2024-10-07", "location": "Lecture Hall C"},
    {"id": "e4", "title": "Thesis Draft Due", "type": "deadline", "date": "2024-10-11"},
    {"id": "e5", "title": "Lab Report Due", "type": "deadline", "date": "2024-10-15"},
]

MOCK_GROUPS = [
    {"id": "g1", "name": "Computer Science", "subject": "CSC", "members": 12, "initials": "CS", "active": True},
    {"id": "g2", "name": "Bio Lab", "subject": "BIO", "members": 8, "initials": "BL", "active": False},
    {"id": "g3", "name": "Philosophy 101", "subject": "PHI", "members": 6, "initials": "PH", "active": False},
    {"id": "g4", "name": "Advanced Math", "subject": "MAT", "members": 5, "initials": "MA", "active": False},
]

MOCK_NOTES = [
    {"id": "n1", "title": "Vector Fields and Line Integrals", "subject": "Mathematics", "course": "MATH-302", "tags": ["math"], "updated": "2 hours ago", "content_preview": "Understanding the fundamental theorem for line integrals in 3D space…"},
    {"id": "n2", "title": "Utilitarianism vs Deontology", "subject": "Philosophy", "course": "PHI-201", "tags": ["philosophy"], "updated": "Yesterday", "content_preview": "Key differences between Bentham and Kant's ethical frameworks…"},
]

MOCK_ANALYTICS = {
    "study_hours": {"mon": 3, "tue": 5, "wed": 4, "thu": 7, "fri": 2, "sat": 4, "sun": 3},
    "mastery_goal": 75,
    "subjects": [
        {"name": "Computer Science", "grade": "A+", "gpa": 4.0, "progress": 100},
        {"name": "Mathematics", "grade": "A-", "gpa": 3.7, "progress": 92},
    ],
    "research": {"papers_read": 124, "lectures_logged": 42, "cloud_storage": "8.4GB", "certificates": 12},
}


# ============ API ROUTES ============

# --- Auth ---
@app.post("/api/v1/auth/login")
async def login():
    return success({"token": "mock_jwt_token_abc123", "user": MOCK_USER})


@app.get("/api/v1/auth/me")
async def get_me():
    return success(MOCK_USER)


# --- Dashboard ---
@app.get("/api/v1/dashboard/overview")
async def dashboard_overview():
    return success({
        "user": MOCK_USER,
        "today_plan": MOCK_STUDY_PLAN,
        "upcoming_deadlines": MOCK_DEADLINES[:3],
        "next_event": MOCK_EVENTS[0],
        "streak": MOCK_USER["streak"],
        "group_activity": [
            {"user": "Jamie Smith", "action": 'Shared: "FinalReview_V2.pdf"', "time": "2m ago"},
            {"user": "Kayia Lee", "action": "Has anyone checked the grade…", "time": "1h ago"},
            {"user": "Ben Miller", "action": "Started a study session: Join Room", "time": "5h ago"},
        ],
    })


@app.get("/api/v1/dashboard/stats")
async def dashboard_stats():
    return success({
        "total_focused_hours": 24.5,
        "completion_rate": 88,
        "efficiency_change": "+12%",
        "gpa": 3.18,
        "active_courses": 5,
    })


# --- Courses ---
@app.get("/api/v1/courses")
async def get_courses():
    return success(MOCK_COURSES)


# --- Study Planner ---
@app.get("/api/v1/study-planner")
async def get_study_plans():
    return success(MOCK_STUDY_PLAN)


@app.post("/api/v1/study-planner/generate")
async def generate_study_plan():
    return success({
        "plan_id": "plan_" + str(random.randint(1000, 9999)),
        "sessions": MOCK_STUDY_PLAN,
        "generated_at": datetime.now().isoformat(),
    }, "AI study plan generated successfully")


# --- Calendar ---
@app.get("/api/v1/calendar/events")
async def get_events():
    return success(MOCK_EVENTS)


@app.get("/api/v1/calendar/upcoming")
async def get_upcoming():
    return success(MOCK_EVENTS[:3])


# --- Deadlines ---
@app.get("/api/v1/deadlines")
async def get_deadlines():
    return success(MOCK_DEADLINES)


@app.get("/api/v1/deadlines/upcoming")
async def get_upcoming_deadlines():
    return success([d for d in MOCK_DEADLINES if d["priority"] == "high"])


# --- Groups ---
@app.get("/api/v1/groups")
async def get_groups():
    return success(MOCK_GROUPS)


@app.get("/api/v1/groups/{group_id}/members")
async def get_group_members(group_id: str):
    return success([
        {"id": "u1", "name": "Jordan Smith", "role": "admin"},
        {"id": "u2", "name": "Alex Rivers", "role": "member"},
        {"id": "u3", "name": "Maya Zhang", "role": "member"},
        {"id": "u4", "name": "Chris Miller", "role": "member"},
    ])


# --- Chat ---
@app.get("/api/v1/chat/{group_id}/messages")
async def get_messages(group_id: str):
    return success([
        {"id": "m1", "sender": "Alex Rivers", "text": "Has anyone managed to finish the recursion assignment?", "time": "2:14 PM", "is_me": False},
        {"id": "m2", "sender": "Maya Zhang", "text": "Check my documentation notes on the base case handling.", "time": "2:18 PM", "is_me": False, "file": {"name": "Recursion_Tips_Week4.pdf", "size": "1.2 MB"}},
        {"id": "m3", "sender": "Me", "text": "Thanks Maya! Fixed the issue.", "time": "2:25 PM", "is_me": True},
    ])


# --- Notes ---
@app.get("/api/v1/notes")
async def get_notes():
    return success(MOCK_NOTES)


# --- GPA ---
@app.post("/api/v1/gpa/calculate")
async def calculate_gpa():
    grade_points = {"A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "D": 1.0, "F": 0.0}
    total_points = sum(grade_points.get(c["grade"], 0) * c["credits"] for c in MOCK_COURSES)
    total_credits = sum(c["credits"] for c in MOCK_COURSES)
    gpa = total_points / total_credits if total_credits > 0 else 0
    return success({"gpa": round(gpa, 2), "total_credits": total_credits, "courses": len(MOCK_COURSES)})


@app.get("/api/v1/gpa/history")
async def gpa_history():
    return success([
        {"semester": "Fall 2023", "gpa": 3.4},
        {"semester": "Spring 2024", "gpa": 3.18},
    ])


# --- Analytics ---
@app.get("/api/v1/analytics/performance")
async def analytics_performance():
    return success(MOCK_ANALYTICS)


@app.get("/api/v1/analytics/study-activity")
async def study_activity():
    return success(MOCK_ANALYTICS["study_hours"])


@app.get("/api/v1/analytics/progress")
async def analytics_progress():
    return success({
        "mastery_goal": 75,
        "weekly_hours": 24.5,
        "completion_rate": 88,
        "streak": 12,
    })


# --- Health ---
@app.get("/api/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
