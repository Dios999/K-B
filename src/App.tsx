import { Route, Switch } from "wouter";
import { Toaster } from "sonner";

import Home from "@/pages/Home";
import Services from "@/pages/Services";
import KitchenServices from "@/pages/KitchenServices";
import BathroomServices from "@/pages/BathroomServices";
import JobIntakeForm from "@/pages/JobIntakeForm";
import PricingEstimator from "@/pages/PricingEstimator";
import ServiceMap from "@/pages/ServiceMap";
import ProjectGallery from "@/pages/ProjectGallery";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/kitchen" component={KitchenServices} />
        <Route path="/services/bathroom" component={BathroomServices} />
        <Route path="/intake" component={JobIntakeForm} />
        <Route path="/estimate" component={PricingEstimator} />
        <Route path="/map" component={ServiceMap} />
        <Route path="/gallery" component={ProjectGallery} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}
