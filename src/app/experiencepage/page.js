
'use client';
import { useRef, useEffect, useState } from "react";
import { Navbar } from "@/components/ui/navbar";
const experiences = [
  {
    title: "Ontario Public Services (TBS Branch), Junior Programmer Co-op",
    date: "Jan 2025-May 2025 | Oshawa, Ontario",
    description: (
      <ul className="list-disc pl-4">
        <li>Developed Python-based ETL scripts to profile and transform MS SQL Server data, generating analytic data sets for Power BI dashboards used by AVPs and VPs.</li>
        <li>Conducted User Acceptance Testing (UAT) for multiple government programs, tracked defects, and coordinated resolutions with internal teams and vendors.</li>
        <li>Automated data ingestion into Azure SQL Database via ADF pipelines, enabling biweekly MVP deliveries and reducing manual data prep time by 70%.</li>
        <li>Designed data models and wrote Spark SQL in Azure Databricks to aggregate project metrics, improving performance of executive reports.</li>
      </ul>
    ),
  },
  {
    title: "CIBC, Android Developer Co-op",
    date: "May 2024-Aug 2024 | Toronto, Ontario",
    description: (
      <ul className="list-disc pl-4">
        <li>Implemented MVVM architecture for scalable and maintainable CIBC pilot gamification feature.</li>
        <li>Integrated Adobe Analytics to track user engagement and optimize feature performance.</li>
        <li>Documented workflows and requirements in Confluence.</li>
        <li>Tracked UAT issues, bugs, and enhancements in Jira.</li>
      </ul>
    ),
  },
  {
    title: "Claret Asset Management, IT Specialist",
    date: "Jun 2022-Jan 2023 | Montreal, Quebec",
    description: (
      <ul className="list-disc pl-4">
        <li>Replaced legacy SSIS data pipelines with python-based ETL processes for maintainability and performance.</li>
        <li>Worked with PostgreSQL and MongoDB for data extraction and transformation.</li>
        <li>Experienced in creating Snowpipes in Snowflake to continuously ingest data from cloud storage using Snowflake external stages and ingestion queues.</li>
        <li>Partnered with cross-functional teams to deliver Power BI dashboards and supported change management during rollout to internal users.</li>
        <li>Developed Python scripts to automate the weekly download of hundreds of documents, eliminating 100 hours of manual work each month.</li>
      </ul>
    ),
  },
];

export default function ExperiencePage() {
  const timelineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);
  const dotSpacing = 340;

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const timelineHeight = (experiences.length - 1) * dotSpacing;
      let progress = 0;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const visible = windowHeight - rect.top;
        progress = Math.min(1, Math.max(0, visible / (rect.height || timelineHeight)));
      }
      setLineHeight(progress * timelineHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground py-20">
      <Navbar />
      <div className="h-12" />
      <div className="text-center mb-12">
        <span className="px-20 py-2.5 rounded-full text-xl font-bold tracking-widest uppercase bg-purple-500/10 text-purple-500 border border-purple-500/20">
          Experience
        </span>
      </div>
      <div ref={timelineRef} className="flex w-full max-w-3xl mx-auto relative">
        <div className="flex flex-col items-center relative" style={{ width: "64px", minHeight: `${experiences.length * dotSpacing}px` }}>
          {/* Timeline vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: `${dotSpacing / 2 - 12}px`, height: `${(experiences.length - 1) * dotSpacing}px`, zIndex: 10 }}>
            {/* Background line */}
            <div className="w-1 h-full bg-gray-300 dark:bg-gray-700 absolute left-0 top-0" style={{ zIndex: 10 }} />
            {/* Animated line: grows from first dot to last */}
            <div
              className="bg-blue-500 w-1 absolute left-0 top-0"
              style={{
                height: `${lineHeight}px`,
                zIndex: 20,
                borderRadius: "2px",
                transition: "height 0.3s",
              }}
            />
          </div>
          {/* Dots: perfectly aligned in timeline column */}
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
        {/* Cards column */}
        <div className="flex flex-col flex-1 ml-8" style={{ minHeight: `${experiences.length * dotSpacing}px` }}>
          {experiences.map((exp, idx) => (
            <div key={idx} className="mb-8 flex items-center" style={{ minHeight: `${dotSpacing}px` }}>
              <div className="w-full p-6 bg-white text-black shadow-lg dark:bg-zinc-900 dark:text-white flex flex-col justify-center rounded-lg border-2 border-transparent hover:shadow-purple-500 transition-all duration-200" style={{ maxWidth: "900px" }}>
                <h2 className="text-lg font-bold mb-1">{exp.title}</h2>
                <p className="text-sm mb-2">{exp.date}</p>
                {typeof exp.description === 'string' ? (
                  <p className="text-base">{exp.description}</p>
                ) : (
                  exp.description
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
