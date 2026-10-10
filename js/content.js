/* =========================================================================
   ✏️  EDIT YOUR CONTENT HERE  —  this is the only file you need to touch
   =========================================================================

   TEXT      Change anything inside "quotes".
   IMAGES    Each project has  images: ["images/a.webp", "images/b.webp"].
             The first image is the cover; extra images become a slideshow
             with arrows. Files live in the "images" folder, or paste a full
             https:// link. Use [] to show a coloured placeholder that tells
             you which field to fill.
   HIDE      Add  show: false  to a project to hide it without deleting it.
   ADD/REMOVE  Copy a whole { ... }, block inside projects / experience /
             impact and paste it where you want it. Delete a block to remove.
   COLOURS & FONT  See "theme". Any Google Font name works for `font`.
   MOTION & GAME   See "effects" and "game" near the bottom of this file.

   Other files:  index.html (page shell) · css/style.css (look and feel)
                 js/theme.js (light/dark mode) · js/main.js (builds the page)
                 js/play.js (interactions and the progress game)
                 README.md (full guide)
   ========================================================================= */

const SITE = {

  meta: {
    title: "Eseosasere Efe — Senior Product Designer",
    description: "Senior product designer with 3+ years designing web and mobile products across healthcare, AI, fintech, SaaS, marketplace and mobility."
  },

  theme: {
    font: "Geist",                 // any Google Font, e.g. "Inter Tight", "Instrument Sans"
    fontWeights: "400;500;600;700",
    paper:   "#ffffff",            // page background
    surface: "#f3f4f8",            // cards and placeholders
    ink:     "#10131f",            // main text
    muted:   "#6b6f7b",            // secondary text
    line:    "#e6e7ec",            // borders and dividers
    accent:  "#2f4bff",            // hover and focus colour

    darkMode: true,                // false removes dark mode and the toggle button
    defaultMode: "system",         // "system" (follow the visitor's device), "light" or "dark"
    dark: {                        // colours used in dark mode
      paper:   "#0c0e16",
      surface: "#161926",
      ink:     "#eef0f7",
      muted:   "#9aa0b4",
      line:    "#262b3c",
      accent:  "#8b9bff"
    }
  },

  person: {
    name: "Eseosasere Efe",
    nickname: "Exhosah",           // shown as the logo in the top bar
    title: "Senior Product Designer",
    email: "exhosah@gmail.com",
    portrait: "images/portrait.webp",  // photo for the About section (4:5 frame)
    links: [
      { label: "Behance",  url: "https://be.net/exhosahefe1" },
      { label: "LinkedIn", url: "https://linkedin.com/in/exhosah-e-985487235/" }
    ]
  },

  hero: {
    headline: "I design clear, human-centered products for complex problems.",
    intro: "Senior product designer with 3+ years across healthcare, AI, fintech, SaaS, marketplace and mobility. I lead design from discovery and UX research to prototyping, design systems and developer handoff.",
    primaryCta: "See my work",
    secondaryCta: "Email me",
    // Small draggable stickers floating beside the headline (desktop only).
    // Add, remove or rename them. Leave [] for none.
    stickers: ["Figma", "User research", "Prototyping", "Design systems"]
  },

  work: {
    heading: "Selected work",
    intro: "Landing pages, dashboards and AI products I've designed.",
    projects: [
      {
        name: "EaseDrive",
        kind: "Ride-hailing shuttle booking platform",
        year: "2025",
        tags: ["Mobile", "Web", "Marketplace"],
        images: ["images/easedrive.webp"],
        summary: "End-to-end design of a responsive shuttle booking platform: 70+ high-fidelity screens across passenger, driver, admin and marketing experiences. A multi-driver offer flow lets passengers compare offers before confirming a ride.",
        link: "", linkLabel: ""
      },
      {
        name: "VitaLink",
        kind: "Healthcare equipment marketplace with an AI assistant",
        year: "",
        tags: ["Healthcare", "Marketplace", "AI"],
        images: ["images/vitalink-landing.webp", "images/vitalink-ai-chat.webp"],
        summary: "A marketplace for finding healthcare equipment from verified sellers. The landing page leads with a search and AI discovery prompt, and the signed-in experience is a chat where VitaLink AI recommends products with price, stock and verification details.",
        link: "", linkLabel: ""
      },
      {
        name: "Xpress Learner AI",
        kind: "AI video response generator",
        year: "2025",
        tags: ["AI", "EdTech", "Desktop app", "Landing page"],
        images: ["images/xpress-learner-ai.webp"],
        summary: "An AI-powered video response generator that makes educational content more accessible and interactive, with video and text feedback formats users can choose between. Covers the desktop app, landing page and features.",
        link: "https://xpress-ai.netlify.app/login", linkLabel: "Open the product"
      },
      {
        name: "Mycaban",
        kind: "Housing marketplace and agent dashboard",
        year: "",
        tags: ["Real estate", "Web", "Dashboard"],
        images: ["images/mycaban-landing.webp", "images/mycaban-schedule.webp"],
        summary: "A housing platform that connects property owners with buyers and renters. The landing page centres on property search by location, type and price, and the agent dashboard includes a weekly schedule for site inspections.",
        link: "", linkLabel: ""
      },
      {
        name: "SurePlugs",
        kind: "Electronics e-commerce platform",
        year: "",
        tags: ["E-commerce", "Web", "Rewards"],
        images: ["images/sureplugs-home.webp", "images/sureplugs-benefits.webp"],
        summary: "An electronics store with a category-led home page and a rewards layer: shoppers earn points by completing tasks and can share a birthday wishlist with friends.",
        link: "", linkLabel: ""
      },
      {
        name: "Flex Living",
        kind: "Landing page for Base360.AI, short-term rental automation",
        year: "",
        tags: ["AI", "SaaS", "Landing page"],
        images: ["images/flex-living.webp"],
        summary: "A landing page for an AI platform that automates short-term rentals, covering bookings, pricing, guest communication, compliance and analytics in one dashboard.",
        link: "", linkLabel: ""
      },
      {
        name: "Bclics",
        kind: "Marketplace admin dashboard",
        year: "",
        tags: ["Dashboard", "Marketplace", "Dark mode"],
        images: ["images/bclics-admin.webp"],
        summary: "A dark admin dashboard for the Bclics marketplace: key totals, an adverts chart, and a quick-action panel for reviewing reports, approving payouts, verifying sellers and handling scam alerts.",
        link: "", linkLabel: ""
      },
      {
        name: "BeckyShops",
        kind: "Store-link platform for social sellers",
        year: "",
        tags: ["E-commerce", "Dashboard", "Landing page"],
        images: ["images/beckyshops.webp"],
        summary: "A landing page and seller dashboard that give sellers one shareable store link, with buyers ordering through WhatsApp, Instagram DM or email. The dashboard tracks store visits, products, orders and wallet balance.",
        link: "", linkLabel: ""
      },
      {
        name: "Prepora",
        kind: "Exam question practice platform",
        year: "",
        tags: ["EdTech", "Web", "Dark mode"],
        images: ["images/prepora.webp"],
        summary: "A question bank for exam practice. This screen shows the wrong-answer state: the chosen option is flagged, and an explanation with a worked example appears below, next to a discussion thread.",
        link: "", linkLabel: ""
      },
      {
        name: "AI Document Verification",
        kind: "Landing page",
        year: "",
        tags: ["AI", "Landing page", "Bold type"],
        images: ["images/ai-document-verification.webp"],
        summary: "A bold, high-contrast landing page for an AI service that verifies visa applications, passports and immigration paperwork, with two clear actions: upload documents or view a sample report.",
        link: "", linkLabel: ""
      },

      /* ---- Hidden for now (no images yet). Remove "show: false" to bring one back. ---- */
      {
        show: false,
        name: "Medical consultation platform", kind: "UX audit and redesign", year: "2026",
        tags: ["Healthcare", "Web", "UX audit"], images: [],
        summary: "A UX audit and redesign of a healthcare platform that connects patients, doctors, pharmacies, HMOs and laboratories. The audit's prioritized recommendations shaped the redesign of key journeys.",
        link: "", linkLabel: ""
      },
      {
        show: false,
        name: "Artivio", kind: "Ride-hailing app redesign", year: "2026",
        tags: ["Mobile", "UX audit", "Prototyping"], images: [],
        summary: "Stakeholder discovery and a UX audit of the existing platform, followed by journey maps, information architecture, wireframes, high-fidelity Figma designs and interactive prototypes.",
        link: "", linkLabel: ""
      },
      {
        show: false,
        name: "AI Interview Preparation Platform", kind: "Don-Clem Technology", year: "2025",
        tags: ["AI", "Web", "User research"], images: [],
        summary: "Research-led design of an AI interview preparation platform with curated learning paths, which reached a 15% completion rate.",
        link: "https://donclemtech.com/", linkLabel: "Visit Don-Clem Technology"
      },
      {
        show: false,
        name: "PalsConnect", kind: "Website, waitlist, chat app UI and CRM dashboard", year: "2024",
        tags: ["Web", "Mobile", "Dashboard"], images: [],
        summary: "Redesigned the website and waitlist to lift engagement by 20%, and designed a CRM dashboard for transactions, affiliate payments and user support.",
        link: "https://palsconnects.com/", linkLabel: "Visit PalsConnect"
      },
      {
        show: false,
        name: "Orello Tracker", kind: "Task management plugin and marketing website", year: "2025",
        tags: ["SaaS", "Plugin", "Design system"], images: [],
        summary: "A task management dashboard and analytics workflows for designers and teams, backed by a reusable component library shared across the plugin and the marketing site.",
        link: "", linkLabel: ""
      }
    ]
  },

  impact: {
    heading: "Results from the work",
    items: [
      { text: "70+ high-fidelity screens designed across passenger, driver, admin and marketing experiences.", source: "EaseDrive" },
      { text: "Development timelines sped up by 25% by working closely with developers on design changes.", source: "Don-Clem Technology" },
      { text: "Engagement up 20% after redesigning the website and waitlist.", source: "PalConnects" },
      { text: "User satisfaction up 30% after research-led refinements to the interface.", source: "Orello Tracker" },
      { text: "User engagement up 25% with an AI-powered video response generator.", source: "Xpress Learner AI" },
      { text: "Task completion time down 20% after usability testing and workflow refinements.", source: "Xpress Learner AI" },
      { text: "Revision cycles cut by 25% through close collaboration with developers and stakeholders.", source: "PalConnects" }
    ]
  },

  about: {
    heading: "About",
    lead: "I'm a product designer who enjoys untangling complex problems. I work with cross-functional teams to deliver scalable digital experiences that improve usability, engagement and business outcomes.",
    // Numbers count up when they scroll into view. value = number, suffix = "+" or "%".
    stats: [
      { value: 3,  suffix: "+", label: "Years of product design" },
      { value: 70, suffix: "+", label: "High-fidelity screens on EaseDrive" },
      { value: 7,  suffix: "",  label: "Teams and products worked on" },
      { value: 30, suffix: "%", label: "Satisfaction lift from research and usability testing" }
    ],
    details: [
      { label: "Expertise", items: [
        "User research and analysis", "UI and UX design", "Prototyping and wireframing",
        "Responsive design", "Design system implementation", "Minimalistic UI design",
        "User-centered design", "Agile workflow" ] },
      { label: "Skills", items: [
        "Communication", "Collaboration", "Design-to-dev handoff",
        "Interactive prototyping", "WCAG 2.1 accessibility compliance" ] },
      { label: "Certifications", items: [
        "Genesys Upskill", "UI/UX design course, Dreamaxhq", "HNG11 Internship",
        "Claude Code", "McKinsey Forward Program" ] },
      { label: "Education", items: [
        "B.Eng Civil Engineering, University of Benin, 2019–2024 (Second Class Upper)",
        "Maritime studies and ICT, University of Benin, 2017–2019 (Second Class Upper)" ] }
    ]
  },

  experience: {
    heading: "Experience",
    items: [
      {
        company: "Artivio", role: "Product Designer", location: "Ride-hailing app",
        dates: "Mar 2026 – Aug 2026", logo: "",
        bullets: [
          "Facilitated stakeholder discovery sessions to understand business objectives, product challenges and opportunities before the redesign.",
          "Ran a UX audit of the existing platform, identifying usability issues, inconsistent interaction patterns and friction across critical journeys.",
          "Produced journey maps, information architecture, wireframes, high-fidelity Figma designs and interactive prototypes to validate solutions before development.",
          "Documented UX findings and prioritized recommendations that informed the product roadmap."
        ]
      },
      {
        company: "Medical Consultation Platform", role: "Design Auditor", location: "",
        dates: "Jan 2026 – Mar 2026", logo: "",
        bullets: [
          "Collaborated with stakeholders to understand business goals and user pain points before starting the redesign.",
          "Conducted a comprehensive UX audit that identified usability issues, inconsistencies and workflow bottlenecks.",
          "Produced actionable recommendations that shaped the redesign strategy and prioritized high-impact improvements.",
          "Redesigned key journeys and components for a more intuitive, accessible and efficient healthcare experience."
        ]
      },
      {
        company: "EaseDrive", role: "Product Designer", location: "Enugu (Remote)",
        dates: "Mar 2025 – Aug 2025", logo: "",
        bullets: [
          "Led end-to-end design of a responsive shuttle booking platform: 70+ high-fidelity Figma screens across passenger, driver, admin and marketing experiences.",
          "Designed journeys for three user roles covering onboarding, ride booking, driver bidding, payments, earnings, support and verification.",
          "Introduced a multi-driver offer workflow so passengers can compare offers before confirming, increasing transparency and control.",
          "Designed loading, empty, success, error and 404 states, email templates and onboarding, and produced developer-ready specs, annotations and flows."
        ]
      },
      {
        company: "Don-Clem Technology", role: "Product Designer", location: "UK (Remote)",
        dates: "Feb 2025 – Oct 2025", logo: "",
        bullets: [
          "Led design on two major projects, including an AI Interview Preparation Platform, grounded in in-depth user research.",
          "Directed a team of interns, improving project delivery efficiency by 15%.",
          "Worked with developers to implement design changes, shortening feedback loops and speeding development timelines by 25%.",
          "Curated learning paths reached a 15% completion rate."
        ]
      },
      {
        company: "Xpress Learner AI", role: "Product Designer", location: "Enugu (Remote)",
        dates: "Jan 2025 – Mar 2025", logo: "",
        bullets: [
          "Designed an AI-powered video response generator, increasing user engagement by 25%.",
          "Built the UI for video and text-based feedback so users can receive responses in the format they prefer.",
          "Refined workflows through usability testing, cutting task completion time by 20%.",
          "Worked with engineers on video processing speed, improving response delivery time by 15%."
        ]
      },
      {
        company: "Orello Tracker", role: "Product Designer", location: "UK (Remote)",
        dates: "Jan 2025 – Feb 2025", logo: "",
        bullets: [
          "Led end-to-end design of the plugin and its marketing website, including a task management dashboard and analytics workflows.",
          "Ran user research and usability testing, which raised user satisfaction by 30%.",
          "Created a scalable design system and reusable component library for consistency across the plugin and the website."
        ]
      },
      {
        company: "PalConnects", role: "Product Designer", location: "UK (Remote)",
        dates: "Nov 2024 – Feb 2025", logo: "",
        bullets: [
          "Redesigned the PalsConnect website and waitlist, increasing engagement by 20% through streamlined navigation and responsive design.",
          "Designed the CRM dashboard for transaction management, affiliate payments and user support.",
          "Used research and usability testing to find pain points, improving efficiency and satisfaction by 30%.",
          "Collaborated with developers and stakeholders, reducing revision cycles by 25%."
        ]
      }
    ]
  },

  contact: {
    heading: "Have a product to design? Let's talk."
  },

  /* Turn any effect off with false. Effects switch themselves off on touch
     screens and for visitors who prefer reduced motion. */
  effects: {
    progressBar: true,   // thin bar at the top that fills as you scroll
    cursor: true,        // trailing ring cursor that grows over links
    magnetic: true,      // buttons lean toward the cursor
    tilt: true,          // project covers tilt with a light glare
    stickers: true,      // draggable stickers in the hero
    scrollSpeed: true,   // marquees speed up while you scroll
    countUp: true,       // stats count up
    game: true           // progress ring + achievements (bottom-left)
  },

  /* Text for the progress game. Edit titles and descriptions freely.
     secret: true hides the description until it is unlocked. */
  game: {
    levels: ["Newcomer", "Explorer", "Insider", "Almost there", "Collaborator"],
    completeMessage: "You've seen it all. Let's work together.",
    achievements: {
      start:   { title: "First steps",      desc: "Scrolled past the intro" },
      work:    { title: "Window shopper",   desc: "Found the selected work" },
      gallery: { title: "Gallery explorer", desc: "Flipped through a project's images" },
      fine:    { title: "Fine print",       desc: "Opened two experience entries" },
      play:    { title: "Playful",          desc: "Dragged a sticker around" },
      hello:   { title: "Say hello",        desc: "Reached for the contact links" },
      night:   { title: "Night owl",        desc: "Switched to dark mode" },
      all:     { title: "Completionist",    desc: "Explored every section" },
      speed:   { title: "Speed reader",     desc: "Scrolled fast enough to rev up the marquees", secret: true },
      konami:  { title: "Secret code",      desc: "Found the hidden keyboard shortcut",           secret: true }
    }
  }
};
