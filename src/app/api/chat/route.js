import { NextResponse } from 'next/server';

// ==== RESUME DATA SPLIT BY SECTIONS ====
const KEYWORDS_TO_SECTIONS = [
  { keys: ['certifications','cert', 'aws', 'linkedin', 'datacamp'], sections: ['certifications'] },
  { keys: ['experience', 'work', 'job', 'cibc', 'ontario', 'claret'], sections: ['experience'] },
  { keys: ['education', 'degree', 'seneca', 'georgian'], sections: ['education'] },
  { keys: ['projects','project', 'github', 'airbnb', 'portfolio', 'cnn', 'machine learning'], sections: ['projects'] },
  { keys: ['skills','skill', 'stack', 'tools'], sections: ['skills'] },
  { keys: ['summary', 'overview', 'profile'], sections: ['summary'] },
];

const RESUME = {
  summary: `
Recent graduate and motivated Software Developer & Data Engineer with experience in Python, SQL,
JavaScript, Node.js, Next.js, and cloud platforms (AWS, Azure, GCP). Skilled in building ETL pipelines,
BI dashboards, and scalable web applications, with hands-on experience in Power BI, Tableau, and
SQL-based data processing. Proven ability to collaborate with cross-functional teams, troubleshoot
complex issues, and deliver solutions aligned with business requirements.
  `,
  skills: `
Programming & Scripting: Python (Pandas, NumPy), SQL, JavaScript, Node.js, HTML/CSS, Next.js
Data Engineering & BI: Snowpipe in Snowflake, ETL pipelines, Databricks, Power BI, Tableau,
Data Modeling, SQL Server, PostgreSQL, MongoDB
Cloud Platforms: AWS (EC2, Cognito), Azure, GCP, Firebase
Dev Tools & Collaboration: Jira, Confluence, Git, Agile/Waterfall
Testing & Quality: Unit testing, UAT, issue tracking, troubleshooting, documentation
  `,
  education: `
Honours Bachelor of Technology Software Development — Seneca Polytechnic (Aug 2025)
Diploma Computer Programming — Seneca Polytechnic (Jan 2023)
Diploma Electrical Engineering — Georgian College (Jan 2017)
  `,
  experience: `
Ontario Public Services (TBS Branch), Junior Programmer Co-op (Jan–May 2025)
Developed Python-based ETL scripts to transform SQL Server data, generating Power BI datasets.
Conducted UAT, tracked defects, coordinated with teams/vendors.
Automated ingestion into Azure SQL DB via ADF pipelines (70% time saved).
Designed Spark SQL models in Databricks to improve executive reports.
CIBC, Android Developer Co-op (May–Aug 2024)
Implemented MVVM architecture for gamification feature.
Integrated Adobe Analytics to track user engagement.
Documented workflows in Confluence; tracked UAT in Jira.
Claret Asset Management, IT Specialist (Jun 2022–Jan 2023)
Replaced SSIS pipelines with Python ETL.
Worked with PostgreSQL + MongoDB for transformations.
Built Snowpipes in Snowflake for continuous ingestion.
Delivered Power BI dashboards; automated weekly downloads saving 100 hrs/month.
  `,
  projects: `
Seattle Airbnb Recommendation (Apr 2024)
• Built Tableau dashboards on pricing trends, geospatial/time-series insights.

Web Portfolio (May 2024) — Vercel + GitHub
• Responsive React/Next.js portfolio showcasing experience & skills.

Sports Motion Detection & Tracking (Jun 2025)
• Video pipeline using CV (frame differencing, viewport tracking).

Machine Learning Projects (Jun 2025) — GitHub
• Regression models for house price prediction.
• Image classification (Cats vs Dogs) using Logistic Regression, KNN, CNN (TensorFlow/Keras).
  `,
  certifications: `
AWS Certified Cloud Practitioner (In Progress — S3, Glue, EMR, Lambda, Athena)
LinkedIn: Spark SQL & DataFrames, Azure Databricks Essentials, Learning Apache Airflow
DataCamp: OOP in Python, Intro to Python
  `,
};


// ==== SECTION PICKER ====
function pickSections(userMsg) {
  const q = (userMsg || '').toLowerCase();
  const selected = new Set();
  
  for (const rule of KEYWORDS_TO_SECTIONS) {
    if (rule.keys.some(k => q.includes(k))) {
      rule.sections.forEach(s => selected.add(s));
    }
  }
  return Array.from(selected);
}

// ==== MAIN HANDLER ====
export async function POST(request) {
  try {
    const { message } = await request.json();
    // Find the sections that match the user's message
    const sections = pickSections(message);
    console.log('Picked sections:', sections);
    // Generate response based on hardcoded section responses
    const responses = sections.map(section => RESUME[section] || 'This information is not available in the resume.');
    // Combine all responses for all matched sections
    const reply = responses.join('\n\n') || 'No relevant sections found in the resume.';
    return NextResponse.json({ reply, sectionsUsed: sections });
  } catch (error) {
    console.error('Error processing message:', error);
    return NextResponse.json({ reply: 'Error processing message.' }, { status: 400 });
  }
}

//*****THIS CODE FOR CHATBOT WITH OPENROUTER API *****//
// // ==== SIMPLE ROUTING MAP ==== // extra functioniliy for 
// const KEYWORDS_TO_SECTIONS = [
//   { keys: ['certifications','cert', 'aws', 'linkedin', 'datacamp'], sections: ['certifications'] },
//   { keys: ['experience', 'work', 'job', 'cibc', 'ontario', 'claret'], sections: ['experience'] },
//   { keys: ['education', 'degree', 'seneca', 'georgian'], sections: ['education'] },
//   { keys: ['projects','project', 'github', 'airbnb', 'portfolio', 'cnn', 'machine learning'], sections: ['projects'] },
//   { keys: ['skills','skill', 'stack', 'tools'], sections: ['skills'] },
//   { keys: ['summary', 'overview', 'profile'], sections: ['summary'] },
// ];

// // ==== SECTION PICKER ====
// function pickSections(userMsg) {
//   const q = (userMsg || '').toLowerCase();
//   console.log('User message for section picking:', q);
//   const selected = new Set();
//   for (const rule of KEYWORDS_TO_SECTIONS) {
//     // console.log('Checking rule:', rule);
//     if (rule.keys.some(k => q.includes(k))) {
//       rule.sections.forEach(s => selected.add(s));
//     }
//   }
//   // Only return matched sections, no fallback
//   return Array.from(selected);
// }

// // ==== BUILD PROMPT ====
// function buildSystemPrompt(sectionNames) {
//   const joined = sectionNames
//     .filter(name => RESUME[name])
//     .map(name => `### ${name.toUpperCase()}\n${RESUME[name].trim()}`)
//     .join('\n\n');

//   return `
// You are an assistant that MUST answer only from the provided resume sections.
// If the answer is not in the resume, reply exactly:
// "This information is not available in the resume."

// RESUME CONTEXT:
// ${joined}
// `;
// }

// // ==== MAIN HANDLER ====
// export async function POST(request) {
//   try {
//     const { message } = await request.json();
//     const apiKey = process.env.OPENROUTER_API_KEY;

//     const sections = pickSections(message);
//     const systemContent = buildSystemPrompt(sections);

//     const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'deepseek/deepseek-chat-v3.1:free',
//         messages: [
//           { role: 'system', content: systemContent },
//           { role: 'user', content: message },
//         ],
//         temperature: 0.2,
//         max_tokens: 600,
//       }),
//     });

//     const data = await res.json();
//     const reply = data.choices?.[0]?.message?.content || 'No response';
//     return NextResponse.json({ reply, sectionsUsed: sections });
//   } catch (error) {
//     console.error('Error processing message:', error);
//     return NextResponse.json({ reply: 'Error processing message.' }, { status: 400 });
//   }
// }