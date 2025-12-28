"use client"
import { useRef, useEffect, useState } from "react"
import { Navbar } from "@/components/ui/navbar"
import ModelViewer from "@/components/ui/ModelViewer"

const experiences = [
  {
    title: "Ontario Public Services (TBS Branch), Junior Programmer Co-op",
    date: "Jan 2025-May 2025 | Oshawa, Ontario",
    description: [
      "Developed Python-based ETL scripts to profile and transform MS SQL Server data.",
      "Conducted User Acceptance Testing (UAT) for multiple government programs.",
      "Developed an automated Python script using Selenium and Pandas to scrape internal ticketing data and gen-erate Excel-based reports, reducing manual reporting time.",
      "Designed data models and wrote Spark SQL in Azure Databricks.",
    ],
  },
  {
    title: "CIBC, Android Developer Co-op",
    date: "May 2024-Aug 2024 | Toronto, Ontario",
    description: [
      "Implemented MVVM architecture for scalable and maintainable CIBC pilot feature.",
      "Integrated Adobe Analytics to track user engagement.",
      "Documented workflows and requirements in Confluence.",
      "Tracked UAT issues, bugs, and enhancements in Jira.",
    ],
  },
  {
    title: "Claret Asset Management, IT Specialist",
    date: "Jun 2022-Jan 2023 | Montreal, Quebec",
    description: [
      "Developed Python-based ETL scripts using Selenium to web scrape data, download 250+ documents, and store records in a MySQL database for audit reporting, reducing manual workload by 8 hours per week.",
      "Worked with PostgreSQL and MongoDB for data extraction.",
      "Experienced in creating Snowpipes in Snowflake for continuous ingestion.",
      "Developed Python scripts to automate the weekly download of hundreds of documents.",
    ],
  },
]

export default function ExperiencePage() {
  const timelineRef = useRef(null)
  const [lineHeight, setLineHeight] = useState(0)
  const [hoveredBox, setHoveredBox] = useState(null)
  const [hoveredBullet, setHoveredBullet] = useState(null)
  const dotSpacing = 340

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return
      const rect = timelineRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const timelineHeight = (experiences.length - 1) * dotSpacing
      let progress = 0
      if (rect.top < windowHeight && rect.bottom > 0) {
        const visible = windowHeight - rect.top
        progress = Math.min(1, Math.max(0, visible / (rect.height || timelineHeight)))
      }
      setLineHeight(progress * timelineHeight)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen relative bg-background text-foreground overflow-x-hidden">
      {/* 3D BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <ModelViewer modelPath="/mouse.glb" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 flex flex-col items-center py-20">
        <Navbar />
        <div className="h-12" />

        <div className="text-center mb-24">
          <span className="px-20 py-2.5 rounded-full text-xl font-bold tracking-widest uppercase bg-purple-500/10 text-purple-500 border border-purple-500/20 backdrop-blur-md">
            Experience
          </span>
        </div>

        {/* Timeline container */}
        <div ref={timelineRef} className="flex w-full max-w-3xl mx-auto relative px-4">
          <div
            className="flex flex-col items-center relative"
            style={{ width: "64px", minHeight: `${experiences.length * dotSpacing}px` }}
          >
            {/* Background line */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: `${dotSpacing / 2 - 12}px`,
                height: `${(experiences.length - 1) * dotSpacing}px`,
                zIndex: 10,
              }}
            >
              <div className="w-1 h-full bg-gray-300 dark:bg-gray-700 absolute left-0 top-0" />
              <div
                className="w-1 absolute left-0 top-0 bg-gradient-to-b from-blue-500 to-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                style={{
                  height: `${lineHeight}px`,
                  zIndex: 20,
                  borderRadius: "2px",
                  transition: "height 0.3s",
                }}
              />
            </div>

            {experiences.map((_, idx) => (
              <div
                key={idx}
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: `${idx * dotSpacing + dotSpacing / 2 - 12}px`, zIndex: 30 }}
              >
                <div className="w-6 h-6 rounded-full bg-background border-4 border-blue-500 flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col flex-1 ml-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="mb-8 flex items-center" style={{ minHeight: `${dotSpacing}px` }}>
                <div
                  className={`w-full p-6 bg-white/90 text-black shadow-xl dark:bg-zinc-900/90 dark:text-white flex flex-col justify-center rounded-lg border border-gray-200 dark:border-zinc-800 backdrop-blur-md transition-all duration-300 ${
                    hoveredBox === null || hoveredBox === idx ? "opacity-100 scale-100" : "opacity-30 scale-95"
                  } ${hoveredBox === idx ? "shadow-[0_0_30px_rgba(168,85,247,0.6)] border-purple-500" : ""}`}
                  onMouseEnter={() => setHoveredBox(idx)}
                  onMouseLeave={() => {
                    setHoveredBox(null)
                    setHoveredBullet(null)
                  }}
                >
                  <h2
                    className={`text-lg font-bold mb-1 transition-colors duration-300 ${
                      hoveredBox === idx ? "text-purple-500" : ""
                    }`}
                  >
                    {exp.title}
                  </h2>
                  <p className="text-sm mb-2 text-blue-500 font-semibold">{exp.date}</p>
                  <ul className="space-y-2 text-base text-gray-700 dark:text-gray-300">
                    {exp.description.map((item, bulletIdx) => (
                      <li
                        key={bulletIdx}
                        className={`flex items-start transition-all duration-300 ${
                          hoveredBullet === null || hoveredBullet === `${idx}-${bulletIdx}`
                            ? "opacity-100"
                            : "opacity-40"
                        }`}
                        onMouseEnter={() => setHoveredBullet(`${idx}-${bulletIdx}`)}
                        onMouseLeave={() => setHoveredBullet(null)}
                      >
                        <span
                          className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 transition-all duration-300 ${
                            hoveredBullet === `${idx}-${bulletIdx}`
                              ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] scale-125"
                              : "bg-purple-500"
                          }`}
                        ></span>
                        <span
                          className={`transition-colors duration-300 ${
                            hoveredBullet === `${idx}-${bulletIdx}` ? "text-purple-500 font-medium" : ""
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
