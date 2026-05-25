import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { projects } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";

export default async function WorkListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <article className="prose">
      <h1>{locale === "ru" ? "Проекты" : "Selected Work"}</h1>
      <p>
        {locale === "ru"
          ? "Четыре проекта, которые лучше всего показывают, как я работаю. Каждый — отдельный кейс с проблемой, решением и метриками."
          : "Four projects that best show how I work. Each is a case study with the problem, approach, and measurable outcome."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-8">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} locale={locale} />
        ))}
      </div>
    </article>
  );
}
