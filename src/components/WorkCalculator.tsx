import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Clock, DollarSign, ShoppingBag, Briefcase, Coffee, Calendar } from "lucide-react";

const WorkCalculator = () => {
  const [hourlyWage, setHourlyWage] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");

  const calculations = useMemo(() => {
    const wage = parseFloat(hourlyWage) || 0;
    const price = parseFloat(productPrice) || 0;

    if (wage <= 0 || price <= 0) {
      return null;
    }

    const hoursNeeded = price / wage;
    const daysNeeded = hoursNeeded / 8; // 8-hour workday
    const weeksNeeded = hoursNeeded / 40; // 40-hour work week
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

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Input Section */}
      <div className="space-y-5 mb-8">
        <div className="relative animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <label className="block text-sm font-semibold text-muted-foreground mb-2 ml-1">
            Your Hourly Wage
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
              <DollarSign className="w-5 h-5" />
            </div>
            <Input
              type="number"
              placeholder="25.00"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(e.target.value)}
              className="pl-12"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <label className="block text-sm font-semibold text-muted-foreground mb-2 ml-1">
            Product Price
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
              <p className="text-sm font-medium text-muted-foreground mb-1">You need to work</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-gradient">
                  {formatNumber(calculations.hours)}
                </span>
                <span className="text-2xl font-semibold text-foreground/70">
                  {calculations.hours === 1 ? "hour" : "hours"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                to afford this purchase
              </p>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              icon={<Coffee className="w-4 h-4" />}
              value={formatNumber(calculations.minutes, 0)}
              label="minutes"
              delay="0.1s"
            />
            <StatCard
              icon={<Briefcase className="w-4 h-4" />}
              value={formatNumber(calculations.days)}
              label="work days"
              delay="0.2s"
            />
            <StatCard
              icon={<Calendar className="w-4 h-4" />}
              value={formatNumber(calculations.weeks)}
              label="weeks"
              delay="0.3s"
            />
          </div>

          {/* Motivation Message */}
          <div className="text-center py-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-muted-foreground">
              {calculations.hours < 1 && "🎉 Quick win! Less than an hour of work!"}
              {calculations.hours >= 1 && calculations.hours < 8 && "💪 A day's work or less – totally doable!"}
              {calculations.hours >= 8 && calculations.hours < 40 && "📅 A few days of hustle will get you there!"}
              {calculations.hours >= 40 && calculations.hours < 160 && "🎯 A solid goal – keep grinding!"}
              {calculations.hours >= 160 && "🚀 Big purchase! Maybe start a savings plan?"}
            </p>
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
            Enter your wage and product price<br />to see the calculation
          </p>
        </div>
      )}
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
