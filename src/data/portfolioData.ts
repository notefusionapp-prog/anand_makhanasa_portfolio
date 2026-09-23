export interface Project {
  id: string;
  name: string;
  subtitle: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  liveUrl?: string;
  isPublished: boolean;
  type: 'published' | 'commercial' | 'featured' | 'web';
  category?: 'productivity' | 'utilities' | 'entertainment' | 'health' | 'lifestyle' | 'education' | 'business';
  projectType?: 'mobile-app' | 'flutter-web' | 'website' | 'admin-panel';
  deviceType?: 'mobile' | 'browser';
  relatedProjectIds?: string[];
  role: string;
  companyConnection?: string;
  platform: string[];
  description: string;
  keyFeatures: string[];
  technologies: string[];
  contribution: string[];
  accentColor: string;
  iconUrl?: string;
  screenshots?: string[];
  previewType?: 'diamond' | 'finance' | 'tech' | 'fitness' | 'astrology' | 'puzzle' | 'scanner' | 'astrologer-partner' | 'admin-panel' | 'website-preview';
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    description?: string;
    featured?: boolean;
  }[];
}

export const PERSONAL_INFO = {
  name: "Anand Makhanasa",
  role: "Senior Flutter & Mobile Application Developer",
  tagline: "Building production-ready Android, iOS and Flutter Web applications, admin panels and modern websites.",
  summary: "Senior Flutter & Mobile Application Developer with 2.5+ years of experience building production-ready Android, iOS, and Flutter Web applications, admin panels, and modern SEO-optimized websites. Proficient in Bloc/Cubit, GetX, and Riverpod state management, responsive UI development from Figma, REST APIs, Socket.IO, Firebase, and payment gateways. Proven track record of 8+ published applications on Google Play Store and live web deployments.",
  email: "anandmakhanasa1631@gmail.com",
  phone: "+91 9537107504",
  location: "Surat, Gujarat, India",
  address: "A3 503 Opera Royal, Kholwad Road, Pashodra Patiya, Kamrej, Surat, Gujarat",
  github: "https://github.com",
  linkedin: "https://www.linkedin.com/in/anand-makhanasa-144b1229a",
  experienceYears: "2.5+",
  profileImage: "https://i.ibb.co/ksdfXGZ5/image.png",
  platforms: ["Android", "iOS", "Flutter Web"],
  stats: [
    { label: "Years Experience", value: "2.5+" },
    { label: "Published Store Apps", value: "8+" },
    { label: "Flutter Web", value: "1" },
    { label: "Websites", value: "2" },
  ]
};

export const PUBLISHED_APPS: Project[] = [
  {
    id: "hira-diary",
    name: "Hira Diary: Diamond Hishab",
    subtitle: "Digital Daily Ledger & Work Management for Diamond Craftsmen",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.app.hiradiary&hl=en_IN",
    isPublished: true,
    type: "published",
    projectType: "mobile-app",
    deviceType: "mobile",
    relatedProjectIds: ["hira-diary-website"],
    category: "productivity",
    role: "Flutter Developer",
    platform: ["Android", "Google Play"],
    description: "A specialized digital diary and work-management mobile application crafted for diamond workers, polishers, and craftsmen to record daily work units, diamond rates, earnings, withdrawals, and generate weekly/monthly hishab summaries.",
    keyFeatures: [
      "Daily work tracking and packet entry with custom diamond rates",
      "Automated earnings calculation based on carat/piece rate",
      "Advance withdrawal history & running balance ledger",
      "Weekly and monthly summary reports with instant calculations",
      "Offline-first basic functionality with local storage persistence",
      "Simple Gujarati & English bilingual friendly interface"
    ],
    technologies: ["Flutter", "Dart", "Hive / Local Storage", "Clean Architecture", "GetX State Management", "Custom Canvas Graphs"],
    contribution: [
      "Designed and implemented intuitive mobile UI for daily rate and weight calculations",
      "Engineered offline persistence ensuring zero data loss in workshop environments",
      "Implemented summary aggregation algorithms for weekly wage and advance tracking",
      "Prepared and deployed production release on Google Play Console"
    ],
    accentColor: "#0ea5e9", // Sky Blue
    iconUrl: "/images/projects/hira-diary/icon.webp",
    screenshots: [
      "/images/projects/hira-diary/screen-01.webp",
      "/images/projects/hira-diary/screen-02.webp",
      "/images/projects/hira-diary/screen-03.webp",
      "/images/projects/hira-diary/screen-04.webp"
    ],
    previewType: "diamond"
  },
  {
    id: "smart-notefusion",
    name: "Smart NoteFusion: Expense Note",
    subtitle: "All-in-One Productivity, Split Expenses & Private Vault",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.smart_notefusion.app&hl=en_IN",
    isPublished: true,
    type: "published",
    projectType: "mobile-app",
    deviceType: "mobile",
    relatedProjectIds: ["smart-notefusion-website", "smart-notefusion-admin"],
    category: "productivity",
    role: "Flutter Developer",
    platform: ["Android", "Google Play"],
    description: "An all-in-one productivity and personal finance application combining smart rich-text notes, automated expense tracking, budget management, bill splitting, reminders, and a biometric-protected private vault.",
    keyFeatures: [
      "Smart rich-text notes with AI categorization and tagging",
      "Comprehensive daily expense tracking with multi-category budgets",
      "Split bill calculator with shared expense balance tracking",
      "Private vault with biometric fingerprint & secure passcode lock",
      "Visual spending analytics and monthly expense distribution charts",
      "Adaptive Light and Dark theme modes with smooth transitions"
    ],
    technologies: ["Flutter", "Dart", "Bloc / Cubit", "Hive & SQFlite", "Biometric Authentication", "Data Visualization", "Material 3"],
    contribution: [
      "Architected clean multi-feature state management decoupling notes and financial ledgers",
      "Integrated hardware biometric authentication for the private secure vault",
      "Built expense splitting logic with owed balances and settlement calculations",
      "Optimized widget trees to achieve silky-smooth 60fps scrolling on budget lists"
    ],
    accentColor: "#10b981", // Emerald
    iconUrl: "/images/projects/smart-notefusion/icon.webp",
    screenshots: [
      "/images/projects/smart-notefusion/screen-01.webp",
      "/images/projects/smart-notefusion/screen-02.webp",
      "/images/projects/smart-notefusion/screen-03.webp",
      "/images/projects/smart-notefusion/screen-04.webp"
    ],
    previewType: "finance"
  },
  {
    id: "tech-info-hub",
    name: "Tech Info Hub",
    subtitle: "Technology Learning, Reference & Architecture Guide",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.techinfohub.app&hl=en_IN",
    isPublished: true,
    type: "published",
    category: "education",
    role: "Flutter Developer",
    platform: ["Android", "Google Play"],
    description: "A developer learning and technology reference application covering programming languages, mobile frameworks, software design history, technical architecture overviews, and curated developer resources.",
    keyFeatures: [
      "Comprehensive directory of programming languages & modern frameworks",
      "Historical evolution timelines of core computer science technologies",
      "In-depth Flutter ecosystem, widget catalogues, and architecture guides",
      "Curated learning documentation, roadmaps, and official resource links",
      "Fast instant search, bookmarks, and offline reading capability",
      "Polished modern UI with code snippet syntax styling"
    ],
    technologies: ["Flutter", "Dart", "REST APIs", "Shared Preferences", "Markdown Renderer", "Clean UI / Material 3"],
    contribution: [
      "Built responsive catalog browsing with deep categorized navigation",
      "Implemented fast local caching and bookmarking for offline study",
      "Crafted mobile-optimized typography and high-contrast code presentation",
      "Managed store assets, privacy policies, and Google Play publication"
    ],
    accentColor: "#6366f1", // Indigo
    iconUrl: "/images/projects/tech-info-hub/icon.webp",
    screenshots: [
      "/images/projects/tech-info-hub/screen-01.webp",
      "/images/projects/tech-info-hub/screen-02.webp",
      "/images/projects/tech-info-hub/screen-03.webp",
      "/images/projects/tech-info-hub/screen-04.webp"
    ],
    previewType: "tech"
  },
  {
    id: "vyonic",
    name: "Vyonic - Health & Fitness",
    subtitle: "Production Health & Fitness Marketplace & Specialist Booking",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.dalve.vyonic&hl=en_IN",
    isPublished: true,
    type: "published",
    category: "health",
    role: "Flutter Developer (Contributor)",
    companyConnection: "CodExpert Solutions",
    platform: ["Android", "iOS", "Google Play", "App Store"],
    description: "A production cross-platform health and fitness platform connecting clients with certified health specialists, personal trainers, and workout partners with real-time session tracking, live slot scheduling, and integrated payments.",
    keyFeatures: [
      "Client and partner/trainer dedicated user onboarding & interface flows",
      "Interactive health assessments with progress questionnaires and scores",
      "Specialist trainer booking, live calendar slot management, and rescheduling",
      "Real-time data synchronization using Socket.IO for live session updates",
      "Google Maps SDK integration for nearby trainer discovery & studio venues",
      "Secure Razorpay payment gateway integration for session purchases",
      "Real-time Push Notifications (FCM) & session reminder workflows",
      "Secure authentication including biometric login & token handling",
      "QR / in-app check-in verification workflows and post-session feedback"
    ],
    technologies: ["Flutter", "Dart", "Socket.IO", "Google Maps Platform", "Razorpay Gateway", "Bloc / Cubit", "RESTful APIs", "FCM Push Notifications", "TestFlight", "App Store Connect"],
    contribution: [
      "Contributed as core Flutter Developer building client & trainer flows",
      "Integrated Socket.IO for real-time live booking status and assessment sync",
      "Implemented Google Maps location-based trainer discovery and studio routing",
      "Integrated secure Razorpay payment flow and booking confirmation receipts",
      "Supported continuous deployments on Apple TestFlight and Google Play internal testing tracks"
    ],
    accentColor: "#f43f5e", // Rose
    iconUrl: "/images/projects/vyonic/icon.webp",
    screenshots: [
      "/images/projects/vyonic/screen-01.webp",
      "/images/projects/vyonic/screen-02.webp",
      "/images/projects/vyonic/screen-03.webp",
      "/images/projects/vyonic/screen-04.webp"
    ],
    previewType: "fitness"
  },
  {
    id: "art-puzzle",
    name: "Art Puzzle Story : Jigsaw",
    subtitle: "Relaxing Artistic Jigsaw Puzzles & Animated Story Reveals",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.puzzle_game.app&hl=en_IN",
    isPublished: true,
    type: "published",
    category: "entertainment",
    role: "Flutter Developer",
    platform: ["Android", "Google Play"],
    description: "A soothing artistic jigsaw puzzle game crafted in Flutter, where players piece together hand-drawn illustrations to unlock unfolding stories, animated visual reveals, and themed chapter collections.",
    keyFeatures: [
      "Relaxing puzzle gameplay with stress-free mechanics and no timers",
      "Hand-drawn artistic illustrations across thematic chapter collections",
      "Intuitive drag-and-drop piece snapping with responsive touch feedback",
      "Progressive chapter collections and unfolding narrative stories",
      "Animated celebration reveals powered by smooth Lottie animations",
      "Contextual hint system with animated guidance hand to assist players",
      "Progressive difficulty scaling across multi-layered illustration segments"
    ],
    technologies: ["Flutter", "Dart", "Custom Painter & Canvas", "Lottie Animations", "GetX State Management", "Haptic Feedback", "Hive Local Storage"],
    contribution: [
      "Engineered drag-and-drop collision detection and piece snapping mechanics",
      "Integrated smooth Lottie animation reveals upon puzzle completion",
      "Built progressive level unlocking architecture with local persistence",
      "Optimized render pipeline to ensure fluid 60fps interaction on mobile devices"
    ],
    accentColor: "#f59e0b", // Warm Amber
    iconUrl: "/images/projects/art-puzzle/icon.webp",
    screenshots: [
      "/images/projects/art-puzzle/screen-01.webp",
      "/images/projects/art-puzzle/screen-02.webp",
      "/images/projects/art-puzzle/screen-03.webp",
      "/images/projects/art-puzzle/screen-04.webp"
    ],
    previewType: "puzzle"
  },
  {
    id: "doc-scanner",
    name: "Doc Scanner Pro – PDF Maker",
    subtitle: "All-in-One Mobile Document Scanner, OCR & Secure PDF Engine",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.app.doc_scanner_pro&hl=en_IN",
    isPublished: true,
    type: "published",
    category: "utilities",
    role: "Flutter Developer",
    platform: ["Android", "Google Play"],
    description: "A high-performance mobile document scanner and PDF utility that turns smartphones into portable office tools with automatic edge detection, advanced OCR, PDF security, and multiple document formats.",
    keyFeatures: [
      "Instant multi-page document scanning with smart camera capture",
      "Automatic real-time edge detection and perspective crop correction",
      "High-speed OCR (Optical Character Recognition) to extract editable text",
      "Specialized modes for ID cards, passports, certificates, and business cards",
      "PDF creation, page reordering, compression, and PDF merging",
      "Document security with custom password protection and encryption",
      "Built-in QR code & barcode reader with instant link parsing",
      "Image enhancement filters: Magic Color, Grayscale, B&W, and Sharpness",
      "Multi-format sharing via PDF, JPEG, and direct cloud print"
    ],
    technologies: ["Flutter", "Dart", "Camera SDK", "Image Processing", "Google ML Kit (OCR)", "pdf & printing package", "Bloc / Cubit", "Path Provider & Storage"],
    contribution: [
      "Implemented camera stream capture and custom crop bounding boxes",
      "Integrated ML Kit OCR pipeline for fast, on-device text recognition",
      "Built PDF rendering engine supporting compression, merging, and password locks",
      "Created image filter shader adjustments for clean, scan-ready document exports"
    ],
    accentColor: "#2563eb", // Royal Blue
    iconUrl: "/images/projects/doc-scanner/icon.webp",
    screenshots: [
      "/images/projects/doc-scanner/screen-01.webp",
      "/images/projects/doc-scanner/screen-02.webp",
      "/images/projects/doc-scanner/screen-03.webp",
      "/images/projects/doc-scanner/screen-04.webp"
    ],
    previewType: "scanner"
  },
  {
    id: "astro-live-chat",
    name: "Astro Live Chat",
    subtitle: "Real-Time Astrologer Consultations, Live Sessions & Kundli Generation",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.astrolivechat.users&hl=en_IN",
    isPublished: true,
    type: "published",
    category: "lifestyle",
    role: "Flutter Developer (Globalia Soft LLP)",
    companyConnection: "Globalia Soft LLP",
    platform: ["Android", "Google Play"],
    description: "A comprehensive astrology and consultation platform connecting users with certified astrologers for live 1-on-1 chat, real-time voice/video consultations, Vedic Kundli generation, and tarot readings.",
    keyFeatures: [
      "Verified astrologer discovery with filters by specialty, rating, and language",
      "Real-time 1-on-1 chat messaging with media sharing and typing indicators",
      "Live astrologer consultation calls with crystal-clear audio/video streaming",
      "Automated Vedic Kundli chart generation & detailed daily horoscope",
      "Tarot card readings, numerology reports, and personalized remedies",
      "In-app wallet system with secure Razorpay gateway integration",
      "Push notifications for astrologer availability and booking alerts"
    ],
    technologies: ["Flutter", "Dart", "Firebase Firestore", "Firebase Auth", "WebRTC / Calling SDK", "Razorpay Gateway", "FCM Notifications", "RESTful APIs"],
    contribution: [
      "Developed astrologer discovery directory, profile reviews, and filtering",
      "Integrated Firebase Firestore real-time listeners for live chat sessions",
      "Connected Razorpay payment gateway for in-app wallet balance recharges",
      "Built dynamic Vedic Kundli chart rendering from planetary ephemeris data"
    ],
    accentColor: "#8b5cf6", // Mystic Purple
    iconUrl: "/images/projects/astro-live-chat/icon.webp",
    screenshots: [
      "/images/projects/astro-live-chat/screen-01.webp",
      "/images/projects/astro-live-chat/screen-02.webp",
      "/images/projects/astro-live-chat/screen-03.webp",
      "/images/projects/astro-live-chat/screen-04.webp"
    ],
    previewType: "astrology"
  },
  {
    id: "astro-live-chat-partner",
    name: "AstroLiveChat Partners",
    subtitle: "Astrologer Partner Console: Session Dispatcher, Calls & Earnings",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.astrolivechat.partners&hl=en_IN",
    isPublished: true,
    type: "published",
    category: "business",
    role: "Flutter Developer (Globalia Soft LLP)",
    companyConnection: "Globalia Soft LLP",
    platform: ["Android", "Google Play"],
    description: "The dedicated partner-side mobile console for certified astrologers to manage incoming user consultations, accept live chat/calls, configure service availability, and monitor real-time earnings.",
    keyFeatures: [
      "Instant call and chat request notification dispatcher with audio alerts",
      "Real-time online/busy/offline availability toggle with session queuing",
      "Customer consultation history, birth chart references, and session notes",
      "In-app call and chat handling with real-time per-minute rate tracking",
      "Earnings dashboard with daily/monthly revenue breakdowns and settlement requests",
      "Profile management, service pricing configuration, and bank account setup"
    ],
    technologies: ["Flutter", "Dart", "Firebase Cloud Messaging", "WebRTC Calling", "Firestore", "GetX State Management", "Clean Architecture", "Local Audio Alerts"],
    contribution: [
      "Implemented instant incoming consultation alert dialogs with high-priority notifications",
      "Built real-time astrologer availability toggle and active session timer state",
      "Architected the partner earnings summary ledger and settlement status views",
      "Optimized background sync to keep astrologers connected during standby"
    ],
    accentColor: "#0d9488", // Teal
    iconUrl: "/images/projects/astro-live-chat-partner/icon.webp",
    screenshots: [
      "/images/projects/astro-live-chat-partner/screen-01.webp",
      "/images/projects/astro-live-chat-partner/screen-02.webp",
      "/images/projects/astro-live-chat-partner/screen-03.webp",
      "/images/projects/astro-live-chat-partner/screen-04.webp"
    ],
    previewType: "astrologer-partner"
  }
];

export const WEB_PROJECTS: Project[] = [
  {
    id: "smart-notefusion-admin",
    name: "Smart NoteFusion Admin Panel",
    subtitle: "Cloud Back-Office, User Analytics & Content Moderation Dashboard",
    liveUrl: "https://smart-notefusion-admin.surge.sh/",
    isPublished: true,
    type: "web",
    projectType: "flutter-web",
    deviceType: "browser",
    category: "productivity",
    role: "Flutter Web Developer",
    platform: ["Flutter Web", "Surge", "Cloud Console"],
    description: "An enterprise cloud back-office management console built with Flutter Web for Smart NoteFusion. Features comprehensive user telemetry, sync session monitoring, note & expense category configurations, and role-based access control.",
    keyFeatures: [
      "Real-time analytics dashboard displaying active mobile client nodes and sync metrics",
      "User account administration with role-based permission gates and session audit logs",
      "System-wide note template management and multi-category expense configurations",
      "Adaptive desktop and tablet layouts built with Flutter Web responsive framework",
      "High-speed data grid views with client-side sorting, pagination, and real-time filtering",
      "Dark and light admin console visual themes with persistent administrator preferences"
    ],
    technologies: ["Flutter Web", "Dart", "Firebase Auth", "REST APIs", "Clean Architecture", "Bloc / Cubit", "Responsive UI", "Surge"],
    contribution: [
      "Built the entire responsive back-office dashboard using Flutter Web and adaptive widget layouts",
      "Engineered role-based authentication and secure session management for administrators",
      "Created telemetry chart visualizations and live sync session activity logs",
      "Optimized Flutter Web bundle size, canvas rendering, and fast initial paint times"
    ],
    accentColor: "#059669",
    iconUrl: "/images/projects/smart-notefusion-admin/icon.png",
    screenshots: [
      "/images/projects/smart-notefusion-admin/screen-01.png",
      "/images/projects/smart-notefusion-admin/screen-02.png",
      "/images/projects/smart-notefusion-admin/screen-03.png"
    ],
    previewType: "admin-panel",
    relatedProjectIds: ["smart-notefusion", "smart-notefusion-website"]
  },
  {
    id: "smart-notefusion-website",
    name: "Smart NoteFusion Official Website",
    subtitle: "SEO-Optimized Product Landing Page & Feature Showcase",
    liveUrl: "https://smartnotefusion-website.netlify.app/",
    isPublished: true,
    type: "web",
    projectType: "website",
    deviceType: "browser",
    category: "productivity",
    role: "Website Developer & SEO Specialist",
    platform: ["Website Development", "Netlify", "SEO"],
    description: "The official product showcase and marketing website for Smart NoteFusion. Engineered with high-performance responsive web standards, technical SEO, rich OpenGraph social share cards, Schema.org structured data, and direct Google Play install funnels.",
    keyFeatures: [
      "High-conversion responsive landing page highlighting features, security vault, and expense splitting",
      "Complete technical SEO architecture with JSON-LD structured data, meta tags, and OpenGraph cards",
      "Interactive feature previews, screenshots carousel, and direct Google Play Store install links",
      "Sub-second First Contentful Paint (FCP) and Lighthouse performance optimization",
      "Bilingual friendly copy, privacy policy documentation, and user terms pages",
      "Fully fluid mobile, tablet, and widescreen viewport responsiveness"
    ],
    technologies: ["Website Development", "SEO Implementation", "Responsive UI", "Semantic HTML5", "Modern CSS", "Netlify Deployment"],
    contribution: [
      "Architected and developed the high-converting marketing website from scratch",
      "Engineered comprehensive SEO strategy including SoftwareApplication JSON-LD and meta tags",
      "Optimized responsive asset delivery, SVG graphics, and web fonts for fast page speeds",
      "Configured automated continuous deployment pipeline on Netlify"
    ],
    accentColor: "#10b981",
    iconUrl: "/images/projects/smart-notefusion-website/logo.png",
    screenshots: [
      "/images/projects/smart-notefusion-website/screen-01.png",
      "/images/projects/smart-notefusion-website/screen-02.jpg"
    ],
    previewType: "website-preview",
    relatedProjectIds: ["smart-notefusion", "smart-notefusion-admin"]
  },
  {
    id: "hira-diary-website",
    name: "Hira Diary Official Website",
    subtitle: "SEO-Optimized Web Portal for Diamond Workers & Craftsmen",
    liveUrl: "https://hiradiary.netlify.app/",
    isPublished: true,
    type: "web",
    projectType: "website",
    deviceType: "browser",
    category: "productivity",
    role: "Website Developer & SEO Specialist",
    platform: ["Website Development", "Netlify", "Local SEO"],
    description: "Dedicated official web portal and feature portal for the Hira Diary mobile application. Built to assist Surat diamond craftsmen and industry workers with software documentation, tutorials, feature explanations, and Google Search visibility.",
    keyFeatures: [
      "Targeted local SEO optimization for Surat and Gujarat diamond industry craftsman queries",
      "Bilingual Gujarati & English feature explanations and daily ledger calculation walkthroughs",
      "Direct Google Play Store download callouts and mobile installation guides",
      "Semantic HTML5 document hierarchy with structured data for fast search indexing",
      "Lightweight, zero-bloat static architecture ensuring instant loading on mobile network connections",
      "Contact inquiry and user support information for artisans and factory managers"
    ],
    technologies: ["Website Development", "SEO Implementation", "Local SEO", "Responsive UI", "Semantic HTML5", "Netlify Deployment"],
    contribution: [
      "Engineered responsive web portal tailored for diamond industry workers with accessible UI",
      "Implemented search engine optimization strategies for diamond accounting search intent",
      "Streamlined asset delivery and critical CSS for rapid load times over mobile 4G networks",
      "Deployed and configured custom hosting with SSL on Netlify"
    ],
    accentColor: "#0284c7",
    iconUrl: "/images/projects/hira-diary-website/logo.png",
    screenshots: [
      "/images/projects/hira-diary-website/screen-01.png",
      "/images/projects/hira-diary-website/screen-02.png"
    ],
    previewType: "website-preview",
    relatedProjectIds: ["hira-diary"]
  }
];

export const OTHER_PROJECTS: Project[] = [];

export const ALL_PROJECTS: Project[] = [...PUBLISHED_APPS, ...WEB_PROJECTS];

export const WORK_EXPERIENCES: ExperienceItem[] = [
  {
    company: "CodExpert Solutions",
    role: "Flutter Developer",
    duration: "April 2026 – Present",
    location: "Surat, Gujarat",
    type: "Full-time",
    description: "Developing and maintaining production cross-platform mobile applications for Android & iOS, Flutter Web admin consoles, and modern SEO websites with scalable architecture, real-time data sync, and store publishing.",
    responsibilities: [
      "Developed and maintained cross-platform mobile applications using Flutter & Dart for Android and iOS platforms.",
      "Engineered responsive Flutter Web admin consoles and back-office management dashboards with role-based access control.",
      "Built SEO-optimized marketing web portals and product landing pages with semantic HTML5, fast asset delivery, and Schema.org structured data.",
      "Built pixel-perfect, responsive UI by converting Figma designs into Flutter code across multiple applications and screen viewports.",
      "Implemented scalable application architecture using Bloc/Cubit, GetX, and Riverpod state management.",
      "Integrated REST APIs, Deep Linking, and Socket.IO for real-time data synchronization, live assessment updates, and slot management.",
      "Developed features including appointment booking, event management, assessment workflows, authentication, and user profile management.",
      "Collaborated with backend developers to integrate APIs, handle JSON parsing, and ensure seamless application functionality.",
      "Successfully deployed Android applications on the Google Play Store, iOS applications on Apple App Store / TestFlight, and web projects on Netlify & Surge.",
      "Optimized application performance, resolved production issues, and improved UI responsiveness across different mobile and desktop screen sizes.",
      "Worked closely with UI/UX designers to deliver high-quality user experiences and pixel-perfect interfaces.",
      "Used Git for version control and actively participated in Agile development, sprint planning, code reviews, and daily stand-up meetings."
    ],
    technologies: [
      "Flutter", "Dart", "Flutter Web", "Bloc/Cubit", "GetX", "Riverpod", "Socket.IO", "RESTful APIs", "Deep Linking", "Google Play Console", "App Store Connect", "TestFlight", "Website Development", "SEO Implementation", "Git"
    ],
    highlights: [
      "Successfully deployed 8+ production apps to Google Play Store, Apple App Store, and live Web platforms",
      "Engineered real-time socket connections for live slot management, chat, and assessments",
      "Built responsive Flutter Web admin panels and high-ranking SEO web portals for production mobile apps",
      "Transformed complex Figma designs into responsive 60fps Flutter widgets"
    ]
  },
  {
    company: "Globalia Soft LLP",
    role: "Flutter Developer",
    duration: "April 2024 – March 2026",
    location: "Surat, Gujarat",
    type: "Full-time",
    description: "Built client mobile applications spanning astrology consultation, e-learning, and booking management with Firebase backend and payment gateway integrations.",
    responsibilities: [
      "Developed and maintained cross-platform mobile applications using Flutter and Dart for both Android and iOS platforms.",
      "Contributed to the development of an Astrologer App, integrating real-time chat, video call features, and payment gateway using Razorpay.",
      "Built key features like horoscope generation, astrologer listing, and booking management with Firebase backend and Firestore.",
      "Worked on a Learning Application focused on student engagement, featuring video courses, quizzes, and push notifications.",
      "Implemented user authentication (OTP, email/password) using Firebase Auth and handled real-time data sync with Firestore.",
      "Optimized app performance and responsiveness by reducing build times and optimizing widget trees.",
      "Collaborated with UI/UX designers to deliver pixel-perfect UI across multiple screen sizes and resolutions.",
      "Used Git for version control and participated in agile sprints, daily standups, and code reviews.",
      "Integrated REST APIs and handled JSON data parsing for seamless backend communication.",
      "Published beta versions for testing on internal tracks via Google Play Console and published application in App Store."
    ],
    technologies: [
      "Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "Razorpay Gateway", "REST APIs", "JSON Handling", "Push Notifications", "Google Play Console", "Git"
    ],
    highlights: [
      "Integrated Razorpay payment gateway and real-time chat for consultation workflows",
      "Handled live Firestore listeners and OTP authentication flows",
      "Cut down build times and optimized widget tree re-renders across production screens"
    ]
  }
];

export const EDUCATION_LIST = [
  {
    degree: "Bachelor of Computer Application (BCA)",
    institution: "Vimal Tormal Poddar BCA & Commerce College",
    duration: "2021 – 2024",
    scores: "SGPA: 8.26 / 10.0 • CGPA: 7.54 / 10.0 (75.40%)",
    status: "Completed",
    location: "Surat, Gujarat"
  },
  {
    degree: "Higher Secondary Certificate (GSHSEB)",
    institution: "Khodiyar Vidhayalaya, Punagama",
    duration: "2021",
    scores: "Score: 73.00%",
    status: "Completed",
    location: "Surat, Gujarat"
  },
  {
    degree: "Secondary School Certificate (GSEB)",
    institution: "Khodiyar Vidhayalaya, Punagama",
    duration: "2019",
    scores: "Score: 70.00%",
    status: "Completed",
    location: "Surat, Gujarat"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Core Mobile & Languages",
    iconName: "Smartphone",
    description: "Cross-platform mobile development for Android & iOS with compiled speed",
    skills: [
      { name: "Flutter Framework", featured: true, description: "2.5+ yrs building custom widgets & responsive layouts" },
      { name: "Dart", featured: true, description: "Object-oriented, strong typing, async streams & isolates" },
      { name: "Flutter Web", featured: true, description: "Production web applications, responsive dashboards & admin consoles" },
      { name: "C / C++", description: "Foundational programming & low-level algorithms" },
      { name: "Android (Java/Kotlin fundamentals)", description: "Platform channel awareness & manifest setup" },
      { name: "iOS (Swift/Obj-C fundamentals)", description: "Xcode signing, Pods, plist configurations" },
      { name: "Cross-Platform UI", featured: true, description: "Single codebase for iOS, Android and Web" }
    ]
  },
  {
    title: "Web, Admin & SEO Engineering",
    iconName: "Globe",
    description: "Production web applications, responsive back-office admin dashboards, and technical SEO",
    skills: [
      { name: "Flutter Web Development", featured: true, description: "Responsive web dashboards, canvas rendering & adaptive layouts" },
      { name: "Website Development", featured: true, description: "Semantic HTML5, modern CSS, and high-performance web pages" },
      { name: "Technical SEO Implementation", featured: true, description: "Structured data (Schema.org JSON-LD), OpenGraph & search indexing" },
      { name: "Responsive Web UI", featured: true, description: "Fluid cross-device viewports from mobile to widescreen monitors" },
      { name: "Netlify & Surge Deployment", featured: true, description: "Continuous integration, edge CDN delivery & custom domains" }
    ]
  },
  {
    title: "State Management",
    iconName: "Layers",
    description: "Scalable reactive data flows, unidirectional state, and decoupled architecture",
    skills: [
      { name: "Bloc / Cubit", featured: true, description: "Event-driven reactive streams & state separation" },
      { name: "GetX", featured: true, description: "Lightweight state, route management & dependency injection" },
      { name: "Riverpod", featured: true, description: "Compile-safe declarative providers & scoping" },
      { name: "Provider", description: "InheritedWidget wrapper for scoped widget tree state" }
    ]
  },
  {
    title: "Networking & Real-Time",
    iconName: "Zap",
    description: "Low-latency data synchronization, web sockets, and RESTful communication",
    skills: [
      { name: "RESTful APIs", featured: true, description: "HTTP/HTTPS communication, interceptors & error handling" },
      { name: "JSON Data Handling", featured: true, description: "Model serialization, deserialization & null safety" },
      { name: "Socket.IO", featured: true, description: "Real-time bidirectional event streaming & live updates" },
      { name: "Deep Linking", featured: true, description: "Custom URL schemes & app-to-app routing" }
    ]
  },
  {
    title: "Backend & Cloud Services",
    iconName: "Cloud",
    description: "Cloud databases, serverless workflows, and push messaging",
    skills: [
      { name: "Firebase Firestore", featured: true, description: "NoSQL real-time document database & query indexing" },
      { name: "Firebase Authentication", featured: true, description: "Phone OTP, email/password & session persistence" },
      { name: "Cloud Messaging (FCM)", featured: true, description: "Push notification payloads & background handlers" },
      { name: "Supabase Integration", description: "Postgres-backed BaaS with realtime subscriptions" },
      { name: "Razorpay Gateway", featured: true, description: "Payment processing, checkout SDK & transaction status" }
    ]
  },
  {
    title: "Local Storage & Caching",
    iconName: "Database",
    description: "Offline-first capability, persistence, and relational tables on device",
    skills: [
      { name: "Hive", featured: true, description: "Blazing fast, lightweight key-value NoSQL database written in pure Dart" },
      { name: "Shared Preferences", featured: true, description: "Platform key-value storage for settings & tokens" },
      { name: "SQFlite", description: "Structured SQLite relational database on device" }
    ]
  },
  {
    title: "Architecture & Standards",
    iconName: "Boxes",
    description: "Industry-standard engineering patterns for maintainability and scalability",
    skills: [
      { name: "Clean Architecture", featured: true, description: "Domain, data, and presentation layer decoupling" },
      { name: "SOLID Principles", featured: true, description: "Modular, extensible, single-responsibility components" },
      { name: "Figma to Flutter Code", featured: true, description: "Pixel-perfect conversion maintaining design fidelity" },
      { name: "App Performance Optimization", featured: true, description: "Widget tree rebuilding reduction & profiling" }
    ]
  },
  {
    title: "Device Features & APIs",
    iconName: "Cpu",
    description: "Hardware capabilities, maps, and native integrations",
    skills: [
      { name: "Maps & Location", featured: true, description: "Google Maps SDK, geocoding & live location tracking" },
      { name: "Biometric Authentication", featured: true, description: "Hardware fingerprint and face unlock" },
      { name: "Push Notifications", description: "Background message handling and in-app alerts" },
      { name: "Video Call & Real-time Chat", description: "Interactive audio/video communications" }
    ]
  },
  {
    title: "Tools, Store & CI/CD",
    iconName: "Wrench",
    description: "Tooling for agile development, code management, and store releases",
    skills: [
      { name: "Google Play Console", featured: true, description: "Production release, internal testing tracks & app bundles" },
      { name: "Apple App Store", featured: true, description: "App Store Connect, certificates, provisioning & review prep" },
      { name: "Apple TestFlight", featured: true, description: "Beta distribution to QA and stakeholders" },
      { name: "Git & GitHub", featured: true, description: "Version control, branching strategies, PR code reviews" },
      { name: "Android Studio & VS Code", description: "Primary IDEs with Flutter/Dart DevTools & profiler" },
      { name: "Basic FlutterFlow", description: "Rapid prototyping & visual layout exploration" }
    ]
  }
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Understand Requirements",
    description: "Analyze product requirements, user flows, edge cases, and business constraints to design a rock-solid technical roadmap."
  },
  {
    step: "02",
    title: "UI / Figma to Flutter",
    description: "Convert Figma / design assets into pixel-perfect, responsive Flutter widgets matching every typography, color, and spacing detail."
  },
  {
    step: "03",
    title: "Architecture & State Management",
    description: "Set up Clean Architecture with Bloc/Cubit or GetX, decoupling business logic from UI widgets for maintainable, testable code."
  },
  {
    step: "04",
    title: "API, Socket & Backend Sync",
    description: "Integrate RESTful APIs, Socket.IO real-time channels, Firebase/Supabase, and payment gateways with robust error handling."
  },
  {
    step: "05",
    title: "Testing & Performance Optimization",
    description: "Optimize widget trees, eliminate redundant re-renders, test on real devices across screen resolutions, and profile memory."
  },
  {
    step: "06",
    title: "Release & Store Deployment",
    description: "Generate signed release APKs, AABs, and IPAs; configure Google Play Console & Apple App Store Connect / TestFlight for launch."
  }
];

export const DEVELOPMENT_EXPERTISE_AREAS = [
  {
    title: "Cross-Platform Mobile Apps",
    description: "End-to-end development of high-performance iOS and Android applications from a single, clean Dart codebase.",
    icon: "Smartphone"
  },
  {
    title: "Pixel-Perfect UI Implementation",
    description: "Precision conversion from Figma design files into fluid, responsive Flutter widgets with micro-interactions.",
    icon: "Palette"
  },
  {
    title: "State Management Architecture",
    description: "Production mastery of Bloc/Cubit, GetX, and Riverpod following Clean Architecture and SOLID principles.",
    icon: "Layers"
  },
  {
    title: "REST APIs & Socket.IO Real-Time",
    description: "Synchronous REST integration and asynchronous Socket.IO event streams for live assessments, chat, and slot booking.",
    icon: "Zap"
  },
  {
    title: "Firebase & Supabase Cloud",
    description: "Implementation of Cloud Firestore, Firebase Authentication (OTP/Email), Push Notifications (FCM), and Supabase.",
    icon: "Cloud"
  },
  {
    title: "Local Storage & Offline First",
    description: "Offline-first resilience using Hive, SQFlite, and Shared Preferences for instantaneous local data access.",
    icon: "Database"
  },
  {
    title: "Maps, Location & Biometrics",
    description: "Interactive Google Maps routing, geolocation workflows, and device hardware biometric fingerprint security.",
    icon: "MapPin"
  },
  {
    title: "Payment Gateway Integration",
    description: "Integration of Razorpay checkout SDK for in-app purchases, appointment deposits, and wallet transactions.",
    icon: "CreditCard"
  },
  {
    title: "Store Deployment (Play Store & iOS)",
    description: "Hands-on experience publishing to Google Play Console, internal tracks, Apple App Store Connect, and TestFlight.",
    icon: "UploadCloud"
  },
  {
    title: "App Performance & Widget Tree Tuning",
    description: "Auditing rebuild counts, profiling frame render times, minimizing app bundle sizes, and resolving production defects.",
    icon: "Gauge"
  }
];
