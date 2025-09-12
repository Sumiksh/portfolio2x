import React from "react";

export default function PortfolioCard({ title, description, link }) {
  return (
    <div className="border rounded-lg p-6 shadow-md bg-background">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4 text-muted-foreground">{description}</p>
      {link && (
        <a href={link} className="text-primary underline">
          View Project
        </a>
      )}
    </div>
  );
}
