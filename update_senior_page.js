const fs = require('fs');
const path = './src/pages/SeniorPage.tsx';

let content = fs.readFileSync(path, 'utf8');

// 1. Add missing icons to imports
content = content.replace(
  /import \{\s*ArrowRight,/,
  'import { ArrowRight, UserCheck, Car, HeartHandshake,'
);

// 2. Remove ComparisonSection from rendering
content = content.replace(/<ComparisonSection \/>\n\s*<WhyWinSection \/>/, '<YouMayAlreadyHaveSection />');

// 3. Remove ComparisonSection and WhyWinSection code and replace with YouMayAlreadyHaveSection
const comparisonRegex = /function ComparisonSection\(\) \{[\s\S]*?\}\n\nfunction WhyWinSection\(\) \{[\s\S]*?\}\n\nfunction HowItWorksSection/m;

const newSection = `function YouMayAlreadyHaveSection() {
  const leftItems = [
    { icon: UserCheck, leftText: "Life Experience", rightText: "Professional Service" },
    { icon: Users, leftText: "Relationships", rightText: "First Customers" },
    { icon: HeartHandshake, leftText: "Community Network", rightText: "Referrals" },
    { icon: ShieldCheck, leftText: "Reliability & Trust", rightText: "Repeat Clients" },
    { icon: Car, leftText: "Vehicle You Own", rightText: "A Strong Starting Point" },
    { icon: Clock, leftText: "Available Time", rightText: "Flexible Business on Your Terms" },
  ];

  const rightItems = [
    { icon: UserCheck, title: "Start Small", description: "Begin with a few rides and grow over time." },
    { icon: CalendarDays, title: "Work Your Way", description: "Choose the days, times and service areas that fit your life." },
    { icon: Users, title: "Build Relationships", description: "Great service creates repeat customers and referrals." },
    { icon: TrendingUp, title: "Create Something That Lasts", description: "Build a business asset that belongs to you." },
  ];

  return (
    <section className="bg-[#fafafa] py-8" id="you-may-already-have">
      <PageContainer size="full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Card */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 lg:p-8">
            <h2 className="text-[#1a1f71] font-extrabold text-[1.1rem] sm:text-xl uppercase tracking-wide mb-8">
              YOU MAY ALREADY HAVE MORE OF WHAT YOU NEED THAN YOU REALIZE.
            </h2>
            <div className="space-y-4">
              {leftItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-[#15803d]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 font-bold text-[#1a1f71] text-sm flex items-center">
                    <span className="w-1/2">{item.leftText}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 mx-2 shrink-0" />
                    <span className="w-1/2">{item.rightText}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 lg:p-8">
            <h2 className="text-[#1a1f71] font-extrabold text-[1.1rem] sm:text-xl uppercase tracking-wide mb-2">
              YOU DON'T NEED ANOTHER JOB.
            </h2>
            <h3 className="text-[#15803d] font-extrabold text-[1.1rem] sm:text-xl uppercase tracking-wide mb-4">
              MAYBE YOU NEED SOMETHING OF YOUR OWN.
            </h3>
            <p className="text-[#1a1f71] text-sm font-medium mb-8 leading-relaxed">
              Your next chapter can still include income, purpose, relationships and growth — without going back to working for someone else.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {rightItems.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <item.icon className="w-8 h-8 text-[#15803d] mb-3" strokeWidth={2} />
                  <h4 className="font-bold text-[#1a1f71] text-sm mb-2">{item.title}</h4>
                  <p className="text-[#1a1f71] text-xs font-medium leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function HowItWorksSection`;

content = content.replace(comparisonRegex, newSection);

// 4. Update HowItWorksSection description for step 3
content = content.replace(
  /"Follow the step-by-step guidance\\nto create your booking flow\\nand personalized selling page\.\\nPrefer assistance\? Add the\\noptional \$199 We Do It for You upgrade\."/,
  '"Follow the step-by-step guidance\\nto create your booking flow and\\npersonalized selling page. Want\\nhelp getting launch ready? Add\\nthe optional $199 Done For You\\nLaunch Upgrade."'
);

// 5. Replace ReviewsSection with ProvenModelSection
content = content.replace(/<ReviewsSection \/>/, '<ProvenModelSection />');

const reviewsRegex = /function ReviewsSection\(\) \{[\s\S]*?\}\n\nfunction FaqSection/m;
const provenModelSection = `function ProvenModelSection() {
  const models = [
    {
      image: chrisImage,
      subtitle: "STARTED WITH JUST 3 BOOKINGS.",
      text: "What began as a handful of airport rides became the foundation of a real business.",
    },
    {
      image: dougImage,
      subtitle: "NEARLY 6,000 SCHEDULED RIDES IN A SINGLE YEAR.",
      text: "Direct clients became repeat riders. Repeat riders created referrals. Systems were built and refined along the way.",
    },
    {
      image: naylinImage,
      subtitle: "QUITTHEAPP WAS BUILT FROM WHAT HAPPENED IN BETWEEN.",
      text: "You don't need thousands of customers to begin. You need a place to start, a system to follow, and a simple process to launch.",
    },
  ];

  return (
    <section className="bg-white py-8" id="proven-model">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 lg:p-8">
          <h2 className="text-[1.1rem] sm:text-xl font-extrabold text-[#1a1f71] mb-8 uppercase tracking-wide">
            START WITH A PROVEN AIRPORT TRANSPORTATION MODEL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {models.map((model, idx) => (
              <div key={idx} className="flex flex-col">
                <img src={model.image} alt="Driver" className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm" />
                <h4 className="text-[#15803d] font-bold text-sm mb-2 uppercase leading-snug tracking-wide">{model.subtitle}</h4>
                <p className="text-[#1a1f71] text-xs font-medium leading-relaxed">{model.text}</p>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function FaqSection`;

content = content.replace(reviewsRegex, provenModelSection);

// 6. Update FaqSection background to match the style (light grey background if needed, but white is fine). The image shows it white.
// Let's modify FaqSection to have questions with a green Q circle, wait, it already has that!
// We'll leave FaqSection mostly as is, maybe just adjust the list of questions. The user didn't ask to change the questions, just "that section will be full width".
// Actually, it already is full-width in the current code. I'll just change the layout of FooterCTASection.

// 7. Update FooterCTASection
const footerRegex = /function FooterCTASection\(\{[^}]*\}\) \{[\s\S]*?\n\}/m;
const newFooter = `function FooterCTASection({ openPricingModal }: { openPricingModal: () => void }) {
  const { accessToken, user } = useAppSelector((state) => state.auth);

  const benefits = [
    "One-time payment",
    "No monthly platform fees",
    "Built for 50+ drivers",
    "Real human support",
  ];

  return (
    <section className="bg-[#040a23] py-10 mt-8" id="footer-cta">
      <PageContainer size="full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 items-center border-b border-slate-800 pb-8">
          {/* Left Column */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-white leading-tight uppercase mb-2">
              START MY <br />
              <span className="text-[#39b54a]">PRIVATE TRANSPORTATION BUSINESS™</span>
            </h3>
            <div className="flex items-start gap-4 mt-4">
              <div className="shrink-0 p-2 bg-[#39b54a]/10 rounded-full border border-[#39b54a]/30">
                <UserCheck className="w-6 h-6 text-[#39b54a]" />
              </div>
              <p className="text-slate-300 text-sm leading-relaxed max-w-[250px]">
                Build a professional business around your experience, relationships and the life you want to live.
              </p>
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-3">
              <span className="text-[2.5rem] font-bold text-[#39b54a]">$495</span>
              <span className="text-white font-bold text-lg">One-time payment</span>
            </div>
            <p className="text-slate-300 text-sm mt-1">
              Includes the complete QuitTheApp DIY launch system.
            </p>
            <p className="text-slate-300 text-sm mt-1 mb-4">
              Want help getting launch ready? Add the <span className="text-[#39b54a] font-bold">$199 Done For You Launch Upgrade.</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center text-slate-300 text-sm font-medium">
                  <div className="bg-[#39b54a] rounded-full p-[2px] mr-2 shrink-0">
                    <Check className="w-3 h-3 text-[#040a23] stroke-[4]" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-start lg:items-end w-full">
            <button
              onClick={openPricingModal}
              className="cursor-pointer w-full bg-[#39b54a] hover:bg-[#2e9c3c] text-white font-extrabold py-4 px-6 rounded-md transition-colors flex items-center justify-between group text-base mb-4"
            >
              <span className="text-center w-full">Start Your Business</span>
              <div className="bg-white rounded-full p-1 ml-4 shrink-0 transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4 text-[#39b54a] stroke-[3]" />
              </div>
            </button>
            <div className="w-full">
               <PaymentBadges justify="center" />
            </div>
            <div className="w-full text-center mt-2">
               <span className="text-slate-500 text-[10px]">Secure payment processed by <strong>stripe</strong></span>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}`;

content = content.replace(footerRegex, newFooter);

fs.writeFileSync(path, content);
console.log('Update complete');
