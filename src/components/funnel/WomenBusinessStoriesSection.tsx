import { Star } from "lucide-react";
import { motion } from "motion/react";

import operatorAvatar from "../../assets/Rectangle 93.png";
import { useTranslation } from "../../features/localization/useTranslation";
import type { FunnelStoryTranslation } from "../../features/localization/localizationTypes";
import { PageContainer } from "../layout/PageContainer";

type StoryCardProps = {
  ratingLabel: string;
  location: string;
  name: string;
  quote: string;
};

function StoryCard({ location, name, quote, ratingLabel }: StoryCardProps) {
  return (
    <article className="w-[270px] shrink-0 rounded-[10px] bg-white p-5 shadow-sm sm:w-[320px]">
      <div className="flex gap-0.5 text-[#FF8A1D]" aria-label={ratingLabel}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star aria-hidden="true" className="size-4 fill-current" key={index} />
        ))}
      </div>
      <p className="mt-4 text-sm leading-5 text-[#101010]">"{quote}"</p>
      <div className="mt-5 flex items-center gap-3">
        <img
          alt=""
          className="size-8 rounded-full object-cover object-center"
          src={operatorAvatar}
        />
        <div>
          <p className="text-sm font-semibold leading-4 text-[#101010]">{name}</p>
          <p className="text-xs font-medium leading-4 text-[#2F73FF]">{location}</p>
        </div>
      </div>
    </article>
  );
}

type StoryRowProps = {
  direction: "left" | "right";
  ratingLabel: string;
  stories: FunnelStoryTranslation[];
};

function StoryRow({ direction, ratingLabel, stories }: StoryRowProps) {
  const rowStories = [...stories, ...stories];
  const animation = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: animation }}
        className="flex w-max gap-5"
        transition={{ duration: 34, ease: "linear", repeat: Infinity }}
      >
        {rowStories.map((story, index) => (
          <StoryCard
            key={`${story.name}-${index}`}
            ratingLabel={ratingLabel}
            location={story.location}
            name={story.name}
            quote={story.quote}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function WomenBusinessStoriesSection() {
  const { t } = useTranslation();
  const stories = t.funnelPage.stories.items;

  return (
    <section className="overflow-hidden bg-[#F2F2F2] py-12 sm:py-16" id="success-stories">
      <PageContainer size="landing">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.35 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2
            className="text-[32px] font-semibold leading-[38px] tracking-normal text-[#101010] sm:text-[40px] sm:leading-[46px]"
            style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
          >
            <span className="text-[#EE389C]">{t.funnelPage.stories.titleHighlight}</span>{" "}
            {t.funnelPage.stories.titleFirstLineSuffix}
            <br />
            {t.funnelPage.stories.titleSecondLine}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-5 text-[#666060]">
            {t.funnelPage.stories.subtitle}
          </p>
        </motion.div>
      </PageContainer>

      <PageContainer className="mt-11" size="landing">
        <div className="grid gap-5 overflow-hidden">
          <StoryRow
            direction="left"
            ratingLabel={t.funnelPage.stories.ratingLabel}
            stories={stories}
          />
          <StoryRow
            direction="right"
            ratingLabel={t.funnelPage.stories.ratingLabel}
            stories={stories.slice().reverse()}
          />
        </div>
      </PageContainer>
    </section>
  );
}
