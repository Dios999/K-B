import { Mail, Phone, MapPin } from "lucide-react";
import { useLocation } from "wouter";

export default function Footer() {
  const [, setLocation] = useLocation();

  return (
    <footer className="border-t border-accent/20 bg-background/50 mt-20">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border-2 border-accent rounded-sm flex items-center justify-center">
                <span className="text-xs font-bold">K&B</span>
              </div>
              <span className="font-bold">Kitchen & Bath Specialist</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional kitchen and bathroom remodeling services with precision craftsmanship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setLocation("/")}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLocation("/services")}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLocation("/estimate")}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Estimate
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLocation("/intake")}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Submit Your Project
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Kitchen Remodeling</li>
              <li>Bathroom Remodeling</li>
              <li>Cabinet Installation</li>
              <li>Countertop Installation</li>
              <li>Tile & Flooring</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href="tel:647-572-2521"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  647-572-2521
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:diosproductions03@gmail.com"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  diosproductions03@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Toronto, ON</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2025 Kitchen & Bath Specialist. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <button className="hover:text-accent transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-accent transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
