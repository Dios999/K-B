import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Hammer, Droplet, MapPin, Calculator } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground blueprint-grid flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src="/images/KUoHx7Mh5taq.png" alt="Hero" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 border border-accent/30 rounded-sm" />
            <div className="absolute bottom-20 left-10 w-48 h-48 border border-accent/20 rounded-sm" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="dimension-marker mb-4">PRECISION CRAFTSMANSHIP</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Professional Kitchen & Bathroom Remodeling
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your kitchen and bathroom with expert craftsmanship. From cabinet installation to custom finishes, we deliver precision-engineered solutions tailored to your vision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setLocation("/intake")}
                  className="btn-primary inline-flex items-center gap-2 w-fit"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLocation("/services")}
                  className="btn-secondary inline-flex items-center gap-2 w-fit"
                >
                  View Services
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-16 md:py-24 border-t border-accent/20 bg-background/50">
          <div className="container">
            <div className="mb-12">
              <div className="dimension-marker mb-4">OUR EXPERTISE</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Comprehensive Remodeling Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                From kitchen cabinets to bathroom vanities, we handle every aspect of your remodeling project with precision and professionalism.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Kitchen Services Card */}
              <div
                onClick={() => setLocation("/services")}
                className="service-card cursor-pointer group"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Hammer className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Kitchen Services</h3>
                    <p className="text-sm text-muted-foreground">Professional kitchen remodeling</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Cabinet & Storage Solutions</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Countertops & Backsplash</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Sinks & Appliances</span>
                  </div>
                </div>

                <button className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explore Kitchen Services
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bathroom Services Card */}
              <div
                onClick={() => setLocation("/services")}
                className="service-card cursor-pointer group"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Droplet className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Bathroom Services</h3>
                    <p className="text-sm text-muted-foreground">Complete bathroom remodeling</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Vanity & Storage</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Flooring & Tiles</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Fixtures & Accessories</span>
                  </div>
                </div>

                <button className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explore Bathroom Services
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 border-t border-accent/20">
          <div className="container text-center">
            <div className="dimension-marker mb-4 justify-center">READY TO GET STARTED?</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Transform Your Space Today</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your kitchen or bathroom remodeling project. Share your vision and budget, and we'll provide a detailed quote.
            </p>
            <button
              onClick={() => setLocation("/intake")}
              className="btn-primary inline-flex items-center gap-2"
            >
              Submit Your Project
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
