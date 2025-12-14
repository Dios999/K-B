import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, MapPin, CheckCircle, AlertCircle } from "lucide-react";

export default function ServiceMap() {
  const [, setLocation] = useLocation();
  const [address, setAddress] = useState("");
  const [verified, setVerified] = useState<boolean | null>(null);

  // Mock service areas - in production, this would be from the backend
  const serviceAreas = [
    "Downtown Metro Area",
    "Suburban Districts",
    "Residential Communities",
    "Commercial Zones"
  ];

  const handleVerifyLocation = () => {
    // Mock verification logic
    if (address.trim().length > 0) {
      // Simulate 50% verification rate for demo
      setVerified(Math.random() > 0.5);
    }
  };

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

      {/* Map Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <div className="dimension-marker mb-4">SERVICE COVERAGE</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Service Area Map</h1>
            <p className="text-lg text-muted-foreground">
              Verify that we serve your location. Enter your address to check if you're in our service area.
            </p>
          </div>

          {/* Location Verification */}
          <div className="service-card mb-8">
            <label className="tech-label mb-4 block">Verify Your Location</label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter your address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleVerifyLocation()}
                className="form-input flex-1"
              />
              <button
                onClick={handleVerifyLocation}
                className="btn-primary px-6"
              >
                Verify
              </button>
            </div>
          </div>

          {/* Verification Result */}
          {verified !== null && (
            <div className={`service-card mb-8 border-accent/50 ${verified ? "bg-accent/5" : "bg-destructive/5"}`}>
              <div className="flex items-start gap-4">
                {verified ? (
                  <>
                    <CheckCircle className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-accent mb-2">Great! We Serve Your Area</h3>
                      <p className="text-muted-foreground mb-4">
                        Your location is within our service area. We'd love to help with your kitchen or bathroom project!
                      </p>
                      <button
                        onClick={() => setLocation("/intake")}
                        className="btn-primary text-sm"
                      >
                        Submit Your Project
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-destructive mb-2">Outside Service Area</h3>
                      <p className="text-muted-foreground">
                        Unfortunately, this location is outside our current service area. However, we may be able to coordinate with local professionals. Please contact us to discuss options.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Map Visualization */}
          <div className="service-card mb-8">
            <h2 className="text-2xl font-bold mb-6">Primary Service Areas</h2>
            <div className="bg-background/50 rounded-sm p-8 border border-accent/20 mb-6">
              <div className="w-full h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-accent/40 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Interactive map visualization would display here
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    (Google Maps integration available in full deployment)
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {serviceAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-background/50 rounded-sm border border-accent/20">
                  <div className="w-3 h-3 bg-accent rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service Radius Information */}
          <div className="blueprint-frame p-8">
            <h3 className="text-xl font-bold mb-4 text-accent">Coverage Information</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our service area covers the metropolitan region and surrounding suburban communities. We typically serve locations within a 30-minute drive from our base of operations.
              </p>
              <p>
                For projects outside our primary service area, we can often arrange coordination with trusted local contractors. Contact us to discuss your specific location.
              </p>
              <p className="text-sm">
                Service availability may vary based on project scope and timeline. We'll confirm coverage when you submit your project details.
              </p>
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
            Submit your project details and we'll confirm service availability and provide a detailed estimate.
          </p>
          <button
            onClick={() => setLocation("/intake")}
            className="btn-primary inline-flex items-center gap-2"
          >
            Submit Your Project
          </button>
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
