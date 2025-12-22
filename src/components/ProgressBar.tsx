import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Language, translations } from "@/lib/translations";

interface Props {
  language: Language;
  hoursNeeded: number;
}

const ProgressBar = ({ language, hoursNeeded }: Props) => {
  const t = translations[language];
  const [hoursWorked, setHoursWorked] = useState<string>("0");
  
  const worked = parseFloat(hoursWorked) || 0;
  const percentage = Math.min((worked / hoursNeeded) * 100, 100);
  const remaining = Math.max(hoursNeeded - worked, 0);

  return (
    <div className="bg-card rounded-2xl p-5 shadow-lg border border-border/50 mt-4 animate-fade-in" style={{ animationDelay: "0.35s" }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-muted-foreground">{t.progress}</p>
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground">{t.hoursWorked}:</label>
          <Input
            type="number"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(e.target.value)}
            className="w-20 h-8 text-sm"
            min="0"
            step="0.5"
          />
        </div>
      </div>
      
      {/* Progress Track */}
      <div className="relative h-6 bg-accent rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 gradient-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-foreground drop-shadow-sm">
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
      
      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>{worked.toFixed(1)}h {t.hours}</span>
        <span>{remaining.toFixed(1)}h {t.hours} left</span>
      </div>
      
      {/* Milestone markers */}
      <div className="relative mt-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
