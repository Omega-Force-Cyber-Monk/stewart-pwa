import { useNavigate } from "react-router-dom";
import { useLanguage, type Language } from "../../i18n/LanguageProvider";

type MarketingLanguageSwitchProps = {
  englishPath?: string;
};

export function MarketingLanguageSwitch({ englishPath }: MarketingLanguageSwitchProps) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const selectedLanguage: Language = englishPath ? "en" : language;

  const selectLanguage = (next: Language) => {
    setLanguage(next);
    if (englishPath) navigate(next === "es" ? "/spanish" : englishPath);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 shadow-lg">
      <div
        role="group"
        aria-label="English / Español"
        className="inline-flex shrink-0 flex-wrap gap-1 rounded-lg border border-slate-400 bg-white p-1 text-xs text-slate-900"
      >
        {(["en", "es"] as const).map((value) => (
          <button
            key={value}
            type="button"
            lang={value}
            aria-pressed={selectedLanguage === value}
            onClick={() => selectLanguage(value)}
            className={`rounded px-2 py-1.5 font-semibold ${
              selectedLanguage === value ? "bg-green-700 text-white" : "hover:bg-slate-100"
            }`}
          >
            {value === "es" ? "Español" : "English"}
          </button>
        ))}
      </div>
    </div>
  );
}
