import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AudioProvider } from "@/contexts/AudioContext";
import SplashScreen from "./components/SplashScreen";
import AudioControls from "./components/AudioControls";
import PrayerReminder from "./components/PrayerReminder";
import Index from "./pages/Index";
import MantraPage from "./pages/MantraPage";
import GalleryPage from "./pages/GalleryPage";
import ChatPage from "./pages/ChatPage";
import JapaPage from "./pages/JapaPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AudioProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
            <div className={showSplash ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-500"}>
              <AudioControls />
              <PrayerReminder />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/mantra" element={<MantraPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/japa" element={<JapaPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AudioProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
