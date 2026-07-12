import * as db from "../utils/db";
import { INSERT_JOB } from "../queries/jobs.queries";

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechNova",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    experienceLevel: "Junior",
    salaryMin: 80000,
    salaryMax: 120000,
    currency: "KES",
    remote: true,
    skills: ["React", "TypeScript", "Next.js"],
    description: "Build responsive web applications using React and Next.js.",
  },
  {
    title: "Backend Developer",
    company: "CloudSync",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    experienceLevel: "Mid",
    salaryMin: 120000,
    salaryMax: 180000,
    currency: "KES",
    remote: true,
    skills: ["Node.js", "PostgreSQL", "Express"],
    description: "Develop scalable backend APIs and database solutions.",
  },
  {
    title: "Full Stack Developer",
    company: "ByteWorks",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    experienceLevel: "Mid",
    salaryMin: 140000,
    salaryMax: 220000,
    currency: "KES",
    remote: false,
    skills: ["React", "Node.js", "PostgreSQL"],
    description:
      "Work across frontend and backend to build modern web applications.",
  },
  {
    title: "DevOps Engineer",
    company: "SkyNet Africa",
    location: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salaryMin: 220000,
    salaryMax: 320000,
    currency: "KES",
    remote: true,
    skills: ["Docker", "Kubernetes", "AWS"],
    description: "Manage cloud infrastructure and CI/CD pipelines.",
  },
  {
    title: "UI/UX Designer",
    company: "Creative Labs",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    experienceLevel: "Mid",
    salaryMin: 90000,
    salaryMax: 140000,
    currency: "KES",
    remote: false,
    skills: ["Figma", "Adobe XD", "Wireframing"],
    description: "Design intuitive user interfaces and user experiences.",
  },
  {
    title: "Mobile App Developer",
    company: "AppNest",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    experienceLevel: "Junior",
    salaryMin: 100000,
    salaryMax: 150000,
    currency: "KES",
    remote: true,
    skills: ["React Native", "TypeScript", "Expo"],
    description: "Develop cross-platform mobile applications.",
  },
  {
    title: "Cybersecurity Analyst",
    company: "SecureNet",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    experienceLevel: "Mid",
    salaryMin: 150000,
    salaryMax: 230000,
    currency: "KES",
    remote: false,
    skills: ["Burp Suite", "Linux", "OWASP"],
    description: "Monitor and improve the organization's security posture.",
  },
  {
    title: "Penetration Tester",
    company: "HackShield",
    location: "Remote",
    employmentType: "Contract",
    experienceLevel: "Senior",
    salaryMin: 250000,
    salaryMax: 400000,
    currency: "KES",
    remote: true,
    skills: ["Burp Suite", "Nmap", "Python"],
    description: "Perform penetration testing and security assessments.",
  },
  {
    title: "Data Analyst",
    company: "Insight Analytics",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    experienceLevel: "Junior",
    salaryMin: 90000,
    salaryMax: 140000,
    currency: "KES",
    remote: true,
    skills: ["SQL", "Excel", "Power BI"],
    description: "Analyze business data and create insightful dashboards.",
  },
  {
    title: "Machine Learning Engineer",
    company: "AI Kenya",
    location: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salaryMin: 250000,
    salaryMax: 380000,
    currency: "KES",
    remote: true,
    skills: ["Python", "TensorFlow", "PyTorch"],
    description: "Build and deploy machine learning models.",
  },
  {
    title: "Software Engineer",
    company: "SafiriTech",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    experienceLevel: "Mid",
    salaryMin: 130000,
    salaryMax: 190000,
    currency: "KES",
    remote: false,
    skills: ["Java", "Spring Boot", "MySQL"],
    description: "Develop enterprise software solutions.",
  },
  {
    title: "QA Engineer",
    company: "QualitySoft",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    experienceLevel: "Junior",
    salaryMin: 70000,
    salaryMax: 120000,
    currency: "KES",
    remote: true,
    skills: ["Playwright", "Cypress", "JavaScript"],
    description: "Automate testing and ensure product quality.",
  },
  {
    title: "Cloud Engineer",
    company: "CloudEdge",
    location: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salaryMin: 220000,
    salaryMax: 330000,
    currency: "KES",
    remote: true,
    skills: ["AWS", "Terraform", "Docker"],
    description: "Build and maintain cloud infrastructure.",
  },
  {
    title: "Database Administrator",
    company: "DataCore",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salaryMin: 180000,
    salaryMax: 260000,
    currency: "KES",
    remote: false,
    skills: ["PostgreSQL", "SQL", "Backup"],
    description: "Manage databases, backups, and performance tuning.",
  },
  {
    title: "Product Manager",
    company: "LaunchPad",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    experienceLevel: "Mid",
    salaryMin: 170000,
    salaryMax: 250000,
    currency: "KES",
    remote: false,
    skills: ["Agile", "Scrum", "Product Strategy"],
    description: "Lead product planning and feature delivery.",
  },
  {
    title: "Technical Support Engineer",
    company: "HelpDesk Africa",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    experienceLevel: "Junior",
    salaryMin: 60000,
    salaryMax: 90000,
    currency: "KES",
    remote: false,
    skills: ["Linux", "Networking", "Customer Support"],
    description: "Provide technical support to enterprise customers.",
  },
  {
    title: "Site Reliability Engineer",
    company: "InfraTech",
    location: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salaryMin: 240000,
    salaryMax: 360000,
    currency: "KES",
    remote: true,
    skills: ["Kubernetes", "Go", "Prometheus"],
    description: "Improve reliability, monitoring, and scalability.",
  },
  {
    title: "Blockchain Developer",
    company: "CryptoHub",
    location: "Remote",
    employmentType: "Contract",
    experienceLevel: "Senior",
    salaryMin: 300000,
    salaryMax: 450000,
    currency: "KES",
    remote: true,
    skills: ["Solidity", "Ethereum", "Hardhat"],
    description: "Develop decentralized applications and smart contracts.",
  },
  {
    title: "Go Backend Developer",
    company: "ScaleAPI",
    location: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Mid",
    salaryMin: 180000,
    salaryMax: 270000,
    currency: "KES",
    remote: true,
    skills: ["Go", "PostgreSQL", "Docker"],
    description: "Build high-performance APIs and microservices using Go.",
  },
  {
    title: "Junior Web Developer",
    company: "Digital Horizon",
    location: "Nairobi, Kenya",
    employmentType: "Internship",
    experienceLevel: "Entry",
    salaryMin: 30000,
    salaryMax: 50000,
    currency: "KES",
    remote: false,
    skills: ["HTML", "CSS", "JavaScript"],
    description: "Assist in building and maintaining websites.",
  },
]; // More jobs...

const GET_COMPANY_ID = `
SELECT id
FROM companies
WHERE name = $1;
`;

async function seedJobs() {
  for (const job of jobs) {
    const result = await db.query(GET_COMPANY_ID, [job.company]);

    if (result.rows.length === 0) {
      throw new Error(`Company "${job.company}" not found.`);
    }

    const companyId = result.rows[0].id;

    await db.query(INSERT_JOB, [
      job.title, // $1
      companyId, // $2
      job.description, // $3
      job.location, // $4
      job.employmentType, // $5
      job.experienceLevel, // $6
      job.salaryMin, // $7
      job.salaryMax, // $8
      job.currency, // $9
      job.remote, // $10
      job.skills, // $11
      `https://careers.example.com/${job.title
        .toLowerCase()
        .replace(/\s+/g, "-")}`, // $12
    ]);
  }

  console.log(`${jobs.length} jobs inserted successfully.`);
}

seedJobs().catch(console.error);
