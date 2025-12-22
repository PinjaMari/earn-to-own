import { Heart, Trash2, Clock } from "lucide-react";
import { Language, Currency, currencies, translations } from "@/lib/translations";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  hoursNeeded: number;
}

interface Props {
  language: Language;
  currency: Currency;
  items: WishlistItem[];
  onRemove: (id: string) => void;
  onSelect: (item: WishlistItem) => void;
}

const Wishlist = ({ language, currency, items, onRemove, onSelect }: Props) => {
  const t = translations[language];
  const currencySymbol = currencies[currency].symbol;

  if (items.length === 0) {
    return (
      <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 mt-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">{t.wishlist}</h3>
        </div>
        <p className="text-sm text-muted-foreground text-center py-4">{t.emptyWishlist}</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 mt-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">{t.wishlist}</h3>
        <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          {items.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id}
            className="flex items-center gap-3 p-3 bg-accent/50 rounded-xl hover:bg-accent transition-colors cursor-pointer group"
            onClick={() => onSelect(item)}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{item.name}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{currencySymbol}{item.price.toFixed(2)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.hoursNeeded.toFixed(1)}h
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item.id);
              }}
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              aria-label={t.remove}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
