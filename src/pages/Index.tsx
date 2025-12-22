import WorkCalculator from "@/components/WorkCalculator";
import { Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen gradient-hero">
      <div className="container py-12 px-4 sm:px-6">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-glow mb-6">
            <Clock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            Work Hours Calculator
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Find out how many hours you need to work to afford your next purchase
          </p>
        </header>

        {/* Calculator */}
        <main>
          <WorkCalculator />
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-sm text-muted-foreground">
            Think before you buy. Time is money! 💰
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
