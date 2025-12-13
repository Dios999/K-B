import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Hammer } from "lucide-react";
import { useLocation } from "wouter";

const kitchenServices = [
  {
    category: "Cabinet & Storage",
    items: [
      "Installation of pre-built kitchen cabinets",
      "Removal and replacement of existing cabinets",
      "Cabinet door and hinge repair or replacement",
      "Soft-close hinge and drawer slide installation",
      "Pantry shelving installation"
    ]
  },
  {
    category: "Countertops",
    items: [
      "Laminate countertop replacement",
      "Butcher block countertop installation",
      "Countertop removal and disposal",
      "Sealing and finishing butcher block surfaces",
      "(Stone, quartz, and granite installs excluded)"
    ]
  },
  {
    category: "Sinks & Fixtures",
    items: [
      "Drop-in sink replacement",
      "Faucet replacement",
      "Garbage disposal replacement",
      "Under-sink hardware upgrades",
      "Leak checks (no pipe re-routing)"
    ]
  },
  {
    category: "Backsplash & Wall Finishes",
    items: [
      "Tile backsplash installation",
      "Peel-and-stick backsplash installs",
      "Grout repair and sealing",
      "Caulking and waterproof sealing"
    ]
  },
  {
    category: "Appliances",
    items: [
      "Dishwasher installation and replacement",
      "Over-the-range microwave installation",
      "Range hood installation (non-ducted)",
      "Appliance removal and repositioning"
    ]
  }
];

export default function KitchenServices() {
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
          <div className="dimension-marker mb-4">KITCHEN SERVICES</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Professional Kitchen Remodeling
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Transform your kitchen with our comprehensive remodeling services. From cabinet installation to custom finishes, we deliver precision-engineered solutions that combine functionality with aesthetic appeal.
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
            {kitchenServices.map((service, idx) => (
              <div key={idx} className="service-card group">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 border-2 border-accent/40 rounded-sm flex items-center justify-center group-hover:border-accent transition-colors flex-shrink-0">
                    <Hammer className="w-6 h-6 text-accent" />
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
              We provide comprehensive kitchen remodeling services. From cabinet installation and countertop replacement to complete kitchen renovations, we handle every aspect of your project with expert craftsmanship and attention to detail.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-lg font-semibold text-accent mb-4">✓ Services Included</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>Cabinet and storage installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>Countertop replacement and finishing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>Sink and fixture upgrades</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>Backsplash and wall finishing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>Appliance installation and repositioning</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-destructive mb-4">✗ Services Excluded</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive font-bold">•</span>
                    <span>Electrical wiring and installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive font-bold">•</span>
                    <span>Plumbing re-routing or modifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive font-bold">•</span>
                    <span>Gas line work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive font-bold">•</span>
                    <span>Load-bearing wall modifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive font-bold">•</span>
                    <span>Permit-required structural work</span>
                  </li>
                </ul>
              </div>
            </div>
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
                <span className="text-muted-foreground">Dishwasher Installation</span>
                <span className="font-bold text-accent">$200 - $350</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-accent/20">
                <span className="text-muted-foreground">Backsplash (Small)</span>
                <span className="font-bold text-accent">$400 - $900</span>
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
