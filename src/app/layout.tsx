import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studify — Smart Student Dashboard",
  description: "Studify is a cutting-edge student dashboard that centralizes study planning, deadline tracking, collaboration, note-taking, and performance analytics in one beautiful platform.",
  keywords: ["student dashboard", "study planner", "GPA calculator", "academic management", "study groups"],
};

import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8fafb] text-gray-800 antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
