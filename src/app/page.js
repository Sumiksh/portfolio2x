"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Navbar } from "../components/ui/navbar";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFileArrowDown
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const email = "tsumiksh@gmail.com";

  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  // const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    let effect = null;

    const initVanta = async () => {
      // 1. Import TRUNK and p5
      const TRUNK = (await import("vanta/dist/vanta.trunk.min")).default;
      const p5 = (await import("p5")).default;

      if (!vantaEffect && vantaRef.current) {
        const isDark = resolvedTheme === "dark" || theme === "dark";

        try {
          effect = TRUNK({
            el: vantaRef.current,
            p5: p5, 
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 400.0,
            minWidth: 400.0,
            scale: 2.0,
            scaleMobile: 1.0,
            // Colors for the "Trunk" organic look
            color: isDark ? 0x9333ea : 0x4338ca,
            backgroundColor: isDark ? 0x000000 : 0xffffff,
            spacing: 2.0,
            chaos: 4.0,
          });
          setVantaEffect(effect);
        } catch (err) {
          console.error("Vanta Trunk failed:", err);
        }
      }
    };

    if (mounted) {
      initVanta();
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [mounted, vantaEffect]);

  useEffect(() => {
    if (vantaEffect && typeof vantaEffect.setOptions === "function") {
      const isDark = resolvedTheme === "dark" || theme === "dark";
      vantaEffect.setOptions({
        color: isDark ? 0x9333ea : 0x4338ca,
        backgroundColor: isDark ? 0x000000 : 0xffffff,
      });
    }
  }, [theme, resolvedTheme, vantaEffect]);

  const handleContactClick = () => {
    if (!showEmail) {
      setShowEmail(true);
      return
    }
    setShowEmail(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation for profile photo
  const [imgVisible, setImgVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setImgVisible(true), 300);
    return () => clearTimeout(timer);
  }, [mounted]);

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

  if (!mounted) return <div className="min-h-screen bg-gray-100" />;

  return (
    <div ref={vantaRef} className="min-h-screen bg-white text-black dark:bg-[#000000] dark:text-white">
      <main className="relative z-10 w-full">
        <Navbar />
        <div className="h-20" />
        {/* Chatbot UI */}
        {chatOpen && (
          <div className="fixed bottom-20 right-6 z-[9999] w-80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg flex flex-col">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 font-bold">
              Sumiksh Chatbot
            </div>

            <div className="flex-1 p-3 overflow-y-auto" style={{ maxHeight: "250px" }}>
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-6 text-sm ${msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                >
                  {msg.text.split("\n").map((line, lineIdx) => (
                    <div
                      key={lineIdx}
                      className={`${msg.sender === "user"
                        ? "bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        } px-4 py-2 rounded mb-2`}
                    >
                      {line}
                    </div>
                  ))}
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
              className={`rounded-xl object-cover shadow-lg transition-all duration-700 ease-out ${imgVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              priority
            />
          </div>
          {/* Right: Text */}
          <div className="w-1/2 flex flex-col justify-center items-start px-8">
            <h1 className="text-4xl md:text-4xl font-extrabold mb-6 leading-[1.1] tracking-tight text-gray-900 dark:text-white">
              Turning{" "}
              <span className="relative inline-block group">
                {/* The Pulsating Word */}
                <span className="inline-block animate-pulse duration-[3000ms] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  Vision
                </span>
                {/*An underline that glows with it */}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full opacity-50 animate-pulse duration-[3000ms]"></span>
              </span>
              {" "}Into
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
              <a href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 group bg-transparent 
    /* Light Mode Styles */
    text-purple-900 border-2 border-purple-700/50 hover:border-purple-700 hover:bg-purple-50 
    /* Dark Mode Styles */
    dark:text-white dark:border-purple-500/50 dark:hover:border-purple-400 dark:hover:bg-purple-500/10 dark:shadow-[0_0_15px_rgba(168,85,247,0.1)]"
              >
                <FontAwesomeIcon icon={faFileArrowDown} className="text-sm transition-transform group-hover:-translate-y-1" />
                <span className="tracking-wide">Resume</span>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
              <button
                onClick={handleContactClick}
                className="px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-white
                /* Light Mode Gradient & Shadow */
                bg-gradient-to-r from-purple-700 to-indigo-600 shadow-purple-900/20 hover:shadow-purple-900/40
                /* Dark Mode Gradient & Shadow */
                dark:from-purple-600 dark:to-fuchsia-500 dark:shadow-purple-500/20 dark:hover:shadow-purple-500/40 dark:border dark:border-purple-400/30"
              >
                <span className="flex items-center gap-2">
                  {!showEmail && <FontAwesomeIcon icon={faEnvelope} className="text-sm" />}
                  {showEmail ? email : "Get In Touch"}
                </span>
              </button>
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
    </div>
  );
}
