import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Upload, Trash2, Edit, Eye, Plus, X } from "lucide-react";
import { toast } from "sonner";

export default function AdminProjects() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [projects, setProjects] = useState<any[]>([
    {
      id: 1,
      title: "Modern Kitchen Remodel",
      projectType: "kitchen",
      serviceCategory: "Cabinet & Storage",
      featured: true,
      beforeImageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200",
      afterImageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectType: "kitchen",
    serviceCategory: "",
    location: "",
    featured: false,
  });
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background text-foreground blueprint-grid flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-8">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => setLocation("/")}
            className="btn-primary"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddProject = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      projectType: "kitchen",
      serviceCategory: "",
      location: "",
      featured: false,
    });
    setBeforeImage(null);
    setAfterImage(null);
    setShowForm(true);
  };

  const handleEditProject = (project: any) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      projectType: project.projectType,
      serviceCategory: project.serviceCategory,
      location: project.location || "",
      featured: project.featured,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!beforeImage || !afterImage) {
      toast.error("Please upload both before and after images");
      return;
    }

    setUploading(true);
    try {
      // In production, upload images to S3 using storagePut
      // For now, we'll use mock URLs
      const newProject = {
        id: editingId || Math.max(...projects.map(p => p.id), 0) + 1,
        ...formData,
        beforeImageUrl: URL.createObjectURL(beforeImage),
        afterImageUrl: URL.createObjectURL(afterImage),
      };

      if (editingId) {
        setProjects(projects.map(p => p.id === editingId ? newProject : p));
        toast.success("Project updated successfully");
      } else {
        setProjects([...projects, newProject]);
        toast.success("Project added successfully");
      }

      setShowForm(false);
      setBeforeImage(null);
      setAfterImage(null);
    } catch (error) {
      toast.error("Failed to save project");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProject = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(p => p.id !== id));
      toast.success("Project deleted");
    }
  };

  const handleToggleFeatured = (id: number) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ));
  };

  const serviceCategories = {
    kitchen: [
      "Cabinet & Storage",
      "Countertops",
      "Sinks & Fixtures",
      "Backsplash",
      "Appliances",
    ],
    bathroom: [
      "Vanity & Storage",
      "Toilets & Fixtures",
      "Flooring & Walls",
      "Sealing & Water Protection",
      "Cosmetic Refreshes",
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground blueprint-grid">
      {/* Header */}
      <div className="border-b border-accent/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-bold">Project Gallery Management</h1>
            <p className="text-sm text-muted-foreground">Manage before/after project photos</p>
          </div>
          <button
            onClick={() => setLocation("/admin")}
            className="btn-secondary text-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Add Project Button */}
        <div className="mb-8">
          <button
            onClick={handleAddProject}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Project
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-sm border border-accent/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-card border-b border-accent/20 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {editingId ? "Edit Project" : "Add New Project"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="tech-label mb-2 block">Project Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Modern Kitchen Remodel"
                    className="form-input w-full"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="tech-label mb-2 block">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the project and improvements made..."
                    className="form-input w-full h-24"
                    required
                  />
                </div>

                {/* Project Type & Category */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="tech-label mb-2 block">Project Type</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        projectType: e.target.value,
                        serviceCategory: "" 
                      })}
                      className="form-input w-full"
                    >
                      <option value="kitchen">Kitchen</option>
                      <option value="bathroom">Bathroom</option>
                    </select>
                  </div>
                  <div>
                    <label className="tech-label mb-2 block">Service Category</label>
                    <select
                      value={formData.serviceCategory}
                      onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                      className="form-input w-full"
                      required
                    >
                      <option value="">Select a category...</option>
                      {serviceCategories[formData.projectType as keyof typeof serviceCategories].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="tech-label mb-2 block">Location (Optional)</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Downtown District"
                    className="form-input w-full"
                  />
                </div>

                {/* Image Uploads */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="tech-label mb-2 block">Before Image</label>
                    <div className="border-2 border-dashed border-accent/30 rounded-sm p-6 text-center cursor-pointer hover:border-accent/60 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBeforeImage(e.target.files?.[0] || null)}
                        className="hidden"
                        id="before-image"
                      />
                      <label htmlFor="before-image" className="cursor-pointer block">
                        <Upload className="w-8 h-8 text-accent mx-auto mb-2" />
                        <p className="text-sm font-semibold mb-1">
                          {beforeImage ? beforeImage.name : "Click to upload"}
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="tech-label mb-2 block">After Image</label>
                    <div className="border-2 border-dashed border-accent/30 rounded-sm p-6 text-center cursor-pointer hover:border-accent/60 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAfterImage(e.target.files?.[0] || null)}
                        className="hidden"
                        id="after-image"
                      />
                      <label htmlFor="after-image" className="cursor-pointer block">
                        <Upload className="w-8 h-8 text-accent mx-auto mb-2" />
                        <p className="text-sm font-semibold mb-1">
                          {afterImage ? afterImage.name : "Click to upload"}
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">
                    Feature this project on the homepage
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4 border-t border-accent/20">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    {uploading ? "Saving..." : editingId ? "Update Project" : "Add Project"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">
            Projects ({projects.length})
          </h2>

          {projects.length === 0 ? (
            <div className="service-card text-center py-12">
              <p className="text-muted-foreground mb-4">No projects yet</p>
              <button
                onClick={handleAddProject}
                className="btn-primary"
              >
                Add Your First Project
              </button>
            </div>
          ) : (
            projects.map(project => (
              <div
                key={project.id}
                className="service-card flex items-center gap-6"
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-sm overflow-hidden border border-accent/20">
                    <img
                      src={project.afterImageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    {project.featured && (
                      <span className="bg-accent text-accent-foreground px-2 py-1 rounded-sm text-xs font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {project.projectType} • {project.serviceCategory}
                  </p>
                  {project.location && (
                    <p className="text-sm text-muted-foreground">📍 {project.location}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex gap-2">
                  <button
                    onClick={() => handleToggleFeatured(project.id)}
                    title={project.featured ? "Unfeature" : "Feature"}
                    className="p-2 hover:bg-accent/10 rounded-sm transition-colors"
                  >
                    <Eye className={`w-5 h-5 ${project.featured ? "text-accent" : "text-muted-foreground"}`} />
                  </button>
                  <button
                    onClick={() => handleEditProject(project)}
                    className="p-2 hover:bg-accent/10 rounded-sm transition-colors text-muted-foreground hover:text-accent"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-2 hover:bg-destructive/10 rounded-sm transition-colors text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
