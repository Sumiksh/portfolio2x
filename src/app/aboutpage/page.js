'use client';
import { Navbar } from "@/components/ui/navbar";
import PortfolioCard from "@/components/PortfolioCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function AboutPage() {
  // const { theme, setTheme } = useTheme();
  // const isDark = theme === "dark";

  return (
    <div className="min-h-screen w-full transition-colors duration-300 bg-background text-foreground">
      <Navbar/>
      <div className="h-20" />
      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">My Portfolio</h1>
        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="project1">
            <AccordionTrigger>Old Portfolio Website</AccordionTrigger>
            <AccordionContent>
              <PortfolioCard
                title="Old Portfolio Website"
                description="Built interactive Tableau dashboards analyzing Seattle Airbnb data, including pricing trends by ZIP code, bed-room count, and historical listings."
                link="https://portfolio-five-gamma-25.vercel.app/"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="project2">
            <AccordionTrigger>Seattle Airbnb Recommendation - Tableau</AccordionTrigger>
            <AccordionContent>
              <PortfolioCard
                title="Seattle Airbnb Recommendation"
                description="Developed a responsive personal portfolio website using React, showcasing experience, education, projects, and skills with clean navigation."
                link=""
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="project3">
            <AccordionTrigger>Sports Motion Detection and Tracking</AccordionTrigger>
            <AccordionContent>
              <PortfolioCard
                title="Sports Motion Detection and Tracking"
                description="Built a video processing pipeline using classical computer vision techniques to detect and track motion across sports footage."
                link="https://github.com/Sumiksh/dps920finalproject.git"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="project4">
            <AccordionTrigger>Machine Learning Projects: Regression and Image Classification (AI/ML Projects)</AccordionTrigger>
            <AccordionContent>
              <PortfolioCard
                title="Machine Learning Projects: Regression and Image Classification (AI/ML Projects)"
                description="Predicted housing prices using regression techniques and classified images using logistic regression, KNN, and convolutional neural networks (CNNs) in Python."
                link="https://github.com/Sumiksh/aimodels"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
