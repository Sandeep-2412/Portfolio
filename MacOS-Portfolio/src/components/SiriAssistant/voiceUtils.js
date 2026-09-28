/**
 * Voice Recognition and Text-to-Speech utilities
 * Handles browser compatibility for Web Speech API and Web Audio API
 */

const PROFILE = {
  name: 'Sandeep Macha',
  title: 'Software Engineer and AI/ML Engineer',
  summary:
    'I am Sandeep Macha, a software engineer focused on full-stack development, AI/ML, and cloud technologies. I am currently pursuing my Master of Science in Computer and Information Science and Engineering at the University of Florida with a strong interest in building intelligent, scalable products.',
  education: [
    'I am pursuing a Master of Science in Computer and Information Science and Engineering at the University of Florida with a 3.74 GPA.',
    'I completed my Bachelor of Technology in Computer Science Engineering at Sree Vidyanikethan Engineering College with a 9.35 GPA.',
  ],
  experience: [
    'I currently work as a Software Engineer at the University of Florida, where I build and improve digital systems and applications.',
    'I have also worked as a Cloud Virtual Intern with the APSCHE AWS Academy Program and as an AI/ML Intern, building practical solutions around cloud and machine learning workflows.',
  ],
  skills: [
    'My technical stack includes Python, Java, JavaScript, TypeScript, SQL, React, Node.js, FastAPI, REST APIs, and cloud platforms such as AWS, GCP, and Microsoft Azure.',
    'I work with Docker, Kubernetes, CI/CD pipelines, and modern AI tools including LangChain and prompt engineering for LLM-based solutions.',
  ],
  projects: [
    'My most notable projects include an AI-Powered Invoice Generator, which uses Llama and React to automate invoice extraction and processing workflows, reducing manual effort by about 70 percent.',
    'I also built an AI Resume Analyzer that helps users improve their resumes with AI-powered feedback on structure, impact, and keywords.',
  ],
  strengths: [
    'My strengths are full-stack development, applied AI, cloud architecture, and building user-focused solutions that combine technical depth with business impact.',
    'I enjoy turning unclear ideas into polished products, especially when the work sits at the intersection of software engineering and intelligent automation.',
  ],
  contact: [
    'You can reach me by email at v.macha@ufl.edu.',
    'You can also connect with me on LinkedIn or visit my GitHub profile, both linked on this portfolio.',
  ],
  achievements: [
    'I focus on turning practical business problems into AI-enabled workflows that improve efficiency and user experience.',
    'My work combines system design, product thinking, and strong implementation across the full stack.',
  ],
};

const RESUME_FACTS = [
  { key: 'summary', type: 'about', fact: PROFILE.summary },
  ...PROFILE.education.map((fact) => ({ key: 'education', type: 'education', fact })),
  ...PROFILE.experience.map((fact) => ({ key: 'experience', type: 'experience', fact })),
  ...PROFILE.skills.map((fact) => ({ key: 'skills', type: 'skills', fact })),
  ...PROFILE.projects.map((fact) => ({ key: 'projects', type: 'projects', fact })),
  ...PROFILE.strengths.map((fact) => ({ key: 'strengths', type: 'strengths', fact })),
  ...PROFILE.contact.map((fact) => ({ key: 'contact', type: 'contact', fact })),
  ...PROFILE.achievements.map((fact) => ({ key: 'achievements', type: 'achievements', fact })),
];

const QUESTION_RULES = [
  { keywords: ['who', 'about', 'yourself', 'introduce'], type: 'about' },
  { keywords: ['education', 'school', 'college', 'university', 'degree', 'masters', 'bachelor', 'gpa'], type: 'education' },
  { keywords: ['experience', 'job', 'work', 'intern', 'career', 'role'], type: 'experience' },
  { keywords: ['skill', 'skills', 'stack', 'technology', 'tools', 'languages', 'tech', 'backend', 'frontend', 'cloud', 'aws', 'azure', 'gcp'], type: 'skills' },
  { keywords: ['project', 'portfolio', 'demo', 'built', 'work sample', 'invoice', 'resume analyzer'], type: 'projects' },
  { keywords: ['strength', 'expert', 'specialize', 'good at', 'best at', 'expertise'], type: 'strengths' },
  { keywords: ['contact', 'email', 'linkedin', 'github', 'reach', 'connect'], type: 'contact' },
  { keywords: ['achievement', 'accomplishment', 'impact', 'success'], type: 'achievements' },
];

const scoreMatch = (query, factText) => {
  const normalizedQuery = query.toLowerCase();
  const normalizedFact = factText.toLowerCase();
  let score = 0;

  for (const keyword of normalizedQuery.split(/\s+/)) {
    if (!keyword || keyword.length < 3) continue;
    if (normalizedFact.includes(keyword)) score += 2;
  }

  for (const rule of QUESTION_RULES) {
    const matchingKeywords = rule.keywords.filter((keyword) => normalizedQuery.includes(keyword));
    if (matchingKeywords.length && rule.type === 'skills' && /aws|azure|gcp|cloud|docker|kubernetes|react|python|java|javascript|typescript|sql|node|fastapi/.test(normalizedQuery)) {
      score += 4;
    }
    if (matchingKeywords.length && rule.keywords.some((keyword) => normalizedFact.includes(keyword))) {
      score += 3;
    }
    if (matchingKeywords.length && rule.type === 'about' && normalizedQuery.includes('you')) {
      score += 2;
    }
  }

  return score;
};

const getResumeAnswer = (query) => {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return PROFILE.summary;

  const rankedFacts = RESUME_FACTS.map((entry) => ({
    ...entry,
    score: scoreMatch(normalizedQuery, entry.fact),
  })).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score);

  if (rankedFacts.length > 0) {
    const topFact = rankedFacts[0].fact;
    return topFact;
  }

  const queryLower = normalizedQuery.toLowerCase();
  if (queryLower.includes('what') && (queryLower.includes('do') || queryLower.includes('work'))) {
    return 'Based on my resume, I work at the intersection of software engineering, AI/ML, and cloud solutions, with experience in full-stack development and product-focused engineering.';
  }

  if (queryLower.includes('where') && (queryLower.includes('study') || queryLower.includes('school') || queryLower.includes('college'))) {
    return PROFILE.education[0];
  }

  return 'Based on my resume, I focus on full-stack engineering, AI/ML, and cloud technologies. I can speak about my education, projects, experience, skills, and how to contact me.';
};

const getPreferredVoice = () => {
  const voices = window.speechSynthesis.getVoices();

  const preferredVoice =
    voices.find((v) => /siri/i.test(v.name)) ||
    voices.find((v) => v.name === 'Samantha') ||
    voices.find((v) => /karen|moira|tessa/i.test(v.name)) ||
    voices.find((v) => v.lang === 'en-US' && v.localService) ||
    voices.find((v) => v.lang && v.lang.startsWith('en')) ||
    voices[0] ||
    null;

  return preferredVoice;
};

// Text-to-Speech utility
export const speakText = (text, onEnd = () => {}) => {
  if (!('speechSynthesis' in window)) {
    console.error('Text-to-Speech not supported in this browser');
    onEnd();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.92;
  utterance.pitch = 1.05;
  utterance.volume = 0.9;

  const applyVoice = () => {
    const preferredVoice = getPreferredVoice();
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    applyVoice();
  } else {
    const handleVoicesChanged = () => {
      applyVoice();
      window.speechSynthesis.onvoiceschanged = null;
    };

    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
  }

  utterance.onend = () => {
    onEnd();
  };

  utterance.onerror = (error) => {
    console.error('Speech synthesis error:', error);
    onEnd();
  };

  window.speechSynthesis.speak(utterance);
};

// Speech Recognition utility
export const startListening = (onResult, onError, onEnd) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error('Speech Recognition not supported in this browser');
    onError('Speech Recognition not supported');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let transcript = '';

  recognition.onstart = () => {
    transcript = '';
  };

  recognition.onresult = (event) => {
    transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcriptSegment = event.results[i][0].transcript;
      transcript += transcriptSegment;
    }
    onResult(transcript, event.results[event.results.length - 1].isFinal);
  };

  recognition.onerror = (event) => {
    onError(event.error);
  };

  recognition.onend = () => {
    onEnd(transcript);
  };

  recognition.start();
  return recognition;
};

// Stop listening
export const stopListening = (recognition) => {
  if (recognition) {
    recognition.stop();
  }
};

const _localFallback = (userQuery) => {
  const query = userQuery.trim();
  if (!query) return PROFILE.summary;
  const q = query.toLowerCase();
  if (/hello|hi\b|hey/.test(q))
    return "Hi there! Ask me anything about Sandeep - his background, skills, projects, or how to reach him.";
  if (/what can you do|help|what do you know/.test(q))
    return "I can answer questions about Sandeep’s education, experience, skills, projects, and contact info.";
  return getResumeAnswer(query);
};

// Calls the LangChain RAG backend; falls back to local data if the server is unreachable.
export const generateResponse = async (userQuery) => {
  const query = userQuery.trim();
  if (!query) return PROFILE.summary;

  try {
    const apiBase = import.meta.env.VITE_API_URL || "";
    const res = await fetch(apiBase + "/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: query }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    return data.answer;
  } catch (err) {
    return _localFallback(query);
  }
};
