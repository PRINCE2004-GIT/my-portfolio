export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type SkillCategory = {
  id: string;
  title: string;
  note: string;
  items: { name: string; context?: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    note: "Java is the primary language across the internship and the featured project.",
    items: [
      { name: "Java", context: "Internship, Project" },
      { name: "Python" },
      { name: "C" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    note: "Interfaces built with standard web technologies, with attention to responsive layouts.",
    items: [
      { name: "HTML5", context: "Internship, Project" },
      { name: "CSS3", context: "Internship, Project" },
      { name: "JavaScript", context: "Internship, Project" },
      { name: "Responsive Web Design", context: "Internship, Project" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    note: "Server-side logic and frontend integration written in Java.",
    items: [{ name: "Java", context: "Internship, Project" }],
  },
  {
    id: "database",
    title: "Database",
    note: "Relational data modelling and CRUD operations against MySQL.",
    items: [
      { name: "SQL", context: "Internship, Project" },
      { name: "MySQL", context: "Project" },
    ],
  },
  {
    id: "core",
    title: "Core Computer Science",
    note: "The foundations applied while building and debugging applications.",
    items: [
      { name: "Object-Oriented Programming", context: "Internship" },
      { name: "Data Structures and Algorithms", context: "Internship" },
      { name: "DBMS", context: "Project" },
      { name: "Operating Systems" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    note: "Day-to-day development environment.",
    items: [{ name: "Git" }, { name: "GitHub" }, { name: "Visual Studio Code" }],
  },
];

export const featuredProject = {
  title: "Online Electricity Bill Payment System",
  institution: "Bengal College of Engineering & Technology",
  duration: "August 2025 to November 2025",
  stack: ["Java", "HTML5", "CSS3", "JavaScript", "SQL", "MySQL"],
  summary:
    "A web-based electricity bill payment system with separate customer and administrative functionality, backed by a MySQL database.",
  customer: [
    "Customer registration",
    "Login system",
    "Form validation",
    "Electricity bill viewing",
    "Online payment functionality",
    "Receipt download",
  ],
  admin: [
    "Bill generation",
    "Customer record management",
    "Billing record management",
    "Payment record management",
    "CRUD operations",
  ],
  technical: [
    "Frontend and backend integration",
    "MySQL database integration",
    "Database management",
    "Debugging and validation",
    "Responsive design",
  ],
  flow: ["Register", "Log in", "View bill", "Pay online", "Download receipt"],
};

export const experience = {
  role: "Java Full Stack Developer Intern",
  organization: "AICTE-EduSkills Java Full Stack Internship",
  duration: "January 2026 to March 2026",
  points: [
    "Developed responsive web application components using Java, HTML5, CSS3 and JavaScript.",
    "Integrated frontend, backend and SQL database components.",
    "Applied OOP, Data Structures and problem-solving concepts.",
    "Implemented CRUD operations.",
    "Followed basic Software Development Life Cycle practices.",
    "Participated in application implementation and development.",
  ],
};

export const education = [
  {
    level: "B.Tech, Computer Science Engineering",
    school: "Bengal College of Engineering & Technology, Durgapur, West Bengal",
    year: "Expected 2027",
    score: "CGPA 7.18",
  },
  {
    level: "Class 12",
    school: "S. S. Inter College, Takia, Sasaram, Rohtas",
    year: "2023",
    score: "60.2%",
  },
  {
    level: "Class 10",
    school: "S S +2 School, Takia, Sasaram, Rohtas",
    year: "2020",
    score: "62.2%",
  },
];
