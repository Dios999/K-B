import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import KitchenServices from "./pages/KitchenServices";
import BathroomServices from "./pages/BathroomServices";
import JobIntakeForm from "./pages/JobIntakeForm";
import PricingEstimator from "./pages/PricingEstimator";
import ServiceMap from "./pages/ServiceMap";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectGallery from "./pages/ProjectGallery";
import AdminProjects from "./pages/AdminProjects";
import Services from "./pages/Services";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/services/kitchen"} component={KitchenServices} />
      <Route path={"/services/bathroom"} component={BathroomServices} />
      <Route path={"/intake"} component={JobIntakeForm} />
      <Route path={"/estimate"} component={PricingEstimator} />
      <Route path={"/map"} component={ServiceMap} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/gallery"} component={ProjectGallery} />
      <Route path={"/admin/projects"} component={AdminProjects} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
