import { ArrowRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "../components/common/Badge";
import { PageContainer } from "../components/layout/PageContainer";
import { useTranslation } from "../features/localization/useTranslation";

type ComingSoonPageProps = {
  audience: "standard" | "couple" | "seniors";
};

export default function ComingSoonPage({ audience }: ComingSoonPageProps) {
  const { t } = useTranslation();
  const titleByAudience: Record<ComingSoonPageProps["audience"], string> = {
    standard: t.comingSoon.standardTitle,
    couple: t.comingSoon.coupleTitle,
    seniors: t.comingSoon.seniorsTitle,
  };

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#F2F2F2]">
      <section className="py-16 sm:py-24">
        <PageContainer className="grid min-h-[540px] place-items-center" size="landing">
          <div className="mx-auto max-w-3xl rounded-[28px] bg-white px-6 py-12 text-center shadow-sm ring-1 ring-pink-100 sm:px-10 sm:py-16">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-pink-50 text-[#EE389C]">
              <Clock3 aria-hidden="true" className="size-7" />
            </div>
            <div className="mt-6">
              <Badge className="border-pink-200 bg-pink-50 text-[#EE389C]">
                {t.comingSoon.badge}
              </Badge>
            </div>
            <h1 className="mt-5 text-[34px] font-semibold leading-[42px] tracking-normal text-[#101010] sm:text-[52px] sm:leading-[60px]">
              {titleByAudience[audience]} {t.comingSoon.titleSuffix}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#666060]">
              {t.comingSoon.description}
            </p>
            <Link
              className="mt-8 inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#EE389C] px-6 text-sm font-semibold text-white transition hover:bg-[#d92d8b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE389C]"
              to="/women"
            >
              {t.comingSoon.buttonLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </PageContainer>
      </section>
    </main>
  );
}
