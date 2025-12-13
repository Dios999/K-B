import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { LogOut, Filter, ChevronDown, Eye, Image } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  // Mock data - in production, this would come from tRPC query
  const mockSubmissions = [
    {
      id: 1,
      clientName: "John Smith",
      clientEmail: "john@example.com",
      clientPhone: "555-0123",
      projectType: "kitchen",
      serviceCategory: "Cabinet & Storage",
      projectDescription: "Need to replace old kitchen cabinets with new ones",
      location: "123 Main St, City, State",
      timelinePreference: "soon",
      budgetRange: "1000_5000",
      status: "new",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      clientName: "Jane Doe",
      clientEmail: "jane@example.com",
      clientPhone: "555-0456",
      projectType: "bathroom",
      serviceCategory: "Vanity & Storage",
      projectDescription: "Complete bathroom vanity replacement and update",
      location: "456 Oak Ave, City, State",
      timelinePreference: "flexible",
      budgetRange: "500_1000",
      status: "quoted",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: 3,
      clientName: "Mike Johnson",
      clientEmail: "mike@example.com",
      clientPhone: "555-0789",
      projectType: "kitchen",
      serviceCategory: "Countertops",
      projectDescription: "Laminate countertop replacement in kitchen",
      location: "789 Pine Rd, City, State",
      timelinePreference: "urgent",
      budgetRange: "over_5000",
      status: "scheduled",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    }
  ];

  const filteredSubmissions = statusFilter === "all" 
    ? mockSubmissions 
    : mockSubmissions.filter(s => s.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "new": return "bg-accent/10 text-accent border-accent/30";
      case "quoted": return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "scheduled": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "completed": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "rejected": return "bg-destructive/10 text-destructive border-destructive/30";
      default: return "bg-muted/10 text-muted-foreground border-muted/30";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

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

  return (
    <div className="min-h-screen bg-background text-foreground blueprint-grid">
      {/* Header */}
      <div className="border-b border-accent/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage job submissions and projects</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setLocation("/admin/projects")}
              className="btn-secondary flex items-center gap-2"
            >
              <Image className="w-4 h-4" />
              Manage Gallery
            </button>
            <button
              onClick={() => {
                logout();
                setLocation("/");
              }}
              className="btn-secondary flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="service-card sticky top-24">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter by Status
              </h3>
              <div className="space-y-2">
                {["all", "new", "quoted", "scheduled", "completed", "rejected"].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`w-full text-left px-4 py-2 rounded-sm transition-all ${
                      statusFilter === status
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-card/80"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                    <span className="float-right text-xs">
                      {status === "all" 
                        ? mockSubmissions.length 
                        : mockSubmissions.filter(s => s.status === status).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedSubmission ? (
              // Detail View
              <div className="service-card">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-accent hover:text-accent/80 mb-6 flex items-center gap-2"
                >
                  ← Back to List
                </button>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedSubmission.clientName}</h2>
                    <div className={`inline-block px-3 py-1 rounded-sm border ${getStatusColor(selectedSubmission.status)}`}>
                      {getStatusLabel(selectedSubmission.status)}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="tech-label mb-2">Contact Information</p>
                      <div className="space-y-1 text-muted-foreground">
                        <p><strong>Email:</strong> {selectedSubmission.clientEmail}</p>
                        <p><strong>Phone:</strong> {selectedSubmission.clientPhone}</p>
                      </div>
                    </div>
                    <div>
                      <p className="tech-label mb-2">Project Details</p>
                      <div className="space-y-1 text-muted-foreground">
                        <p><strong>Type:</strong> {selectedSubmission.projectType}</p>
                        <p><strong>Category:</strong> {selectedSubmission.serviceCategory}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="tech-label mb-2">Location</p>
                    <p className="text-muted-foreground">{selectedSubmission.location}</p>
                  </div>

                  <div>
                    <p className="tech-label mb-2">Project Description</p>
                    <p className="text-muted-foreground">{selectedSubmission.projectDescription}</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="tech-label mb-2">Timeline</p>
                      <p className="text-muted-foreground">{selectedSubmission.timelinePreference}</p>
                    </div>
                    <div>
                      <p className="tech-label mb-2">Budget Range</p>
                      <p className="text-muted-foreground">{selectedSubmission.budgetRange}</p>
                    </div>
                    <div>
                      <p className="tech-label mb-2">Submitted</p>
                      <p className="text-muted-foreground">{selectedSubmission.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="border-t border-accent/20 pt-6">
                    <p className="tech-label mb-4">Update Status</p>
                    <div className="flex gap-2 flex-wrap">
                      {["new", "quoted", "scheduled", "completed", "rejected"].map(status => (
                        <button
                          key={status}
                          className={`px-4 py-2 rounded-sm border transition-all ${
                            selectedSubmission.status === status
                              ? "bg-accent text-accent-foreground border-accent"
                              : "border-accent/30 hover:border-accent/60"
                          }`}
                        >
                          {getStatusLabel(status)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {statusFilter === "all" ? "All Submissions" : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Submissions`}
                  </h2>
                  <span className="text-muted-foreground">{filteredSubmissions.length} total</span>
                </div>

                {filteredSubmissions.length === 0 ? (
                  <div className="service-card text-center py-12">
                    <p className="text-muted-foreground">No submissions found</p>
                  </div>
                ) : (
                  filteredSubmissions.map(submission => (
                    <div
                      key={submission.id}
                      onClick={() => setSelectedSubmission(submission)}
                      className="service-card cursor-pointer group hover:border-accent/60"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg">{submission.clientName}</h3>
                            <div className={`px-2 py-1 rounded-sm border text-xs font-semibold ${getStatusColor(submission.status)}`}>
                              {getStatusLabel(submission.status)}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">
                            {submission.projectType.charAt(0).toUpperCase() + submission.projectType.slice(1)} • {submission.serviceCategory}
                          </p>
                          <p className="text-muted-foreground text-sm">{submission.projectDescription.substring(0, 100)}...</p>
                          <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                            <span>📧 {submission.clientEmail}</span>
                            <span>📱 {submission.clientPhone}</span>
                            <span>📍 {submission.location}</span>
                          </div>
                        </div>
                        <Eye className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
