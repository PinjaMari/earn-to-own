import { Utensils, Shirt, Smartphone, Coffee, Ticket } from "lucide-react";
import { Language, Currency, currencies, translations, productSuggestions } from "@/lib/translations";

interface Props {
  language: Language;
  currency: Currency;
  onSelect: (price: number, name: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'Restaurant Meal': <Utensils className="w-4 h-4" />,
  'Ravintola-ateria': <Utensils className="w-4 h-4" />,
  'Nice Shirt': <Shirt className="w-4 h-4" />,
  'Hieno Paita': <Shirt className="w-4 h-4" />,
  'New Phone': <Smartphone className="w-4 h-4" />,
  'Uusi Puhelin': <Smartphone className="w-4 h-4" />,
  'Coffee': <Coffee className="w-4 h-4" />,
  'Kahvi': <Coffee className="w-4 h-4" />,
  'Concert Ticket': <Ticket className="w-4 h-4" />,
  'Konserttilippu': <Ticket className="w-4 h-4" />,
};

const ProductSuggestions = ({ language, currency, onSelect }: Props) => {
  const t = translations[language];
  const suggestions = productSuggestions[language];
  const currencySymbol = currencies[currency].symbol;

  return (
    <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.05s" }}>
      <p className="text-sm font-semibold text-muted-foreground mb-3 ml-1">{t.productSuggestions}</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((product) => (
          <button
            key={product.name}
            onClick={() => onSelect(product.price, product.name)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-card hover:bg-accent border border-border/50 rounded-xl text-sm font-medium text-foreground transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <span className="text-primary">{iconMap[product.name]}</span>
            <span>{product.name}</span>
            <span className="text-muted-foreground">{currencySymbol}{product.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSuggestions;
