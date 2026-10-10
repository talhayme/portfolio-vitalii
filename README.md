# portfolio-vitalii

Personal site of Vitalii Bogachev — Senior AI Engineer (LLM, RAG, MCP), Tbilisi.
Live at **https://talhayme.github.io/portfolio-vitalii/** (EN/RU).

Next.js static export, deployed to GitHub Pages on every push to `main`.
Content lives in `lib/content.ts` (projects, open-source list, UI strings in
both languages) and `lib/case-studies.ts`; engineering notes in `lib/notes.ts`.

```
npm ci && npm run dev      # local
npm run build              # static export to out/
```
