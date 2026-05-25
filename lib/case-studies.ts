import type { ProjectSlug } from "./content";

type LocalizedList = { en: string[]; ru: string[] };

type CaseStudy = {
  context: LocalizedList;
  built: LocalizedList;
  decisions: LocalizedList;
  result: LocalizedList;
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
  },
};
