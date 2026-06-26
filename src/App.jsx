import React, { useState, useEffect, useRef } from 'react';

// Icons as pure SVG components for visual styling
const Icons = {
  engineering: () => (
    <svg className="w-8 h-8 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  business: () => (
    <svg className="w-8 h-8 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  law: () => (
    <svg className="w-8 h-8 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17m0 0H9m3 0h3M12 3L4 7.5M12 3l8 4.5M4 7.5c0 3 1.5 6 4.5 6s4.5-3 4.5-6M20 7.5c0 3-1.5 6-4.5 6s-4.5-3-4.5-6M8.5 13.5v3m7-3v3M6 19.5h12" />
    </svg>
  ),
  medicine: () => (
    <svg className="w-8 h-8 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5h6m-3-3v6" />
    </svg>
  ),
  design: () => (
    <svg className="w-8 h-8 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  psychology: () => (
    <svg className="w-8 h-8 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17m-7-9c0 4.5 3 8 7 8s7-3.5 7-8M8 6h8" />
    </svg>
  ),
  economics: () => (
    <svg className="w-8 h-8 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-.554-8.243-1.557m0 0A8.96 8.96 0 003 12c0 1.298.274 2.53.768 3.649m0 0A11.95 11.95 0 0112 14c2.998 0 5.74.554 8.243 1.557m0 0A8.96 8.96 0 0021 12c0-1.298-.274-2.53-.768-3.649" />
    </svg>
  ),
  architecture: () => (
    <svg className="w-8 h-8 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9m-9 0H3v-9.75A1.5 1.5 0 014.5 9.75h15A1.5 1.5 0 0121 11.25V21m-9-18l9 6.75L3 9.75 12 3z" />
    </svg>
  ),
  education: () => (
    <svg className="w-8 h-8 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 019.882 5.844 50.56 50.56 0 00-2.658.813m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M12 13.489v6.527m0 0L8.25 16.5m3.75 3.517l3.75-3.517" />
    </svg>
  ),
  liberalarts: () => (
    <svg className="w-8 h-8 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
};

const MAJORS_DATA = [
  { id: 'engineering', label: 'Engineering & CS', desc: 'Algorithms, software architectures, and systems.', icon: Icons.engineering, tint: 'rgba(6, 182, 212, 0.08)', textTint: 'text-cyan-400', borderTint: 'rgba(6,182,212,0.3)', topicCount: 7 },
  { id: 'business', label: 'Business & Management', desc: 'Strategy, operations, finance, and marketing.', icon: Icons.business, tint: 'rgba(232, 212, 154, 0.08)', textTint: 'text-[#e8d49a]', borderTint: 'rgba(232,212,154,0.3)', topicCount: 8 },
  { id: 'law', label: 'Law', desc: 'Jurisprudence, contracts, and constitutional systems.', icon: Icons.law, tint: 'rgba(159, 18, 57, 0.08)', textTint: 'text-rose-400', borderTint: 'rgba(159,18,57,0.3)', topicCount: 7 },
  { id: 'medicine', label: 'Medicine & Health', desc: 'Clinical practice, biology, and health systems.', icon: Icons.medicine, tint: 'rgba(16, 185, 129, 0.08)', textTint: 'text-emerald-400', borderTint: 'rgba(16,185,129,0.3)', topicCount: 8 },
  { id: 'design', label: 'Arts & Design', desc: 'Visual communication, UX, and fine arts.', icon: Icons.design, tint: 'rgba(20, 184, 166, 0.08)', textTint: 'text-teal-400', borderTint: 'rgba(20,184,166,0.3)', topicCount: 7 },
  { id: 'psychology', label: 'Psychology', desc: 'Human behavior, cognitive sciences, and therapy.', icon: Icons.psychology, tint: 'rgba(168, 85, 247, 0.08)', textTint: 'text-purple-400', borderTint: 'rgba(168,85,247,0.3)', topicCount: 8 },
  { id: 'economics', label: 'Economics', desc: 'Markets, policy, resource allocation, and finance.', icon: Icons.economics, tint: 'rgba(249, 115, 22, 0.08)', textTint: 'text-orange-400', borderTint: 'rgba(249,115,22,0.3)', topicCount: 8 },
  { id: 'architecture', label: 'Architecture', desc: 'Spatial design, structural aesthetics, and urban planning.', icon: Icons.architecture, tint: 'rgba(120, 113, 108, 0.08)', textTint: 'text-stone-400', borderTint: 'rgba(120,113,108,0.3)', topicCount: 8 },
  { id: 'education', label: 'Education', desc: 'Pedagogy, learning science, and academic systems.', icon: Icons.education, tint: 'rgba(132, 204, 22, 0.08)', textTint: 'text-lime-400', borderTint: 'rgba(132,204,22,0.3)', topicCount: 8 },
  { id: 'liberalarts', label: 'Liberal Arts', desc: 'Humanities, critical thinking, philosophy, and history.', icon: Icons.liberalarts, tint: 'rgba(244, 63, 94, 0.08)', textTint: 'text-pink-400', borderTint: 'rgba(244,63,94,0.3)', topicCount: 8 }
];

const CURRICULUM_DATA = {
  'engineering->business': [
    {
      name: 'Unit Economics',
      desc: 'The math behind whether a business is actually working.',
      level: 'Beginner',
      resources: [
        { type: 'Video', label: 'Khan Academy Microeconomics', url: '#' },
        { type: 'Article', label: "Paul Graham: Do Things That Don't Scale", url: '#' },
        { type: 'Book', label: 'The Lean Startup (Ries)', url: '#' }
      ],
      whyMatters: 'As an engineer, you build features that cost computational power and developer hours. Understanding unit economics helps you evaluate whether your infrastructure decisions make the company money or drain its capital. It connects API latency directly to customer acquisition costs and lifetime value.'
    },
    {
      name: 'Venture Funding Basics',
      desc: 'How startups raise money and what it costs them.',
      level: 'Beginner',
      resources: [
        { type: 'Video', label: 'YC Startup School: Funding 101', url: '#' },
        { type: 'Book', label: 'Venture Deals by Brad Feld', url: '#' }
      ],
      whyMatters: 'Knowing how startups raise money gives you insight into the timeline and milestones your software development team needs to hit. It helps you understand why features are prioritized before a funding round and what dilution means for your employee stock options. This knowledge prepares you to participate in high-level roadmap decisions.'
    },
    {
      name: 'Reading a P&L',
      desc: 'Understanding profit & loss statements.',
      level: 'Intermediate',
      resources: [
        { type: 'Video', label: 'HBR Finance Basics', url: '#' },
        { type: 'Book', label: 'Financial Intelligence for IT', url: '#' }
      ],
      whyMatters: 'A profit and loss statement shows the financial health of the code you write. By reading a P&L, you can see how research and development costs affect the operating margin. It helps you justify refactoring or architecture migration proposals to non-technical executives in terms of direct savings.'
    },
    {
      name: 'Go-To-Market Strategy',
      desc: 'How products reach customers.',
      level: 'Beginner',
      resources: [
        { type: 'Article', label: "Lenny's Newsletter: GTM Handbook", url: '#' },
        { type: 'Book', label: 'Crossing the Chasm', url: '#' }
      ],
      whyMatters: 'An amazing codebase is useless if no users can find or use it. Understanding GTM helps you align product releases, feature flags, and beta testing with marketing campaigns. It teaches you how technical execution impacts initial user onboarding and conversion funnels.'
    },
    {
      name: 'Negotiation Fundamentals',
      desc: 'Principles that work in any deal.',
      level: 'Beginner',
      resources: [
        { type: 'Video', label: 'Chris Voss Negotiation Tactics', url: '#' },
        { type: 'Book', label: 'Never Split the Difference', url: '#' }
      ],
      whyMatters: 'Whether you are advocating for a higher budget, debating system architecture, or seeking a promotion, negotiation is a core engineering skill. These principles help you find win-win solutions that satisfy technical requirements and business constraints. It changes how you communicate tradeoffs in code design reviews.'
    },
    {
      name: 'Product-Market Fit',
      desc: 'The only metric that matters early.',
      level: 'Beginner',
      resources: [
        { type: 'Article', label: 'Marc Andreessen: Guide to PMF', url: '#' },
        { type: 'Book', label: 'The Mom Test', url: '#' }
      ],
      whyMatters: "Early stage software requires rapid iteration. Knowing the indicators of PMF ensures you don't over-engineer scalable systems before knowing what the customer actually wants. It teaches you to write disposable code for user validation before building robust infrastructure."
    },
    {
      name: 'OKRs',
      desc: 'How high-growth companies set and track goals.',
      level: 'Beginner',
      resources: [
        { type: 'Video', label: 'Ted Talk: Measure What Matters', url: '#' },
        { type: 'Book', label: 'Measure What Matters (Doerr)', url: '#' }
      ],
      whyMatters: 'OKRs connect your daily code commits to the company\'s highest strategic objectives. Understanding how they are structured allows you to formulate technical goals that align with business growth. It helps you measure your contribution beyond lines of code or story points.'
    },
    {
      name: 'Cap Table Basics',
      desc: 'Who owns what in a startup.',
      level: 'Intermediate',
      resources: [
        { type: 'Article', label: 'Carta: Cap Table 101 Guide', url: '#' },
        { type: 'Video', label: 'Cap Table Math Explained', url: '#' }
      ],
      whyMatters: 'If you join an early-stage startup, equity is a large portion of your compensation. Understanding cap tables protects you from predatory terms and explains how future investment rounds will dilute your shares. It empowers you to make informed decisions when evaluating job offers.'
    }
  ],
  'law->engineering': [
    {
      name: 'How Software Is Built',
      desc: 'Mental model for what engineers actually do all day.',
      level: 'Beginner',
      resources: [
        { type: 'Video', label: 'How Software Works Internally', url: '#' },
        { type: 'Book', label: 'Code: The Hidden Language', url: '#' }
      ],
      whyMatters: 'To draft technology agreements or represent tech companies, you must understand the lifecycles of source code, deployment, and version control. Knowing the difference between staging and production environments helps you define performance guarantees. It prevents you from writing unrealistic clauses about system downtime or maintenance.'
    },
    {
      name: 'APIs and Data Flow',
      desc: 'How systems talk to each other.',
      level: 'Beginner',
      resources: [
        { type: 'Article', label: 'APIs for Non-Technical Lawyers', url: '#' },
        { type: 'Video', label: 'API Integration Basics', url: '#' }
      ],
      whyMatters: 'Data privacy regulations like GDPR apply to how systems exchange data. By understanding APIs, you can write precise data processing agreements that describe what fields are shared, where they are stored, and how they are secured. It lets you audit compliance at the technical architecture level.'
    },
    {
      name: 'Open Source Licensing',
      desc: "What you can and can't do with free code.",
      level: 'Intermediate',
      resources: [
        { type: 'Article', label: 'Lawyer Guide to GPL & MIT Licenses', url: '#' },
        { type: 'Book', label: 'Intellectual Property in Software', url: '#' }
      ],
      whyMatters: 'Using open-source software (OSS) can expose clients to severe copyright risks if licenses are violated. Understanding the copyleft nature of GPL versus permissive MIT licenses lets you advise clients on compliance during commercial software creation. This is critical for tech mergers, acquisitions, and intellectual property due diligence.'
    },
    {
      name: 'Cybersecurity Basics',
      desc: 'The threats your clients will ask you about.',
      level: 'Beginner',
      resources: [
        { type: 'Video', label: 'Understanding the OWASP Top 10', url: '#' },
        { type: 'Book', label: 'The Art of Invisibility', url: '#' }
      ],
      whyMatters: "Data breaches lead to massive liabilities, regulatory fines, and class-action lawsuits. Understanding vectors of attack, encryption, and multi-factor authentication allows you to draft robust incident response plans. It helps you ask the right questions when assessing a client's legal compliance with cybersecurity standards."
    },
    {
      name: 'AI and LLM Fundamentals',
      desc: "What AI can and can't do, without the hype.",
      level: 'Beginner',
      resources: [
        { type: 'Video', label: '3Blue1Brown: Neural Networks', url: '#' },
        { type: 'Article', label: 'State of AI Legal Issues Report', url: '#' }
      ],
      whyMatters: 'AI raises unprecedented legal issues in copyright, liability, and automated bias. Knowing how models are trained and run lets you draft terms of service that protect training data and address generated output liability. It ensures your client contracts reflect the actual technical capabilities and limitations of AI.'
    },
    {
      name: 'Agile Methodology',
      desc: 'How software teams plan and ship.',
      level: 'Beginner',
      resources: [
        { type: 'Video', label: 'Scrum Method in 10 Minutes', url: '#' },
        { type: 'Book', label: 'Clean Agile (Robert Martin)', url: '#' }
      ],
      whyMatters: 'Agile development impacts how technology consulting agreements should be structured. Unlike traditional waterfall contracts with fixed deliverables, agile requires flexible milestones and iterative acceptance procedures. Understanding this workflow helps you draft contracts that match how developer teams actually collaborate.'
    },
    {
      name: 'What a CTO Does',
      desc: "The technical co-founder's actual job.",
      level: 'Beginner',
      resources: [
        { type: 'Article', label: 'CTO Role vs VP of Engineering', url: '#' },
        { type: 'Book', label: "The Manager's Path (Camille Fournier)", url: '#' }
      ],
      whyMatters: 'In disputes over intellectual property theft or failed software delivery, the CTO is often the primary technical witness. Understanding their responsibilities lets you prepare them for depositions and cross-examinations. It also helps you assess who is legally responsible for architecture decisions within a corporate hierarchy.'
    }
  ],
  'business->design': [
    {
      name: 'Design Thinking',
      desc: 'The problem-solving framework designers actually use.',
      level: 'Beginner',
      resources: [
        { type: 'Video', label: 'IDEO Design Thinking Framework', url: '#' },
        { type: 'Book', label: 'The Design of Everyday Things', url: '#' }
      ],
      whyMatters: 'Design thinking is a strategic framework that places customer empathy at the center of business planning. Applying this method helps you design products that address real human needs rather than hypothetical market segments. It bridges the gap between financial projections and user satisfaction.'
    },
    {
      name: 'Typography Fundamentals',
      desc: 'Why fonts change how people feel.',
      level: 'Beginner',
      resources: [
        { type: 'Article', label: "Butterick's Practical Typography", url: '#' },
        { type: 'Book', label: 'Thinking with Type (Lupton)', url: '#' }
      ],
      whyMatters: 'Type choices directly affect brand trust, reading speed, and conversion rates. Understanding font weight, kerning, and hierarchy helps you evaluate whether marketing collaterals look professional. It gives you a vocabulary to explain why a landing page feels cluttered or untrustworthy to customers.'
    },
    {
      name: 'UX Research Methods',
      desc: 'How to know if users actually like your product.',
      level: 'Intermediate',
      resources: [
        { type: 'Video', label: 'Nielsen Norman Group Research Methods', url: '#' },
        { type: 'Article', label: 'UX Research Methods Checklist', url: '#' }
      ],
      whyMatters: 'Relying on analytics alone tells you what users are doing, but UX research reveals why they do it. Using usability tests, interviews, and cognitive mapping helps you identify friction points in the customer journey. It ensures your business decisions are backed by qualitative insights, not just quantitative guesses.'
    },
    {
      name: 'Visual Hierarchy',
      desc: "Why your eye goes where it goes.",
      level: 'Beginner',
      resources: [
        { type: 'Video', label: 'Gestalt Principles in Interface Design', url: '#' },
        { type: 'Article', label: 'Visual Hierarchy Rules', url: '#' }
      ],
      whyMatters: "Visual hierarchy guides the user's eye to high-value actions, like 'Buy Now' or sign-up buttons. Knowing how size, contrast, and spacing dictate attention helps you design conversion-optimized layouts. It prevents you from cluttering interfaces with competing call-to-actions that paralyze decision-making."
    },
    {
      name: 'Color Theory in Branding',
      desc: 'The psychology behind every brand palette.',
      level: 'Beginner',
      resources: [
        { type: 'Article', label: 'Interaction Design Color Psychology', url: '#' },
        { type: 'Book', label: 'Interaction of Color (Albers)', url: '#' }
      ],
      whyMatters: "Colors elicit immediate emotional responses that influence purchasing decisions. By understanding the psychology of colors, you can align branding with your company's core values (e.g. blue for trust, red for energy). It helps you maintain a coherent brand voice across different markets and channels."
    },
    {
      name: 'Wireframing & Prototyping',
      desc: 'How ideas become testable interfaces.',
      level: 'Beginner',
      resources: [
        { type: 'Video', label: 'Figma Prototyping Tutorial', url: '#' },
        { type: 'Article', label: 'Sketches to Wireframes Blueprint', url: '#' }
      ],
      whyMatters: 'Creating interactive mockups allows you to validate business concepts before writing a single line of code. It saves huge development costs by uncovering design flaws early in the lifecycle. It teaches you to use low-fidelity sketches for user feedback before committing to high-fidelity designs.'
    },
    {
      name: 'Accessibility Basics',
      desc: 'Designing for everyone, not just the average user.',
      level: 'Beginner',
      resources: [
        { type: 'Video', label: 'Web Accessibility (A11y) Intro', url: '#' },
        { type: 'Article', label: 'WCAG Guidelines Simplified', url: '#' }
      ],
      whyMatters: 'Web accessibility ensures your digital products are usable by people with disabilities. Designing for accessibility expands your addressable market and protects your company from legal compliance lawsuits under the ADA. It shows that your business values inclusivity and social responsibility.'
    }
  ]
};

// Intersection Observer Reveal Component
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-item ${isVisible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// SVG Liquid Wave Divider Component
const WaveDivider = ({ speedScale = 1 }) => {
  return (
    <div className="w-full relative h-[80px] overflow-hidden -my-1 pointer-events-none select-none z-10">
      <svg
        className="absolute bottom-0 w-[2000px] h-[80px]"
        viewBox="0 0 2000 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          className="animate-wave1"
          d="M0,30 C150,70 350,10 500,30 C650,50 850,10 1000,30 C1150,70 1350,10 1500,30 C1650,50 1850,10 2000,30 L2000,80 L0,80 Z"
          fill="rgba(201, 185, 122, 0.06)"
        />
        <path
          className="animate-wave2"
          d="M0,40 C200,10 300,70 500,40 C700,10 800,70 1000,40 C1200,10 1300,70 1500,40 C1700,10 1800,70 2000,40 L2000,80 L0,80 Z"
          fill="rgba(201, 185, 122, 0.04)"
        />
        <path
          className="animate-wave3"
          d="M0,25 C120,50 280,20 500,25 C720,30 880,20 1000,25 C1120,50 1280,20 1500,25 C1720,30 1880,20 2000,25 L2000,80 L0,80 Z"
          fill="rgba(201, 185, 122, 0.03)"
        />
      </svg>
    </div>
  );
};

export default function App() {
  // State variables
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedExplorer, setSelectedExplorer] = useState(null);
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  const [savedTopics, setSavedTopics] = useState(new Set());
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [showSavedDrawer, setShowSavedDrawer] = useState(false);
  const [pulseCardId, setPulseCardId] = useState(null);

  // Parallax background refs
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  // Hero word-swap state
  const fieldNames = ["Engineering", "Business", "Law", "Medicine", "Design", "Psychology"];
  const [swapWord, setSwapWord] = useState(fieldNames[0]);
  const [swapClass, setSwapClass] = useState("word-swap-in");

  // Scroll visibility for bounces
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Word-swap effect
  useEffect(() => {
    let wordIndex = 0;
    const interval = setInterval(() => {
      // Trigger out
      setSwapClass("word-swap-out");
      
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % fieldNames.length;
        setSwapWord(fieldNames[wordIndex]);
        setSwapClass("word-swap-in");
      }, 350); // duration of out transition

    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Parallax & Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Control bounce visibility
      if (scrollY > 150) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }

      // Parallax effect on background orbs using direct style mutation for 60fps
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translateY(${-scrollY * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Major select
  const handleSelectMajor = (id) => {
    setSelectedMajor(id);
    setSelectedExplorer(null);
    setExpandedTopics(new Set());
    
    // Trigger Card Pulse Animation
    setPulseCardId(id);
    setTimeout(() => {
      setPulseCardId(null);
    }, 800);

    // Scroll smoothly to explorer prompt after a brief delay
    setTimeout(() => {
      const promptEl = document.getElementById('explorer-title-anchor');
      if (promptEl) {
        promptEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 450);
  };

  // Handle explorer selection
  const handleSelectExplorer = (id) => {
    setSelectedExplorer(id);
    setExpandedTopics(new Set());
    setWaitlistSubmitted(false);
    setWaitlistEmail('');

    // Scroll smoothly to topics container
    setTimeout(() => {
      const topicsEl = document.getElementById('topics-section-anchor');
      if (topicsEl) {
        topicsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  // Toggle topic expansion
  const toggleTopicExpand = (index) => {
    const next = new Set(expandedTopics);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setExpandedTopics(next);
  };

  // Toggle saving topics
  const toggleSaveTopic = (topicKey, topicData) => {
    const next = new Set(savedTopics);
    const existing = Array.from(next).find(t => t.key === topicKey);
    
    if (existing) {
      // remove
      const updated = new Set(Array.from(next).filter(t => t.key !== topicKey));
      setSavedTopics(updated);
    } else {
      // add
      next.add({
        key: topicKey,
        name: topicData.name,
        desc: topicData.desc,
        whyMatters: topicData.whyMatters,
        pairing: `${MAJORS_DATA.find(m => m.id === selectedMajor)?.label} → ${MAJORS_DATA.find(m => m.id === selectedExplorer)?.label}`
      });
      setSavedTopics(next);
    }
  };

  // Get matching pairing list or fallback
  const getPairingKey = () => {
    if (!selectedMajor || !selectedExplorer) return null;
    return `${selectedMajor}->${selectedExplorer}`;
  };

  const currentPairingKey = getPairingKey();
  const topicsList = currentPairingKey ? CURRICULUM_DATA[currentPairingKey] : null;

  // Handle Waitlist Submit
  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (waitlistEmail.trim() === '') return;
    setWaitlistSubmitted(true);
  };

  // Marquee list details
  const marqueeListLeft = [
    "Engineering", "Business", "Law", "Medicine & Health", "Arts & Design", 
    "Psychology", "Economics", "Architecture", "Education", "Liberal Arts"
  ];
  const marqueeListRight = [
    "AI & LLM Ethics", "Unit Economics", "Open Source Licensing", "UX Research Methods",
    "Design Thinking", "Cap Table Math", "Neuroscience Basics", "Visual Hierarchy",
    "Typography Psychology", "Cybersecurity Threats"
  ];

  return (
    <div className="relative min-h-screen bg-[#050508] overflow-hidden selection:bg-[#e8d49a]/30 selection:text-[#e8d49a]">
      
      {/* 1. Global Drifting Background Orbs with JS Parallax */}
      <div 
        ref={orb1Ref}
        className="pointer-events-none absolute left-[-100px] top-[-100px] w-[600px] h-[600px] rounded-full bg-[#c9b97a] opacity-[0.12] blur-[120px] z-0 animate-orb1"
      />
      <div 
        ref={orb2Ref}
        className="pointer-events-none absolute right-[-100px] bottom-[200px] w-[500px] h-[500px] rounded-full bg-[#4f46e5] opacity-[0.09] blur-[120px] z-0 animate-orb2"
      />

      {/* Subtle Noise Texture Overlay */}
      <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Floating Glass Top Navigation */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-40 max-w-[95%] sm:max-w-xl w-full px-4 animate-[fadeIn_800ms_ease-out]">
        <div className="glass-surface backdrop-blur-[24px] saturate-[180%] border-[0.5px] border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          <span className="font-cormorant text-xl font-bold italic tracking-wide text-white flex items-center gap-1.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="gradient-text-gold">Crossfield</span>
          </span>
          <nav className="flex items-center gap-6 font-outfit text-[13px] tracking-wider uppercase">
            <a href="#pick-major" className="text-text-muted hover:text-white transition-colors duration-200">Explore</a>
            
            {selectedMajor ? (
              <button 
                onClick={() => {
                  const el = document.getElementById('pick-major');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="text-text-muted hover:text-white transition-colors duration-200"
              >
                My Major
              </button>
            ) : (
              <span className="text-white/15 cursor-not-allowed">My Major</span>
            )}
            
            <button 
              onClick={() => setShowSavedDrawer(true)} 
              className="relative text-text-muted hover:text-white transition-colors duration-200 flex items-center gap-1"
            >
              <span>Saved</span>
              {savedTopics.size > 0 && (
                <span className="absolute -top-1.5 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#c9b97a] text-[9px] font-bold text-black animate-pulse">
                  {savedTopics.size}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen flex flex-col justify-between items-center px-4 pt-28 pb-8 z-10 text-center select-none">
        
        {/* Top spacer to balance the nav bar */}
        <div className="h-4" />

        {/* Hero content flow container */}
        <div className="w-full flex flex-col items-center justify-center my-auto">
          {/* Hero Headlines */}
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-2 mb-10">
            <h1 className="font-cormorant text-5xl sm:text-7xl font-light italic text-[#f0ede6] tracking-tight leading-none duration-1000 animate-[translateY_800ms_ease-out_forwards]">
              What if I chose
            </h1>
            
            <div className="h-[76px] sm:h-[100px] flex items-center justify-center overflow-visible">
              <span className={`font-cormorant text-5xl sm:text-7xl font-bold gradient-text-gold tracking-tight py-2 leading-none inline-block ${swapClass}`}>
                {swapWord}
              </span>
            </div>
            
            <p className="font-outfit text-xs sm:text-[14px] uppercase tracking-[0.25em] text-[#e8d49a]/70 font-medium mt-4 animate-[fadeIn_1200ms_ease-out_forwards]">
              Learning that bridges the gap
            </p>
          </div>

          {/* Scrolling Infinite Marquee strip */}
          <div className="w-full overflow-hidden py-4 marquee-container relative flex flex-col gap-3 my-8 select-none">
            {/* Fading side masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#050508] via-[#050508]/70 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#050508] via-[#050508]/70 to-transparent z-10 pointer-events-none" />

            {/* Row 1 (scrolls left) */}
            <div className="flex w-[200%] gap-4 animate-marquee-left">
              {marqueeListLeft.concat(marqueeListLeft).map((field, idx) => (
                <span 
                  key={`left-${idx}`} 
                  className="font-outfit text-[12px] sm:text-[13px] tracking-wide text-white/70 bg-white/[0.03] backdrop-blur-[10px] px-5 py-2.5 rounded-full border border-white/10 hover:border-[#c9b97a]/40 hover:text-[#c9b97a] hover:shadow-[0_0_15px_rgba(201,185,122,0.15)] transition-all duration-300 pointer-events-auto cursor-default"
                >
                  {field}
                </span>
              ))}
            </div>

            {/* Row 2 (scrolls right) */}
            <div className="flex w-[200%] gap-4 animate-marquee-right">
              {marqueeListRight.concat(marqueeListRight).map((term, idx) => (
                <span 
                  key={`right-${idx}`} 
                  className="font-outfit text-[12px] sm:text-[13px] tracking-wide text-white/70 bg-white/[0.03] backdrop-blur-[10px] px-5 py-2.5 rounded-full border border-white/10 hover:border-[#c9b97a]/40 hover:text-[#c9b97a] hover:shadow-[0_0_15px_rgba(201,185,122,0.15)] transition-all duration-300 pointer-events-auto cursor-default"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <button
              onClick={() => {
                const el = document.getElementById('pick-major');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glass-btn px-8 py-3.5 rounded-full font-outfit text-sm font-semibold tracking-wider text-white hover:text-black cursor-pointer shadow-lg transition-transform duration-300"
            >
              Explore your gaps →
            </button>
          </div>
        </div>

        {/* Bouncing scroll indicator */}
        <div className={`flex flex-col items-center justify-center text-white/30 animate-bounce-slow pointer-events-none transition-opacity duration-300 pb-2 ${showScrollIndicator ? 'opacity-100' : 'opacity-0'}`}>
          <span className="font-outfit text-[10px] tracking-[0.2em] uppercase mb-1">Scroll</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* SVG Liquid Divider 1 */}
      <WaveDivider />

      {/* SECTION 2 — PICK YOUR MAJOR */}
      <section id="pick-major" className="relative py-24 px-4 max-w-7xl mx-auto z-20">
        <Reveal className="text-center mb-16">
          <h2 className="font-cormorant text-4xl sm:text-5xl font-light italic text-white tracking-wide mb-3">
            I am studying...
          </h2>
          <p className="font-outfit text-sm sm:text-base text-text-muted tracking-wider uppercase">
            Select your current field
          </p>
        </Reveal>

        {/* Majors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-16">
          {MAJORS_DATA.map((major, index) => {
            const isSelected = selectedMajor === major.id;
            const isAnySelected = selectedMajor !== null;
            const IconComponent = major.icon;
            
            // Handle blurred other cards state
            let cardClass = "glass-card p-6 flex flex-col justify-between aspect-square items-start cursor-pointer transition-all duration-300 ";
            if (isSelected) {
              cardClass += `border-[#c9b97a] shadow-[inset_0_0_20px_rgba(201,185,122,0.15),0_0_40px_rgba(201,185,122,0.25)] ring-1 ring-[#c9b97a]/50 scale-[1.03] ${pulseCardId === major.id ? 'animate-pulse' : ''}`;
            } else if (isAnySelected) {
              cardClass += "filter blur-[2px] opacity-40 scale-[0.97]";
            }

            return (
              <Reveal key={major.id} delay={index * 50}>
                <div
                  onClick={() => handleSelectMajor(major.id)}
                  className={`${cardClass} shimmer-active relative group h-full`}
                  style={{ contentVisibility: 'auto' }}
                >
                  {/* Icon & Selected indicator */}
                  <div className="w-full flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:scale-110 transition-transform duration-300 ${major.textTint}`}>
                      <IconComponent />
                    </div>

                    {/* Shimmer sweep effect on selected */}
                    {isSelected && (
                      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#c9b97a] text-[#050508] scale-100 animate-[scaleIn_300ms_cubic-bezier(0.16,1,0.3,1)_forwards]">
                        <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Title & Descr */}
                  <div className="mt-8">
                    <h3 className="font-outfit text-[14px] sm:text-base font-semibold text-white tracking-wide group-hover:text-[#c9b97a] transition-colors">
                      {major.label}
                    </h3>
                    <p className="font-inter text-[11px] text-text-muted mt-2 leading-relaxed h-12 overflow-hidden">
                      {major.desc}
                    </p>
                  </div>

                  {/* Visual Gold Shimmer Cover */}
                  {isSelected && <div className="absolute inset-0 shimmer-active pointer-events-none" />}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Target anchor to scroll explorer titles */}
        <div id="explorer-title-anchor" className="h-[2px]" />

        {/* Next step prompt */}
        {selectedMajor && (
          <Reveal className="text-center mt-12 py-6 border-t border-white/5">
            <p className="font-cormorant text-2xl sm:text-3xl font-light italic text-[#e8d49a] animate-[translateY_500ms_ease-out_forwards]">
              Now, what do you want to explore?
            </p>
            <p className="font-outfit text-xs text-text-muted mt-1 uppercase tracking-widest">
              Choose from the fields below to see the connections
            </p>
          </Reveal>
        )}
      </section>

      {/* SVG Liquid Divider 2 */}
      {selectedMajor && <WaveDivider />}

      {/* SECTION 3 — EXPLORER GRID */}
      {selectedMajor && (
        <section id="explorer-grid" className="relative py-16 px-4 max-w-7xl mx-auto z-20">
          <Reveal className="text-center mb-12">
            <h2 className="font-cormorant text-3xl sm:text-4xl font-light italic text-white tracking-wide mb-2">
              You study <span className="gradient-text-gold font-bold">{MAJORS_DATA.find(m => m.id === selectedMajor)?.label}</span>.
            </h2>
            <p className="font-outfit text-sm text-[#e8d49a]/70 tracking-wide uppercase">
              Here is what you are missing:
            </p>
          </Reveal>

          {/* Grid of Remaining 9 fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MAJORS_DATA
              .filter((major) => major.id !== selectedMajor)
              .map((major, index) => {
                const isExplorerSelected = selectedExplorer === major.id;
                const IconComponent = major.icon;
                
                return (
                  <Reveal key={major.id} delay={index * 80}>
                    <div
                      onClick={() => handleSelectExplorer(major.id)}
                      className={`glass-card p-6 flex flex-col justify-between cursor-pointer group select-none relative transition-all duration-300 ${
                        isExplorerSelected 
                          ? 'border-[#c9b97a] scale-[1.03] shadow-[0_0_30px_rgba(201,185,122,0.15)] ring-1 ring-[#c9b97a]/40' 
                          : 'hover:-translate-y-1.5'
                      }`}
                      style={{
                        background: isExplorerSelected 
                          ? `${major.tint.replace('0.08', '0.12')}` 
                          : `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, ${major.tint} 100%)`
                      }}
                    >
                      {/* Top bar with Icon and Badge */}
                      <div className="flex items-center justify-between w-full">
                        <div className={`p-2.5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:scale-110 transition-transform duration-300 ${major.textTint}`}>
                          <IconComponent />
                        </div>
                        <span className="font-outfit text-[11px] text-[#e8d49a] border border-[#c9b97a]/30 bg-[#c9b97a]/5 px-3 py-1 rounded-full backdrop-blur-[6px] tracking-wide">
                          {major.topicCount} topics
                        </span>
                      </div>

                      {/* Content */}
                      <div className="mt-10">
                        <h3 className="font-outfit text-base font-semibold text-white group-hover:text-[#c9b97a] transition-colors">
                          Explore {major.label}
                        </h3>
                        <p className="font-inter text-xs text-text-muted mt-2 leading-relaxed">
                          Unpack the mental models and core competencies of {major.label.toLowerCase()} tailored for you.
                        </p>
                      </div>

                      {/* Inner gold glowing border on active selection */}
                      {isExplorerSelected && (
                        <div className="absolute inset-0 border border-[#c9b97a] pointer-events-none rounded-[16px] animate-[pulse_2s_infinite]" />
                      )}
                    </div>
                  </Reveal>
                );
              })}
          </div>
        </section>
      )}

      {/* SVG Liquid Divider 3 */}
      {selectedExplorer && <WaveDivider />}

      {/* Target anchor to scroll topics list */}
      <div id="topics-section-anchor" className="h-[2px]" />

      {/* SECTION 4 — TOPICS LIST */}
      {selectedMajor && selectedExplorer && (
        <section className="relative py-20 px-4 max-w-4xl mx-auto z-20 min-h-[60vh]">
          
          {/* Header Pairing */}
          <div className="mb-12 text-center relative overflow-hidden py-4">
            <span className="font-outfit text-[10px] tracking-[0.3em] uppercase text-[#e8d49a]/60">Interdisciplinary Vector</span>
            <h2 className="font-cormorant text-3xl sm:text-4xl italic text-white flex items-center justify-center gap-3 flex-wrap mt-1">
              <span>{MAJORS_DATA.find(m => m.id === selectedMajor)?.label}</span>
              <span className="text-[#c9b97a] font-outfit text-xl not-italic font-bold">→</span>
              <span className="gradient-text-gold font-semibold">{MAJORS_DATA.find(m => m.id === selectedExplorer)?.label}</span>
            </h2>
            
            {/* Animated Underline */}
            <div className="w-56 mx-auto mt-4 h-[1.5px] bg-[#c9b97a]/15 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-[#c9b97a] shadow-[0_0_8px_#c9b97a]"
                style={{
                  animation: 'drawLine 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  transformOrigin: 'left'
                }}
              />
            </div>
          </div>

          {/* Hardcoded content vs Coming Soon Placeholders */}
          {topicsList ? (
            <div className="flex flex-col gap-4">
              {topicsList.map((topic, index) => {
                const isExpanded = expandedTopics.has(index);
                const topicKey = `${selectedMajor}->${selectedExplorer}-${index}`;
                const isSaved = Array.from(savedTopics).some(t => t.key === topicKey);
                
                return (
                  <Reveal key={index} delay={index * 60} className="w-full">
                    <div className="glass-card hover:translate-x-1 duration-300 relative overflow-visible">
                      <div className="flex items-stretch min-h-[80px]">
                        
                        {/* Gold accent bar */}
                        <div className="w-[3px] bg-gradient-to-b from-[#c9b97a] to-[#a89060] flex-shrink-0" />
                        
                        {/* Main card panel */}
                        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                          
                          {/* Top Row: Name and Action Toggles */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="cursor-pointer" onClick={() => toggleTopicExpand(index)}>
                              <h3 className="font-outfit text-[15px] sm:text-base font-semibold text-white tracking-wide hover:text-[#c9b97a] transition-colors">
                                {topic.name}
                              </h3>
                              <p className="font-inter text-xs sm:text-[13px] text-text-muted mt-1 leading-normal">
                                {topic.desc}
                              </p>
                            </div>

                            {/* Icons Column: Bookmark & Chevron */}
                            <div className="flex items-center gap-3">
                              
                              {/* Save Bookmark button */}
                              <button
                                onClick={() => toggleSaveTopic(topicKey, topic)}
                                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                  isSaved 
                                    ? 'bg-[#c9b97a]/10 border-[#c9b97a]/40 text-[#c9b97a]' 
                                    : 'border-white/5 hover:border-white/20 text-white/40 hover:text-white/80'
                                }`}
                                title={isSaved ? "Saved to notebook" : "Save topic"}
                              >
                                <svg className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.593 3.022H6.407a1.65 1.65 0 00-1.65 1.65v16.14l7.243-3.621 7.243 3.621V4.672a1.65 1.65 0 00-1.65-1.65z" />
                                </svg>
                              </button>

                              {/* Chevron Trigger */}
                              <button
                                onClick={() => toggleTopicExpand(index)}
                                className={`p-1.5 rounded-lg border border-white/5 text-white/40 hover:text-white/80 hover:border-white/20 transition-transform duration-300 cursor-pointer ${
                                  isExpanded ? 'rotate-180 text-[#c9b97a]' : ''
                                }`}
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Middle Row: Chips (Pills & Popover Resources) */}
                          <div className="flex flex-wrap items-center gap-3 mt-4">
                            
                            {/* Level Badge */}
                            <span className="font-outfit text-[10px] tracking-wide text-[#e8d49a] border border-[#c9b97a]/20 bg-[#c9b97a]/5 px-2.5 py-0.5 rounded-full">
                              {topic.level}
                            </span>
                            
                            {/* Resource buttons */}
                            {topic.resources.map((resource, resIdx) => {
                              const tooltipKey = `${index}-${resIdx}`;
                              const isTooltipActive = activeTooltip === tooltipKey;
                              
                              return (
                                <div key={resIdx} className="relative z-30">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveTooltip(isTooltipActive ? null : tooltipKey);
                                    }}
                                    className="font-outfit text-[11px] text-white/60 bg-white/[0.02] border border-white/5 px-2.5 py-0.5 rounded-full hover:border-[#c9b97a]/40 hover:text-white transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                                  >
                                    <span>
                                      {resource.type === 'Video' ? '▶' : resource.type === 'Article' ? '📄' : '📚'}
                                    </span>
                                    <span>{resource.type}</span>
                                  </button>

                                  {/* Glass Floating Tooltip Popover */}
                                  {isTooltipActive && (
                                    <>
                                      {/* Invisible click handler to dismiss */}
                                      <div 
                                        className="fixed inset-0 z-40" 
                                        onClick={() => setActiveTooltip(null)} 
                                      />
                                      <div className="absolute left-0 mt-2 w-64 p-4 rounded-xl glass-surface border border-[#c9b97a]/30 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6)] z-50 animate-[scaleIn_200ms_cubic-bezier(0.16,1,0.3,1)_forwards]">
                                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                                          <span className="font-outfit text-[10px] uppercase tracking-widest text-[#c9b97a] font-semibold">
                                            {resource.type} Resource
                                          </span>
                                          <button 
                                            onClick={() => setActiveTooltip(null)} 
                                            className="text-white/40 hover:text-white text-xs"
                                          >
                                            ✕
                                          </button>
                                        </div>
                                        <h4 className="font-outfit text-xs font-semibold text-white leading-tight">
                                          {resource.label}
                                        </h4>
                                        <p className="font-inter text-[10px] text-text-muted mt-1.5 leading-normal">
                                          Recommended curation path for bridging the gap from {MAJORS_DATA.find(m => m.id === selectedMajor)?.label}.
                                        </p>
                                        <a
                                          href="#open-simulate"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            alert(`Simulating redirection to: ${resource.label}`);
                                            setActiveTooltip(null);
                                          }}
                                          className="inline-block mt-3 text-[11px] font-outfit text-[#e8d49a] hover:underline"
                                        >
                                          Open Resource ↗
                                        </a>
                                      </div>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Accordion Expansion (Why this matters) */}
                          <div className={`accordion-content ${isExpanded ? 'expanded mt-4 pt-4 border-t border-white/5' : ''}`}>
                            <p className="font-outfit text-[11px] uppercase tracking-widest text-[#e8d49a]/70 font-semibold mb-1">
                              Why this matters for your major
                            </p>
                            <p className="font-inter text-xs text-text-muted leading-relaxed">
                              {topic.whyMatters}
                            </p>
                          </div>

                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            
            /* COMING SOON + WAITLIST FORM */
            <div className="flex flex-col gap-6">
              
              {/* 3 Blurred Skeleton Cards */}
              <div className="flex flex-col gap-4 select-none opacity-60 pointer-events-none">
                {[1, 2, 3].map((skeleton) => (
                  <div key={skeleton} className="glass-card p-6 flex flex-col gap-3 min-h-[90px] skeleton-shimmer">
                    <div className="h-4 bg-white/5 w-1/3 rounded" />
                    <div className="h-3 bg-white/5 w-2/3 rounded" />
                  </div>
                ))}
              </div>

              {/* Waitlist container */}
              <Reveal className="p-8 rounded-2xl glass-surface border border-[#c9b97a]/30 text-center relative overflow-hidden shadow-2xl mt-4">
                <h3 className="font-cormorant text-2xl sm:text-3xl font-light italic text-[#e8d49a] mb-2">
                  Coming Soon to Crossfield
                </h3>
                <p className="font-inter text-xs text-text-muted max-w-md mx-auto mb-6 leading-relaxed">
                  We are actively building curations for the {MAJORS_DATA.find(m => m.id === selectedMajor)?.label} → {MAJORS_DATA.find(m => m.id === selectedExplorer)?.label} path. Submit your email to join the waitlist.
                </p>

                {waitlistSubmitted ? (
                  <div className="py-4 animate-[fadeIn_400ms_ease]">
                    <span className="inline-block p-2 bg-[#c9b97a]/10 border border-[#c9b97a]/40 text-[#c9b97a] rounded-xl text-xs font-semibold px-6 py-3">
                      ✓ Joined Waitlist! We'll email you soon.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      required
                      placeholder="Enter your university email"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      className="w-full bg-[#050508]/60 border border-white/10 rounded-full px-5 py-2.5 font-outfit text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#c9b97a]/60 focus:ring-1 focus:ring-[#c9b97a]/60 transition-all shadow-inner"
                    />
                    <button
                      type="submit"
                      className="glass-btn px-6 py-2.5 rounded-full font-outfit text-xs font-bold text-white whitespace-nowrap cursor-pointer hover:text-black shadow-lg"
                    >
                      Notify Me
                    </button>
                  </form>
                )}
              </Reveal>

            </div>
          )}
        </section>
      )}

      {/* SAVED NOTEBOOK SIDE DRAWER (MODAL OVERLAY) */}
      {showSavedDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          
          {/* Backdrop Dismiss handler */}
          <div 
            onClick={() => setShowSavedDrawer(false)}
            className="absolute inset-0 bg-[#050508]/75 backdrop-blur-[4px] animate-[fadeIn_300ms_ease]"
          />
          
          {/* Floating glass panel drawer */}
          <div className="relative w-full max-w-md h-full bg-[#050508]/90 glass-surface border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 flex flex-col justify-between z-50 animate-[slideLeft_300ms_cubic-bezier(0.16,1,0.3,1)_forwards]">
            
            {/* Top Bar Drawer */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <h3 className="font-cormorant text-2xl italic text-white flex items-center gap-2">
                    <span>Your Learning Notebook</span>
                  </h3>
                  <p className="font-outfit text-[10px] uppercase tracking-wider text-text-muted mt-1">
                    Saved cross-disciplinary pairings
                  </p>
                </div>
                <button 
                  onClick={() => setShowSavedDrawer(false)}
                  className="p-1.5 rounded-lg border border-white/5 hover:border-white/20 text-white/60 hover:text-white cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Saved Topics scroll container */}
              <div className="overflow-y-auto max-h-[72vh] flex flex-col gap-4 pr-1">
                {savedTopics.size === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-10 h-10 mx-auto text-white/15 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    <p className="font-outfit text-xs text-text-muted">No topics saved yet.</p>
                    <p className="font-inter text-[10px] text-text-muted/60 mt-1 max-w-[200px] mx-auto">
                      Click the bookmark icon on any curriculum topic card to save it.
                    </p>
                  </div>
                ) : (
                  Array.from(savedTopics).map((savedItem) => (
                    <div 
                      key={savedItem.key} 
                      className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-stretch gap-3 relative group"
                    >
                      <div className="w-[2px] bg-[#c9b97a] flex-shrink-0" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <span className="font-outfit text-[9px] uppercase tracking-wider text-[#e8d49a]/70">
                            {savedItem.pairing}
                          </span>
                          <h4 className="font-outfit text-sm font-semibold text-white mt-0.5 leading-snug">
                            {savedItem.name}
                          </h4>
                          <p className="font-inter text-[11px] text-text-muted mt-1 leading-normal">
                            {savedItem.desc}
                          </p>
                          <p className="font-inter text-[10px] text-text-muted/65 mt-2 bg-white/[0.01] p-2 rounded-lg border border-white/5 border-dashed leading-normal">
                            {savedItem.whyMatters}
                          </p>
                        </div>

                        {/* Unsave Toggle button inside list */}
                        <button
                          onClick={() => {
                            const updated = new Set(Array.from(savedTopics).filter(t => t.key !== savedItem.key));
                            setSavedTopics(updated);
                          }}
                          className="mt-3 text-[10px] font-outfit text-rose-400 hover:text-rose-300 self-start flex items-center gap-1 cursor-pointer"
                        >
                          ✕ Remove bookmark
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom Panel drawer */}
            <div className="border-t border-white/10 pt-4 mt-4">
              <button 
                onClick={() => {
                  if (savedTopics.size > 0 && confirm("Do you want to clear your notebook?")) {
                    setSavedTopics(new Set());
                  }
                }}
                disabled={savedTopics.size === 0}
                className="w-full py-2.5 rounded-full font-outfit text-xs border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                Clear Notebook
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="relative py-12 px-4 z-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-3 text-center">
          
          <Reveal className="flex flex-col items-center">
            <span className="font-cormorant text-lg italic text-text-muted relative py-1 hover:text-white transition-colors duration-300 cursor-default">
              Crossfield — Learning that bridges the gap
              
              {/* Gold Expandable underline on hover/scroll */}
              <span className="absolute bottom-0 left-0 w-full h-[1.2px] bg-gradient-to-r from-[#c9b97a] to-[#a89060] scale-x-100 origin-center transition-transform duration-1000" />
            </span>
          </Reveal>

          <p className="font-outfit text-[11px] text-white/30 uppercase tracking-[0.2em] mt-4">
            Made by <span className="text-[#c9b97a] font-bold">Praanesh Srinivasan</span>
          </p>

          <p className="font-inter text-[10px] text-white/20 mt-1 select-none">
            © 2026 Crossfield Explorer. All rights reserved.
          </p>
        </div>
      </footer>

      {/* CSS Animations Injector for Drawer and other dynamic styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes translateY {
          from { transform: translateY(24px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

    </div>
  );
}
