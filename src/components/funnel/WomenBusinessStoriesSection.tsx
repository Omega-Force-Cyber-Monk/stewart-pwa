import { Star } from "lucide-react";
import { motion } from "motion/react";

import operatorAvatar from "../../assets/Rectangle 93.png";
import { PageContainer } from "../layout/PageContainer";

const stories = [
  {
    location: "Knoxville, TN",
    name: "Annette Black",
    quote:
      "The system is simple, professional, and it works. I set my schedule and now I'm meeting great people everyday.",
  },
  {
    location: "Austin, TX",
    name: "Maya Collins",
    quote:
      "I finally have a business that feels like mine. The launch tools helped me look organized from day one.",
  },
  {
    location: "Tampa, FL",
    name: "Sofia Ramirez",
    quote:
      "The templates made it easier to explain my airport service and start building repeat customers.",
  },
  {
    location: "Charlotte, NC",
    name: "Erica Stone",
    quote:
      "I stopped guessing what to do next. The steps gave me a clear path to promote my own transportation brand.",
  },
  {
    location: "Phoenix, AZ",
    name: "Nina Patel",
    quote:
      "This helped me show up professionally and attract riders who value dependable private transportation.",
  },
];

type StoryCardProps = {
  location: string;
  name: string;
  quote: string;
};

function StoryCard({ location, name, quote }: StoryCardProps) {
  return (
    <article className="w-[270px] shrink-0 rounded-[10px] bg-white p-5 shadow-sm sm:w-[320px]">
      <div className="flex gap-0.5 text-[#FF8A1D]" aria-label="5 star rating">
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
  stories: StoryCardProps[];
};

function StoryRow({ direction, stories }: StoryRowProps) {
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
  return (
    <section className="overflow-hidden bg-[#F2F2F2] py-12 sm:py-16" id="success-stories">
      <PageContainer size="lg">
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
            <span className="text-[#EE389C]">Women Operators</span> Are
            <br />
            Building Real Businesses
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-5 text-[#666060]">
            Discover how women entrepreneurs are creating trusted brands,
            attracting loyal customers, and growing successful transportation
            businesses.
          </p>
        </motion.div>
      </PageContainer>

      <PageContainer className="mt-11" size="lg">
        <div className="grid gap-5 overflow-hidden">
          <StoryRow direction="left" stories={stories} />
          <StoryRow direction="right" stories={stories.slice().reverse()} />
        </div>
      </PageContainer>
    </section>
  );
}
