import type { ProjectSlug } from "./content";

type LocalizedList = { en: string[]; ru: string[] };

export type CodeSnippet = {
  label: { en: string; ru: string };
  lang: string;
  code: string;
};

type CaseStudy = {
  context: LocalizedList;
  built: LocalizedList;
  decisions: LocalizedList;
  result: LocalizedList;
  snippets?: CodeSnippet[];
};

export const caseStudies: Partial<Record<ProjectSlug, CaseStudy>> = {
  bookahtranslate: {
    context: {
      en: [
        "Translation of long-form documents (50–300 pages) with formatting preserved is a real pain: Google Translate flattens PDFs into plain text, DeepL has no PDF support for end users, and the few SaaS options that do support PDF are either slow, expensive, or lose the layout entirely.",
        "I wanted a service where you drop a PDF, EPUB, or DOCX and get back a readable translation with the original layout intact — figures, tables, code blocks, math, footnotes. And I wanted to ship it as a real SaaS with subscription billing, not a toy demo.",
      ],
      ru: [
        "Перевод длинных документов (50–300 страниц) с сохранением форматирования — это реальная боль: Google Translate превращает PDF в plain text, у DeepL нет PDF-поддержки для конечных пользователей, а немногие SaaS, которые умеют PDF, либо медленные, либо дорогие, либо ломают layout.",
        "Хотел сервис, куда бросаешь PDF/EPUB/DOCX и получаешь читабельный перевод с сохранёнными иллюстрациями, таблицами, формулами и сносками. И хотел запустить это как настоящий SaaS с подпиской, не игрушку.",
      ],
    },
    built: {
      en: [
        "Three-component architecture: Web App (Flask + SQLAlchemy), Translation API (Flask, isolated for long-running jobs), and a Telegram Bot — all sharing nothing except a Redis queue.",
        "LLM routing layer: GPT-4 / GPT-4o for high-quality literary text, Anthropic Claude for technical / legal content, Google Translate for cheap bulk. Choice driven by document type, user tier, and document size.",
        "Three-tier subscription system with page-based billing, bonus pages, one-time payments, and auto-renewal via YooKassa (Russian payment provider, Stripe-equivalent). Webhook verification by IP whitelist and signature.",
        "OAuth 2.0 via Google, VK, and Telegram (deep-link). Plus email/password with rate-limited registration and password validation.",
        "PDF processing pipeline: BabelDOC for layout-preserving translation, pdf2zh as fallback, ReportLab for output, OCR via Tesseract when documents are scanned.",
        "Async job processing through Celery + Redis with progress streaming back to the browser — handles 300-page documents without hitting Gunicorn timeouts.",
        "80+ pytest tests (auth, billing, translation, user isolation) plus Playwright e2e covering the full register-to-translate-to-pay journey.",
      ],
      ru: [
        "Архитектура из 3 компонентов: Web App (Flask + SQLAlchemy), Translation API (отдельный Flask для долгих задач), Telegram Bot — связаны только через Redis-очередь.",
        "LLM-роутинг: GPT-4 / GPT-4o для художки, Anthropic Claude для технического и юридического, Google Translate для дешёвых bulk-задач. Выбор по типу документа, тарифу и объёму.",
        "Трёхтарифная подписочная система: page-based billing, бонусные страницы, разовые платежи, автопродление через YooKassa. Webhook с верификацией по IP и подписи.",
        "OAuth 2.0 через Google, VK и Telegram (deep-link). Плюс email/пароль с rate-limit на регистрацию и валидацией пароля.",
        "PDF-пайплайн: BabelDOC для перевода с layout, pdf2zh как fallback, ReportLab на выходе, OCR через Tesseract для сканов.",
        "Асинхронные задачи через Celery + Redis с прогрессом в браузере — переводит документы 300+ страниц без HTTP-таймаутов.",
        "80+ pytest-тестов (auth, биллинг, перевод, изоляция пользователей) плюс Playwright e2e полного пути «регистрация → перевод → оплата».",
      ],
    },
    decisions: {
      en: [
        "Database-per-context separation: three independent PostgreSQL databases (translate_bot, translate_bot_staging, translate_web). Failure in one doesn't propagate. Same pattern for Redis instances.",
        "Race condition protection: page deductions go through SELECT FOR UPDATE inside an atomic transaction; subscription activation is enforced by a partial unique index ('only one active subscription per user').",
        "Security defaults: JWT with database-backed blacklist (immediate revocation on logout), Fernet encryption for user-supplied API keys, Flask-Limiter on registration (5/hour) and login (10/min) backed by Redis.",
        "Cost engineering: smart model routing cut average per-page LLM cost by ~40% vs. always using GPT-4. Bulk Google Translate path saves another tier of cost for users on Economy plan.",
      ],
      ru: [
        "База-на-контекст: три независимых PostgreSQL-базы (translate_bot, translate_bot_staging, translate_web). Падение одной не валит остальные. Аналогично для Redis.",
        "Защита от race conditions: списание страниц через SELECT FOR UPDATE в атомарной транзакции; активация подписки через partial unique index («одна активная подписка на юзера»).",
        "Security: JWT с blacklist в БД (мгновенный revoke при logout), Fernet-шифрование пользовательских API-ключей, Flask-Limiter на регистрацию (5/час) и логин (10/мин) на Redis.",
        "Cost engineering: smart-роутинг моделей снизил среднюю стоимость страницы перевода LLM примерно на 40% против «всегда GPT-4». Bulk-путь через Google Translate даёт ещё ярус экономии для тарифа «Эконом».",
      ],
    },
    result: {
      en: [
        "In production on bookahtranslate.tech (web) and via @BookahTranslateBot (Telegram). Solo founder, paying users, organic growth.",
        "Acts as my live laboratory for AI-native product engineering: every PR ships to a real service with real users, real billing, real failure modes — not a sandbox.",
      ],
      ru: [
        "В продакшене на bookahtranslate.tech (веб) и через @BookahTranslateBot (Telegram). Соло-основатель, платящие пользователи, органический рост.",
        "Работает как живая лаборатория для AI-native product engineering: каждый PR катится в реальный сервис с реальными пользователями, реальным биллингом и реальными failure modes — не песочница.",
      ],
    },
    snippets: [
      {
        label: { en: "Atomic page deduction (race-safe)", ru: "Атомарное списание страниц (race-safe)" },
        lang: "python",
        code: `def use_pages_atomic(subscription_id: int, pages_count: int) -> tuple[bool, int]:
    """Deduct pages with row-level lock to prevent concurrent over-spend."""
    sub = (
        db.session.query(UserSubscription)
        .with_for_update()  # SELECT ... FOR UPDATE
        .filter(UserSubscription.id == subscription_id)
        .first()
    )
    if not sub or sub.status not in ("active", "grace_period"):
        return False, 0
    if sub.pages_remaining < pages_count:
        db.session.rollback()
        return False, sub.pages_remaining

    sub.pages_remaining -= pages_count
    db.session.add(PageTransaction(
        subscription_id=sub.id,
        pages_delta=-pages_count,
        balance_after=sub.pages_remaining,
    ))
    db.session.commit()  # releases lock
    return True, sub.pages_remaining
`,
      },
      {
        label: { en: "LLM router by document profile", ru: "LLM-роутер по профилю документа" },
        lang: "python",
        code: `def pick_model(doc: Document, tier: UserTier) -> ModelChoice:
    if tier == UserTier.ECONOMY and doc.kind in {DocKind.TXT, DocKind.PLAIN_PDF}:
        return ModelChoice.GOOGLE_TRANSLATE

    if doc.kind == DocKind.SCANNED_PDF:
        return ModelChoice.GPT_4O   # needs vision + OCR fusion

    if doc.kind == DocKind.LEGAL or doc.has_dense_terminology:
        return ModelChoice.CLAUDE_SONNET

    if doc.pages > 200 and tier != UserTier.PREMIUM:
        return ModelChoice.CLAUDE_HAIKU   # cheap for bulk

    return ModelChoice.GPT_4O
`,
      },
    ],
  },

  coperniq: {
    context: {
      en: [
        "Coperniq is a US-based SaaS for managing solar-panel installation projects — from sales lead through permitting, install, and post-install service. The customer base is 200+ contractor companies, mostly mid-market, each with their own crews running 5–50 active projects in parallel.",
        "When I joined, the platform was a single Node.js monolith. Deploys took 90 minutes, MongoDB queries on critical endpoints were 1.2s p50, and adding a new dev to the team produced more conflicts than features for the first month. The product was working, but each new contractor onboarded was making the next deploy harder.",
      ],
      ru: [
        "Coperniq — американский SaaS для управления проектами установки солнечных панелей: от продаж и пермитов до самого монтажа и пост-сервиса. Клиенты — 200+ компаний-подрядчиков среднего размера, у каждой по 5–50 активных проектов параллельно.",
        "Когда я пришёл, платформа была одним Node.js-монолитом. Деплои по 90 минут, p50 MongoDB-запросов на критичных эндпоинтах — 1.2с, а ввод нового разработчика производил больше конфликтов, чем фич. Продукт работал, но каждый новый подрядчик делал следующий деплой ещё больнее.",
      ],
    },
    built: {
      en: [
        "Designed and led the monolith → microservices migration. Carved out 5 services: auth, projects, scheduling, billing, notifications. Each owns its database, schema, and deploy cycle.",
        "Built the real-time field-sync layer on WebSocket. Field crews update project status from mobile; updates propagate to office dashboards in <300ms. Tested up to 3000 concurrent users without queue backlog.",
        "Owned the MongoDB performance work end-to-end: profiled slow queries, designed compound indexes, rewrote aggregation pipelines. p50 on the critical endpoints dropped from 1.2s to 180ms — an 85% improvement.",
        "Introduced blue-green deploys in GitLab CI with health checks, automatic rollback, and a 'canary' phase routing 5% of traffic to the new version for 10 minutes before full cutover.",
        "Integrated with QuickBooks (accounting), Stripe (billing), Google Maps (routing), and DocuSign (contracts) — all the external systems contractors actually use day-to-day.",
        "Tech-led a team of 4 fullstack devs: code review, architecture reviews, weekly 1:1s, hired 2 mids. Onboarding time for new devs dropped from 'first PR in 3 weeks' to 'first PR in 4 days'.",
      ],
      ru: [
        "Спроектировал и провёл миграцию монолит → микросервисы. Выделил 5 сервисов: auth, projects, scheduling, billing, notifications. У каждого своя БД, схема, цикл деплоя.",
        "Сделал real-time синхронизацию полевых работ на WebSocket. Бригады обновляют статус с мобильного, изменения долетают в офисные дашборды за <300мс. Тестировал на 3000 одновременных пользователей без бэклога в очереди.",
        "Взял на себя всю работу с производительностью MongoDB: профилирование, составные индексы, переписывание pipeline-ов агрегации. p50 на критичных эндпоинтах упал с 1.2с до 180мс — на 85%.",
        "Внедрил blue-green деплои в GitLab CI с health-чеками, автооткатом и canary-фазой: 5% трафика на новую версию 10 минут перед полной заменой.",
        "Интегрировал с QuickBooks, Stripe, Google Maps и DocuSign — всё, чем подрядчики реально пользуются в работе.",
        "Tech-лид команды из 4 fullstack-разработчиков: ревью, архитектура, 1:1, нанял 2 mid-уровня. Время до первого PR у новых сократилось с «3 недели» до «4 дня».",
      ],
    },
    decisions: {
      en: [
        "Service boundaries were chosen by data ownership, not by 'feature' — billing owns invoices and payment intents, scheduling owns crew calendars and timeslots. Avoided the 'distributed monolith' antipattern where services share a database.",
        "Inter-service communication: synchronous REST for read-paths that need consistency, RabbitMQ events for write-paths that can be eventually consistent. Saga pattern for cross-service workflows like 'project completed → invoice → notification'.",
        "Frontend stayed as a single React app with Redux Toolkit + React Query. RTK Query for cached server state, Redux only for genuine client state (modals, drafts, optimistic updates). Eliminated ~40% of the legacy Redux boilerplate.",
        "Observability: Prometheus for metrics, Grafana for dashboards, structured JSON logs shipped to a centralized stack. Every microservice exposes the same /metrics, /health, /ready trio — uniformity matters more than picking the perfect stack.",
      ],
      ru: [
        "Границы сервисов выбирали по владению данными, не по «фичам» — billing владеет инвойсами и payment intents, scheduling владеет календарём бригад. Избежали антипаттерна «распределённый монолит», где сервисы шарят БД.",
        "Межсервисное взаимодействие: синхронный REST для read-путей, где нужна консистентность; RabbitMQ-события для write-путей с eventual consistency. Saga для cross-service сценариев типа «проект завершён → инвойс → уведомление».",
        "Frontend оставили монолитом на React + Redux Toolkit + React Query. RTK Query для серверного state, Redux — только для настоящего клиентского (модалки, драфты, optimistic UI). Убрали ~40% legacy Redux-boilerplate.",
        "Observability: Prometheus + Grafana, структурированные JSON-логи в централизованный стек. У каждого микросервиса одинаковая тройка /metrics, /health, /ready — единообразие важнее, чем выбор идеального стека.",
      ],
    },
    result: {
      en: [
        "Team grew from 5 to 12 devs without proportional drop in velocity. Deploy time: 90 min → 12 min. Production incidents: −60%. API latency: 1.2s → 180ms.",
        "I still own the architecture review for any cross-service work and run tech interviews for fullstack hires.",
      ],
      ru: [
        "Команда выросла с 5 до 12 разработчиков без пропорционального падения velocity. Деплой: 90 → 12 мин. Production-инцидентов: −60%. API latency: 1.2с → 180мс.",
        "До сих пор веду архитектурное ревью cross-service задач и провожу технические собесы fullstack-кандидатов.",
      ],
    },
    snippets: [
      {
        label: { en: "Compound index that fixed the slow query", ru: "Составной индекс, который починил медленный запрос" },
        lang: "javascript",
        code: `// Before: full collection scan on every dashboard load (~1.2s p50)
db.projects.find({
  organizationId: ObjectId("..."),
  status: { $in: ["in_progress", "permitting"] },
  scheduledStart: { $gte: ISODate("2026-01-01") },
}).sort({ scheduledStart: 1 }).limit(50);

// Compound index covering the filter + sort
db.projects.createIndex(
  { organizationId: 1, status: 1, scheduledStart: 1 },
  { name: "org_status_scheduled_v2", background: true }
);

// After: IXSCAN, ~180ms p50, no in-memory sort.
`,
      },
      {
        label: { en: "WebSocket fan-out with org-scoped rooms", ru: "WebSocket fan-out с org-scoped комнатами" },
        lang: "typescript",
        code: `io.on("connection", (socket) => {
  const { orgId, userId } = socket.data.session;
  socket.join(\`org:\${orgId}\`);
  socket.join(\`user:\${userId}\`);
});

projectsEvents.on("status_changed", async (evt) => {
  // Push only to clients in the affected org, not all 3000.
  io.to(\`org:\${evt.orgId}\`).emit("project.updated", {
    projectId: evt.projectId,
    status: evt.status,
    updatedBy: evt.actorId,
    ts: evt.timestamp,
  });
});
`,
      },
    ],
  },

  bequant: {
    context: {
      en: [
        "Bequant is an institutional crypto exchange — not a retail Robinhood clone, but a venue for market-makers and prop-trading desks with their own quant infrastructure. The matching engine is in-house. The trading terminal needs to feel like Bloomberg, not like Binance.",
        "The product had three uncomfortable problems when I joined the frontend team: the order book rendered at 4-5 FPS under load, the portfolio screen made 14 separate REST calls on every page load, and the same KYC document upload was reimplemented 3 times across product surfaces.",
      ],
      ru: [
        "Bequant — институциональная криптобиржа. Не клон Robinhood, а площадка для маркет-мейкеров и prop-десков с собственной quant-инфраструктурой. Matching-движок — свой. Торговый терминал должен ощущаться как Bloomberg, не как Binance.",
        "Когда я пришёл во фронт, у продукта было три неудобных проблемы: стакан рендерил 4-5 FPS под нагрузкой, экран портфеля делал по 14 REST-запросов на загрузку, а загрузка KYC-документов была переписана 3 раза в разных частях UI.",
      ],
    },
    built: {
      en: [
        "Rewrote the order book and trades feed using WebSocket diffs + virtualization. Sustained 10 000 market events per minute without dropping frames. Throttling on the React reducer, not on the socket — preserved the actual data, just batched the UI updates.",
        "Designed a GraphQL aggregation layer on top of the existing REST services. The portfolio screen went from 14 REST round-trips to 1 GraphQL query. Backend load on that route dropped 45% measured over 30 days.",
        "Introduced multi-tier Redis caching: rate-limits at the edge, market data at the API gateway, user sessions in the service layer. Sustained 50K active users at peak without backend degradation.",
        "Migrated CI from a homegrown shell-pipeline to GitLab CI with parallel test execution. 800+ unit tests and a Cypress E2E suite now run in 9 minutes instead of 3 hours.",
        "Set up Prometheus + Grafana metrics and PagerDuty alerts for SLO violations. MTTR for production incidents went from 45 to 8 minutes — most of that win was just knowing which service was broken inside the first 2 minutes.",
        "Hardened security: implemented OAuth 2.0, 2FA, JWT-replay protection, CSRF tokens on state-changing endpoints, and client-side AES-GCM encryption for KYC document uploads before they hit S3.",
      ],
      ru: [
        "Переписал стакан и feed трейдов на WebSocket-диффы + виртуализацию. Держим 10 000 событий рынка в минуту без потерь кадров. Throttling на React-редьюсере, не на сокете — данные не теряются, просто батчатся UI-апдейты.",
        "Спроектировал GraphQL-агрегацию поверх существующих REST-сервисов. Портфельный экран: с 14 round-trip → 1 GraphQL-запрос. Нагрузка на backend на этом маршруте упала на 45% за 30 дней замеров.",
        "Внедрил многоуровневое Redis-кэширование: rate-limits на edge, market data на API-gateway, сессии — в service-layer. Держали 50K активных пользователей в пике без деградации backend.",
        "Перевёл CI с самописного shell-пайплайна на GitLab CI с параллельным запуском тестов. 800+ юнит-тестов и Cypress E2E теперь идут 9 минут вместо 3 часов.",
        "Поднял Prometheus + Grafana и PagerDuty-алерты на SLO. MTTR production-инцидентов снизился с 45 до 8 минут — большая часть выигрыша в том, чтобы за первые 2 минуты понимать, какой сервис сломался.",
        "Безопасность: OAuth 2.0, 2FA, защита от JWT-replay, CSRF на state-changing эндпоинтах, клиентское AES-GCM шифрование KYC-документов до загрузки в S3.",
      ],
    },
    decisions: {
      en: [
        "Order book diffing: the engine pushes deltas, not snapshots. UI maintains the canonical order book in a normalized Redux slice and applies diffs in a single dispatch per animation frame. Re-renders go through React.memo with a custom equality check on price/size pairs.",
        "GraphQL choice was pragmatic: the existing REST services stayed, the GraphQL layer was a thin BFF (backend-for-frontend) on Apollo. No migration tax, immediate win.",
        "Cypress for E2E even though the team was leaning Playwright at the time — Cypress's time-travel debugger and built-in network stubbing saved us countless hours on flaky tests against the matching engine.",
        "Client-side KYC encryption: keys derived from the user's password via PBKDF2, never sent to the server. If S3 leaks, the documents are still unreadable. Trade-off: user can't recover documents on password reset — explicit copy in UI handles that.",
      ],
      ru: [
        "Диффы стакана: движок шлёт дельты, не снапшоты. UI держит канонический стакан в нормализованном Redux-слайсе и применяет диффы одним dispatch на анимационный кадр. Re-render — через React.memo с кастомным equality по парам price/size.",
        "GraphQL — прагматичный выбор: REST-сервисы остались, GraphQL — тонкий BFF на Apollo. Без миграционного налога, выигрыш сразу.",
        "Cypress для E2E, хотя команда тогда смотрела в сторону Playwright — time-travel debugger и встроенный network stubbing сэкономили часы на flaky-тестах против matching-движка.",
        "Клиентское шифрование KYC: ключи через PBKDF2 из пароля юзера, на сервер не уходят. Если S3 утечёт — документы нечитаемы. Trade-off: при reset пароля документы не восстановить — это прямо в UI прописано.",
      ],
    },
    result: {
      en: [
        "Trading terminal handles institutional-grade load. Backend cost dropped meaningfully after the GraphQL consolidation. CI release cycle went from a 3-hour ritual to a 25-minute boring background task.",
        "Mentored 3 junior engineers; two of them grew into mids within a year.",
      ],
      ru: [
        "Терминал держит институциональную нагрузку. Backend-косты ощутимо просели после GraphQL-консолидации. Релиз-цикл — с 3-часового ритуала до 25-минутной фоновой рутины.",
        "Менторил 3 джунов; двое выросли до middle за год.",
      ],
    },
    snippets: [
      {
        label: { en: "GraphQL portfolio aggregation", ru: "GraphQL-агрегация портфеля" },
        lang: "graphql",
        code: `query Portfolio($userId: ID!) {
  user(id: $userId) {
    id
    balances {
      currency
      free
      locked
      btcEquivalent
    }
    openOrders {
      id
      symbol
      side
      price
      size
      filled
      createdAt
    }
    recentTrades(limit: 20) {
      id
      symbol
      side
      price
      size
      fee
      executedAt
    }
    pnl(timeframe: D1) {
      realized
      unrealized
      percentChange
    }
  }
}
# 1 round-trip replaces 14 REST calls.
`,
      },
      {
        label: { en: "Order book diff reducer", ru: "Редьюсер диффов стакана" },
        lang: "typescript",
        code: `type OrderBookDiff = {
  bids: [price: string, size: string][];  // size="0" means delete
  asks: [price: string, size: string][];
  sequence: number;
};

const applyDiff = (state: OrderBookState, diff: OrderBookDiff) => {
  if (diff.sequence !== state.sequence + 1) {
    // Out-of-order or gap: resync via REST snapshot.
    return { ...state, needsResync: true };
  }
  for (const [price, size] of diff.bids) {
    if (size === "0") delete state.bids[price];
    else state.bids[price] = size;
  }
  for (const [price, size] of diff.asks) {
    if (size === "0") delete state.asks[price];
    else state.asks[price] = size;
  }
  state.sequence = diff.sequence;
};
`,
      },
    ],
  },

  "smart-trade": {
    context: {
      en: [
        "Smart Trade is a German SaaS for retail traders who want to automate strategies on Interactive Brokers, Binance, Bitfinex and similar venues — without writing code. The audience is the same person who'd buy a $2K TradingView Premium subscription: technically curious but not a developer.",
        "When I joined, strategy setup was a 2-hour ordeal: nested YAML configs, three different web pages, manual webhook wiring. Drop-off after registration was brutal.",
      ],
      ru: [
        "Smart Trade — немецкий SaaS для retail-трейдеров, которые хотят автоматизировать стратегии на Interactive Brokers, Binance, Bitfinex без написания кода. Аудитория — те же люди, что покупают TradingView Premium за $2K: технически любопытные, но не программисты.",
        "Когда я пришёл, настройка стратегии занимала 2 часа: вложенные YAML, три разных страницы, ручная настройка webhook-ов. Drop-off после регистрации был жёстким.",
      ],
    },
    built: {
      en: [
        "Designed and shipped a Django + DRF backend with 30+ REST endpoints covering strategies, backtests, signal history, broker connections, and billing.",
        "Built a React + Redux drag-and-drop strategy builder. Users compose strategies visually from blocks (entry condition → position sizing → exit rule). Strategy setup time dropped from 2 hours to 15 minutes — measured in onboarding funnel.",
        "Integrated with broker APIs: Interactive Brokers (FIX gateway), Binance, Bitfinex. Normalized order/position/balance schemas across venues so the strategy builder didn't care which broker the user picked.",
        "Owned the Selenium-based E2E framework: page-object pattern, parallelized via Selenium Grid in Docker, results published as JUnit XML to Jenkins. Regression bugs in production dropped ~50% over 6 months.",
        "Was the only Python dev in an 8-person Agile team. Worked closely with two frontend devs and a product owner; participated in sprint planning, demos, retros.",
      ],
      ru: [
        "Спроектировал и выпустил Django + DRF backend с 30+ REST-эндпоинтами: стратегии, бэктесты, история сигналов, брокер-коннекторы, биллинг.",
        "Сделал React + Redux drag-and-drop конструктор стратегий. Юзеры собирают стратегии визуально из блоков (условие входа → сайзинг → правило выхода). Время настройки упало с 2 часов до 15 минут — измерено в воронке онбординга.",
        "Интегрировал брокеров: Interactive Brokers (FIX gateway), Binance, Bitfinex. Нормализовал схемы ордеров/позиций/балансов между венчами, чтобы конструктор не зависел от выбора брокера.",
        "Вёл E2E-фреймворк на Selenium: page-object pattern, параллельный запуск через Selenium Grid в Docker, результаты как JUnit XML в Jenkins. Регрессионные баги в проде упали примерно на 50% за 6 месяцев.",
        "Был единственным Python-разработчиком в Agile-команде из 8 человек. Тесно работал с двумя фронтендерами и product owner-ом; участвовал в planning, demo, retro.",
      ],
    },
    decisions: {
      en: [
        "Strategy validation happens on the backend, not in the React builder. The frontend ships an opaque strategy graph; the backend runs it through a deterministic validator before persisting. This keeps the source of truth on the server and lets us evolve the validator without shipping a frontend release.",
        "Backtests run in a separate worker pool, never in the web process. Even a small backtest can take 30 seconds — putting that behind a synchronous HTTP call would have made the API feel broken.",
        "Selenium page-objects with explicit waits over implicit. Implicit waits hide flakiness; explicit waits make the failure mode obvious ('button never became clickable' is a real signal).",
      ],
      ru: [
        "Валидация стратегий — на backend, не в React-конструкторе. Фронт отправляет непрозрачный граф стратегии; backend прогоняет через детерминированный валидатор перед сохранением. Source of truth — на сервере, и валидатор можно эволюционировать без релиза фронта.",
        "Бэктесты — отдельным worker-пулом, никогда в web-процессе. Даже маленький бэктест может занять 30 секунд — в синхронном HTTP это выглядело бы как сломанный API.",
        "Selenium page-objects с explicit waits, не implicit. Implicit прячут flakiness; explicit делают failure mode понятным («кнопка не стала кликабельной» — реальный сигнал).",
      ],
    },
    result: {
      en: [
        "Strategy setup time: 2h → 15 min. Regression bugs: −50%. Onboarding completion rate noticeably improved (the team didn't share the exact number publicly).",
        "Was my first commercial backend role after QA — the project that taught me to think about API contracts and database transactions, not just test cases.",
      ],
      ru: [
        "Время настройки стратегии: 2ч → 15 мин. Регрессионные баги: −50%. Конверсия онбординга заметно выросла (команда не публиковала точные цифры).",
        "Первая коммерческая backend-роль после QA — проект, который научил меня думать про API-контракты и транзакции БД, а не только тест-кейсы.",
      ],
    },
    snippets: [
      {
        label: { en: "Strategy validator (backend authority)", ru: "Валидатор стратегий (backend как source of truth)" },
        lang: "python",
        code: `class StrategyValidator:
    def validate(self, graph: StrategyGraph) -> ValidationResult:
        issues = []
        if not graph.entry_blocks:
            issues.append("strategy needs at least one entry condition")
        if not graph.exit_blocks:
            issues.append("strategy needs at least one exit rule")

        for block in graph.position_sizing_blocks:
            if block.risk_per_trade_pct > 10:
                issues.append(
                    f"{block.id}: risk-per-trade {block.risk_per_trade_pct}% "
                    f"exceeds safety limit of 10%"
                )

        # Reject orphan blocks: every block must be reachable from entry.
        unreachable = self._find_unreachable(graph)
        for block_id in unreachable:
            issues.append(f"block {block_id} is unreachable from entry")

        return ValidationResult(ok=not issues, issues=issues)
`,
      },
      {
        label: { en: "Selenium page-object pattern", ru: "Selenium page-object pattern" },
        lang: "python",
        code: `class StrategyBuilderPage(BasePage):
    URL = "/builder"
    ADD_BLOCK_BUTTON = (By.CSS_SELECTOR, "[data-test='add-block']")
    SAVE_BUTTON = (By.CSS_SELECTOR, "[data-test='save-strategy']")

    def add_entry_block(self, indicator: str, threshold: float) -> "StrategyBuilderPage":
        self.wait_clickable(self.ADD_BLOCK_BUTTON).click()
        self.select_dropdown("[data-test='block-type']", "entry")
        self.select_dropdown("[data-test='indicator']", indicator)
        self.fill("[data-test='threshold']", str(threshold))
        return self

    def save(self) -> "StrategyListPage":
        self.wait_clickable(self.SAVE_BUTTON).click()
        self.wait_for_toast("Strategy saved")
        return StrategyListPage(self.driver)
`,
      },
    ],
  },
};
