"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="landing-bg">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-2xl mx-auto">
        <span className="font-black text-xl text-gray-800 tracking-tight">Studify</span>
        <div className="hidden md:flex gap-7 text-sm text-gray-600">
          <a href="#features" className="hover:text-teal-700 transition-colors">Features</a>
          <a href="#advantage" className="hover:text-teal-700 transition-colors">Pricing</a>
          <a href="#" className="hover:text-teal-700 transition-colors">About</a>
          <a href="#" className="hover:text-teal-700 transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="text-sm font-medium text-gray-600 px-4 py-2 rounded-xl hover:text-teal-700 transition-colors">Login</Link>
          <Link href="/dashboard" className="landing-btn text-sm px-5 py-2">Sign Up</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-4 pb-14">
        {/* Hero Card */}
        <div className="glass-card-landing p-8 mb-4 relative overflow-hidden animate-fade-in-up" style={{ minHeight: 180 }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[7rem] font-black" style={{ color: 'rgba(190,228,234,0.22)', letterSpacing: '0.2em', whiteSpace: 'nowrap' }}>STUDIFY</span>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h1 className="text-4xl font-black text-gray-800 leading-tight mb-3" style={{ letterSpacing: '-0.5px', maxWidth: 280 }}>
                Your Academic Potential, Unlocked.
              </h1>
              <p className="text-gray-500 text-sm">Discover tools to achieve your best.</p>
            </div>
            {/* Clock SVG */}
            <div className="hidden sm:block flex-shrink-0 ml-4">
              <svg width="130" height="130" viewBox="0 0 130 130" fill="none">
                <defs>
                  <radialGradient id="cg1" cx="45%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#f0fbfc" />
                    <stop offset="100%" stopColor="#c2e8ee" />
                  </radialGradient>
                  <radialGradient id="cg2" cx="40%" cy="25%" r="70%">
                    <stop offset="0%" stopColor="#d8f1f5" />
                    <stop offset="100%" stopColor="#8ecad4" />
                  </radialGradient>
                  <filter id="cshadow"><feDropShadow dx="0" dy="5" stdDeviation="10" floodColor="#8dcbd5" floodOpacity="0.3" /></filter>
                </defs>
                <circle cx="65" cy="65" r="60" fill="url(#cg2)" filter="url(#cshadow)" />
                <circle cx="65" cy="65" r="57" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                <circle cx="65" cy="65" r="52" fill="url(#cg1)" />
                <circle cx="65" cy="65" r="52" fill="none" stroke="rgba(180,220,228,0.5)" strokeWidth="1.2" />
                <line x1="65" y1="16" x2="65" y2="24" stroke="#7ec8d3" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="65" y1="106" x2="65" y2="114" stroke="#7ec8d3" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="16" y1="65" x2="24" y2="65" stroke="#7ec8d3" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="106" y1="65" x2="114" y2="65" stroke="#7ec8d3" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="65" cy="65" r="13" fill="rgba(180,220,228,0.2)" stroke="#a0cdd6" strokeWidth="1" />
                <line x1="65" y1="65" x2="65" y2="40" stroke="#5ab5c2" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="65" y1="65" x2="87" y2="51" stroke="#3a9fae" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="65" y1="65" x2="53" y2="80" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
                <circle cx="65" cy="65" r="3.5" fill="#5ab5c2" />
                <circle cx="65" cy="65" r="1.8" fill="white" />
              </svg>
            </div>
          </div>
        </div>

        {/* Feature 3 Cards Row */}
        <div id="features" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {/* Card 1: stacked effect */}
          <div className="feature-stack animate-fade-in-up stagger-1">
            <div className="glass-card-landing feature-stack-inner p-5 text-center cursor-pointer hover:-translate-y-0.5 transition-all" style={{ background: 'rgba(255,255,255,0.62)' }}>
              <div className="flex justify-center mb-3">
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                  <circle cx="26" cy="26" r="22" fill="rgba(13,148,136,0.07)" />
                  <path d="M20 12C15 12 11 16 11 21c0 3 1.2 5 3 7l1 12h22l1-12c1.8-2 3-4 3-7 0-5-4-9-9-9-1.5 0-3 .4-4 1-1-.6-2.5-1-4-1z" fill="rgba(13,148,136,0.1)" stroke="#0D9488" strokeWidth="1.4" strokeLinejoin="round" />
                  <rect x="14" y="40" width="24" height="3" rx="1.5" fill="rgba(13,148,136,0.2)" />
                  <path d="M19 28h14M20 32h12" stroke="#0D9488" strokeWidth="1.3" strokeLinecap="round" />
                  <circle cx="21" cy="21" r="3" fill="rgba(13,148,136,0.2)" stroke="#0D9488" strokeWidth="1" />
                  <circle cx="31" cy="21" r="3" fill="rgba(13,148,136,0.2)" stroke="#0D9488" strokeWidth="1" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-sm mb-1 leading-tight">Personalized Learning Paths</h3>
              <p className="text-xs text-gray-500 mb-4">Tailored study plans</p>
              <Link href="/dashboard" className="landing-btn w-full text-xs py-1.5">Explore</Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card-landing-sm p-5 text-center cursor-pointer hover:-translate-y-0.5 transition-all animate-fade-in-up stagger-2" style={{ background: 'rgba(255,255,255,0.50)' }}>
            <div className="flex justify-center mb-3">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="22" fill="rgba(13,148,136,0.06)" />
                <circle cx="26" cy="17" r="6" fill="rgba(13,148,136,0.12)" stroke="#0D9488" strokeWidth="1.4" />
                <path d="M13 42c0-7 5.8-12 13-12s13 5 13 12" stroke="#0D9488" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="13" cy="21" r="4.5" fill="rgba(13,148,136,0.08)" stroke="#0D9488" strokeWidth="1.2" />
                <path d="M5 42c0-5 3.6-9 8-10" stroke="#0D9488" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="39" cy="21" r="4.5" fill="rgba(13,148,136,0.08)" stroke="#0D9488" strokeWidth="1.2" />
                <path d="M47 42c0-5-3.6-9-8-10" stroke="#0D9488" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-1 leading-tight">Collaborative Study Groups</h3>
            <p className="text-xs text-gray-500 mb-4">Connect with peers</p>
            <Link href="/dashboard" className="landing-btn w-full text-xs py-1.5">Join</Link>
          </div>

          {/* Card 3 */}
          <div className="glass-card-landing-sm p-5 text-center cursor-pointer hover:-translate-y-0.5 transition-all animate-fade-in-up stagger-3" style={{ background: 'rgba(255,255,255,0.50)' }}>
            <div className="flex justify-center mb-3">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="22" fill="rgba(13,148,136,0.06)" />
                <path d="M26 10L10 19l16 9 16-9-16-9z" fill="rgba(13,148,136,0.12)" stroke="#0D9488" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M18 24v9c0 4.4 3.6 8 8 8s8-3.6 8-8v-9" stroke="#0D9488" strokeWidth="1.4" strokeLinecap="round" />
                <rect x="14" y="34" width="5" height="8" rx="1.5" fill="rgba(13,148,136,0.18)" stroke="#0D9488" strokeWidth="1" />
                <rect x="21" y="30" width="5" height="12" rx="1.5" fill="rgba(13,148,136,0.25)" stroke="#0D9488" strokeWidth="1" />
                <rect x="28" y="32" width="5" height="10" rx="1.5" fill="rgba(13,148,136,0.2)" stroke="#0D9488" strokeWidth="1" />
                <rect x="35" y="27" width="5" height="15" rx="1.5" fill="rgba(13,148,136,0.35)" stroke="#0D9488" strokeWidth="1" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-1 leading-tight">Performance Tracking</h3>
            <p className="text-xs text-gray-500 mb-4">Monitor progress</p>
            <Link href="/dashboard" className="landing-btn w-full text-xs py-1.5">View</Link>
          </div>
        </div>

        {/* Studify Advantage */}
        <div id="advantage" className="text-center mb-7">
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">The Studify Advantage</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {/* GPA */}
          <div className="glass-card-landing-sm p-6 cursor-pointer hover:-translate-y-0.5 transition-all animate-fade-in-up stagger-1" style={{ background: 'rgba(255,255,255,0.45)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)' }}>
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect x="4" y="2" width="30" height="34" rx="5" fill="rgba(200,235,240,0.5)" stroke="#aacdd5" strokeWidth="1.4" />
                <rect x="9" y="8" width="20" height="5" rx="2" fill="rgba(13,148,136,0.15)" stroke="#0D9488" strokeWidth="0.8" />
                <rect x="9" y="16" width="6" height="5" rx="1.5" fill="rgba(13,148,136,0.2)" />
                <rect x="17" y="16" width="6" height="5" rx="1.5" fill="rgba(13,148,136,0.2)" />
                <rect x="25" y="16" width="6" height="5" rx="1.5" fill="rgba(13,148,136,0.3)" />
                <rect x="9" y="24" width="6" height="5" rx="1.5" fill="rgba(13,148,136,0.15)" />
                <rect x="17" y="24" width="6" height="5" rx="1.5" fill="rgba(13,148,136,0.15)" />
                <rect x="25" y="24" width="6" height="5" rx="1.5" fill="rgba(13,148,136,0.35)" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-1.5 text-sm">GPA Calculator</h3>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">Define and track your GPA across all courses.</p>
            <Link href="/gpa" className="landing-btn text-xs py-1.5 px-4">Learn more</Link>
          </div>

          {/* AI Study Planner */}
          <div className="glass-card-landing-sm p-6 cursor-pointer hover:-translate-y-0.5 transition-all animate-fade-in-up stagger-2" style={{ background: 'rgba(255,255,255,0.45)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(13,148,136,0.07)', border: '1px solid rgba(13,148,136,0.15)' }}>
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <path d="M19 4C12 4 6 9 6 16c0 4 2 7.5 5 10V32h16V26c3-2.5 5-6 5-10 0-7-6-12-13-12z" fill="rgba(13,148,136,0.12)" stroke="#0D9488" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M22 9l-6 9h5l-4 10 9-12h-5l3-7z" fill="#0D9488" opacity="0.75" />
                <rect x="10" y="32" width="18" height="3" rx="1.5" fill="rgba(13,148,136,0.2)" stroke="#0D9488" strokeWidth="0.8" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-1.5 text-sm">AI Study Planner</h3>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">Planner powered with AI study plan generation.</p>
            <Link href="/planner" className="landing-btn text-xs py-1.5 px-4">Learn more</Link>
          </div>

          {/* Notes */}
          <div className="glass-card-landing-sm p-6 cursor-pointer hover:-translate-y-0.5 transition-all animate-fade-in-up stagger-3" style={{ background: 'rgba(255,255,255,0.45)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)' }}>
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect x="6" y="4" width="26" height="30" rx="4" fill="rgba(200,235,240,0.4)" stroke="#aacdd5" strokeWidth="1.4" />
                <path d="M12 12h14M12 17h14M12 22h9" stroke="#0D9488" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M27 23l5-5 2 2-5 5h-2v-2z" fill="rgba(13,148,136,0.35)" stroke="#0D9488" strokeWidth="1" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-1.5 text-sm">Notes</h3>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">Get your notebook and AI-powered smart notes.</p>
            <Link href="/notes" className="landing-btn text-xs py-1.5 px-4">Learn more</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto px-6 py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.5)' }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <div className="font-black text-gray-800 text-base mb-0.5">Studify</div>
            <div className="text-xs text-gray-400">Academic Hub</div>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-3">Quick Links</h4>
            <div className="space-y-1.5 text-xs text-gray-500">
              <p className="cursor-pointer hover:text-teal-600 transition-colors">Features</p>
              <p className="cursor-pointer hover:text-teal-600 transition-colors">Pricing</p>
              <p className="cursor-pointer hover:text-teal-600 transition-colors">About</p>
              <p className="cursor-pointer hover:text-teal-600 transition-colors">Contact</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-3">Support</h4>
            <div className="space-y-1.5 text-xs text-gray-500">
              <p className="cursor-pointer hover:text-teal-600 transition-colors">Help Center</p>
              <p className="cursor-pointer hover:text-teal-600 transition-colors">Terms</p>
              <p className="cursor-pointer hover:text-teal-600 transition-colors">Privacy</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-3">Follow Us</h4>
            <div className="flex gap-2 flex-wrap">
              {['f', '𝕏', '◫', 'in'].map((icon, i) => (
                <div key={i} className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform text-gray-600 font-bold text-xs" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.7)' }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-8">© 2026 Studify. All rights reserved.</div>
      </footer>
    </div>
  );
}
