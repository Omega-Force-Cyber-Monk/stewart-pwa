import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoWeb from "../../assets/logoWeb.png";
import { cn } from "../../lib/cn";
import { PageContainer } from "./PageContainer";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "What's Included", href: "#whats-included" },
    { label: "Who It's For", href: "#who-its-for" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent",
        isScrolled ? "py-3 shadow-sm backdrop-blur-sm" : "py-5",
      )}
    >
      <PageContainer size="full">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <img src={logoWeb} alt="QuitTheApp Logo" className="h-10 w-auto" />
          </Link>

          {/* Right Section: Nav + CTA */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-white text-sm font-semibold tracking-wide hover:text-[#f42661] transition-colors",
                    isScrolled && "text-slate-300",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button className="bg-[#f42661] hover:bg-[#d91950] text-white font-bold py-2.5 px-6 rounded-md transition-colors text-sm shadow-lg shadow-[#f42661]/20">
              Start My Business — $495
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </PageContainer>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0b0f19] border-t border-slate-800 shadow-xl">
          <nav className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-lg font-semibold hover:text-[#f42661] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button className="bg-[#f42661] hover:bg-[#d91950] text-white font-bold py-3 px-6 rounded-md transition-colors w-full mt-4">
              Start My Business — $495
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
