import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground blueprint-grid flex flex-col items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-accent mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <button
          onClick={() => setLocation("/")}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Home
        </button>
      </div>
    </div>
  );
}
