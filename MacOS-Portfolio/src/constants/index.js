const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio",
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles",
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact",
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills",
    icon: "terminal.png",
    canOpen: true,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "2025",
    title: "System Design Interview: Architecting a Scalable Notification Service with Spring Boot",
    image: "/images/blog1.png",
    link: "https://medium.com/but-it-works-on-my-machine/system-design-interview-architecting-a-scalable-notification-service-with-spring-boot-d2edee229a43",
  },
  {
    id: 2,
    date: "2025",
    title: "Order Events Arrive Out of Sequence: System Design Deep Dive on Event Ordering and Kafka",
    image: "/images/blog2.png",
    link: "https://medium.com/@codefarm0/order-events-arrive-out-of-sequence-system-design-deep-dive-on-event-ordering-and-kafka-41a0ad4e585a",
  },
  {
    id: 3,
    date: "2025",
    title: "How to Optimize a Database Table with Tens of Millions of Records",
    image: "/images/blog3.png",
    link: "https://medium.com/@umeshcapg/how-to-optimize-a-database-table-with-tens-of-millions-of-records-a-practical-guide-for-developers-fafe525aefdf",
  },
];

const techStack = [
  {
    category: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript"],
  },
  {
    category: "Frontend",
    items: ["React", "React Native", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "FastAPI", "Spring Boot", "REST APIs", "GraphQL"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Redshift"],
  },
  {
    category: "AI/ML",
    items: ["LangChain", "spaCy", "NLTK", "Scikit-learn", "TensorFlow", "RAG", "Prompt Engineering"],
  },
  {
    category: "Cloud",
    items: ["AWS EC2", "AWS Glue", "AWS EMR", "AWS SageMaker", "GCP", "Azure"],
  },
  {
    category: "DevOps",
    items: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Apache Spark"],
  },
  {
    category: "Testing",
    items: ["Jest", "Unit testing", "Integration testing"],
  },
];

const socials = [
  {
    id: 1,
    text: "GitHub",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/Sandeep-2412",
  },
  {
    id: 2,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/venkata-sandeep-macha-8a9ba8229/",
  },
  {
    id: 3,
    text: "Instagram",
    icon: "/icons/instagram.svg",
    bg: "#e1306c",
    link: "https://www.instagram.com/__sandeep__2412/",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "AI-Powered Invoice Generator",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 1,
          name: "AI Invoice Generator Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Engineered invoice extraction workflows using Llama integrated through AI SDKs to process stored transaction data.",
            "Integrated automation using Grok through DevSecOps pipelines to analyze invoice metadata stored in NoSQL databases, reducing manual effort by 70%.",
            "Developed frontend interaction layers using React to visualize processed invoice data in a responsive and user-friendly interface.",
            "This project focuses on automating invoice workflows and improving operational efficiency through AI-driven processing.",
          ],
        },
        {
          id: 2,
          name: "live-demo",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://ai-invoice-generator-six.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "invoice-generator.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-1.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/Sandeep-2412",
          position: "top-60 right-20",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "AI Resume Analyzer",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "AI Resume Analyzer Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "AI Resume Analyzer is a smart tool that helps you perfect your resume with instant feedback.",
            "Instead of guessing what recruiters want, you get AI-powered insights on keywords, formatting, and overall impact.",
            "Think of it like having a career coach—pointing out strengths, fixing weaknesses, and boosting your chances of landing interviews.",
            "It's built with Next.js and Tailwind, so it runs fast, looks professional, and works seamlessly on any device.",
          ],
        },
        {
          id: 2,
          name: "live-demo",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://ai-resume-analyzer-mu-gray.vercel.app/",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "ai-resume-analyzer.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/project-2.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 left-5",
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "Food Delivery App",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Food Delivery App Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Our Food Delivery App is a fast and convenient way to order meals from your favorite restaurants.",
            "Instead of making calls or waiting in line, you can browse menus, customize orders, and track deliveries in real time.",
            "Think of it like having your favorite restaurants in your pocket—ready to deliver anytime, anywhere.",
            "It’s built with React Native, so it works smoothly on both iOS and Android with a clean, modern design.",
          ],
        },
        {
          id: 2,
          name: "food-delivery-app.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/LKrX390fJMw?si=cExkuVhf2DTV9G2-",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "food-delivery-app.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-3.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 right-20",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/pic_in_suit-removebg.png",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "images/WhatsApp Image 2026-09-27 at 3.52.43 PM.jpeg",
    },
    {
      id: 3,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/pic_in_suit-removebg.png",
      description: [
        "Hey! I’m Sandeep 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
        "I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.",
        "I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.",
        "Outside of dev work, you’ll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
      ],
    },
    {
      id: 4,
      name: "experience.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 right-5",
      subtitle: "Work Experience",
      description: [
        "Software Engineer @ IFAS, UF (Sep 2024 – Present): Built ML data workflows in Python with spaCy, NLTK, and Scikit-learn on AWS EC2, improving training efficiency by 25%. Engineered Java Spring Boot microservices across 15+ endpoints, cutting data retrieval time by 85%. Built a LangChain RAG pipeline over PostgreSQL, reducing hallucination rate by 42%.",
        "Cloud Virtual Intern @ APSCHE – AWS Academy Program (Jan 2024 – May 2024): Architected ETL pipelines with AWS Glue and Redshift, improving throughput by 37% and cutting query latency by 26%. Automated batch workflows with Apache Spark on AWS EMR, reducing batch processing time by 33%. Deployed RESTful APIs on AWS EC2 with GitHub Actions CI/CD, achieving zero failed deployments.",
        "AI/ML Intern @ APSCHE – AWS Academy Program (Sep 2023 – Nov 2023): Built a retail chatbot using spaCy and NLTK for NLP intent classification, improving customer interaction efficiency by 35%. Implemented anomaly detection with Scikit-learn and TensorFlow on AWS SageMaker, reducing diagnostic anomalies by 20%. Containerized ML workloads with Docker and Kubernetes, achieving zero failed deployments across 3 model versions.",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      href: "/files/Venkata_Sandeep_Macha_Portfolio_Resume.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };