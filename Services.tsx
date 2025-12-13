import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ChevronRight, CheckCircle, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Services() {
  const [, setLocation] = useLocation();
  const [selectedType, setSelectedType] = useState<"kitchen" | "bathroom">("kitchen");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const kitchenServices = [
    {
      category: "Cabinet & Storage",
      description: "Custom cabinet installation, refinishing, and organization solutions",
      items: [
        "Cabinet installation and replacement",
        "Custom cabinet design and building",
        "Cabinet refinishing and painting",
        "Drawer and shelf organization",
        "Hardware upgrades and installation",
      ],
    },
    {
      category: "Countertops",
      description: "Premium countertop materials and professional installation",
      items: [
        "Laminate countertop installation",
        "Solid surface countertops",
        "Tile countertop installation",
        "Countertop edge finishing",
        "Undermount sink preparation",
      ],
    },
    {
      category: "Sinks & Fixtures",
      description: "Sink installation and faucet upgrades",
      items: [
        "Sink installation (drop-in and undermount)",
        "Faucet installation and replacement",
        "Garbage disposal installation",
        "Sink strainer and drain installation",
        "Water filter system installation",
      ],
    },
    {
      category: "Backsplash",
      description: "Professional tile and backsplash installation",
      items: [
        "Subway tile backsplash",
        "Mosaic tile installation",
        "Glass tile backsplash",
        "Grout application and sealing",
        "Backsplash removal and prep",
      ],
    },
    {
      category: "Appliances",
      description: "Appliance installation and integration",
      items: [
        "Dishwasher installation",
        "Range hood installation",
        "Microwave installation",
        "Refrigerator integration",
        "Appliance cutout and framing",
      ],
    },
  ];

  const bathroomServices = [
    {
      category: "Vanity & Storage",
      description: "Custom vanity installation and bathroom storage solutions",
      items: [
        "Vanity cabinet installation",
        "Custom vanity design and building",
        "Vanity countertop installation",
        "Medicine cabinet installation",
        "Shelving and storage solutions",
      ],
    },
    {
      category: "Toilets & Fixtures",
      description: "Toilet installation and fixture upgrades",
      items: [
        "Toilet installation and replacement",
        "Bidet installation",
        "Towel rack and bar installation",
        "Grab bar installation",
        "Toilet seat upgrades",
      ],
    },
    {
      category: "Flooring & Walls",
      description: "Professional flooring and wall installation",
      items: [
        "Ceramic tile flooring",
        "Vinyl flooring installation",
        "Wall tile installation",
        "Grout and sealing",
        "Flooring removal and prep",
      ],
    },
    {
      category: "Sealing & Water Protection",
      description: "Waterproofing and protective treatments",
      items: [
        "Shower enclosure sealing",
        "Caulking and sealant application",
        "Waterproofing membranes",
        "Grout sealing",
        "Moisture barrier installation",
      ],
    },
    {
      category: "Cosmetic Refreshes",
      description: "Paint, hardware, and aesthetic updates",
      items: [
        "Bathroom painting",
        "Hardware upgrades",
        "Lighting fixture installation",
        "Mirror installation",
        "Decorative updates",
      ],
    },
  ];

  const services = selectedType === "kitchen" ? kitchenServices : bathroomServices;

  const createQuoteMutation = trpc.quotes.create.useMutation();

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactName || (!contactEmail && !contactPhone)) {
      toast.error("Please provide your name and either email or phone");
      return;
    }

    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    setSubmitting(true);
    try {
      await createQuoteMutation.mutateAsync({
        clientName: contactName,
        clientEmail: contactEmail,
        clientPhone: contactPhone,
        projectType: selectedType,
        selectedServices: selectedServices,
      });

      toast.success("Quote request sent! We'll contact you soon.");
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setSelectedServices([]);
      setShowQuoteForm(false);
    } catch (error) {
      toast.error("Failed to send quote request");
      console.error(error);
    } finally {
      setSubmitting(false);
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

      {/* Service Selection Section */}
      <section className="py-16 md:py-24 border-b border-accent/20">
        <div className="container">
          <div className="mb-12">
            <div className="dimension-marker mb-4">SELECT SERVICES</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Choose Your Services</h2>

            {/* Service Type Tabs */}
            <div className="flex gap-4 mb-12">
              <button
                onClick={() => {
                  setSelectedType("kitchen");
                  setSelectedServices([]);
                }}
                className={`px-6 py-3 rounded-sm font-semibold transition-all ${
                  selectedType === "kitchen"
                    ? "bg-accent text-accent-foreground"
                    : "bg-card border border-accent/30 text-foreground hover:border-accent/60"
                }`}
              >
                Kitchen Services
              </button>
              <button
                onClick={() => {
                  setSelectedType("bathroom");
                  setSelectedServices([]);
                }}
                className={`px-6 py-3 rounded-sm font-semibold transition-all ${
                  selectedType === "bathroom"
                    ? "bg-accent text-accent-foreground"
                    : "bg-card border border-accent/30 text-foreground hover:border-accent/60"
                }`}
              >
                Bathroom Services
              </button>
            </div>

            {/* Service Categories */}
            <div className="space-y-8">
              {services.map((service, idx) => (
                <div key={idx} className="service-card">
                  <h3 className="text-2xl font-bold mb-2">{service.category}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  {/* Service Items - Custom Checkboxes */}
                  <div className="space-y-3">
                    {service.items.map((item, itemIdx) => {
                      const isSelected = selectedServices.includes(item);
                      return (
                        <div
                          key={itemIdx}
                          onClick={() => toggleService(item)}
                          className={`p-4 rounded-sm border-2 cursor-pointer transition-all ${
                            isSelected
                              ? "border-accent bg-accent/10"
                              : "border-accent/30 bg-card hover:border-accent/60 hover:bg-card/80"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-accent border-accent"
                                  : "border-accent/50 bg-input"
                              }`}
                            >
                              {isSelected && (
                                <CheckCircle className="w-5 h-5 text-accent-foreground" />
                              )}
                            </div>
                            <span className="font-medium">{item}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Request Quote Section */}
      <section className="py-16 md:py-24 border-t border-accent/20 bg-background/50">
        <div className="container max-w-2xl">
          {!showQuoteForm ? (
            <div className="text-center">
              <div className="dimension-marker mb-4">REQUEST A QUOTE</div>
              <h2 className="text-3xl font-bold mb-4">Get a Custom Quote</h2>
              <div className="bg-accent/10 border-2 border-accent rounded-sm p-4 mb-6 inline-block">
                <p className="text-lg font-bold text-accent">✓ ALL QUOTES ARE FREE</p>
              </div>
              <p className="text-muted-foreground mb-8">
                Select the services you need above, then click below to provide your contact information. We'll review your selections and send you a detailed quote.
              </p>
              <button
                onClick={() => setShowQuoteForm(true)}
                disabled={selectedServices.length === 0}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                Request Quote for Selected Services
                <ChevronRight className="w-4 h-4" />
              </button>
              {selectedServices.length === 0 && (
                <p className="text-sm text-muted-foreground mt-4">
                  Select at least one service above to request a quote
                </p>
              )}
            </div>
          ) : (
            <div className="service-card max-w-xl mx-auto">
              <h3 className="text-2xl font-bold mb-6">Your Quote Request</h3>
              <div className="bg-accent/10 border-2 border-accent rounded-sm p-3 mb-6">
                <p className="text-sm font-bold text-accent">✓ All quotes are completely free - no obligation</p>
              </div>

              {/* Selected Services Summary */}
              <div className="mb-8 p-4 bg-accent/5 rounded-sm border border-accent/20">
                <p className="text-sm font-semibold text-accent mb-3">Selected Services:</p>
                <ul className="space-y-2">
                  {selectedServices.map((service, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmitQuote} className="space-y-4">
                <div>
                  <label className="tech-label mb-2 block">Your First Name *</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="John"
                    className="form-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="tech-label mb-2 block">Contact Method *</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="email"
                        checked={contactEmail !== "" && contactPhone === ""}
                        onChange={() => {
                          setContactEmail("");
                          setContactPhone("");
                        }}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm">Email Address</span>
                    </label>
                    {(contactEmail !== "" || (contactEmail === "" && contactPhone === "")) && (
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="form-input w-full ml-7"
                      />
                    )}

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="phone"
                        checked={contactPhone !== "" && contactEmail === ""}
                        onChange={() => {
                          setContactPhone("");
                          setContactEmail("");
                        }}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm">Phone Number</span>
                    </label>
                    {contactPhone !== "" && (
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="form-input w-full ml-7"
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-accent/20">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary flex-1 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? "Sending..." : "Send Quote Request"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowQuoteForm(false)}
                    className="btn-secondary flex-1"
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
