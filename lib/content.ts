import type { Locale } from "./i18n";

export type ProjectSlug =
  | "bookahtranslate"
  | "coperniq"
  | "bequant"
  | "smart-trade";

export type ProjectMeta = {
  slug: ProjectSlug;
  year: string;
  company: string;
  role: { en: string; ru: string };
  oneLiner: { en: string; ru: string };
  stack: string[];
  metrics: { value: string; label: { en: string; ru: string } }[];
  links?: { label: string; href: string }[];
  status?: { en: string; ru: string };
};

export const projects: ProjectMeta[] = [
  {
    slug: "bookahtranslate",
    year: "2024 — Now",
    company: "BookahTranslate / AthenaDev",
    role: {
      en: "Founder & Lead Developer",
      ru: "Основатель и ведущий разработчик",
    },
    oneLiner: {
      en: "AI-powered document translation SaaS. PDF, EPUB, DOCX up to 300+ pages with layout preservation, powered by GPT-4 and Claude.",
      ru: "AI-сервис перевода документов. PDF, EPUB, DOCX до 300+ страниц с сохранением форматирования на базе GPT-4 и Claude.",
    },
    stack: [
      "Python",
      "Flask",
      "SQLAlchemy",
      "Celery",
      "PostgreSQL",
      "Redis",
      "OpenAI GPT-4",
      "Anthropic Claude",
      "Google Translate",
      "YooKassa",
      "Telegram Bot API",
      "Nginx",
      "Linux",
      "pytest",
      "Playwright",
    ],
    metrics: [
      { value: "3", label: { en: "Components shipped solo", ru: "Компонента — выпущены в одиночку" } },
      { value: "300+", label: { en: "Pages per document supported", ru: "Страниц на документ" } },
      { value: "80+", label: { en: "Tests (>70% coverage)", ru: "Тестов (>70% покрытия)" } },
      { value: "3", label: { en: "Auth providers (Google, VK, Telegram)", ru: "OAuth-провайдера" } },
    ],
    links: [
      { label: "Live", href: "https://bookahtranslate.tech" },
      { label: "Landing", href: "https://athenadev.tech" },
    ],
    status: { en: "In production · solo founder", ru: "В продакшене · соло-основатель" },
  },
  {
    slug: "coperniq",
    year: "Dec 2022 — Now",
    company: "Coperniq",
    role: {
      en: "Fullstack Developer / Team Lead",
      ru: "Fullstack-разработчик / Team Lead",
    },
    oneLiner: {
      en: "SaaS for US solar-industry project management. Serves 200+ contractor companies, scaled to 3000+ concurrent users.",
      ru: "SaaS для управления проектами в solar-индустрии США. 200+ компаний-подрядчиков, 3000+ одновременных пользователей.",
    },
    stack: [
      "TypeScript",
      "Node.js",
      "Nest.js",
      "Express",
      "React",
      "Redux Toolkit",
      "React Query",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Kubernetes",
      "AWS",
      "GitLab CI",
      "Prometheus",
      "Grafana",
    ],
    metrics: [
      { value: "−85%", label: { en: "API response time (1.2s → 180ms)", ru: "Время ответа API (1.2с → 180мс)" } },
      { value: "−87%", label: { en: "Deploy time (90 → 12 min)", ru: "Время деплоя (90 → 12 мин)" } },
      { value: "−60%", label: { en: "Production incidents", ru: "Production-инцидентов" } },
      { value: "12", label: { en: "Devs scaled to", ru: "Разработчиков в команде" } },
    ],
  },
  {
    slug: "bequant",
    year: "Jun 2019 — Dec 2022",
    company: "Bequant",
    role: { en: "Fullstack Developer / Lead", ru: "Fullstack-разработчик / Lead" },
    oneLiner: {
      en: "Institutional crypto exchange with proprietary matching engine. Trading terminal handling 10K market events per minute.",
      ru: "Институциональная криптобиржа с собственным matching-движком. Торговый терминал на 10K событий в минуту.",
    },
    stack: [
      "Node.js",
      "TypeScript",
      "React",
      "Redux",
      "GraphQL (Apollo)",
      "REST",
      "WebSocket",
      "MongoDB",
      "Redis",
      "Kubernetes",
      "AWS",
      "ELK Stack",
      "Cypress",
    ],
    metrics: [
      { value: "10K/min", label: { en: "Market events handled in UI", ru: "Событий рынка в минуту в UI" } },
      { value: "−45%", label: { en: "Backend load (via GraphQL)", ru: "Нагрузки на backend" } },
      { value: "50K+", label: { en: "Active users at peak", ru: "Активных пользователей в пике" } },
      { value: "45→8 min", label: { en: "MTTR for production incidents", ru: "MTTR production-инцидентов" } },
    ],
  },
  {
    slug: "smart-trade",
    year: "Mar 2018 — May 2019",
    company: "Smart Trade (Germany)",
    role: { en: "Backend Developer", ru: "Backend-разработчик" },
    oneLiner: {
      en: "SaaS for retail trading automation. Backend on Django + 30 REST endpoints, React drag-and-drop strategy builder.",
      ru: "SaaS-автоматизация торговли. Backend на Django + 30 REST endpoints, конструктор стратегий на React.",
    },
    stack: [
      "Python",
      "Django",
      "Django REST Framework",
      "React",
      "Redux",
      "PostgreSQL",
      "Redis",
      "Selenium",
      "Docker",
      "Jenkins",
    ],
    metrics: [
      { value: "−87%", label: { en: "Strategy setup time (2h → 15min)", ru: "Время настройки стратегии" } },
      { value: "−50%", label: { en: "Regression bugs (via E2E framework)", ru: "Регрессионных багов" } },
      { value: "30+", label: { en: "REST endpoints designed", ru: "REST-эндпоинтов" } },
    ],
  },
];

export const ui = {
  nav: {
    home: { en: "Overview", ru: "Обзор" },
    athenadev: { en: "AthenaDev (consulting)", ru: "AthenaDev (консалтинг)" },
    work: { en: "Selected Work", ru: "Проекты" },
    notes: { en: "Engineering Notes", ru: "Заметки" },
    about: { en: "About", ru: "Обо мне" },
    stack: { en: "Stack", ru: "Стек" },
    contact: { en: "Contact", ru: "Контакты" },
  },
  hero: {
    name: "Vitalii Bogachev",
    nameRu: "Виталий Богачев",
    title: {
      en: "Senior fullstack engineer & AI/SaaS founder.",
      ru: "Senior fullstack-инженер и AI/SaaS-основатель.",
    },
    description: {
      en: "13 years shipping production systems. Currently building AI-powered SaaS products with TypeScript, Python, and LLMs — for fintech, crypto, and solar industries.",
      ru: "13 лет в production-разработке. Сейчас строю AI-SaaS продукты на TypeScript, Python и LLM — для финтеха, крипты и solar-индустрии.",
    },
    location: { en: "Moscow · remote-friendly · C1 English", ru: "Москва · удалённо · английский C1" },
  },
  contact: {
    email: "bogachev.vitaliy91test@gmail.com",
    telegram: "tenkuioo",
    github: "talhayme",
    site: "athenadev.tech",
  },
  stackCategories: [
    {
      title: { en: "Frontend", ru: "Frontend" },
      items: ["TypeScript", "React", "Redux Toolkit", "React Query", "Next.js", "Vue", "Jinja2", "Tailwind CSS"],
    },
    {
      title: { en: "Backend", ru: "Backend" },
      items: ["Node.js", "Nest.js", "Express", "Python", "Flask", "Django", "FastAPI", "SQLAlchemy", "Celery"],
    },
    {
      title: { en: "AI & LLM", ru: "AI и LLM" },
      items: [
        "OpenAI API",
        "GPT-4 / GPT-4o",
        "Anthropic Claude API",
        "Google Cloud Translation",
        "Prompt Engineering",
        "Generative AI",
      ],
    },
    {
      title: { en: "Data", ru: "Данные" },
      items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "GraphQL (Apollo)", "REST", "WebSocket"],
    },
    {
      title: { en: "Infrastructure", ru: "Инфраструктура" },
      items: [
        "AWS (EC2, S3, Lambda, RDS)",
        "Yandex Cloud",
        "Docker",
        "Kubernetes",
        "Nginx",
        "Linux (Ubuntu)",
        "systemd",
        "Let's Encrypt",
      ],
    },
    {
      title: { en: "CI/CD & Observability", ru: "CI/CD и мониторинг" },
      items: ["GitLab CI", "GitHub Actions", "Jenkins", "Prometheus", "Grafana", "ELK Stack", "PagerDuty"],
    },
    {
      title: { en: "Payments & Auth", ru: "Платежи и авторизация" },
      items: ["YooKassa", "Stripe (integrations)", "OAuth 2.0", "JWT", "Fernet encryption", "2FA"],
    },
    {
      title: { en: "Testing", ru: "Тестирование" },
      items: ["pytest", "Playwright", "Cypress", "Selenium", "Jest"],
    },
    {
      title: { en: "Bots & Integrations", ru: "Боты и интеграции" },
      items: [
        "Telegram Bot API",
        "python-telegram-bot",
        "QuickBooks",
        "Stripe",
        "Google Maps",
        "DocuSign",
        "Interactive Brokers",
      ],
    },
  ],
  about: {
    paragraphs: {
      en: [
        "I started in IT 13 years ago as a QA engineer — first manual, then leading a small QA team and building Python + Selenium automation. That hands-on testing background still informs how I write production code: I think about edge cases first, and I write tests as I go, not after.",
        "Around 2018 I moved into backend development at Smart Trade (Germany), designing REST APIs for a retail trading SaaS. Then 3.5 years at Bequant — an institutional crypto exchange with its own matching engine — where I led the trading terminal UI (10K events/min in React + Redux) and built the GraphQL aggregation layer that cut backend load by 45%.",
        "Since late 2022 I've been at Coperniq, a US-based SaaS for solar-industry project management. I drove the monolith → microservices migration (5 services), cut API p50 from 1.2s to 180ms, and shipped a real-time field-sync module for 3000+ concurrent users. Team Lead for 4 devs.",
        "In parallel since 2024, I'm running my own AI-SaaS — BookahTranslate (bookahtranslate.tech) and AthenaDev (athenadev.tech). LLM-powered document translation with subscription billing, OAuth via Google/VK/Telegram, and a Telegram bot. Built solo, in production, paying users. This is where I work hands-on with OpenAI GPT-4 and Anthropic Claude APIs daily.",
        "What I'm interested in now: AI-native product engineering. Not 'add a chatbot,' but building products where LLMs are the core mechanic — with proper observability, fallbacks, prompt versioning, and cost engineering.",
      ],
      ru: [
        "В IT я 13 лет, начинал QA-инженером — сначала ручное тестирование, потом руководил небольшой QA-командой и писал автотесты на Python + Selenium. Эта база сильно влияет на то, как я пишу production-код: думаю про edge-кейсы заранее и пишу тесты параллельно с кодом, а не после.",
        "Примерно в 2018 перешёл в backend — Smart Trade (Германия), REST API для SaaS автоматизации retail-трейдинга. Затем 3.5 года Bequant — институциональная криптобиржа с собственным matching-движком. Вёл фронт торгового терминала (10K событий/мин на React + Redux), сделал GraphQL-агрегацию, которая снизила нагрузку на backend на 45%.",
        "С конца 2022 — Coperniq, американский SaaS для solar-индустрии. Провёл миграцию монолита в микросервисы (5 сервисов), снизил p50 API с 1.2с до 180мс, сделал real-time синхронизацию полевых работ для 3000+ одновременных пользователей. Team Lead команды из 4 человек.",
        "Параллельно с 2024 — мой собственный AI-SaaS: BookahTranslate (bookahtranslate.tech) и AthenaDev (athenadev.tech). Перевод документов через LLM с подписочной монетизацией, OAuth через Google/VK/Telegram, Telegram-бот. Делал в одиночку, в продакшене, есть платящие пользователи. Здесь я каждый день работаю с OpenAI GPT-4 и Anthropic Claude API.",
        "Что меня интересует сейчас: AI-native product engineering. Не «добавить чат-бот», а строить продукты, где LLM — это core-механика. С правильной observability, fallback-ами, версионированием промптов и cost engineering.",
      ],
    },
  },
};
