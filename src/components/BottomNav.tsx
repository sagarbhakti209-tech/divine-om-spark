import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, FlameKindling, Home, Music, Gift } from "lucide-react";

const navItems = [
  { icon: Sparkles, label: "विशेष", path: "/" },
  { icon: FlameKindling, label: "पूजा", path: "/pooja" },
  { icon: Home, label: "मंदिर", path: "/mandir" },
  { icon: Music, label: "संगीत", path: "/sangeet" },
  { icon: Gift, label: "चढ़ावा", path: "/chadawa" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-card rounded-none border-t border-border/50 px-2 py-2 backdrop-blur-2xl">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "drop-shadow-[0_0_8px_hsl(25_100%_50%/0.8)]" : ""}`} />
              <span className="text-[10px] font-devanagari font-medium">{item.label}</span>
              {isActive && <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
