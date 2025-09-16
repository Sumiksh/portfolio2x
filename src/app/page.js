"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Navbar } from "../components/ui/navbar";
import { useState, useEffect } from "react";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // Animation for profile photo
  const [imgVisible, setImgVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setImgVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    setLoading(true);
    setChatMessages((msgs) => [...msgs, { sender: "user", text: chatInput }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput }),
      });
      const data = await res.json();
      setChatMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: data.reply || "No response" },
      ]);
    } catch (err) {
      setChatMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "Error sending message." },
      ]);
    }
    setChatInput("");
    setLoading(false);
  };

  return (
    <>
      <main
        className={`min-h-screen flex items-center justify-center ${
          mounted ? (isDark ? "bg-[#18181b] text-white" : "bg-white text-black") : "bg-gray-100 text-gray-900"
        }`}
      >
        <Navbar />
        <div className="h-20" />
        {/* Chatbot UI */}
        {chatOpen && (
          <div className="fixed bottom-20 right-6 z-[9999] w-80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg flex flex-col">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 font-bold">
              Sumiksh Chatbot
            </div>
            <div
              className="flex-1 p-3 overflow-y-auto"
              style={{ maxHeight: "250px" }}
            >
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 text-sm ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={
                      msg.sender === "user"
                        ? "bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100 px-2 py-1 rounded"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded"
                    }
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-2">
              <label className="font-semibold mb-1">
                Choose a resume section
              </label>
              <select
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="border rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
                disabled={loading}
              >
                <option value="">-- Select Section --</option>
                <option value="summary">Summary</option>
                <option value="skills">Skills</option>
                <option value="education">Education</option>
                <option value="experience">Experience</option>
                <option value="projects">Projects</option>
                <option value="certifications">Certifications</option>
              </select>
              <button
                onClick={sendMessage}
                className="px-3 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                disabled={loading}
              >
                Ask
              </button>
            </div>
          </div>
        )}
        <div className="flex w-full max-w-6xl mx-auto h-[70vh] items-center">
          {/* Left: Animated Profile Image */}
          <div className="w-1/2 flex justify-center items-center">
            <Image
              src="/profile.jpg"
              alt="Profile Art"
              width={400}
              height={400}
              className={`rounded-xl object-cover shadow-lg transition-all duration-700 ease-out ${
                imgVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              priority
            />
          </div>
          {/* Right: Text */}
          <div className="w-1/2 flex flex-col justify-center items-start px-8">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Turning Vision Into
              <br />
              Reality With Code And Design.
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              As a skilled full-stack developer, I am dedicated to turning ideas
              into innovative web applications.
              <br />
              Explore my latest projects and articles, showcasing my expertise
              in React.js and web development.
            </p>
            <div className="flex gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-lg font-semibold shadow border flex items-center gap-2 ${
                  isDark
                    ? "bg-white text-black border-gray-300 hover:bg-gray-100"
                    : "bg-black text-white border-gray-800 hover:bg-gray-900"
                }`}
              >
                Resume
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href="/contact"
                className={`px-6 py-3 rounded-lg font-semibold border transition ${
                  isDark
                    ? "bg-transparent text-white border-white hover:bg-white hover:text-black"
                    : "bg-transparent text-black border-black hover:bg-black hover:text-white"
                }`}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </main>
      {/* Chat button always visible above everything */}
      <button
        onClick={() => setChatOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-[99999] px-4 py-2 rounded-full bg-blue-600 text-white shadow-lg"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 99999,
        }}
      >
        {chatOpen ? "Close Chat" : "AI Resume Chat"}
      </button>
    </>
  );
}
