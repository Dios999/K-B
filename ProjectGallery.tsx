import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight, Filter } from "lucide-react";

export default function ProjectGallery() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showBefore, setShowBefore] = useState(true);

  // Mock project data - in production, this would come from tRPC query
  const mockProjects = [
    {
      id: 1,
      title: "Modern Kitchen Remodel",
      description: "Complete kitchen transformation with new cabinets, countertops, and appliances",
      projectType: "kitchen",
      serviceCategory: "Cabinet & Storage",
      location: "Downtown District",
      beforeImageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      afterImageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&q=80",
      completionDate: new Date("2024-08-15"),
      featured: true,
    },
    {
      id: 2,
      title: "Luxury Bathroom Vanity",
      description: "Custom vanity installation with marble countertop and modern fixtures",
      projectType: "bathroom",
      serviceCategory: "Vanity & Storage",
      location: "Suburban Heights",
      beforeImageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
      afterImageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop&q=80",
      completionDate: new Date("2024-07-20"),
      featured: true,
    },
    {
      id: 3,
      title: "Kitchen Backsplash Upgrade",
      description: "Subway tile backsplash installation with professional grouting",
      projectType: "kitchen",
      serviceCategory: "Backsplash",
      location: "Riverside Community",
      beforeImageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      afterImageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&q=80",
      completionDate: new Date("2024-06-10"),
      featured: false,
    },
    {
      id: 4,
      title: "Bathroom Floor & Wall Refresh",
      description: "Complete bathroom flooring replacement with waterproofing",
      projectType: "bathroom",
      serviceCategory: "Flooring & Walls",
      location: "Oak Park",
      beforeImageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
      afterImageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop&q=80",
      completionDate: new Date("2024-05-28"),
      featured: false,
    },
  ];

  const filteredProjects = selectedCategory === "all"
    ? mockProjects
    : mockProjects.filter(p => p.projectType === selectedCategory);

  const currentProject = selectedProject 
    ? mockProjects.find(p => p.id === selectedProject)
    : null;

  const currentIndex = selectedProject 
    ? mockProjects.findIndex(p => p.id === selectedProject)
    : -1;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedProject(mockProjects[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (currentIndex < mockProjects.length - 1) {
      setSelectedProject(mockProjects[currentIndex + 1].id);
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

      {/* Header */}
      <section className="py-16 md:py-24 border-b border-accent/20">
        <div className="container max-w-4xl">
          <div className="dimension-marker mb-4">PROJECT PORTFOLIO</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Before & After Gallery</h1>
          <p className="text-lg text-muted-foreground">
            Explore our completed kitchen and bathroom projects. See the transformation we deliver through precision craftsmanship and attention to detail.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-16">
        {currentProject ? (
          // Detail View
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="text-accent hover:text-accent/80 mb-8 flex items-center gap-2"
            >
              ← Back to Gallery
            </button>

            {/* Project Detail */}
            <div className="service-card mb-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Before/After Toggle */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-accent">
                      {showBefore ? "Before" : "After"}
                    </h3>
                    <button
                      onClick={() => setShowBefore(!showBefore)}
                      className="text-sm btn-secondary"
                    >
                      {showBefore ? "View After" : "View Before"}
                    </button>
                  </div>
                  <div className="relative bg-background/50 rounded-sm overflow-hidden border border-accent/20 aspect-square">
                    <img
                      src={showBefore ? currentProject.beforeImageUrl : currentProject.afterImageUrl}
                      alt={showBefore ? "Before" : "After"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{currentProject.title}</h2>
                    <p className="text-muted-foreground mb-6">{currentProject.description}</p>

                    <div className="space-y-3">
                      <div>
                        <p className="tech-label mb-1">Project Type</p>
                        <p className="text-muted-foreground capitalize">{currentProject.projectType}</p>
                      </div>
                      <div>
                        <p className="tech-label mb-1">Service Category</p>
                        <p className="text-muted-foreground">{currentProject.serviceCategory}</p>
                      </div>
                      <div>
                        <p className="tech-label mb-1">Location</p>
                        <p className="text-muted-foreground">{currentProject.location}</p>
                      </div>
                      <div>
                        <p className="tech-label mb-1">Completion Date</p>
                        <p className="text-muted-foreground">
                          {currentProject.completionDate.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={goToPrevious}
                      disabled={currentIndex === 0}
                      className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <button
                      onClick={goToNext}
                      disabled={currentIndex === mockProjects.length - 1}
                      className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="border-t border-accent/20 pt-8">
                <p className="tech-label mb-4">Other Projects</p>
                <div className="grid grid-cols-4 gap-4">
                  {mockProjects.map((project, idx) => (
                    <button
                      key={project.id}
                      onClick={() => setSelectedProject(project.id)}
                      className={`relative aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                        project.id === selectedProject
                          ? "border-accent"
                          : "border-accent/30 hover:border-accent/60"
                      }`}
                    >
                      <img
                        src={project.afterImageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Gallery Grid View
          <div>
            {/* Filter */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <Filter className="w-5 h-5 text-accent" />
                <span className="font-semibold">Filter by Type:</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {["all", "kitchen", "bathroom"].map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-sm border transition-all ${
                      selectedCategory === category
                        ? "bg-accent text-accent-foreground border-accent"
                        : "border-accent/30 hover:border-accent/60"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map(project => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className="service-card group cursor-pointer text-left hover:border-accent/60"
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-sm text-xs font-semibold">
                      Featured
                    </div>
                  )}

                  {/* Image Preview */}
                  <div className="relative mb-6 aspect-video rounded-sm overflow-hidden border border-accent/20">
                    <img
                      src={project.afterImageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Project Info */}
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="capitalize">{project.projectType}</span>
                    <span>{project.serviceCategory}</span>
                  </div>

                  {/* View Button */}
                  <div className="mt-6 pt-6 border-t border-accent/20">
                    <span className="text-accent font-semibold flex items-center gap-2">
                      View Project
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No projects found in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-t border-accent/20 bg-background/50">
        <div className="container max-w-2xl text-center">
          <div className="dimension-marker mb-4">READY TO TRANSFORM YOUR SPACE?</div>
          <h2 className="text-4xl font-bold mb-6">Start Your Project Today</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's bring your kitchen or bathroom vision to life with the same precision and craftsmanship you see in our portfolio.
          </p>
          <button
            onClick={() => setLocation("/intake")}
            className="btn-primary inline-flex items-center gap-2"
          >
            Request a Quote
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
