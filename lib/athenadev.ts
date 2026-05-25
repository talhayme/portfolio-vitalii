import type { CodeSnippet } from "./case-studies";

export type Service = {
  id: string;
  title: { en: string; ru: string };
  desc: { en: string; ru: string };
  outcomes: { en: string[]; ru: string[] };
};

export type Engagement = {
  slug: string;
  client: { en: string; ru: string };
  industry: { en: string; ru: string };
  team: string;
  duration: { en: string; ru: string };
  problem: { en: string[]; ru: string[] };
  approach: { en: string[]; ru: string[] };
  decisions: { en: string[]; ru: string[] };
  outcome: { en: string[]; ru: string[] };
  metrics: { value: string; label: { en: string; ru: string } }[];
  snippets?: CodeSnippet[];
};

export const athenadev = {
  hero: {
    tagline: {
      en: "AI integration consultancy. Embedding Claude Code, MCP servers, and LLM workflows into mid-size product teams.",
      ru: "AI-консалтинг по внедрению. Интегрируем Claude Code, MCP-серверы и LLM-воркфлоу в продуктовые команды.",
    },
    description: {
      en: "AthenaDev is my consultancy for embedding AI into the day-to-day of product engineering. Not 'add a chatbot' projects. Real workflow integration: Claude Code rollouts to dev teams, MCP servers connecting LLMs to internal tools, RAG systems for institutional knowledge, AI-driven code review pipelines.",
      ru: "AthenaDev — мой консалтинг по встраиванию AI в ежедневную работу продуктовых команд. Не «добавим чат-бот». Реальная интеграция воркфлоу: рассктка Claude Code на команды разработки, MCP-серверы для подключения LLM к внутренним инструментам, RAG-системы для корпоративной базы знаний, AI-ревью пайплайны.",
    },
    formats: {
      en: ["Fixed-scope projects", "Retainer (4–20h/week)", "Advisory / fractional CTO for AI"],
      ru: ["Проекты с фиксированным скоупом", "Ретейнер (4–20ч/нед)", "Advisory / fractional CTO по AI"],
    },
  },
  services: [
    {
      id: "claude-code-rollout",
      title: {
        en: "Claude Code rollout for product teams",
        ru: "Внедрение Claude Code в продуктовые команды",
      },
      desc: {
        en: "Take a team from 'we hear about Claude Code' to 'half our PRs start as agent-driven drafts'. Setup, custom slash commands, project-specific hooks, MCP integrations, and the boring-but-critical training piece that determines adoption.",
        ru: "Перевожу команду из «слышали про Claude Code» в «половина PR стартует как agent-driven drafts». Настройка, кастомные slash-команды, project-specific hooks, MCP-интеграции и неинтересная-но-критическая часть обучения, от которой зависит adoption.",
      },
      outcomes: {
        en: [
          "Per-project settings.json with sane permission defaults",
          "Custom skills, hooks, and slash commands for your stack",
          "MCP server connecting Claude to your Linear/Jira/Slack/internal APIs",
          "Adoption metrics dashboard (active users, PR-with-AI-assist ratio)",
        ],
        ru: [
          "Project-level settings.json с разумными дефолтами по permissions",
          "Кастомные skills, hooks и slash-команды под ваш стек",
          "MCP-сервер, подключающий Claude к Linear/Jira/Slack/внутренним API",
          "Дашборд adoption-метрик (active users, доля PR с AI-assist)",
        ],
      },
    },
    {
      id: "mcp-servers",
      title: {
        en: "Custom MCP servers",
        ru: "Кастомные MCP-серверы",
      },
      desc: {
        en: "Model Context Protocol is the right primitive for connecting LLMs to your stack. I build production-grade MCP servers in TypeScript or Python: auth, rate-limiting, observability, schema validation. Self-hosted or deployed as a managed service.",
        ru: "Model Context Protocol — правильный примитив для связки LLM с вашим стеком. Делаю production-grade MCP-серверы на TypeScript или Python: auth, rate-limiting, observability, валидация схем. Self-hosted или managed service.",
      },
      outcomes: {
        en: [
          "Bidirectional tool integration (read + write)",
          "Type-safe tool schemas (Zod / Pydantic) with runtime validation",
          "Per-user auth scoping (no 'agent acts as admin' incidents)",
          "Audit log + dashboards for tool-call traffic",
        ],
        ru: [
          "Двунаправленная интеграция (read + write)",
          "Type-safe схемы тулов (Zod / Pydantic) с runtime-валидацией",
          "Per-user auth-скоупинг (без инцидентов «агент действует как админ»)",
          "Аудит-лог и дашборды по tool-call трафику",
        ],
      },
    },
    {
      id: "rag-internal-knowledge",
      title: {
        en: "RAG over internal knowledge",
        ru: "RAG поверх внутренних знаний",
      },
      desc: {
        en: "Production RAG, not a demo. Document ingestion pipeline, embedding strategy (chunking, hierarchy, hybrid lexical + dense), retrieval evaluation, citations in every answer, output guardrails. Built on whatever vector store fits — Postgres + pgvector, Qdrant, Pinecone — chosen on cost/latency, not hype.",
        ru: "Production-RAG, не демо. Пайплайн ингеста документов, стратегия embeddings (чанкинг, иерархия, гибридный lexical + dense поиск), оценка качества retrieval, цитирование источников, output guardrails. На том vector-store, что подходит — Postgres + pgvector, Qdrant, Pinecone — выбор по стоимости/латентности, не по хайпу.",
      },
      outcomes: {
        en: [
          "Document ingestion with versioning + incremental updates",
          "Hybrid retrieval (BM25 + dense embeddings) + reranking",
          "Citation-grounded answers with link-back to source",
          "Evaluation harness (precision/recall on a labeled set)",
        ],
        ru: [
          "Ингест документов с версионированием и инкрементальными апдейтами",
          "Гибридный retrieval (BM25 + dense embeddings) + reranking",
          "Ответы с цитированием и ссылкой на источник",
          "Evaluation-харнесс (precision/recall на размеченной выборке)",
        ],
      },
    },
    {
      id: "llm-observability",
      title: {
        en: "LLM observability & cost engineering",
        ru: "LLM observability и cost engineering",
      },
      desc: {
        en: "Most teams ship LLM features blind. I install the observability layer (Langfuse, OpenTelemetry, custom dashboards), the cost-tracking layer (per-feature, per-user, per-model), and the model-routing layer that lets you pick the cheapest model that still passes your quality bar.",
        ru: "Большинство команд выпускают LLM-фичи вслепую. Ставлю observability-слой (Langfuse, OpenTelemetry, кастомные дашборды), cost-tracking (per-feature, per-user, per-model) и model-routing, который позволяет брать самую дешёвую модель, ещё проходящую ваш quality-bar.",
      },
      outcomes: {
        en: [
          "Per-request traces with prompt, completion, tokens, latency",
          "Cost attribution by team / feature / customer",
          "Smart model router (rules or learned)",
          "Alerts on quality regressions and cost spikes",
        ],
        ru: [
          "Per-request traces с промптом, ответом, токенами, latency",
          "Cost attribution по команде / фиче / клиенту",
          "Smart model router (правила или learned)",
          "Алерты на регрессии качества и cost spikes",
        ],
      },
    },
  ] satisfies Service[],

  engagements: [
    {
      slug: "claude-code-fintech",
      client: {
        en: "Mid-size fintech (Series B, ~80 engineers)",
        ru: "Fintech среднего размера (Series B, ~80 инженеров)",
      },
      industry: { en: "Fintech · payment processing", ru: "Финтех · процессинг платежей" },
      team: "1 dev team (12 engineers) → org-wide",
      duration: { en: "8 weeks engagement + retainer", ru: "8 недель проекта + ретейнер" },
      problem: {
        en: [
          "Engineering leadership saw Claude Code being used ad-hoc by individual devs but had no organizational adoption, no shared config, and no visibility. Some teams built clever workflows; others were stuck running Claude in default mode with no permissions guardrails.",
          "Concrete asks: standardize on a per-repo configuration, build org-wide skills/slash-commands for their stack (Go + React + Postgres), wire Claude into their internal tools (Linear, GitHub, their internal feature-flag service), and produce metrics that engineering leadership could review monthly.",
        ],
        ru: [
          "Engineering leadership видел, что Claude Code используют отдельные разработчики ad-hoc, но не было организационного adoption, общей конфигурации и видимости. Какие-то команды собрали умные воркфлоу, какие-то — гоняли Claude в дефолтном режиме без guardrails.",
          "Конкретные запросы: стандартизировать per-repo конфигурацию, собрать org-wide skills/slash-команды под их стек (Go + React + Postgres), подключить Claude к их внутренним инструментам (Linear, GitHub, внутренний feature-flag сервис), сделать метрики, которые engineering leadership сможет смотреть ежемесячно.",
        ],
      },
      approach: {
        en: [
          "Started with one pilot team of 12 engineers. Wrote a baseline .claude/settings.json with allowlist-based Bash permissions, denied destructive commands by default (rm -rf, force-push, db drops), and pre-approved their internal CLI tooling.",
          "Built 6 custom skills: 'review-pr' (runs their lint + test + custom static-analysis), 'add-feature-flag' (talks to their flag service via MCP), 'rollback-migration', 'check-staging', 'ship-it' (PR + assign reviewers based on CODEOWNERS), 'why-flaky' (their flaky-test investigation playbook).",
          "Built an internal MCP server in TypeScript exposing their Linear, GitHub, and feature-flag APIs. Per-user OAuth — agent acts with the engineer's permissions, not a service account.",
          "Hook-based PR description generation: on git commit, a post-commit hook calls Claude with the diff to draft a PR description in their format. Saves ~5 min per PR.",
          "Monthly adoption review: dashboard showing active users, sessions per dev per week, PR-with-AI-assist ratio, and tool-call breakdown by skill.",
        ],
        ru: [
          "Стартовали с одной пилотной командой из 12 инженеров. Написал baseline .claude/settings.json с allowlist Bash-permissions, деструктивные команды (rm -rf, force-push, db drop) запретил по умолчанию, их внутренний CLI — pre-approved.",
          "Собрал 6 кастомных skills: 'review-pr' (их линтер + тесты + кастомный static-analysis), 'add-feature-flag' (через MCP к их flag-сервису), 'rollback-migration', 'check-staging', 'ship-it' (PR + назначение ревьюеров по CODEOWNERS), 'why-flaky' (их плейбук по flaky-тестам).",
          "Сделал внутренний MCP-сервер на TypeScript, экспонирующий их Linear, GitHub и feature-flag API. Per-user OAuth — агент действует с правами инженера, не сервисного аккаунта.",
          "Hook-генерация PR description: на git commit пост-коммит хук вызывает Claude с diff-ом, чтобы сгенерить описание PR в их формате. Экономит ~5 мин на PR.",
          "Ежемесячный adoption review: дашборд по active users, сессиям на разработчика в неделю, доле PR с AI-assist, разбивке tool-calls по skills.",
        ],
      },
      decisions: {
        en: [
          "Per-user auth on every MCP tool, not a shared service account. The cost is more setup; the benefit is no 'agent silently does production things' incidents. Audit logs map every tool call to a real engineer.",
          "Made the rollout opt-in for the first 4 weeks. Engineers who ignored it kept ignoring it. Engineers who tried it became internal advocates. Forcing adoption from above poisons the well — let the network effect do the work.",
          "Built the metrics dashboard before the rollout, not after. Leadership pre-committed to specific success metrics. Avoided the 'did this even help?' debate later.",
        ],
        ru: [
          "Per-user auth на каждом MCP-туле, не общий сервисный аккаунт. Цена — больше настройки; профит — отсутствие инцидентов «агент тихо сделал что-то на проде». Audit log привязан к конкретному инженеру.",
          "Раскат сделали opt-in на первые 4 недели. Игнорировавшие — продолжили игнорить. Попробовавшие — стали внутренними евангелистами. Принудительный adoption отравляет колодец, network effect работает лучше.",
          "Дашборд метрик собрали ДО раската, не после. Leadership заранее закоммитился на конкретные success-метрики. Избежали поздних споров «а это вообще помогло?».",
        ],
      },
      outcome: {
        en: [
          "Pilot team adoption went from ~3 active users to 11 of 12 within the engagement. Average time-to-first-PR for new hires dropped from 4 days to 1.5. The 'review-pr' skill caught a class of bugs (missing migration in PR) that their CI hadn't been configured to flag.",
          "After the engagement they pulled the same playbook into 4 more teams. I stay on a retainer for ongoing skill-building and MCP server maintenance.",
        ],
        ru: [
          "Adoption в пилотной команде вырос с ~3 активных пользователей до 11 из 12 за время проекта. Среднее время до первого PR у новых сотрудников снизилось с 4 дней до 1.5. Skill 'review-pr' начал ловить класс багов (отсутствие миграции в PR), который их CI не был настроен ловить.",
          "После проекта они растянули тот же плейбук ещё на 4 команды. Я остался на ретейнере для развития skills и поддержки MCP-сервера.",
        ],
      },
      metrics: [
        { value: "3 → 11/12", label: { en: "Active users in pilot team", ru: "Активных пользователей в пилоте" } },
        { value: "−63%", label: { en: "Time-to-first-PR for new hires", ru: "Время до первого PR у новых" } },
        { value: "6", label: { en: "Custom skills shipped", ru: "Кастомных skills выпущено" } },
        { value: "4", label: { en: "Teams adopted post-engagement", ru: "Команд адоптировали после проекта" } },
      ],
      snippets: [
        {
          label: { en: "settings.json with team-safe defaults", ru: "settings.json с team-safe дефолтами" },
          lang: "json",
          code: `{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(go test:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(./scripts/dev-cli:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)",
      "Bash(git push -f:*)",
      "Bash(psql:*drop*)",
      "Bash(make deploy:*)"
    ],
    "ask": [
      "Bash(git push:*)",
      "Bash(./scripts/migrate:*)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "./scripts/run-precommit.sh"
        }]
      }
    ]
  }
}`,
        },
        {
          label: { en: "MCP tool: scoped Linear search", ru: "MCP tool: scoped Linear search" },
          lang: "typescript",
          code: `server.tool(
  "linear_search_issues",
  "Search Linear issues with the current user's permissions.",
  {
    query: z.string().describe("Linear search query syntax"),
    limit: z.number().int().min(1).max(50).default(20),
  },
  async ({ query, limit }, { session }) => {
    // session.linearToken is the user's OAuth token, not a service account.
    const client = new LinearClient({ accessToken: session.linearToken });
    const issues = await client.issues({ filter: parseQuery(query), first: limit });

    audit.log({
      tool: "linear_search_issues",
      userId: session.userId,
      query,
      resultCount: issues.nodes.length,
    });

    return issues.nodes.map((i) => ({
      id: i.identifier,
      title: i.title,
      state: i.state?.name,
      url: i.url,
    }));
  }
);`,
        },
      ],
    },

    {
      slug: "rag-legal-firm",
      client: {
        en: "Mid-size law firm (~120 attorneys, Russia + CIS)",
        ru: "Юр.фирма среднего размера (~120 юристов, Россия + СНГ)",
      },
      industry: { en: "Legal services · M&A and corporate", ru: "Юридические услуги · M&A и корпоративное право" },
      team: "Solo (me) + 1 firm-side product owner",
      duration: { en: "10 weeks", ru: "10 недель" },
      problem: {
        en: [
          "The firm had ~60,000 pages of internal precedent: memos, deal summaries, regulatory updates, court filings. Stored across SharePoint, an old Confluence, and personal drives. Associates spent an embarrassing amount of time hunting for 'we did something like this in 2022, find me that memo'.",
          "Requirements: searchable in Russian + English, every answer must cite the exact paragraph it came from (no hallucinations on legal content), respect document-level access control (associates can't see partner-level memos), and run on infrastructure they could host themselves (data sovereignty).",
        ],
        ru: [
          "У фирмы ~60 000 страниц внутреннего precedent: меморандумы, deal summaries, обзоры регуляторики, судебные документы. Хранилось в SharePoint, старой Confluence и личных дисках. Юристы тратили неприлично много времени на «у нас было что-то похожее в 2022, найди мне тот меморандум».",
          "Требования: поиск по русскому и английскому, каждый ответ — с цитатой точного параграфа источника (никаких галлюцинаций на юр.контенте), уважение document-level access control (associates не видят partner-level меморандумы), и self-hosted инфра (data sovereignty).",
        ],
      },
      approach: {
        en: [
          "Self-hosted stack: Postgres + pgvector (no external vector DB), open-source bge-m3 multilingual embeddings, Claude Sonnet via API for synthesis, with strict citation requirements baked into the system prompt.",
          "Ingestion pipeline: docling for layout-aware PDF parsing, semantic chunking (headings + paragraph boundaries, not raw character splits), one embedding per chunk plus a document-level summary embedding for hierarchical retrieval.",
          "Hybrid retrieval: BM25 (tsvector in Postgres) + dense vectors, results merged with reciprocal rank fusion. Reranking via cross-encoder for the top 50 candidates.",
          "ACL at retrieval time: every chunk has an access_level column; the SQL query joins on the requesting user's role. The model never sees content it shouldn't.",
          "Citation enforcement: the system prompt requires answers in JSON with answer + citations[]. A validator rejects responses missing citations or referencing chunk IDs not in the retrieved set.",
          "Built an evaluation harness with 200 labeled queries (gold answer + expected citations). Tracked precision@5, recall@10, and citation accuracy weekly throughout development.",
        ],
        ru: [
          "Self-hosted стек: Postgres + pgvector (без внешнего vector DB), open-source bge-m3 multilingual embeddings, Claude Sonnet через API для синтеза, со строгим требованием к цитированию в system prompt.",
          "Пайплайн ингеста: docling для layout-aware PDF-парсинга, semantic chunking (по заголовкам и параграфам, не по сырому char count), embedding на чанк плюс document-level summary embedding для иерархического retrieval.",
          "Hybrid retrieval: BM25 (tsvector в Postgres) + dense vectors, результаты сливаются через reciprocal rank fusion. Reranking через cross-encoder для top-50 кандидатов.",
          "ACL на уровне retrieval: у каждого чанка колонка access_level; SQL-запрос джойнит роль пользователя. Модель никогда не видит контент, который не должна.",
          "Принудительное цитирование: system prompt требует ответа в JSON с answer + citations[]. Валидатор реджектит ответы без цитат или с chunk_id, которых нет в retrieved set.",
          "Сделал evaluation-харнесс с 200 размеченными запросами (gold-ответ + ожидаемые цитаты). Трекал precision@5, recall@10 и citation accuracy еженедельно.",
        ],
      },
      decisions: {
        en: [
          "Hybrid retrieval, not pure dense. Legal text has heavy reliance on exact terminology — case names, statute numbers, defined terms. BM25 catches what embeddings miss; embeddings catch what BM25 misses. The fusion was ~12% better than either alone on the eval set.",
          "Self-hosted embeddings on a CPU box (bge-m3, ~1B params). Saved on API costs and avoided sending privileged content to a third party. Ingest is slower but runs once per document.",
          "No fine-tuning. The eval scores were already strong with retrieval improvements and a careful prompt. Fine-tuning would have added a quarterly maintenance burden and unclear ROI.",
        ],
        ru: [
          "Hybrid retrieval, не чистый dense. Юр.текст сильно завязан на точную терминологию — названия дел, номера статей, defined terms. BM25 ловит то, что embeddings пропускают; и наоборот. Fusion дал ~12% выигрыш против каждого по отдельности на eval-сете.",
          "Self-hosted embeddings на CPU-боксе (bge-m3, ~1B params). Экономия на API-костах и непередача privileged контента третьей стороне. Ингест медленнее, но идёт один раз на документ.",
          "Без fine-tuning. Eval-метрики уже были крепкими за счёт улучшений retrieval и аккуратного промпта. Fine-tuning добавил бы ежеквартальное обслуживание с неочевидным ROI.",
        ],
      },
      outcome: {
        en: [
          "From their pilot user feedback: average time to find a relevant precedent dropped from ~25 minutes to under 2. Citation accuracy hit 94% on the eval set by week 8.",
          "The firm extended to a 6-month retainer for ongoing ingestion pipeline maintenance and quarterly eval set expansion.",
        ],
        ru: [
          "Из обратной связи пилотных пользователей: среднее время поиска релевантного прецедента упало с ~25 минут до меньше 2. Citation accuracy достигла 94% на eval-сете к 8-й неделе.",
          "Фирма продлила на 6-месячный ретейнер для развития пайплайна ингеста и квартальных расширений eval-сета.",
        ],
      },
      metrics: [
        { value: "60K", label: { en: "Pages ingested", ru: "Страниц проиндексировано" } },
        { value: "25min → 2min", label: { en: "Avg precedent lookup time", ru: "Среднее время поиска precedent" } },
        { value: "94%", label: { en: "Citation accuracy (eval set)", ru: "Citation accuracy (eval-сет)" } },
        { value: "200", label: { en: "Labeled eval queries", ru: "Размеченных eval-запросов" } },
      ],
      snippets: [
        {
          label: { en: "Hybrid retrieval with access control", ru: "Hybrid retrieval с access control" },
          lang: "sql",
          code: `-- Single query: BM25 + dense vector + ACL.
-- :q_tsv = websearch_to_tsquery('russian', :user_query)
-- :q_emb = embedding(:user_query)
-- :user_clearance = associate | partner

WITH bm25 AS (
  SELECT chunk_id,
         ts_rank_cd(content_tsv, :q_tsv) AS bm25_score
  FROM chunks
  WHERE content_tsv @@ :q_tsv
    AND access_level <= :user_clearance
  ORDER BY bm25_score DESC
  LIMIT 100
),
dense AS (
  SELECT chunk_id,
         1 - (embedding <=> :q_emb) AS dense_score
  FROM chunks
  WHERE access_level <= :user_clearance
  ORDER BY embedding <=> :q_emb
  LIMIT 100
)
SELECT c.chunk_id, c.content, c.source_doc, c.page,
       COALESCE(b.bm25_score, 0) * 0.3 +
       COALESCE(d.dense_score, 0) * 0.7 AS hybrid_score
FROM chunks c
LEFT JOIN bm25 b USING (chunk_id)
LEFT JOIN dense d USING (chunk_id)
WHERE b.chunk_id IS NOT NULL OR d.chunk_id IS NOT NULL
ORDER BY hybrid_score DESC
LIMIT 20;`,
        },
        {
          label: { en: "Citation-enforced response schema", ru: "Citation-enforced response schema" },
          lang: "python",
          code: `class Citation(BaseModel):
    chunk_id: str
    source_doc: str
    page: int
    quote: str = Field(min_length=10)

class RagAnswer(BaseModel):
    answer: str
    citations: list[Citation] = Field(min_length=1)
    confidence: Literal["high", "medium", "low"]

def validate_grounding(answer: RagAnswer, retrieved: set[str]) -> None:
    """Reject answers that cite chunks not in the retrieved set."""
    unknown = [c.chunk_id for c in answer.citations if c.chunk_id not in retrieved]
    if unknown:
        raise UngroundedResponseError(
            f"Citations refer to chunks not retrieved: {unknown}. "
            "Possible hallucination — refusing to surface to user."
        )
`,
        },
      ],
    },

    {
      slug: "ai-code-review-saas",
      client: {
        en: "B2B SaaS company (~30 engineers, Series A)",
        ru: "B2B SaaS-компания (~30 инженеров, Series A)",
      },
      industry: { en: "B2B SaaS · workflow automation", ru: "B2B SaaS · автоматизация воркфлоу" },
      team: "Solo + their engineering lead",
      duration: { en: "5 weeks", ru: "5 недель" },
      problem: {
        en: [
          "Engineering lead asked for an AI-driven first-pass code reviewer on GitHub PRs. The trial-and-error stage was over — they had piloted three off-the-shelf tools (Copilot Review, CodeRabbit, Greptile) and weren't satisfied with the signal-to-noise ratio. Too many cosmetic nits, not enough useful catches.",
          "What they actually wanted: a reviewer that knew their codebase conventions (lint rules, internal patterns, deprecated utilities), flagged risky changes (auth, billing, migrations), and posted exactly one comment per PR — a summary, not 14 separate inline nits.",
        ],
        ru: [
          "Engineering lead запросил AI-ревьюера первой линии для PR на GitHub. Стадия trial-and-error уже прошла — они пилотировали три коробочных тула (Copilot Review, CodeRabbit, Greptile) и не были довольны соотношением сигнал/шум. Слишком много косметики, мало полезных catches.",
          "Что им реально надо: ревьюер, знающий их code conventions (lint-правила, внутренние паттерны, deprecated утилиты), флагающий risky changes (auth, billing, миграции) и постящий ровно один коммент на PR — summary, не 14 отдельных inline-нитов.",
        ],
      },
      approach: {
        en: [
          "GitHub Action triggered on PR open + synchronize. Pulls the diff, the changed files in full, and (for risky paths) the touched files' callers via a quick grep pass.",
          "Routed Claude Sonnet — Haiku was too imprecise on their TS codebase; Opus was overkill for routine PRs. Sonnet on a 4K-token max response kept costs at ~$0.07/PR average.",
          "Wrote a custom system prompt with their actual conventions: 'use ourBigDecimal for money, never Number'; 'never call /v1/payments directly, go through PaymentService'; 'migrations need a reversible down() within 24h'. About 1200 tokens of repo-specific rules.",
          "Risk-tier classification: PR touching auth/, billing/, or migrations/ → 'high', triggers a stricter prompt and tags @security-team. PR touching only tests or docs → 'low', shorter response template.",
          "Output: one structured comment per PR with 'Summary', 'Risk', 'Issues found' (with severity), 'Suggestions'. No inline noise. The team's own engineers handle the line-by-line review — Claude does the framing.",
          "PII/secret filter on input: any line matching common secret patterns (API keys, tokens) is stripped before sending to the API. Their security team signed off on this before we shipped.",
        ],
        ru: [
          "GitHub Action на PR open + synchronize. Подтягивает diff, изменённые файлы целиком и (для risky paths) callers задетых файлов через быстрый grep.",
          "Routed Claude Sonnet — Haiku был неточен на их TS-кодбазе; Opus избыточен для рутинных PR. Sonnet с 4K-token max response держал косты на ~$0.07/PR в среднем.",
          "Кастомный system prompt с их реальными conventions: 'use ourBigDecimal for money, never Number'; 'никогда не звать /v1/payments напрямую, идти через PaymentService'; 'миграции требуют reversible down() в течение 24 часов'. Около 1200 токенов repo-specific правил.",
          "Risk-tier классификация: PR в auth/, billing/, migrations/ → 'high', strict-prompt и тег @security-team. PR только в tests/docs → 'low', короткий шаблон ответа.",
          "Output: один структурированный коммент на PR — 'Summary', 'Risk', 'Issues found' (с severity), 'Suggestions'. Без inline-шума. Line-by-line ревью делают их же инженеры — Claude задаёт framing.",
          "PII/secret-фильтр на входе: строки, матчащие паттерны секретов (API keys, tokens), вырезаются до отправки в API. Security-команда подписала это до выпуска.",
        ],
      },
      decisions: {
        en: [
          "One comment per PR, not inline. The team had review fatigue from previous tools; consolidation respected their attention. Engineers can ignore one comment they disagree with; they can't ignore 14.",
          "Risk-tier routing instead of running every PR through the strictest prompt. Cost dropped ~3x and false-positive rate dropped because the high-tier prompt was reserved for changes that genuinely warranted scrutiny.",
          "Shipped with a feedback button (thumbs up/down + optional reason) on every Claude comment. Used the negative feedback weekly to update the system prompt — most fixes were 'this rule isn't actually a rule, our codebase does X here'.",
        ],
        ru: [
          "Один коммент на PR, не inline. У команды была усталость от предыдущих тулов; консолидация уважала их внимание. Один коммент можно проигнорить, если не согласен; 14 — нельзя.",
          "Risk-tier routing вместо «прогонять каждый PR через самый строгий промпт». Косты упали в ~3 раза, false-positive ratio тоже — потому что high-tier промпт стал зарезервирован для реально требующих внимания изменений.",
          "Выпустили с feedback-кнопкой (👍/👎 + опциональная причина) на каждом Claude-комменте. Negative feedback использовал еженедельно для обновления system prompt — большинство фиксов было «это правило не правило, наш кодбейз делает X».",
        ],
      },
      outcome: {
        en: [
          "After 4 weeks in production: 'useful catch' rate (engineer thumbs-up) was 71%. Time-to-first-human-review on PRs dropped from ~4h to ~45min (engineers triage Claude's summary first, then commit to a deep review).",
          "Engineering lead's own statement at our wrap-up: 'this is the first AI tool we've used that actually feels like a junior reviewer, not a linter pretending to be one.'",
        ],
        ru: [
          "После 4 недель в проде: 'useful catch' rate (👍 от инженера) — 71%. Time-to-first-human-review на PR снизилось с ~4ч до ~45мин (инженеры триажат Claude-summary, потом коммитятся на глубокое ревью).",
          "Цитата engineering lead на закрытии: «это первый AI-тул, что мы пробовали, который реально ощущается как джун-ревьюер, а не как линтер, притворяющийся им».",
        ],
      },
      metrics: [
        { value: "71%", label: { en: "Useful-catch rate (engineer 👍)", ru: "Useful-catch rate (👍 инженера)" } },
        { value: "−81%", label: { en: "Time-to-first-human-review", ru: "Время до первого human-review" } },
        { value: "$0.07", label: { en: "Avg LLM cost per PR", ru: "Средний LLM-кост на PR" } },
        { value: "1", label: { en: "Comment per PR (no inline noise)", ru: "Коммент на PR (без inline-шума)" } },
      ],
      snippets: [
        {
          label: { en: "GitHub Action entry point", ru: "GitHub Action — точка входа" },
          lang: "yaml",
          code: `name: AI code review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with: { node-version: "20" }

      - name: Classify risk tier
        id: tier
        run: node scripts/risk-tier.mjs >> "$GITHUB_OUTPUT"

      - name: Strip secrets from diff
        run: node scripts/scrub-secrets.mjs > /tmp/diff.txt

      - name: Run AI reviewer
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
          RISK_TIER: \${{ steps.tier.outputs.tier }}
        run: node scripts/review.mjs /tmp/diff.txt`,
        },
        {
          label: { en: "Risk-tier classifier", ru: "Risk-tier классификатор" },
          lang: "typescript",
          code: `const HIGH_RISK_PATHS = [
  /^src\\/auth\\//,
  /^src\\/billing\\//,
  /^src\\/payments\\//,
  /^migrations\\//,
  /\\.env(\\..+)?$/,
];

const LOW_RISK_PATHS = [
  /\\.test\\.tsx?$/,
  /^docs\\//,
  /^\\.github\\/workflows\\//,
];

export function classifyTier(changedFiles: string[]): "high" | "normal" | "low" {
  if (changedFiles.some((f) => HIGH_RISK_PATHS.some((re) => re.test(f)))) {
    return "high";
  }
  if (changedFiles.every((f) => LOW_RISK_PATHS.some((re) => re.test(f)))) {
    return "low";
  }
  return "normal";
}`,
        },
      ],
    },
  ] satisfies Engagement[],

  process: {
    en: [
      {
        step: "1 · Diagnostic call (free, ~45 min)",
        desc: "Where you actually are with AI today, what's painful, what would 'good' look like. No deck, just questions.",
      },
      {
        step: "2 · Scoped proposal",
        desc: "1-2 page proposal with concrete deliverables, timeline, and success metrics. Fixed-scope or retainer.",
      },
      {
        step: "3 · Pilot (typically 2–4 weeks)",
        desc: "Ship the smallest end-to-end thing that proves the approach. Pilot with one team, not the whole org.",
      },
      {
        step: "4 · Rollout + adoption work",
        desc: "Configuration, custom skills, internal documentation, training sessions. Adoption is 60% of the value — I do this part too.",
      },
      {
        step: "5 · Retainer (optional)",
        desc: "Ongoing maintenance, expansion to new teams, monthly metric reviews. Most engagements continue here.",
      },
    ],
    ru: [
      {
        step: "1 · Диагностический созвон (бесплатно, ~45 мин)",
        desc: "Где вы реально сейчас с AI, что болит, как выглядит «хорошо». Без презентации, только вопросы.",
      },
      {
        step: "2 · Scoped proposal",
        desc: "Документ на 1-2 страницы с конкретными deliverables, таймлайном и success-метриками. Fixed-scope или ретейнер.",
      },
      {
        step: "3 · Пилот (обычно 2–4 недели)",
        desc: "Выпускаем минимальное end-to-end, доказывающее подход. Пилотируем с одной командой, не на всю орг.",
      },
      {
        step: "4 · Раскат и работа с adoption",
        desc: "Конфигурация, кастомные skills, внутренняя документация, обучающие сессии. Adoption — 60% ценности, эту часть я тоже делаю.",
      },
      {
        step: "5 · Ретейнер (опционально)",
        desc: "Текущая поддержка, расширение на новые команды, ежемесячные ревью метрик. Большинство проектов продолжается тут.",
      },
    ],
  },
};
