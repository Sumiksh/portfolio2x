// 'use client';
// import Image from "next/image";
// import { useTheme } from "next-themes";
// import { Navbar } from "../../components/ui/navbar";

// export default function HomePage() {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";
//   return (
//     <main className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#18181b] text-white" : "bg-white text-black"}`}>
//       <Navbar />
//       <div className="flex w-full max-w-6xl mx-auto h-[70vh] items-center">
//         {/* Left: Image */}
//         <div className="w-1/2 flex justify-center items-center">
//           <Image
//             src="/profile-art.png"
//             alt="Profile Art"
//             width={400}
//             height={400}
//             className="rounded-xl object-cover shadow-lg"
//             priority
//           />
//         </div>
//         {/* Right: Text */}
//         <div className="w-1/2 flex flex-col justify-center items-start px-8">
//           <h1 className="text-5xl font-bold mb-6 leading-tight">
//             Turning Vision Into<br />Reality With Code And Design.
//           </h1>
//           <p className="mb-8 text-lg text-muted-foreground">
//             As a skilled full-stack developer, I am dedicated to turning ideas into innovative web applications.<br />
//             Explore my latest projects and articles, showcasing my expertise in React.js and web development.
//           </p>
//           <div className="flex gap-4">
//             <a
//               href="/resume.pdf"
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`px-6 py-3 rounded-lg font-semibold shadow border flex items-center gap-2 ${isDark ? "bg-white text-black border-gray-300 hover:bg-gray-100" : "bg-black text-white border-gray-800 hover:bg-gray-900"}`}
//             >
//               Resume
//               <span aria-hidden="true">↗</span>
//             </a>
//             <a
//               href="/contact"
//               className={`px-6 py-3 rounded-lg font-semibold border transition ${isDark ? "bg-transparent text-white border-white hover:bg-white hover:text-black" : "bg-transparent text-black border-black hover:bg-black hover:text-white"}`}
//             >
//               Contact
//             </a>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
