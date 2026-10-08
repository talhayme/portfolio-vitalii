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
      en: "CTO",
      ru: "CTO",
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
    status: { en: "In production · built solo", ru: "В продакшене · построено в одиночку" },
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

export type OpenSourceRepo = {
  name: string;
  href: string;
  tagline: { en: string; ru: string };
  detail: { en: string; ru: string };
  facts: string[];
};

/**
 * Standalone demos extracted from production patterns. Each runs offline —
 * no API key, no network — so a reader can clone and run in under a minute.
 */
export const openSource: OpenSourceRepo[] = [
  {
    name: "llm-eval-harness",
    href: "https://github.com/talhayme/llm-eval-harness",
    tagline: {
      en: "Evaluation harness with a CI release gate",
      ru: "Eval-харнесс с релизным гейтом в CI",
    },
    detail: {
      en: "Golden sets, groundedness and hallucination metrics, absolute thresholds and per-case regression against a baseline. Exits non-zero so CI blocks a change that makes quality worse — and CI asserts the gate itself rejects a known-bad run.",
      ru: "Golden-наборы, метрики groundedness и галлюцинаций, абсолютные пороги и пер-кейсовое сравнение с baseline. Возвращает ненулевой код, чтобы CI блокировал ухудшение — а сам CI проверяет, что гейт отклоняет заведомо плохой прогон.",
    },
    facts: ["Python", "47 tests · 91% coverage", "offline"],
  },
  {
    name: "mcp-toolserver",
    href: "https://github.com/talhayme/mcp-toolserver",
    tagline: {
      en: "An MCP server built the way a production one should be",
      ru: "MCP-сервер, сделанный как production-сервер",
    },
    detail: {
      en: "Strict JSON schemas so the model calls correctly first time, errors written for the model to act on rather than stack traces, and a calculator sandboxed against code execution through four independent layers.",
      ru: "Строгие JSON-схемы, чтобы модель вызывала инструмент правильно с первого раза, ошибки, написанные для модели, а не стектрейсы, и калькулятор, защищённый от выполнения кода четырьмя независимыми слоями.",
    },
    facts: ["Python", "50 tests · 84% coverage", "Claude Desktop ready"],
  },
  {
    name: "rag-grounded",
    href: "https://github.com/talhayme/rag-grounded",
    tagline: {
      en: "A RAG pipeline that refuses rather than guesses",
      ru: "RAG-пайплайн, который отказывается, а не выдумывает",
    },
    detail: {
      en: "Calibrated confidence floors, hybrid dense + lexical retrieval, and citations carrying source and heading. Its real weaknesses are pinned as tests so the README cannot quietly become untrue.",
      ru: "Откалиброванные пороги уверенности, гибридный поиск (векторный + лексический) и цитаты с источником и заголовком. Реальные слабости зафиксированы тестами, чтобы README не стал незаметно неправдой.",
    },
    facts: ["Python", "40 tests · 92% coverage", "offline"],
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
      en: "Senior AI Engineer — LLM, RAG, MCP.",
      ru: "Senior AI Engineer — LLM, RAG, MCP.",
    },
    description: {
      en: "I build LLM products that run in production, not demos. Since 2024 I have built and operated BookahTranslate, a paid AI document-translation SaaS, and helped product teams adopt RAG, custom MCP servers and AI coding agents. Underneath is 13 years of engineering — high-load fintech and SaaS, plus a QA-automation background — which is why my AI systems ship with evals, regression gates, observability and provider fallback.",
      ru: "Строю LLM-продукты, которые работают в продакшене, а не в демо. С 2024 года веду BookahTranslate — платный AI-сервис перевода документов — и помогаю продуктовым командам внедрять RAG, кастомные MCP-серверы и AI-агентов для разработки. В основе — 13 лет инженерного опыта: высоконагруженный финтех, SaaS и бэкграунд в QA-автоматизации. Поэтому мои AI-системы выходят с evals, регрессионными гейтами, observability и фолбэком между провайдерами.",
    },
    location: { en: "Tbilisi, Georgia · open to remote · C1 English", ru: "Тбилиси, Грузия · открыт к удалённой работе · английский C1" },
  },
  contact: {
    email: "bogachev.vitaliy91test@gmail.com",
    telegram: "tenkuioo",
    github: "talhayme",
    site: "athenadev.tech",
  },
  stackCategories: [
    {
      title: { en: "LLM & AI", ru: "LLM и AI" },
      items: [
        "OpenAI API (GPT-4 / GPT-4o)",
        "Anthropic Claude API",
        "RAG",
        "Embeddings & vector databases",
        "Semantic search",
        "MCP servers & tool calling",
        "LLM evaluation",
        "Prompt regression testing",
        "LLM observability",
        "Prompt-injection testing",
        "Inference cost optimization",
        "Claude Code · Codex · Cursor",
      ],
    },
    {
      title: { en: "AI engineering practices", ru: "AI-инженерные практики" },
      items: [
        "Golden-set evals",
        "Release gates on quality metrics",
        "Hallucination & groundedness scoring",
        "Provider / model fallback",
        "Prompt versioning",
        "Response caching",
        "Request & pipeline tracing",
      ],
    },
    {
      title: { en: "Backend", ru: "Backend" },
      items: ["Python", "Node.js", "Nest.js", "Express", "FastAPI", "Flask", "Django / DRF", "SQLAlchemy", "Celery"],
    },
    {
      title: { en: "Frontend", ru: "Frontend" },
      items: ["TypeScript", "React", "Redux Toolkit", "React Query", "Next.js", "Vue", "Jinja2", "Tailwind CSS"],
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
        "I build LLM products that reach production. Since 2024 that has mostly meant BookahTranslate — an AI document-translation SaaS I built and operate solo, with paying subscribers. The pipeline runs on GPT-4 and Claude and handles PDF, EPUB and DOCX up to 300+ pages while preserving layout: parsing, chunking, context assembly, translation, reassembly.",
        "The interesting part of that work is never the prompt. It is automatic fallback between providers and models when one times out or rate-limits; response caching and model routing to keep inference costs down; and an evaluation set that gates every prompt or model change — 80+ tests, accuracy, relevance, hallucination rate, latency and cost, with automated regression.",
        "Alongside it I do AI-implementation consulting for fintech, legal-tech and B2B SaaS teams: RAG over corporate knowledge bases with tuned retrieval and grounded answers, custom MCP servers connecting LLMs to internal tools, and rolling out Claude Code, Codex and Cursor into engineering workflows with quality gates before release.",
        "Three standalone demos on GitHub show those patterns in readable form — an eval harness with a CI release gate, an MCP server, and a RAG pipeline that refuses rather than guesses. All run offline, with tests and green CI.",
        "Underneath all of this is 13 years of engineering. I started in QA — manual, then leading a team and writing Python + Selenium automation — which is why I think about edge cases first and write tests as I go. Then backend at Smart Trade (Germany), 3.5 years at Bequant (an institutional crypto exchange: trading terminal at 10K events/min, a GraphQL layer that cut backend load 45%), and Coperniq, a US solar SaaS, where I led 4 engineers, drove the monolith → microservices migration and cut API p50 from 1.2s to 180ms.",
        "That foundation is the reason the AI work holds up. Anyone can call an LLM API; the difficulty is making it survive contact with real users, real failure modes and a real bill.",
      ],
      ru: [
        "Я строю LLM-продукты, которые доходят до продакшена. С 2024 года это в основном BookahTranslate — AI-сервис перевода документов, который я сделал и веду в одиночку, с платящими подписчиками. Пайплайн работает на GPT-4 и Claude, обрабатывает PDF, EPUB и DOCX до 300+ страниц с сохранением вёрстки: парсинг, чанкинг, сборка контекста, перевод, пересборка документа.",
        "Самое интересное в этой работе — никогда не промпт. Это автоматический фолбэк между провайдерами и моделями, когда один таймаутит или упирается в рейт-лимит; кэширование ответов и роутинг между моделями, чтобы держать стоимость инференса под контролем; и evaluation-набор, через который проходит каждое изменение промпта или модели — 80+ тестов на точность, релевантность, уровень галлюцинаций, задержку и стоимость, с автоматической регрессией.",
        "Параллельно занимаюсь AI-внедрением для команд в финтехе, legal-tech и B2B SaaS: RAG над корпоративными базами знаний с настроенным ретривалом и grounded-ответами, кастомные MCP-серверы, связывающие LLM с внутренними сервисами, и внедрение Claude Code, Codex и Cursor в рабочие процессы разработки с гейтами качества перед релизом.",
        "Три отдельных демо на GitHub показывают эти подходы в читаемом виде — eval-харнесс с релизным гейтом в CI, MCP-сервер и RAG-пайплайн, который отказывается отвечать вместо того, чтобы выдумывать. Всё запускается офлайн, с тестами и зелёным CI.",
        "В основе всего этого — 13 лет инженерного опыта. Начинал в QA: ручное тестирование, потом руководство командой и автотесты на Python + Selenium — поэтому я думаю про edge-кейсы заранее и пишу тесты параллельно с кодом. Затем backend в Smart Trade (Германия), 3.5 года в Bequant (институциональная криптобиржа: торговый терминал на 10K событий/мин, GraphQL-слой, снизивший нагрузку на backend на 45%) и Coperniq, американский solar-SaaS, где я вёл команду из 4 инженеров, провёл миграцию монолита в микросервисы и снизил p50 API с 1.2с до 180мс.",
        "Именно этот фундамент — причина, по которой AI-часть выдерживает нагрузку. Вызвать LLM API может кто угодно; сложность в том, чтобы это пережило встречу с реальными пользователями, реальными сбоями и реальным счётом за инференс.",
      ],
    },
  },
};
