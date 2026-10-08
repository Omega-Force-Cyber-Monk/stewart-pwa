import { Link } from "react-router-dom";
import standardLogo from "../assets/logo_standard.png";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

function LegalPage({ title, lastUpdated, sections }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-[#040a23]">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="inline-flex items-center">
            <img src={standardLogo} alt="QuitTheApp" className="h-9 object-contain" />
          </Link>
          <Link
            to="/"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            Home
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 border-b border-slate-200 pb-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#15803d]">QuitTheApp</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#1a1f71] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm font-medium text-slate-500">Last Updated: {lastUpdated}</p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
              <h2 className="text-xl font-bold text-[#1a1f71]">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600 sm:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

const lastUpdated = "October 8, 2026";

const privacySections: LegalSection[] = [
  {
    title: "Information We Collect",
    body: [
      "We collect information you choose to provide, such as your name, email address, phone number, city, payment-related details handled by our payment providers, and business setup information submitted through QuitTheApp.",
      "We may also collect basic website usage information, device information, referral information, and attribution details such as campaign parameters when you visit our website.",
    ],
  },
  {
    title: "Phone Numbers and SMS Data",
    body: [
      "You may provide your phone number to receive the requested QuitTheApp Quick Start Guide or related checklist by text message.",
      "We may record SMS consent status, consent text version, consent timestamp, funnel source, phone number, delivery status, and opt-out activity where supported by our systems and service providers.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use information to provide requested guides, operate the website, process purchases, deliver account features, respond to support requests, improve our services, and communicate with users about their requests or purchases.",
    ],
  },
  {
    title: "SMS Communications",
    body: [
      "If you request a guide by text message, we may send the requested content to the phone number provided. Message and data rates may apply. Message frequency may vary.",
      "Marketing or promotional text messages are optional and require separate consent. Consent to marketing messages is not a condition of purchase.",
    ],
  },
  {
    title: "Consent and Opt-Out",
    body: [
      "You can opt out of SMS messages by replying STOP. You may also contact us using the information below for help with communication preferences.",
      "If you opt out, we may still send non-marketing messages when reasonably necessary to complete transactions, respond to requests, or provide service-related information where permitted.",
    ],
  },
  {
    title: "Data Sharing",
    body: [
      "We may share information with service providers that help us operate the website, process payments, deliver SMS messages, host services, provide analytics, support users, and maintain security.",
      "We do not sell SMS consent or phone number information. We may disclose information when required by law or to protect our rights, users, or services.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We use reasonable administrative, technical, and organizational safeguards designed to protect information. No website, network, or storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "Cookies and Analytics",
    body: [
      "We may use cookies, local storage, analytics tools, and similar technologies to remember preferences, understand website performance, measure marketing activity, and improve the user experience.",
    ],
  },
  {
    title: "Third-Party Services",
    body: [
      "QuitTheApp may use third-party providers for hosting, payments, SMS delivery, analytics, email, customer support, and related business operations. Those providers process information according to their own terms and privacy practices.",
    ],
  },
  {
    title: "Data Retention",
    body: [
      "We retain information for as long as reasonably needed to provide services, meet operational needs, maintain business records, comply with legal obligations, resolve disputes, and enforce agreements.",
    ],
  },
  {
    title: "User Rights",
    body: [
      "Depending on your location, you may have rights to request access, correction, deletion, or restriction of certain personal information. We may need to verify your request before responding.",
    ],
  },
  {
    title: "Children's Privacy",
    body: [
      "QuitTheApp is intended for adults and is not directed to children under 13. We do not knowingly collect personal information from children under 13.",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised Last Updated date.",
    ],
  },
  {
    title: "Contact Information",
    body: [
      "Questions about this Privacy Policy or privacy requests may be sent to QuitTheApp through the contact or support options available on our website.",
    ],
  },
];

const termsSections: LegalSection[] = [
  {
    title: "Acceptance of Terms",
    body: [
      "By accessing or using QuitTheApp, you agree to these Terms & Conditions. If you do not agree, do not use the website or services.",
    ],
  },
  {
    title: "Use of the Website",
    body: [
      "You may use the website for lawful purposes and in accordance with these terms. You agree not to interfere with the operation, security, or availability of the website.",
    ],
  },
  {
    title: "User Responsibilities",
    body: [
      "You are responsible for the accuracy of information you provide, maintaining access to your account, and complying with laws and regulations that apply to your transportation business.",
    ],
  },
  {
    title: "Purchases and Payments",
    body: [
      "Purchases are processed through our payment providers. Prices, offers, and included services are presented at checkout and may change for future purchases.",
    ],
  },
  {
    title: "Done For You Services",
    body: [
      "Done For You services depend on the information and materials you provide. Timelines and deliverables may vary based on completeness, responsiveness, and project requirements.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "QuitTheApp content, branding, templates, guides, website materials, and related intellectual property are owned by QuitTheApp or its licensors and may not be copied, resold, or redistributed except as permitted through the service.",
    ],
  },
  {
    title: "SMS Communications",
    body: [
      "Users may opt in to receive requested content, such as a Quick Start Guide, by SMS. Optional marketing or promotional SMS messages require separate consent.",
      "You can reply STOP to opt out. Message and data rates may apply.",
    ],
  },
  {
    title: "Third-Party Services",
    body: [
      "The service may connect to or rely on third-party tools, including payment processors, SMS providers, scheduling tools, hosting providers, and analytics services. We are not responsible for third-party services outside our control.",
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      "To the extent permitted by law, QuitTheApp is not liable for indirect, incidental, consequential, special, or punitive damages arising from use of the website or services.",
    ],
  },
  {
    title: "Disclaimers",
    body: [
      "QuitTheApp provides educational and business setup resources. We do not guarantee business results, revenue, customer acquisition, licensing outcomes, insurance availability, or legal compliance for your specific business.",
    ],
  },
  {
    title: "Termination",
    body: [
      "We may suspend or terminate access to the website or services if we believe these terms have been violated or if continued access could create risk for QuitTheApp, users, or service providers.",
    ],
  },
  {
    title: "Changes to Terms",
    body: [
      "We may update these Terms & Conditions from time to time. Updates will be posted on this page with a revised Last Updated date.",
    ],
  },
  {
    title: "Governing Terms",
    body: [
      "These terms are governed by the laws that apply to QuitTheApp's business operations, without regard to conflict of law rules. Any required venue or dispute process will be determined by applicable law and the specific circumstances of the dispute.",
    ],
  },
  {
    title: "Contact Information",
    body: [
      "Questions about these Terms & Conditions may be sent to QuitTheApp through the contact or support options available on our website.",
    ],
  },
];

export function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" lastUpdated={lastUpdated} sections={privacySections} />;
}

export function TermsPage() {
  return <LegalPage title="Terms & Conditions" lastUpdated={lastUpdated} sections={termsSections} />;
}
