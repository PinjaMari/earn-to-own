import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Clock, ShoppingBag, Briefcase, Coffee, Calendar, Heart, Plus } from "lucide-react";
import { Language, Currency, currencies, translations } from "@/lib/translations";
import ProgressBar from "./ProgressBar";
import Wishlist, { WishlistItem } from "./Wishlist";
import ProductSuggestions from "./ProductSuggestions";
import LanguageCurrencySelector from "./LanguageCurrencySelector";

const WorkCalculator = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [hourlyWage, setHourlyWage] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const t = translations[language];
  const currencySymbol = currencies[currency].symbol;

  const calculations = useMemo(() => {
    const wage = parseFloat(hourlyWage) || 0;
    const price = parseFloat(productPrice) || 0;

    if (wage <= 0 || price <= 0) {
      return null;
    }

    const hoursNeeded = price / wage;
    const daysNeeded = hoursNeeded / 8;
    const weeksNeeded = hoursNeeded / 40;
    const minutesNeeded = hoursNeeded * 60;

    return {
      hours: hoursNeeded,
      days: daysNeeded,
      weeks: weeksNeeded,
      minutes: minutesNeeded,
    };
  }, [hourlyWage, productPrice]);

  const formatNumber = (num: number, decimals: number = 1) => {
    if (num < 0.1) return num.toFixed(2);
    if (num < 1) return num.toFixed(1);
    return num.toFixed(decimals);
  };

  const getMotivationMessage = () => {
    if (!calculations) return "";
    if (calculations.hours < 1) return t.quickWin;
    if (calculations.hours < 8) return t.dayWork;
    if (calculations.hours < 40) return t.fewDays;
    if (calculations.hours < 160) return t.solidGoal;
    return t.bigPurchase;
  };

  const handleProductSelect = (price: number, name: string) => {
    setProductPrice(price.toString());
    setProductName(name);
  };

  const addToWishlist = () => {
    if (!calculations || !productName.trim()) return;
    
    const newItem: WishlistItem = {
      id: Date.now().toString(),
      name: productName.trim(),
      price: parseFloat(productPrice),
      hoursNeeded: calculations.hours,
    };
    
    setWishlist((prev) => [...prev, newItem]);
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const selectWishlistItem = (item: WishlistItem) => {
    setProductPrice(item.price.toString());
    setProductName(item.name);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Language & Currency Selector */}
      <LanguageCurrencySelector
        language={language}
        currency={currency}
        onLanguageChange={setLanguage}
        onCurrencyChange={setCurrency}
      />

      {/* Product Suggestions */}
      <ProductSuggestions
        language={language}
        currency={currency}
        onSelect={handleProductSelect}
      />

      {/* Input Section */}
      <div className="space-y-5 mb-8">
        <div className="relative animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <label className="block text-sm font-semibold text-muted-foreground mb-2 ml-1">
            {t.hourlyWage}
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-medium">
              {currencySymbol}
            </div>
            <Input
              type="number"
              placeholder="25.00"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(e.target.value)}
              className="pl-10"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="relative animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <label className="block text-sm font-semibold text-muted-foreground mb-2 ml-1">
            {t.productName}
          </label>
          <Input
            type="text"
            placeholder="iPhone 15 Pro"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <label className="block text-sm font-semibold text-muted-foreground mb-2 ml-1">
            {t.productPrice}
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <Input
              type="number"
              placeholder="499.99"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="pl-12"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      {calculations && (
        <div className="space-y-4 animate-scale-in">
          {/* Main Result */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <p className="text-sm font-medium text-muted-foreground mb-1">{t.youNeedToWork}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-gradient">
                  {formatNumber(calculations.hours)}
                </span>
                <span className="text-2xl font-semibold text-foreground/70">
                  {calculations.hours === 1 ? t.hour : t.hours}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {t.toAfford}
              </p>
            </div>
            
            {/* Add to Wishlist Button */}
            {productName.trim() && (
              <button
                onClick={addToWishlist}
                className="absolute top-4 right-4 p-2 bg-accent hover:bg-primary/10 text-primary rounded-xl transition-colors"
                title={t.addToWishlist}
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              icon={<Coffee className="w-4 h-4" />}
              value={formatNumber(calculations.minutes, 0)}
              label={t.minutes}
              delay="0.1s"
            />
            <StatCard
              icon={<Briefcase className="w-4 h-4" />}
              value={formatNumber(calculations.days)}
              label={t.workDays}
              delay="0.2s"
            />
            <StatCard
              icon={<Calendar className="w-4 h-4" />}
              value={formatNumber(calculations.weeks)}
              label={t.weeks}
              delay="0.3s"
            />
          </div>

          {/* Progress Bar */}
          <ProgressBar language={language} hoursNeeded={calculations.hours} />

          {/* Motivation Message */}
          <div className="text-center py-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-muted-foreground">{getMotivationMessage()}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!calculations && (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4 animate-float">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground">
            {t.enterDetails}<br />{t.toSeeCalculation}
          </p>
        </div>
      )}

      {/* Wishlist */}
      <Wishlist
        language={language}
        currency={currency}
        items={wishlist}
        onRemove={removeFromWishlist}
        onSelect={selectWishlistItem}
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: string;
}

const StatCard = ({ icon, value, label, delay }: StatCardProps) => (
  <div
    className="bg-card rounded-xl p-4 shadow-md border border-border/50 text-center animate-fade-in hover:shadow-lg transition-shadow duration-200"
    style={{ animationDelay: delay }}
  >
    <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-primary mb-2">
      {icon}
    </div>
    <p className="text-xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

export default WorkCalculator;
