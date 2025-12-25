'use client';
import { Navbar } from "@/components/ui/navbar";
import PortfolioCard from "@/components/PortfolioCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faServer, faChartLine, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full transition-colors duration-300 bg-background text-foreground">
      <Navbar />
      <div className="h-20" />
      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">My Portfolio</h1>
        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="project1" className="border-b border-gray-200 dark:border-gray-800">
            <AccordionTrigger className="hover:no-underline py-4">
              <span className="text-lg font-semibold hover:text-purple-500 transition-colors">
                Legacy Portfolio V1
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <PortfolioCard
                title="Legacy Portfolio V1"
                description="A foundational project showcasing my early mastery of responsive design and UI layout. This version represents my transition into full-stack development and serves as the architectural predecessor to my current site."
                link="https://portfolio-five-gamma-25.vercel.app/"
                github="https://portfolio-five-gamma-25.vercel.app/"
              />

              {/* If your PortfolioCard DOES NOT have a github prop, use this fallback: */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://github.com/Sumiksh/portfolio.git"
                  target="_blank"
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 text-purple-500 rounded-lg transition-all text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faCode} className="text-xs" />
                  Repository
                </a>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="project2" className="border-b border-gray-200 dark:border-gray-800">
            <AccordionTrigger className="hover:no-underline py-4">
              <span className="text-lg font-semibold hover:text-purple-500 transition-colors">
                Seattle Airbnb Insights - Tableau
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <PortfolioCard
                title="Seattle Airbnb Recommendation"
                description="An interactive data visualization project analyzing price trends, neighborhood demand, and seasonal availability. Created high-impact dashboards to provide data-driven investment recommendations for the Seattle market."
                link="https://public.tableau.com/app/profile/sumiksh.trehan/viz/seattleairbnbrecommendation/Dashboard1"
              />
            </AccordionContent>
          </AccordionItem>

          {/* Project 3: Computer Vision */}
          <AccordionItem value="project3" className="border-b border-gray-200 dark:border-gray-800">
            <AccordionTrigger className="hover:no-underline py-4">
              <span className="text-lg font-semibold hover:text-purple-500 transition-colors">
                Sports Motion Detection & Tracking
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <PortfolioCard
                title="Sports Motion Detection and Tracking"
                description="Built a video processing pipeline using OpenCV and classical computer vision techniques. Features robust motion tracking and object detection designed to analyze player movement across dynamic sports footage."
                link="https://github.com/Sumiksh/dps920finalproject.git"
              />
            </AccordionContent>
          </AccordionItem>

          {/* Project 4: AI/ML Models */}
          <AccordionItem value="project4" className="border-b border-gray-200 dark:border-gray-800">
            <AccordionTrigger className="hover:no-underline py-4">
              <span className="text-lg font-semibold hover:text-purple-500 transition-colors">
                Machine Learning: Regression & CNNs
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <PortfolioCard
                title="AI/ML Model Suite"
                description="A collection of predictive models ranging from housing price regression to complex image classification. Implemented using Python, Scikit-learn, and TensorFlow, utilizing KNN and CNN architectures for high accuracy."
                link="https://github.com/Sumiksh/aimodels"
              />
            </AccordionContent>
          </AccordionItem>

          {/* Project 5: Full Stack Web Application */}
          <AccordionItem value="project5" className="border-b border-gray-200 dark:border-gray-800">
            <AccordionTrigger className="hover:no-underline py-4">
              <span className="text-lg font-semibold hover:text-purple-500 transition-colors">
                Full Stack E-Commerce Platform - MERN
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <PortfolioCard
                title="Full Stack E-Commerce Platform"
                description="A scalable web application featuring a decoupled architecture. Built with a React frontend for dynamic UI and a Node.js/Express backend for secure RESTful API management and MongoDB integration."
                link="https://your-live-demo-link.com" // Main Live Link
              />

              {/* Dual GitHub Links Section */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://github.com/Kush10022/pswFrontend.git"
                  target="_blank"
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 text-purple-500 rounded-lg transition-all text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faCode} className="text-xs" />
                  Frontend Repository
                </a>

                <a
                  href="https://github.com/BTS-2023-2024/Group_08"
                  target="_blank"
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 text-purple-500 rounded-lg transition-all text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faServer} className="text-xs" />
                  Backend Repository
                </a>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Project 6: Power BI Data Analytics */}
          <AccordionItem value="project6" className="border-b border-gray-200 dark:border-gray-800">
            <AccordionTrigger className="hover:no-underline py-4">
              <span className="text-lg font-semibold hover:text-purple-500 transition-colors">
                US Population Analytics Dashboard - Power BI
              </span>
            </AccordionTrigger>
            <AccordionContent>
                <div className="space-y-4">
                  {/* A 'Fancy' PDF Action Card */}
                  <div className="p-6 border-2 border-dashed border-purple-500/30 rounded-xl bg-purple-500/5 flex flex-col items-center text-center">
                    <FontAwesomeIcon icon={faFilePdf} className="text-4xl text-red-500 mb-3" />
                    <h4 className="font-bold text-lg">Full Analytics Report</h4>
                    <p className="text-sm text-gray-500 mb-4">View the complete US Population Power BI Dashboard in PDF format.</p>

                    <a
                      href="/USPopulation.pdf"
                      target="_blank"
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all font-medium shadow-lg shadow-purple-500/20"
                    >
                      Open Report PDF
                    </a>
                  </div>

                  <PortfolioCard
                    title="US Population Power BI Dashboard"
                    description="A detailed Power BI demographic study. Click the button above to view the full report documentation."
                    link="/USPopulation.pdf"
                  />
                </div>
              </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
