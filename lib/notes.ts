import type { CodeSnippet } from "./case-studies";

export type Note = {
  slug: string;
  date: string;
  title: { en: string; ru: string };
  tagline: { en: string; ru: string };
  tags: string[];
  body: {
    en: { kind: "p" | "h" | "ul" | "code"; value: string | string[] | CodeSnippet }[];
    ru: { kind: "p" | "h" | "ul" | "code"; value: string | string[] | CodeSnippet }[];
  };
};

export const notes: Note[] = [
  {
    slug: "race-conditions-in-subscription-billing",
    date: "2026-04-12",
    title: {
      en: "Race conditions in page-based subscription billing",
      ru: "Race conditions в page-based subscription billing",
    },
    tagline: {
      en: "How three concurrent requests can drive a balance into the negative — and why the obvious fix is wrong.",
      ru: "Как три одновременных запроса загоняют баланс в минус — и почему очевидный фикс неправильный.",
    },
    tags: ["postgres", "concurrency", "billing", "saas"],
    body: {
      en: [
        { kind: "p", value: "BookahTranslate charges users by pages. New users get 5 bonus pages. The deduction logic looks innocent:" },
        {
          kind: "code",
          value: {
            label: { en: "Naive deduction — has a race", ru: "Наивное списание — есть race" },
            lang: "python",
            code: `user = User.query.get(user_id)
if user.bonus_pages >= pages_needed:
    # ... run translation ...
    user.bonus_pages -= pages_needed
    db.session.commit()
`,
          },
        },
        { kind: "p", value: "The read of bonus_pages and the write are separated by however long the translation takes — sometimes minutes for a 200-page PDF. Three parallel requests with bonus_pages=5 and pages_needed=5 all pass the check, all start translating, all commit -5. The balance lands at -10. The user got 15 pages for free." },
        { kind: "h", value: "The obvious fix that doesn't work" },
        { kind: "p", value: "First instinct: wrap it in a transaction. But the default transaction isolation in Postgres is READ COMMITTED — concurrent transactions still read the same starting value. Higher isolation (SERIALIZABLE) would work, but you pay for it on every billing operation, and you get retryable serialization errors that have to be handled application-side anyway." },
        { kind: "h", value: "What actually works: lock the row" },
        {
          kind: "code",
          value: {
            label: { en: "Atomic deduction with row-level lock", ru: "Атомарное списание с row-level lock" },
            lang: "python",
            code: `sub = (
    db.session.query(UserSubscription)
    .with_for_update()  # SELECT ... FOR UPDATE
    .filter_by(id=subscription_id)
    .first()
)
if sub.pages_remaining < pages_count:
    db.session.rollback()
    return False
sub.pages_remaining -= pages_count
db.session.commit()  # releases lock
`,
          },
        },
        { kind: "p", value: "with_for_update() makes the SELECT hold a row-level lock until the transaction ends. The second concurrent request blocks at the SELECT, waits for the first to commit, then reads the updated value (pages_remaining=0) and fails the check. No retry, no SERIALIZABLE overhead, no inconsistency." },
        { kind: "h", value: "The lesson" },
        { kind: "p", value: "If a balance update depends on the current balance, the read and write must happen under the same lock. Not the same transaction — the same lock. This is true whether the balance lives in Postgres, Redis, or Mongo." },
      ],
      ru: [
        { kind: "p", value: "BookahTranslate списывает страницы у юзеров. Новым даём 5 бонусных. Логика списания выглядит безобидно:" },
        {
          kind: "code",
          value: {
            label: { en: "Naive deduction — has a race", ru: "Наивное списание — есть race" },
            lang: "python",
            code: `user = User.query.get(user_id)
if user.bonus_pages >= pages_needed:
    # ... запускаем перевод ...
    user.bonus_pages -= pages_needed
    db.session.commit()
`,
          },
        },
        { kind: "p", value: "Чтение bonus_pages и запись разделены тем, сколько идёт перевод — иногда минутами на 200-страничном PDF. Три параллельных запроса с bonus_pages=5 и pages_needed=5: все три проходят проверку, все три стартуют перевод, все три коммитят -5. Баланс становится -10. Юзер получил 15 страниц бесплатно." },
        { kind: "h", value: "Очевидный фикс, который не работает" },
        { kind: "p", value: "Первая мысль — обернуть в транзакцию. Но дефолтная изоляция в Postgres — READ COMMITTED, параллельные транзакции всё равно видят одинаковое стартовое значение. Более высокая изоляция (SERIALIZABLE) работает, но платишь на каждой биллинг-операции и получаешь retryable serialization errors, которые всё равно надо обрабатывать в коде." },
        { kind: "h", value: "Что реально работает: блокируем строку" },
        {
          kind: "code",
          value: {
            label: { en: "Atomic deduction with row-level lock", ru: "Атомарное списание с row-level lock" },
            lang: "python",
            code: `sub = (
    db.session.query(UserSubscription)
    .with_for_update()  # SELECT ... FOR UPDATE
    .filter_by(id=subscription_id)
    .first()
)
if sub.pages_remaining < pages_count:
    db.session.rollback()
    return False
sub.pages_remaining -= pages_count
db.session.commit()  # снимает lock
`,
          },
        },
        { kind: "p", value: "with_for_update() заставляет SELECT держать row-level lock до конца транзакции. Второй параллельный запрос блокируется на SELECT, ждёт коммита первого, потом читает обновлённое значение (pages_remaining=0) и проваливает проверку. Без retry, без оверхеда SERIALIZABLE, без неконсистентности." },
        { kind: "h", value: "Урок" },
        { kind: "p", value: "Если апдейт баланса зависит от текущего баланса, чтение и запись должны быть под одним lock. Не в одной транзакции — под одним lock. Это верно и для Postgres, и для Redis, и для Mongo." },
      ],
    },
  },
  {
    slug: "llm-routing-when-gpt4-is-overkill",
    date: "2026-03-28",
    title: {
      en: "LLM routing: when GPT-4 is overkill",
      ru: "LLM-роутинг: когда GPT-4 — это перебор",
    },
    tagline: {
      en: "A simple per-document model picker that cut my LLM bill by 40% without hurting quality.",
      ru: "Простой выбор модели по документу, который снизил мой LLM-счёт на 40% без потери качества.",
    },
    tags: ["llm", "openai", "claude", "cost", "saas"],
    body: {
      en: [
        { kind: "p", value: "When you ship an LLM-powered product, your first instinct is to default to the best model — GPT-4o for everything. It's a fine default until your monthly bill hits four digits and you realize half your traffic is translating recipe PDFs that GPT-4o is laughably overqualified for." },
        { kind: "p", value: "On BookahTranslate I built a small routing layer that picks a model based on three signals: document kind, user tier, and document size. It looks unsophisticated. It works." },
        {
          kind: "code",
          value: {
            label: { en: "Model picker", ru: "Выбор модели" },
            lang: "python",
            code: `def pick_model(doc: Document, tier: UserTier) -> ModelChoice:
    if tier == UserTier.ECONOMY and doc.kind in {
        DocKind.TXT, DocKind.PLAIN_PDF
    }:
        return ModelChoice.GOOGLE_TRANSLATE

    if doc.kind == DocKind.SCANNED_PDF:
        return ModelChoice.GPT_4O   # vision + OCR fusion

    if doc.kind == DocKind.LEGAL or doc.has_dense_terminology:
        return ModelChoice.CLAUDE_SONNET

    if doc.pages > 200 and tier != UserTier.PREMIUM:
        return ModelChoice.CLAUDE_HAIKU   # cheap for bulk

    return ModelChoice.GPT_4O
`,
          },
        },
        { kind: "h", value: "Why each branch" },
        { kind: "ul", value: [
          "Plain PDFs and TXT on the Economy tier: Google Translate is dramatically cheaper, and for a recipe or news article the quality difference is imperceptible.",
          "Scanned PDFs: need vision-capable model. GPT-4o currently wins on OCR + translation in one pass.",
          "Legal / dense technical: Claude Sonnet handles terminology consistency over long contexts better than GPT-4o in my A/B sampling.",
          "Long documents on lower tiers: Claude Haiku is ~10x cheaper than GPT-4o and the quality drop on simple prose is hard to notice unless you're reading line-by-line.",
        ] },
        { kind: "h", value: "What I'd warn against" },
        { kind: "p", value: "Don't build a 'smart router' that asks an LLM to pick the LLM. I tried that. It added latency, costs, and one more failure mode. A handful of explicit branches based on cheap signals (file type, page count, user tier) is the right tool. If you can't articulate the decision in 8 lines of Python, you don't understand your traffic well enough to route it yet." },
        { kind: "h", value: "Observability matters more than the picker" },
        { kind: "p", value: "Every translation logs the picked model, token counts, latency, and a quality flag (filled in async by a small Claude pass that re-reads the output). I review the worst-quality 1% weekly. Most of the time the fix is 'route this document profile to a stronger model,' not 'improve the prompt.'" },
      ],
      ru: [
        { kind: "p", value: "Когда выпускаешь LLM-продукт, первый порыв — дефолтиться на лучшую модель. GPT-4o на всё. Это нормальный дефолт, пока месячный счёт не уходит в четырёхзначные, и ты понимаешь, что половина трафика — это перевод рецептов в PDF, для которых GPT-4o смешно избыточен." },
        { kind: "p", value: "На BookahTranslate я сделал простенький роутер, выбирающий модель по трём сигналам: тип документа, тариф пользователя, объём. Выглядит незатейливо. Работает." },
        {
          kind: "code",
          value: {
            label: { en: "Model picker", ru: "Выбор модели" },
            lang: "python",
            code: `def pick_model(doc: Document, tier: UserTier) -> ModelChoice:
    if tier == UserTier.ECONOMY and doc.kind in {
        DocKind.TXT, DocKind.PLAIN_PDF
    }:
        return ModelChoice.GOOGLE_TRANSLATE

    if doc.kind == DocKind.SCANNED_PDF:
        return ModelChoice.GPT_4O   # vision + OCR fusion

    if doc.kind == DocKind.LEGAL or doc.has_dense_terminology:
        return ModelChoice.CLAUDE_SONNET

    if doc.pages > 200 and tier != UserTier.PREMIUM:
        return ModelChoice.CLAUDE_HAIKU   # bulk дёшево

    return ModelChoice.GPT_4O
`,
          },
        },
        { kind: "h", value: "Почему каждая ветка" },
        { kind: "ul", value: [
          "Простые PDF и TXT на тарифе «Эконом»: Google Translate ощутимо дешевле, для рецепта или новости разница в качестве незаметна.",
          "Сканы: нужна vision-модель. GPT-4o сейчас лучший на OCR + перевод за один проход.",
          "Юридические / плотная терминология: Claude Sonnet держит консистентность терминов в длинном контексте лучше, чем GPT-4o (по моей A/B-выборке).",
          "Длинные документы на низких тарифах: Claude Haiku ~в 10 раз дешевле GPT-4o, и просадку качества на простой прозе сложно заметить, если не читать построчно.",
        ] },
        { kind: "h", value: "От чего я бы предостерёг" },
        { kind: "p", value: "Не делайте «умный роутер», который просит LLM выбрать LLM. Я пробовал. Это добавляет latency, costs и ещё один failure mode. Несколько явных веток по дешёвым сигналам (тип файла, число страниц, тариф) — правильный инструмент. Если ты не можешь сформулировать решение в 8 строках Python, ты ещё не понимаешь свой трафик достаточно, чтобы его роутить." },
        { kind: "h", value: "Observability важнее самого роутера" },
        { kind: "p", value: "Каждый перевод логирует выбранную модель, токены, latency и quality-флаг (асинхронно ставит мелкий Claude-пасс, который перечитывает результат). Я еженедельно смотрю худший 1%. В 9 случаях из 10 фикс — «отправить этот профиль документа в более сильную модель», а не «улучшить промпт»." },
      ],
    },
  },
];
