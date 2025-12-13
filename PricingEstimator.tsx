import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingEstimator() {
  const [, setLocation] = useLocation();
  const [estimateType, setEstimateType] = useState<"hourly" | "project" | "flat" | "">("");
  const [hours, setHours] = useState(1);
  const [projectType, setProjectType] = useState<"half_day" | "full_day" | "">("");
  const [flatRateJob, setFlatRateJob] = useState("");

  // Pricing data
  const hourlyRate = { min: 75, max: 110 };
  const projectRates = {
    half_day: { min: 300, max: 400 },
    full_day: { min: 600, max: 750 }
  };
  const flatRateJobs = {
    toilet_replacement: { min: 150, max: 250 },
    vanity_install: { min: 300, max: 600 },
    backsplash_small: { min: 400, max: 900 },
    dishwasher_install: { min: 200, max: 350 }
  };

  // Calculate estimates
  const getHourlyEstimate = () => {
    return {
      min: hourlyRate.min * hours,
      max: hourlyRate.max * hours
    };
  };

  const getProjectEstimate = () => {
    if (!projectType) return null;
    return projectRates[projectType];
  };

  const getFlatRateEstimate = () => {
    if (!flatRateJob) return null;
    return flatRateJobs[flatRateJob as keyof typeof flatRateJobs];
  };

  const estimate = estimateType === "hourly" ? getHourlyEstimate() : estimateType === "project" ? getProjectEstimate() : estimateType === "flat" ? getFlatRateEstimate() : null;

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

      {/* Estimator Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="mb-12">
            <div className="dimension-marker mb-4">PRICING CALCULATOR</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Interactive Pricing Estimator</h1>
            <p className="text-lg text-muted-foreground">
              Get an instant estimate for your project. Select your project type and customize the details to see pricing ranges.
            </p>
          </div>

          {/* Estimate Type Selection */}
          <div className="service-card mb-8">
            <label className="tech-label mb-6 block">Estimate Type</label>
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setEstimateType("hourly" as const);
                  setProjectType("" as const);
                  setFlatRateJob("");
                }}
                className={`p-4 border rounded-sm transition-all text-left ${
                  estimateType === "hourly"
                    ? "border-accent bg-accent/10"
                    : "border-accent/30 hover:border-accent/60"
                }`}
              >
                <div className="font-semibold mb-1">Hourly Rate</div>
                <div className="text-xs text-muted-foreground">By the hour</div>
              </button>
              <button
                onClick={() => {
                  setEstimateType("project" as const);
                  setHours(1);
                  setFlatRateJob("");
                }}
                className={`p-4 border rounded-sm transition-all text-left ${
                  estimateType === "project"
                    ? "border-accent bg-accent/10"
                    : "border-accent/30 hover:border-accent/60"
                }`}
              >
                <div className="font-semibold mb-1">Project-Based</div>
                <div className="text-xs text-muted-foreground">Half or full day</div>
              </button>
              <button
                onClick={() => {
                  setEstimateType("flat" as const);
                  setHours(1);
                  setProjectType("" as const);
                }}
                className={`p-4 border rounded-sm transition-all text-left ${
                  estimateType === "flat"
                    ? "border-accent bg-accent/10"
                    : "border-accent/30 hover:border-accent/60"
                }`}
              >
                <div className="font-semibold mb-1">Flat Rate</div>
                <div className="text-xs text-muted-foreground">Common jobs</div>
              </button>
            </div>
          </div>

          {/* Hourly Estimate */}
          {estimateType === "hourly" && (
            <div className="service-card mb-8">
              <label className="tech-label mb-4 block">Hours Required</label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="flex-1"
                  />
                  <div className="w-16 text-right">
                    <input
                      type="number"
                      min="1"
                      max="40"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="form-input w-full text-center"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Adjust the slider or enter a value between 1 and 40 hours
                </p>
              </div>
            </div>
          )}

          {/* Project-Based Estimate */}
          {estimateType === "project" && (
            <div className="service-card mb-8">
              <label className="tech-label mb-4 block">Project Duration</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setProjectType("half_day" as const)}
                  className={`p-4 border rounded-sm transition-all text-left ${
                    projectType === "half_day"
                      ? "border-accent bg-accent/10"
                      : "border-accent/30 hover:border-accent/60"
                  }`}
                >
                  <div className="font-semibold mb-1">Half-Day</div>
                  <div className="text-xs text-muted-foreground">4 hours</div>
                </button>
                <button
                  onClick={() => setProjectType("full_day" as const)}
                  className={`p-4 border rounded-sm transition-all text-left ${
                    projectType === "full_day"
                      ? "border-accent bg-accent/10"
                      : "border-accent/30 hover:border-accent/60"
                  }`}
                >
                  <div className="font-semibold mb-1">Full-Day</div>
                  <div className="text-xs text-muted-foreground">8 hours</div>
                </button>
              </div>
            </div>
          )}

          {/* Flat Rate Estimate */}
          {estimateType === "flat" && (
            <div className="service-card mb-8">
              <label className="tech-label mb-4 block">Select Service</label>
              <select
                value={flatRateJob}
                onChange={(e) => setFlatRateJob(e.target.value)}
                className="form-input w-full"
              >
                <option value="">Choose a service...</option>
                <option value="toilet_replacement">Toilet Replacement</option>
                <option value="vanity_install">Vanity Installation</option>
                <option value="backsplash_small">Backsplash (Small)</option>
                <option value="dishwasher_install">Dishwasher Installation</option>
              </select>
            </div>
          )}

          {/* Estimate Result */}
          {estimate && (
            <div className="blueprint-frame p-8 mb-8 bg-card/50">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 border-2 border-accent/40 rounded-sm flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estimated Cost Range</p>
                  <div className="text-4xl font-bold text-accent">
                    ${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="border-t border-accent/20 pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  This is an estimated range based on our standard rates. The final cost may vary depending on project complexity, materials, and location. Contact us for a detailed quote.
                </p>
                <button
                  onClick={() => setLocation("/intake")}
                  className="btn-primary w-full"
                >
                  Get a Detailed Quote
                </button>
              </div>
            </div>
          )}

          {/* Pricing Information */}
          <div className="service-card">
            <h2 className="text-2xl font-bold mb-6">Our Pricing Structure</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-accent mb-3">Hourly Rates</h3>
                <div className="flex justify-between items-center p-3 bg-background/50 rounded-sm">
                  <span className="text-muted-foreground">Standard Rate</span>
                  <span className="font-bold">${hourlyRate.min} - ${hourlyRate.max}/hr</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-accent mb-3">Project-Based Rates</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-sm">
                    <span className="text-muted-foreground">Half-Day (4 hrs)</span>
                    <span className="font-bold">${projectRates.half_day.min} - ${projectRates.half_day.max}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-sm">
                    <span className="text-muted-foreground">Full-Day (8 hrs)</span>
                    <span className="font-bold">${projectRates.full_day.min} - ${projectRates.full_day.max}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-accent mb-3">Common Flat-Rate Services</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-sm">
                    <span className="text-muted-foreground">Toilet Replacement</span>
                    <span className="font-bold">${flatRateJobs.toilet_replacement.min} - ${flatRateJobs.toilet_replacement.max}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-sm">
                    <span className="text-muted-foreground">Vanity Installation</span>
                    <span className="font-bold">${flatRateJobs.vanity_install.min} - ${flatRateJobs.vanity_install.max}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-sm">
                    <span className="text-muted-foreground">Backsplash (Small)</span>
                    <span className="font-bold">${flatRateJobs.backsplash_small.min} - ${flatRateJobs.backsplash_small.max}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-sm">
                    <span className="text-muted-foreground">Dishwasher Installation</span>
                    <span className="font-bold">${flatRateJobs.dishwasher_install.min} - ${flatRateJobs.dishwasher_install.max}</span>
                  </div>
                </div>
              </div>
            </div>
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
