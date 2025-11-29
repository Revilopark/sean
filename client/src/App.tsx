import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { JobTrackerProvider } from "./contexts/JobTrackerContext";
import Home from "./pages/Home";
import MyExpeditionLog from "./pages/MyExpeditionLog";
import ResumeBuilder from "./pages/ResumeBuilder";
import PublicResume from "./pages/PublicResume";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/my-log"} component={MyExpeditionLog} />
      <Route path={"/resume"} component={ResumeBuilder} />
      <Route path={"/resume/shared"} component={PublicResume} />
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
        defaultTheme="light"
        // switchable
      >
        <JobTrackerProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </JobTrackerProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
