import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const kitchenCategories = [
  "Cabinet & Storage",
  "Countertops",
  "Sinks & Fixtures",
  "Backsplash & Wall Finishes",
  "Appliances"
];

const bathroomCategories = [
  "Vanity & Storage",
  "Toilets & Fixtures",
  "Flooring & Walls",
  "Sealing & Water Protection",
  "Cosmetic Bathroom Refreshes"
];

export default function JobIntakeForm() {
  const [, setLocation] = useLocation();
  const [projectType, setProjectType] = useState<"kitchen" | "bathroom" | "">("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [formData, setFormData] = useState({
    clientFirstName: "",
    clientContact: "", // Either email or phone
    contactType: "email", // 'email' or 'phone'
    projectDescription: "",
    location: "",
    timelinePreference: "flexible",
    budgetRange: "1000_5000",
    hasElectrical: false,
    hasPlumbing: false,
    hasGasLines: false,
    hasLoadBearing: false,
    requiresPermits: false,
  });

  const [showWarning, setShowWarning] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = projectType === "kitchen" ? kitchenCategories : bathroomCategories;

  // Check if form has out-of-scope items
  const hasOutOfScope = formData.hasElectrical || formData.hasPlumbing || formData.hasGasLines || formData.hasLoadBearing || formData.requiresPermits;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else if (name === "contactType") {
      setFormData(prev => ({
        ...prev,
        contactType: value as "email" | "phone",
        clientContact: "" // Reset contact when switching types
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasOutOfScope) {
      setShowWarning(true);
      return;
    }

    if (!projectType || !serviceCategory) {
      toast.error("Please select a project type and service category");
      return;
    }

    if (!formData.clientFirstName || !formData.clientContact || !formData.projectDescription || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Call the tRPC mutation to submit the job
      await createJobMutation.mutateAsync({
        clientName: formData.clientFirstName,
        clientEmail: formData.contactType === "email" ? formData.clientContact : "",
        clientPhone: formData.contactType === "phone" ? formData.clientContact : "",
        projectType: projectType,
        serviceCategory: serviceCategory,
        projectDescription: formData.projectDescription,
        location: formData.location,
        timelinePreference: formData.timelinePreference,
        budgetRange: formData.budgetRange,
        hasElectrical: formData.hasElectrical,
        hasPlumbing: formData.hasPlumbing,
        hasGasLines: formData.hasGasLines,
        hasLoadBearing: formData.hasLoadBearing,
        requiresPermits: formData.requiresPermits,
      });
      
      setSubmitted(true);
      toast.success("Your project details have been submitted! We'll contact you within 24 hours.");
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setProjectType("");
        setServiceCategory("");
        setFormData({
          clientFirstName: "",
          clientContact: "",
          contactType: "email",
          projectDescription: "",
          location: "",
          timelinePreference: "flexible",
          budgetRange: "1000_5000",
          hasElectrical: false,
          hasPlumbing: false,
          hasGasLines: false,
          hasLoadBearing: false,
          requiresPermits: false,
        });
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
      console.error(error);
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
        </div>
      </nav>

      {/* Form Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <div className="mb-12">
            <div className="dimension-marker mb-4">PROJECT SUBMISSION</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Submit Your Project</h1>
            <div className="bg-accent/10 border-2 border-accent rounded-sm p-4 mb-6 inline-block">
              <p className="text-lg font-bold text-accent">All Quotes Are Free</p>
            </div>
            <p className="text-lg text-muted-foreground">
              Tell us about your kitchen or bathroom remodeling project. We'll review your details and contact you within 24 hours with a professional estimate.
            </p>
          </div>

          {submitted ? (
            <div className="service-card border-accent/50 bg-card/80">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                  <p className="text-muted-foreground mb-4">
                    Your project details have been received. Our team will review your submission and contact you within 24 hours to discuss your project and provide a detailed estimate.
                  </p>
                  <button
                    onClick={() => setLocation("/")}
                    className="btn-primary text-sm"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Project Type Selection */}
              <div className="service-card">
                <label className="tech-label mb-4 block">Project Type *</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setProjectType("kitchen");
                      setServiceCategory("");
                    }}
                    className={`p-4 border rounded-sm transition-all ${
                      projectType === "kitchen"
                        ? "border-accent bg-accent/10"
                        : "border-accent/30 hover:border-accent/60"
                    }`}
                  >
                    <div className="font-semibold mb-1">Kitchen</div>
                    <div className="text-xs text-muted-foreground">Cabinets, counters, fixtures</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProjectType("bathroom");
                      setServiceCategory("");
                    }}
                    className={`p-4 border rounded-sm transition-all ${
                      projectType === "bathroom"
                        ? "border-accent bg-accent/10"
                        : "border-accent/30 hover:border-accent/60"
                    }`}
                  >
                    <div className="font-semibold mb-1">Bathroom</div>
                    <div className="text-xs text-muted-foreground">Vanity, fixtures, flooring</div>
                  </button>
                </div>
              </div>

              {/* Service Category */}
              {projectType && (
                <div className="service-card">
                  <label className="tech-label mb-4 block">Service Category *</label>
                  <select
                    name="serviceCategory"
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="form-input w-full"
                  >
                    <option value="">Select a category...</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Client Information */}
              <div className="service-card">
                <label className="tech-label mb-4 block">Contact Information *</label>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="clientFirstName"
                    placeholder="First Name"
                    value={formData.clientFirstName}
                    onChange={handleInputChange}
                    className="form-input w-full"
                    required
                  />
                  
                  <div className="flex gap-4">
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="radio"
                        name="contactType"
                        value="email"
                        checked={formData.contactType === "email"}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Email</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="radio"
                        name="contactType"
                        value="phone"
                        checked={formData.contactType === "phone"}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Phone</span>
                    </label>
                  </div>
                  
                  {formData.contactType === "email" ? (
                    <input
                      type="email"
                      name="clientContact"
                      placeholder="Email Address"
                      value={formData.clientContact}
                      onChange={handleInputChange}
                      className="form-input w-full"
                      required
                    />
                  ) : (
                    <input
                      type="tel"
                      name="clientContact"
                      placeholder="Phone Number"
                      value={formData.clientContact}
                      onChange={handleInputChange}
                      className="form-input w-full"
                      required
                    />
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="service-card">
                <label className="tech-label mb-4 block">Project Details *</label>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="location"
                    placeholder="Project Location / Address"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="form-input w-full"
                    required
                  />
                  <textarea
                    name="projectDescription"
                    placeholder="Describe your project in detail. What are you looking to accomplish?"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    className="form-input w-full h-32 resize-none"
                    required
                  />
                </div>
              </div>

              {/* Timeline & Budget */}
              <div className="service-card">
                <label className="tech-label mb-4 block">Timeline & Budget</label>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">When do you want to start?</label>
                    <select
                      name="timelinePreference"
                      value={formData.timelinePreference}
                      onChange={handleInputChange}
                      className="form-input w-full"
                    >
                      <option value="urgent">Urgent (ASAP)</option>
                      <option value="soon">Soon (1-2 weeks)</option>
                      <option value="flexible">Flexible (1+ months)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Budget Range</label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className="form-input w-full"
                    >
                      <option value="under_500">Under $500</option>
                      <option value="500_1000">$500 - $1,000</option>
                      <option value="1000_5000">$1,000 - $5,000</option>
                      <option value="over_5000">Over $5,000</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Scope Verification */}
              <div className="service-card border-accent/30">
                <label className="tech-label mb-4 block">Project Scope Verification</label>
                <p className="text-sm text-muted-foreground mb-4">
                  Please confirm if your project involves any of the following specialized work that may require coordination with licensed professionals.
                </p>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasElectrical"
                      checked={formData.hasElectrical}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Electrical wiring or installation</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasPlumbing"
                      checked={formData.hasPlumbing}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Plumbing re-routing or modifications</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasGasLines"
                      checked={formData.hasGasLines}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Gas line work</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasLoadBearing"
                      checked={formData.hasLoadBearing}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Load-bearing wall modifications</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="requiresPermits"
                      checked={formData.requiresPermits}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Permit-required structural work</span>
                  </label>
                </div>
              </div>

              {/* Out of Scope Warning */}
              {hasOutOfScope && (
                <div className="bg-accent/10 border border-accent/30 rounded-sm p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-accent mb-1">In-Depth Quote Required</p>
                    <p className="text-sm text-muted-foreground">
                      Your project involves specialized work that will require an in-depth quote. These services are generally more expensive due to the complexity involved. We'll work with you to provide a detailed estimate and coordinate with licensed professionals if needed.
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Submit Project Details
                </button>
                <button
                  type="button"
                  onClick={() => setLocation("/")}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
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
