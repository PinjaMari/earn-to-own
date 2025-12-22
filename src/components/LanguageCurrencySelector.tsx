import { Globe, Coins } from "lucide-react";
import { Language, Currency, currencies, translations } from "@/lib/translations";

interface Props {
  language: Language;
  currency: Currency;
  onLanguageChange: (lang: Language) => void;
  onCurrencyChange: (curr: Currency) => void;
}

const LanguageCurrencySelector = ({ language, currency, onLanguageChange, onCurrencyChange }: Props) => {
  const t = translations[language];

  return (
    <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
      {/* Language Selector */}
      <div className="flex items-center gap-2 bg-card rounded-xl px-3 py-2 border border-border/50 shadow-sm">
        <Globe className="w-4 h-4 text-primary" />
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer"
        >
          <option value="en">English</option>
          <option value="fi">Suomi</option>
          <option value="sv">Svenska</option>
          <option value="de">Deutsch</option>
          <option value="es">Español</option>
          <option value="pl">Polski</option>
        </select>
      </div>

      {/* Currency Selector */}
      <div className="flex items-center gap-2 bg-card rounded-xl px-3 py-2 border border-border/50 shadow-sm">
        <Coins className="w-4 h-4 text-primary" />
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value as Currency)}
          className="bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer"
        >
          {Object.entries(currencies).map(([code, { symbol, name }]) => (
            <option key={code} value={code}>
              {symbol} {code}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageCurrencySelector;
