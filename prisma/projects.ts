export interface Project {
  title: string
  description: string
  longDescription: string
  slug: string
  company: string | null
  projectUrl: string | null
  githubUrl?: string | null
  featured: boolean
  published: boolean
  skills: string[]
}

export const projects: Project[] = [
  {
    featured: true,
    published: true,
    title: 'ChaDoin (Social + Creator App)',
    description:
      'A Gen-Z-focused social app combining content sharing, live events, and monetization.',
    longDescription:
      'ChaDoin lets users create private and public channels, host events, and manage fan interaction through DMs, group chats, stories, lists, and polls. Includes P2P money transfers and pooled event planning. Think Slack + TikTok + Discord for close friends and creators.',
    slug: 'chadoin',
    company: null,
    projectUrl: null,
    skills: [
      'React Native',
      'React',
      'GraphQL',
      'Prisma',
      'Apollo',
      'Chakra UI',
      'TypeScript',
      'Postgres',
      'UX/UI',
      'iOS',
      'Android',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'Brndabl (Influencer Marketing Platform)',
    description:
      'Influencer and model marketing platform and agency pairing brands with top-tier talent.',
    longDescription:
      'Dual-portal web app for brands to post campaigns and for influencers to apply, manage deliverables, and receive milestone-based payments. Features include admin tools, chat with file sharing, payment workflows, and brand team collaboration.',
    slug: 'Brndabl',
    company: null,
    projectUrl: 'https://brndabl.com',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'AWS',
      'UX/UI',
      'Payments',
    ],
  },
  {
    featured: true,
    published: true,
    title: '🧀 CHDR (Finance Super App)',
    description:
      'Unified Gen-Z-focused platform for banking, investing, and credit building.',
    longDescription:
      'A Gen-Z-focused mobile financial hub integrating banking, stock/crypto investing, AI-powered portfolio management, credit building, and P2P transfers. Includes embedded wallets, bill pay, and automatic rebalancing features.',
    slug: 'chdr',
    company: null,
    projectUrl: null,
    skills: [
      'React',
      'Next.js',
      'React Native',
      'TypeScript',
      'AI',
      'Finance',
      'UX/UI',
      'Crypto',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'AI-Powered Trading Chatbot',
    description:
      'LLM-powered assistant for stock/crypto prediction, analysis, and trading.',
    longDescription:
      'Uses LSTM, BERT, and real-time sentiment to predict market trends, auto-execute trades, and optimize user portfolios. Includes backtesting, risk modeling, Monte Carlo simulations, and live/paper trading via Alpaca.',
    slug: 'ai-trading-agent',
    company: null,
    projectUrl: null,
    skills: [
      'Python',
      'React',
      'PostgreSQL',
      'Redis',
      'Alpaca API',
      'LLMs',
      'Financial Engineering',
      'Auto-Trading',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'ClickUp Custom Dashboards',
    description:
      'Fully modular dashboard system for ClickUp’s productivity suite.',
    longDescription:
      'Enabled users to build dashboards with customizable widgets that surfaced data from ClickUp’s core systems like tasks, docs, and goals. Focused on speed, flexibility, and drag-and-drop UX.',
    slug: 'clickup-dashboard-widgets',
    company: 'ClickUp',
    projectUrl: null,
    skills: [
      'TypeScript',
      'React',
      'Redux',
      'Widget Architecture',
      'Product Design',
      'Performance Optimization',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'OpenTable UX Research & Prototyping',
    description:
      'Research-driven improvements to restaurant and diner experiences.',
    longDescription:
      'Conducted research, interviews, and prototype testing to validate new product directions. Improved flows for table discovery, booking, and reservation management.',
    slug: 'opentable-ux-research',
    company: 'OpenTable',
    projectUrl: null,
    skills: [
      'UX Research',
      'Prototyping',
      'Figma',
      'User Testing',
      'Journey Mapping',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'Ironclad Contract Workflow Builder',
    description:
      'Helped design a modular UI for automating legal document workflows.',
    longDescription:
      'Built a system for legal teams to create complex contract workflows via visual building blocks. Focused on logic validation, UI clarity, and collaboration tooling.',
    slug: 'ironclad-workflow-builder',
    company: 'Ironclad',
    projectUrl: null,
    skills: [
      'React',
      'TypeScript',
      'Enterprise UX',
      'Modular UI Systems',
      'LegalTech',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'Gametime Mobile Ticketing',
    description:
      'Enhanced UX and performance for last-minute ticket buying on mobile.',
    longDescription:
      'Worked on mobile web and app flows to optimize ticket search, checkout, and wallet integration. Emphasized speed and usability for on-the-go purchases.',
    slug: 'gametime-ticket-experience',
    company: 'Gametime',
    projectUrl: null,
    skills: [
      'React Native',
      'TypeScript',
      'UX',
      'Performance Optimization',
      'Mobile Commerce',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'Nabis B2B Cannabis Logistics Platform',
    description: 'Built tools for wholesale cannabis operations.',
    longDescription:
      'Created dashboards and logistics tools for distributors and brands, including inventory management, route planning, and real-time delivery tracking.',
    slug: 'nabis-logistics-dashboard',
    company: 'Nabis',
    projectUrl: null,
    skills: [
      'TypeScript',
      'React',
      'Logistics UX',
      'B2B SaaS',
      'Real-time Systems',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'Farmlogs Precision Ag Tools',
    description: 'Agricultural tools for managing crop performance.',
    longDescription:
      'Built weather tracking, satellite imagery tools, and yield mapping for farmers to optimize crop outputs and operational decisions.',
    slug: 'farmlogs-ag-platform',
    company: 'Farmlogs',
    projectUrl: null,
    skills: [
      'React',
      'Satellite Data',
      'GeoJSON',
      'Data Visualization',
      'AgTech',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'EvergreenWealth Client Dashboards',
    description:
      'Wealth management tools for client transparency and communication.',
    longDescription:
      'Created dashboards and reporting tools for clients to track investment performance, receive insights, and communicate with advisors securely.',
    slug: 'evergreenwealth-client-dashboard',
    company: 'EvergreenWealth',
    projectUrl: null,
    skills: [
      'React',
      'D3.js',
      'Financial Reporting',
      'UX Design',
      'Security Best Practices',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'Makersplace Digital Art Marketplace',
    description: 'NFT marketplace for creators and collectors.',
    longDescription:
      'Helped design and implement the user experience for browsing, purchasing, and showcasing digital art NFTs. Integrated Ethereum-based wallets and transaction flows.',
    slug: 'makersplace-nft-marketplace',
    company: 'Makersplace',
    projectUrl: null,
    skills: [
      'React',
      'Web3.js',
      'Ethereum',
      'UX Design',
      'Crypto Wallet Integration',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'FetchMyGuest Property Booking Platform',
    description: 'Vacation rental platform with direct booking capabilities.',
    longDescription:
      'Developed features for guest booking, calendar sync, and payment integration to help property managers bypass third-party booking fees.',
    slug: 'fetchmyguest-booking-tools',
    company: 'FetchMyGuest',
    projectUrl: null,
    skills: [
      'React',
      'Stripe',
      'Booking APIs',
      'Calendar Integration',
      'PropertyTech',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'HappyMoney Loan Application UX',
    description: 'Streamlined financial wellness tools and loan applications.',
    longDescription:
      'Improved user flows for personal loan applications, repayment dashboards, and customer support integration — focusing on transparency and trust.',
    slug: 'happymoney-loan-app',
    company: 'HappyMoney',
    projectUrl: null,
    skills: [
      'React',
      'UX Writing',
      'Form Design',
      'Financial UX',
      'Behavioral Psychology',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'GoRide (Ford Motors) Transportation Platform',
    description:
      'Medical and paratransit transportation coordination platform.',
    longDescription:
      'Built booking and dispatch tools for patients, caregivers, and healthcare providers, integrated with backend logistics for vehicle coordination.',
    slug: 'goride-transport-platform',
    company: 'GoRide (Ford Motors)',
    projectUrl: null,
    skills: [
      'React Native',
      'Scheduling Systems',
      'Healthcare UX',
      'Mobile App Development',
    ],
  },
  {
    featured: true,
    published: true,
    title: 'HelpVR (Augmented Reality VR Platform)',
    description:
      'TechCrunch Disrupt hackathon project. Augmented reality and virtual reality app to help users assist eachother remotely',
    longDescription:
      'Created immersive AR/VR experiences to help users assist eachother remotely',
    slug: 'helpvr-health-vr',
    company: 'HelpVR',
    projectUrl: null,
    skills: [
      'Unity',
      'C#',
      'VR Design',
      'Patient Experience',
      'Interactive Content',
    ],
  },
]
