// Central content. Source of truth: resume. Placeholders for unverified links are null (and not rendered).

export const profile = {
  name: "Krishna Agarwal",
  email: "krishna.narayana5b@gmail.com",
  linkedin: "https://www.linkedin.com/in/krishnaagarwal2206/",
  resume: "/resume.pdf",
  github: null as string | null, // not supplied
};

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export type Metric = { value: string; label: string; context: string; href?: string };

export const metrics: Metric[] = [
  { value: "#2", label: "of 6,000+", context: "Zomathon Data Hackathon, national ranking for a real-time cart add-on recommender.", href: "/work/csao" },
  { value: "27–106×", label: "vs Gurobi", context: "Reported speedup of an exact MILP solver for N = 100–10,000.", href: "/work/milp-solver" },
  { value: "70%", label: "fewer tokens", context: "Reduction in LLM-agent token costs via prompt caching during an internship.", href: "/#secondary" },
  { value: "10K+", label: "students", context: "Users of Resobin, the institute productivity platform I shipped 8+ features for.", href: "/#secondary" },
  { value: "15.3%", label: "out-of-sample", context: "Reported 6-week return of a PPO trading agent in a research setting. Not investment advice.", href: "/work/rl-trading" },
];

export const principles = [
  { n: "01", title: "Model the problem", body: "Find the structure first. Mathematics, probability or optimization before any tool is chosen." },
  { n: "02", title: "Build the system", body: "Turn the model into a pipeline, an interface or infrastructure someone else can actually use." },
  { n: "03", title: "Measure the outcome", body: "Compare against real baselines, test the assumptions, report what actually improved." },
];

export type Project = {
  slug: string;
  index: string;
  title: string;
  org: string;
  period: string;
  headline: string;
  summary: string;
  result: { value: string; label: string };
  facts: string[];
  tags: string[];
  // case study
  problem: string;
  role: string;
  approach: string[];
  decision: string;
  evidence: string[];
  limits: string[];
  outcome: string;
  disclaimer?: string;
};

export const projects: Project[] = [
  {
    slug: "milp-solver",
    index: "01",
    title: "Exact MILP Solver",
    org: "Distributed Optimization · Prof. Avinash Bhardwaj",
    period: "Jan – Apr 2026",
    headline: "Finding structure where brute force stops scaling.",
    summary:
      "Integer programs get hard fast because the number of candidate combinations explodes. This project finds a structure inside a class of them that lets an exact answer be computed by merging, not enumerating.",
    result: { value: "27–106×", label: "faster than Gurobi, N = 100–10,000" },
    facts: [
      "Min-plus convolution reduction",
      "Convex regime collapses to an O(N log N) merge",
      "Verified against Gurobi on 16/16 cases and exhaustive truth on 12,000+",
      "Weight-depth phase boundary mapped over 5M+ instances",
    ],
    tags: ["Python", "Gurobi", "Discrete optimization"],
    problem:
      "A mixed-integer program is hard because the solver has to decide among a combinatorially large set of options. General-purpose solvers like Gurobi are excellent, but they do not exploit every special structure a specific problem family has. The question: for this family, can the structure be turned into a faster exact method?",
    role:
      "I engineered the solver and the reduction, proved the convex-regime result, and ran the verification and phase-boundary experiments. The project was supervised by Prof. Avinash Bhardwaj.",
    approach: [
      "Reformulate the problem so that combining sub-decisions is a min-plus convolution.",
      "In the convex regime, that convolution collapses to an O(N log N) merge of sorted pieces instead of an exhaustive search.",
      "Check correctness two ways: against Gurobi on 16 cases, and against exhaustive ground truth on more than 12,000 cases.",
      "Sweep more than five million instances to locate the weight-depth boundary where coupling between decisions forces exponential runtime again.",
    ],
    decision:
      "The interesting decision was to treat the failure region as a result, not a defect. Mapping where the method stops working made the claim honest and the boundary itself became a finding.",
    evidence: [
      "27–106× speedup over Gurobi across N = 100 to 10,000 (as reported by the project).",
      "Agreement with Gurobi on 16/16 comparison cases.",
      "Agreement with exhaustive truth across 12,000+ cases.",
      "Phase boundary mapped over 5M+ instances.",
    ],
    limits: [
      "The speedup applies to the structured problem family studied, not to MILP in general.",
      "Where coupling between decisions is strong, runtime is exponential again; that boundary is part of the result.",
      "No public report or repository link has been supplied yet.",
    ],
    outcome: "Exploit the structure of the problem, prove why it works, and map exactly where it stops.",
  },
  {
    slug: "csao",
    index: "02",
    title: "Intelligent Cart Super Add-On",
    org: "Zomathon Data Hackathon · Eternal",
    period: "Mar – Apr 2026",
    headline: "Recommending what belongs in the cart, before the user asks.",
    summary:
      "A real-time, context-aware add-on recommender for a food-delivery cart. A hybrid neural model plus a three-tier cold-start strategy, served at roughly 65 ms P99.",
    result: { value: "#2 / 6,000+", label: "national ranking" },
    facts: [
      "4-level synthesis pipeline, 10K+ orders, 3 realism injections",
      "Set Transformer + GRU4Rec fused by cross-attention, with LightGBM",
      "3-tier cold start: SLM embeddings, LLM knowledge graphs, Bayesian priors",
      "~65 ms P99, 3× below the SLA, via async ONNX and a Redis pre-fetch layer",
    ],
    tags: ["PyTorch", "LightGBM", "ONNX", "Redis"],
    problem:
      "When someone builds a cart, the best add-on depends on what is already in it, the order they added things in, and the context. New items and new users have no history at all. And the answer must arrive faster than the user notices.",
    role:
      "I worked on the modelling and the pipeline, including the synthetic data generation, the hybrid architecture, the cold-start design and the low-latency serving path, as part of a hackathon entry.",
    approach: [
      "Generate realistic training data through a 4-level synthesis pipeline: 10K+ orders with three realism injections that mimic stochastic real-world behavior.",
      "Represent the cart as an unordered set (Set Transformer) and the order of actions as a sequence (GRU4Rec), then fuse them with cross-attention.",
      "Rank candidates with LightGBM on top of the fused representation.",
      "Handle cold start in three tiers: SLM embeddings, LLM-built knowledge graphs, Bayesian priors.",
      "Serve through asynchronous ONNX execution with a Redis-backed pre-fetch layer.",
    ],
    decision:
      "A cart is both a set (what is in it) and a sequence (what was added when). Modelling both and letting cross-attention decide how to weigh them was the central choice.",
    evidence: [
      "Ranked 2nd among 6,000+ participants nationally.",
      "~65 ms P99 latency, 3× below the stated SLA.",
    ],
    limits: [
      "Training data was synthetic, produced by the pipeline described above.",
      "The interactive cart on this site is an educational illustration of the concept. It is not connected to the trained model.",
    ],
    outcome: "A recommender that treats the cart as a set and a sequence, is robust to cold start, and fits the latency budget.",
    disclaimer: "The cart demo is a concept illustration, not the competition model.",
  },
  {
    slug: "agentic-intelligence",
    index: "03",
    title: "Agentic AI Foundation",
    org: "Godrej Consumer Products Limited",
    period: "May – Jul 2026",
    headline: "Building an intelligence system, not another isolated AI feature.",
    summary:
      "A reusable three-layer agentic foundation and a 15-step LLM scoring pipeline. Modular adapters, a 40+ table data model, a feedback loop and a 7-router REST API.",
    result: { value: "30+", label: "step, 3-layer foundation" },
    facts: [
      "3-layer, 30+ step agentic-AI foundation, reusable for future tools",
      "15-step LLM pipeline scoring signals across 6 FMCG competitors",
      "6 modular source adapters, swappable local-to-Azure layer",
      "40+ table data model, self-governing feedback loop, 7-router REST API",
    ],
    tags: ["LLM pipelines", "Azure", "REST API"],
    problem:
      "One-off AI features are easy to demo and hard to extend. The aim was a foundation that future AI tools could reuse, with the data model and feedback loop built in from the start.",
    role:
      "As the AI Research Intern I architected the foundation, built the pipeline, designed the adapters and shipped the data model and API.",
    approach: [
      "Separate the system into three layers so that sources, reasoning and delivery can change independently.",
      "Write source adapters behind one interface so that local development and Azure queue, blob and LLM providers are interchangeable.",
      "Run signals through a 15-step LLM pipeline that scores them across six competitors.",
      "Store everything in a 40+ table model with a feedback loop that lets the system evaluate its own outputs.",
      "Expose the capabilities through a reusable 7-router REST API.",
    ],
    decision: "Treat every provider as a swappable adapter, so the system is a composition of replaceable parts rather than one opaque model.",
    evidence: [
      "Scope as stated on the resume: 3 layers, 30+ steps, 15-step pipeline, 6 adapters, 40+ tables, 7 routers.",
    ],
    limits: [
      "This is an abstract, illustrative diagram based only on high-level resume details.",
      "No internal architecture, business rules, competitor data, code or documents are shown, by design.",
    ],
    outcome: "A foundation designed to be reused, not a single feature.",
    disclaimer: "Conceptual illustration. It does not reproduce any internal implementation.",
  },
  {
    slug: "investment-teaser",
    index: "04",
    title: "Multi-Agent Investment Teaser",
    org: "AI-ML Hackathon · Kelp Global",
    period: "Feb – Mar 2026",
    headline: "From scattered evidence to a presentation-ready investment thesis.",
    summary:
      "Six cooperating agents gather public research, fuse it with private financials and write consulting-grade pitch decks as editable PPTX files in under five minutes.",
    result: { value: "1st / 400+", label: "at IIT Bombay" },
    facts: [
      "6-agent workflow: public web data fused with private financials",
      "JSON schemas steer Gemini through sector-adaptive slide logic and content",
      "Next.js UI with a Slate.js rich-text editor and dynamic charts",
      "Editable, brand-compliant .pptx in under 5 min (Zustand + PptxGenJS)",
    ],
    tags: ["Next.js", "Gemini", "PptxGenJS", "Zustand"],
    problem:
      "Preparing an M&A teaser means collecting public information, merging it with confidential financials, choosing a story and building slides. It is slow, repetitive and needs consistent branding.",
    role: "I designed the six-agent workflow, the JSON schemas, and the editing UI, with a team in a hackathon setting.",
    approach: [
      "Six agents split the work between gathering public data and fusing private financials.",
      "JSON schemas constrain Gemini so slide logic and content adapt to the sector while staying structured.",
      "A Next.js interface with a Slate.js editor and charts lets a person review and edit.",
      "Zustand holds state and PptxGenJS exports fully editable, brand-compliant .pptx files.",
    ],
    decision: "Schemas, not free text, are the contract between agents. That is what makes the output editable and reproducible.",
    evidence: ["First place among 400+ participants at IIT Bombay.", "Decks generated in under five minutes."],
    limits: [
      "The slides shown on this site are synthetic demonstration content.",
      "The agent stage labels are a conceptual illustration of the pipeline described on the resume.",
    ],
    outcome: "Evidence in, editable investment narrative out.",
    disclaimer: "Slides are synthetic and show no real company or deal.",
  },
  {
    slug: "rl-trading",
    index: "05",
    title: "Deep RL for Algorithmic Trading",
    org: "Finsearch · Finance Club",
    period: "Jun – Aug 2025",
    headline: "Teaching a policy to act under uncertainty, then testing whether it holds up.",
    summary:
      "A PPO agent with a risk-aware feature set, compared with ARIMA, LSTM and buy-and-hold, and checked with t-tests and bootstrap confidence intervals.",
    result: { value: "2.13", label: "reported Sharpe ratio" },
    facts: [
      "15.3% out-of-sample return over 6 weeks (reported)",
      "Sharpe 2.13 · Sortino 2.76 · max drawdown −2.89%",
      "Benchmarks: ARIMA, LSTM, buy-and-hold",
      "t-tests and bootstrap confidence intervals",
    ],
    tags: ["PPO", "PyTorch", "Statistics"],
    problem:
      "A trading agent can look good on one backtest by luck. The question was whether a learned policy beats simple baselines and whether the difference holds up statistically.",
    role: "I built the PPO agent, the feature and reward design, and the evaluation.",
    approach: [
      "Convert a market series into state variables: RSI, MACD, momentum and volatility.",
      "Train a PPO policy whose reward accounts for risk, not just return.",
      "Compare with ARIMA, LSTM and buy-and-hold on out-of-sample data.",
      "Validate the metrics with t-tests and bootstrap confidence intervals.",
    ],
    decision: "The reward function includes risk, so the agent is optimized for controlled returns rather than raw ones.",
    evidence: [
      "15.3% out-of-sample return over six weeks and 150% annualized, as reported by the project.",
      "Sharpe 2.13, Sortino 2.76, maximum drawdown −2.89%.",
      "Outperformed ARIMA, LSTM and buy-and-hold benchmarks.",
    ],
    limits: [
      "A six-week window is short. Annualized figures extrapolate and are not a forecast.",
      "These are research results. They are not verified brokerage returns, not a current strategy and not investment advice.",
    ],
    outcome: "An experimental research system, tested against baselines with statistics.",
    disclaimer: "Reported research results. Not investment advice. The chart is illustrative.",
  },
];

export const secondary = [
  {
    key: "devops",
    title: "DevopsAgents",
    kicker: "Prompt caching",
    stat: "70%",
    statLabel: "lower token costs",
    body: "Implemented prompt caching for LLM-based DevOps agents by adapting LangChain classes to work with OpenRouter. The founder wrote a letter of recommendation for savings 3× higher than prior attempts.",
  },
  {
    key: "health",
    title: "Gen-AI for Healthcare Reports",
    kicker: "Prototype · WnCC Seasons of Code",
    stat: "1,200+",
    statLabel: "page dataset",
    body: "A LangChain chatbot with semantic search and a RAG pipeline (Hugging Face embeddings, Pinecone) that turns symptom inputs into structured reports. Flask UI. A prototype, not a diagnostic or clinical tool.",
  },
  {
    key: "resobin",
    title: "Resobin",
    kicker: "DevCom, IIT Bombay",
    stat: "10K+",
    statLabel: "students",
    body: "Built and shipped 8+ features for the institute productivity platform, including the exam timetable, interactive schedule and Quick Actions.",
  },
  {
    key: "insti",
    title: "Insti-Connect",
    kicker: "Team of 6",
    stat: "18+",
    statLabel: "backend APIs",
    body: "A LinkedIn-style app for IIT Bombay students. I developed APIs in the Django, Django REST Framework and Simple-JWT backend.",
  },
  {
    key: "stock",
    title: "Stock Market Prediction",
    kicker: "Course project · Probability & Statistics",
    stat: "96.93%",
    statLabel: "trend accuracy",
    body: "Moving-average model and a Monte Carlo price simulation. The accuracy figure is the course project's own reported measure and is not presented as a verified out-of-sample result.",
  },
];

export const experience = [
  {
    when: "May – Jul 2026",
    role: "AI Research Intern",
    org: "Godrej Consumer Products Limited",
    body: "Architected a reusable agentic-AI foundation and a 15-step LLM scoring pipeline, with a 40+ table data model and a 7-router API.",
  },
  {
    when: "Jun – Jul 2025",
    role: "Software Development Intern",
    org: "DevopsAgents",
    body: "Cut LLM-agent token costs by 70% with prompt caching, adapting LangChain to OpenRouter.",
  },
  {
    when: "Mar 2025 – Mar 2026",
    role: "Developer",
    org: "DevCom, IIT Bombay",
    body: "Part of one of India's largest student developer communities. Shipped 8+ Resobin features for 10K+ students.",
  },
];

export const leadership = [
  {
    role: "Industrial Outreach Secretary",
    org: "IEORSA, IIT Bombay",
    when: "Jul 2026 – present",
    plain: "The student body of my department, Industrial Engineering & Operations Research.",
    points: ["Driving recruiter engagement across 8+ industry domains", "Expanding opportunities for 200+ IEOR students", "Promoting faculty expertise, research and student excellence"],
  },
  {
    role: "Department Academic Mentor",
    org: "DAMP, IIT Bombay",
    when: "Jul 2026 – present",
    plain: "A peer mentorship program for students in the department.",
    points: ["Selected as 1 of 8 mentors from 26+ applicants", "Mentoring 6 second-year students through their transition", "Part of the web team, running social media outreach"],
  },
  {
    role: "Teaching Assistant, CS101",
    org: "Computer Programming and Utilization",
    when: "Jul – Nov 2025",
    plain: "The introductory programming course at IIT Bombay.",
    points: ["One of only two sophomores appointed", "Led 7+ weekly lab sessions, mentoring 20+ students", "Supported 100+ students in help sessions"],
  },
];

export const beyond = [
  { k: "P&G IT Spotlight", v: "Top 16 finalist", d: "from 1,300+ applicants across IITs and IIITs" },
  { k: "HUL Tech Foundation School", v: "Top 30 finalist", d: "from 1,000+ applicants across IITs" },
  { k: "SeekOut", v: "3rd place", d: "IIT Bombay's largest cryptic hunt, 300+ teams" },
  { k: "Freshers' Dance Championship", v: "Choreographed the winning and runner-up teams", d: "Coordination is a shared-execution problem too." },
  { k: "Naneghat Peak", v: "800m+ trek", d: "A day outside the classroom." },
];

export const education = {
  degree: "B.Tech, Industrial Engineering & Operations Research",
  school: "IIT Bombay · expected 2028",
  cpi: "9.57",
  items: [
    "Dual minors: Computer Science, and Artificial Intelligence & Data Science",
    "AA grade (10/10) in 15 courses, among 1300+ students",
    "JEE Mains 99.91 percentile · JEE Advanced AIR 1042 (2024)",
    "National Standard Exam in Chemistry: AIR 531, West Bengal state topper (2023)",
  ],
  courses: [
    "Introduction to Machine Learning",
    "ML for Natural Language & Knowledge Graphs",
    "Data Structures and Algorithms",
    "Computer Networks",
    "Linear Optimization",
    "Non-Linear & Discrete Optimization",
    "Probability and Statistics",
    "Linear Algebra · Differential Equations · Calculus",
  ],
};

export const skills = [
  { g: "Languages", items: ["Python", "C++", "JavaScript"] },
  { g: "ML & data", items: ["PyTorch", "TensorFlow", "scikit-learn", "NumPy", "Pandas", "Matplotlib", "Hugging Face"] },
  { g: "Applied AI", items: ["LangGraph", "OpenRouter"] },
  { g: "Software", items: ["React", "Django", "Django REST Framework", "Flask"] },
  { g: "Tools", items: ["Gurobi", "Docker", "LaTeX", "AutoCAD", "Fusion 360", "EasyEDA"] },
];
