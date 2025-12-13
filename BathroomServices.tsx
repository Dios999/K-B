import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Droplet } from "lucide-react";
import { useLocation } from "wouter";

const bathroomServices = [
  {
    category: "Vanity & Storage",
    items: [
      "Bathroom vanity installation or replacement",
      "Medicine cabinet installation",
      "Mirror mounting",
      "Floating shelf installation"
    ]
  },
  {
    category: "Toilets & Fixtures",
    items: [
      "Toilet replacement",
      "Toilet seat replacement",
      "Faucet replacement",
      "Showerhead replacement",
      "Handheld shower installation"
    ]
  },
  {
    category: "Flooring & Walls",
    items: [
      "Vinyl plank (LVP) bathroom flooring",
      "Peel-and-stick tile installation",
      "Tile repair and replacement",
      "Grout repair and sealing"
    ]
  },
  {
    category: "Sealing & Water Protection",
    items: [
      "Tub and shower caulking",
      "Sink and countertop sealing",
      "Mold-resistant silicone replacement"
    ]
  },
  {
    category: "Cosmetic Bathroom Refreshes",
    items: [
      "Small bathroom paint jobs",
      "Hardware updates (towel bars, hooks, paper holders)",
      "Fixture swaps to modern finishes"
    ]
  }
];

export default function BathroomServices() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground blueprint-grid">
      {/* Navigation */}
      <nav className="border-b border-accent/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-bold text-lg tracking-tight">Kitchen & Bath Specialist</span>
          </button>
          <button
            onClick={() => setLocation("/intake")}
            className="btn-primary text-sm"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Header Section */}
      <section className="py-16 md:py-24 border-b border-accent/20">
        <div className="container max-w-4xl">
          <div className="dimension-marker mb-4">BATHROOM SERVICES</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Professional Bathroom Remodeling
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Create your dream bathroom with our comprehensive remodeling services. From vanity installation to complete cosmetic refreshes, we deliver precision craftsmanship that transforms your space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setLocation("/intake")}
              className="btn-primary flex items-center justify-center gap-2"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLocation("/estimate")}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              Calculate Estimate
            </button>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <div className="dimension-marker mb-4">SERVICE OFFERINGS</div>
            <h2 className="text-4xl font-bold">What We Offer</h2>
          </div>

          <div className="space-y-8">
            {bathroomServices.map((service, idx) => (
              <div key={idx} className="service-card group">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 border-2 border-accent/40 rounded-sm flex items-center justify-center group-hover:border-accent transition-colors flex-shrink-0">
                    <Droplet className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold">{service.category}</h3>
                </div>
                <ul className="space-y-3 ml-16">
                  {service.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Scope */}
      <section className="py-16 md:py-24 border-t border-accent/20 bg-card/50">
        <div className="container max-w-4xl">
          <div className="blueprint-frame p-8">
            <h2 className="text-3xl font-bold mb-6 text-accent">Service Scope & Specifications</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We provide comprehensive bathroom remodeling services. From vanity installation and fixture upgrades to complete bathroom renovations, we handle every aspect of your project with expert craftsmanship and attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 border-t border-accent/20">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <div className="dimension-marker mb-4">PRICING</div>
            <h2 className="text-4xl font-bold">Transparent Pricing</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="service-card">
              <h3 className="text-xl font-bold mb-4">Hourly Rates</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-accent/20">
                  <span className="text-muted-foreground">Standard Rate</span>
                  <span className="font-bold text-accent">$75 - $110/hr</span>
                </div>
              </div>
            </div>

            <div className="service-card">
              <h3 className="text-xl font-bold mb-4">Project-Based Rates</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-accent/20">
                  <span className="text-muted-foreground">Half-Day (4 hrs)</span>
                  <span className="font-bold text-accent">$300 - $400</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-accent/20">
                  <span className="text-muted-foreground">Full-Day (8 hrs)</span>
                  <span className="font-bold text-accent">$600 - $750</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 service-card">
            <h3 className="text-xl font-bold mb-6">Common Flat-Rate Services</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex justify-between items-center pb-4 border-b border-accent/20">
                <span className="text-muted-foreground">Toilet Replacement</span>
                <span className="font-bold text-accent">$150 - $250</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-accent/20">
                <span className="text-muted-foreground">Vanity Installation</span>
                <span className="font-bold text-accent">$300 - $600</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-t border-accent/20">
        <div className="container max-w-2xl text-center">
          <div className="dimension-marker mb-4">NEXT STEPS</div>
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Use our interactive tools to estimate costs or submit your project details for a professional quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setLocation("/intake")}
              className="btn-primary flex items-center justify-center gap-2"
            >
              Submit Project
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLocation("/estimate")}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              Calculate Estimate
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/20 py-12 bg-background/50">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Kitchen & Bath Specialist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
