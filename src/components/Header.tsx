import { Mail, Phone } from "lucide-react";
import { useLocation } from "wouter";

export default function Header() {
  const [location, setLocation] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 border-b border-accent/20 bg-background/95 backdrop-blur-sm">
      {/* Top Contact Bar */}
      <div className="bg-accent/5 border-b border-accent/10 px-4 py-2">
        <div className="container flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a
              href="tel:647-572-2521"
              className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>647-572-2521</span>
            </a>
            <a
              href="mailto:diosproductions03@gmail.com"
              className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>diosproductions03@gmail.com</span>
            </a>
          </div>
          <div className="text-muted-foreground">
            <span>Mon-Fri: 9AM-6PM EST</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container py-4 flex items-center justify-between">
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 font-bold text-lg tracking-tight hover:text-accent transition-colors"
        >
          <div className="w-8 h-8 border-2 border-accent rounded-sm flex items-center justify-center">
            <span className="text-xs font-bold">K&B</span>
          </div>
          <span>Kitchen & Bath Specialist</span>
        </button>

        <div className="flex items-center gap-8">
          <button
            onClick={() => setLocation("/services")}
            className={`font-semibold transition-colors ${
              isActive("/services")
                ? "text-accent"
                : "text-foreground hover:text-accent"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setLocation("/estimate")}
            className={`font-semibold transition-colors ${
              isActive("/estimate")
                ? "text-accent"
                : "text-foreground hover:text-accent"
            }`}
          >
            Estimate
          </button>
          <button
            onClick={() => setLocation("/intake")}
            className="btn-primary text-sm"
          >
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}
