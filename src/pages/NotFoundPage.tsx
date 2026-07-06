import { Link } from "react-router-dom";

import { PageContainer } from "../components/layout/PageContainer";
import { useTranslation } from "../features/localization/useTranslation";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <main>
      <PageContainer className="grid min-h-[70vh] place-items-center py-10 text-center" size="md">
        <div>
        <p className="text-sm font-semibold text-cyan-700">{t.notFound.label}</p>
        <h1 className="mt-3 text-3xl font-bold">{t.notFound.title}</h1>
        <p className="mt-3 text-slate-600">{t.notFound.description}</p>
        <Link
          className="mt-6 inline-flex h-11 cursor-pointer items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          to="/standard"
        >
          {t.notFound.action}
        </Link>
        </div>
      </PageContainer>
    </main>
  );
}
