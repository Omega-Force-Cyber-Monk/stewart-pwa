import logoWeb from "../../assets/logoWeb.png";
import { PageContainer } from "../layout/PageContainer";

const footerLinks = ["Privacy Policy", "Terms of Service", "Contact Support", "Contact"];

export function SiteFooter() {
  return (
    <footer className="bg-white py-10">
      <PageContainer size="lg">
        <div className="grid justify-items-center gap-6 text-center">
          <img alt="QuitTheApp" className="h-9 w-auto object-contain" src={logoWeb} />

          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <a
                className="cursor-pointer text-sm font-medium text-[#101010] transition hover:text-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
                href="#contact"
                key={link}
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="h-px w-full bg-[#BDBDBD]" />

          <p className="text-sm font-medium text-[#101010]">
            © 2026 QuitTheApp. All Rights Reserved. Own Your Work. Keep What You Earn.
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
