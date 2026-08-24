import React from 'react';
import { PageContainer } from '../layout/PageContainer';
import { cn } from '../../lib/cn';

export interface ExperienceCardData {
  image: string;
  icon?: React.ReactNode;
  titlePrefix?: string;
  titleHighlight: string;
  titleSuffix?: string;
  description: string;
}

interface ExperienceSectionProps {
  title: string;
  titleClassName?: string;
  highlightClassName?: string;
  cards: ExperienceCardData[];
}

export function ExperienceSection({
  title,
  titleClassName = "text-[#1a1f71]",
  highlightClassName = "text-green-600",
  cards
}: ExperienceSectionProps) {
  return (
    <section className="bg-white py-3" id="experience">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-6 lg:p-10 bg-white">
          <h2 className={cn("text-xl md:text-2xl font-extrabold text-center mb-10 uppercase tracking-wider", titleClassName)}>
            {title}
          </h2>

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-0 lg:divide-x divide-slate-100 w-full">
            {cards.map((card, idx) => (
              <div key={idx} className="flex flex-col w-full flex-1 lg:px-8 first:pl-0 last:pr-0">
                <div className="w-full mb-8">
                  <img 
                    src={card.image} 
                    alt="Experience" 
                    loading="lazy" 
                    className="w-full h-52 object-cover object-center rounded-xl shadow-sm" 
                  />
                </div>
                
                <div className="flex flex-row items-start gap-4 flex-1">
                  {card.icon && (
                    <div className="shrink-0 flex items-center justify-center mt-1">
                      {card.icon}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h3 className="text-lg md:text-xl font-black uppercase leading-tight mb-4">
                      {card.titlePrefix && <span className="text-[#1a1f71]">{card.titlePrefix}</span>}
                      <span className={highlightClassName}>{card.titleHighlight}</span>
                      {card.titleSuffix && <span className="text-[#1a1f71]">{card.titleSuffix}</span>}
                    </h3>
                    <p className="text-[#1a1f71] font-medium leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
