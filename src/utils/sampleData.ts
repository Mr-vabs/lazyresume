import type { ResumeData } from '../types/ResumeData';

export const initialResumeData: ResumeData = {
  personalInfo: {
    name: "Jake Ryan",
    phone: "123-456-7890",
    email: "jake@su.edu",
    socials: [
      { id: "soc-1", label: "LinkedIn", url: "linkedin.com/in/jake" },
      { id: "soc-2", label: "GitHub", url: "github.com/jake" }
    ],
  },
  education: [
    {
      id: "edu-1",
      school: "Southwestern University",
      degree: "Bachelor of Arts in Computer Science, Minor in Business",
      location: "Georgetown, TX",
      startDate: "Aug. 2018",
      endDate: "May 2021"
    },
    {
      id: "edu-2",
      school: "Blinn College",
      degree: "Associate's in Liberal Arts",
      location: "Bryan, TX",
      startDate: "Aug. 2014",
      endDate: "May 2018"
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "Undergraduate Research Assistant",
      title: "Texas A&M University",
      location: "College Station, TX",
      startDate: "June 2020",
      endDate: "Present",
      description: [
        "Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems",
        "Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data",
        "Explored ways to visualize GitHub collaboration in a classroom setting"
      ]
    },
    {
      id: "exp-2",
      company: "Information Technology Support Specialist",
      title: "Southwestern University",
      location: "Georgetown, TX",
      startDate: "Sep. 2018",
      endDate: "Present",
      description: [
        "Communicate with managers to set up computers used on campus",
        "Assess and troubleshoot computer problems brought by students, faculty and staff",
        "Maintain upkeep of computers, classroom equipment, and 200 printers across campus"
      ]
    },
    {
      id: "exp-3",
      company: "Artificial Intelligence Research Assistant",
      title: "Southwestern University",
      location: "Georgetown, TX",
      startDate: "May 2019",
      endDate: "July 2019",
      description: [
        "Explored methods to generate video game dungeons based off of The Legend of Zelda",
        "Developed a game in Java to test the generated dungeons",
        "Contributed 50K+ lines of code to an established codebase via Git",
        "Conducted a human subject study to determine which video game dungeon generation technique is enjoyable"
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "Gitlytics",
      technologies: "Python, Flask, React, PostgreSQL, Docker",
      startDate: "June 2020",
      endDate: "Present",
      description: [
        "Developed a full-stack web application using with Flask serving a REST API with React as the frontend",
        "Implemented GitHub OAuth to get data from user's repositories",
        "Visualized GitHub data to show collaboration",
        "Used Celery and Redis for asynchronous tasks"
      ]
    },
    {
      id: "proj-2",
      name: "Simple 8-bit Assembler",
      technologies: "C",
      startDate: "Jan. 2019",
      endDate: "May 2019",
      description: [
        "Developed an assembler to convert assembly to machine code",
        "Supported 34 instructions"
      ]
    }
  ],
  skills: [
    {
      id: "skill-1",
      category: "Languages",
      items: "Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R"
    },
    {
      id: "skill-2",
      category: "Frameworks",
      items: "React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI"
    },
    {
      id: "skill-3",
      category: "Developer Tools",
      items: "Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse"
    },
    {
      id: "skill-4",
      category: "Libraries",
      items: "pandas, NumPy, Matplotlib"
    }
  ],
  sectionOrder: ["education", "experience", "projects", "skills"]
};