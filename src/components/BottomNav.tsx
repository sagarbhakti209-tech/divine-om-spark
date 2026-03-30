import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
    <nav className="fixed bottom-0 left-0 right-0 z-40">
      {/* Top glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div 
        className="px-2 py-1.5"
        style={{
          background: 'linear-gradient(to top, hsl(20 8% 3% / 0.98), hsl(20 8% 5% / 0.95))',
          backdropFilter: 'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        }}
      >
        <div className="flex justify-around items-center max-w-md mx-auto relative">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center gap-0.5 px-4 py-1.5"
                whileTap={{ scale: 0.85 }}
              >
                {/* Active glow background */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    layoutId="navActive"
                    style={{
                      background: 'radial-gradient(ellipse at center bottom, hsl(25 100% 52% / 0.15), transparent 70%)',
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                <div className="relative">
                  <item.icon 
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  {isActive && (
                    <motion.div
                      className="absolute -inset-1 rounded-full"
                      style={{ 
                        boxShadow: '0 0 12px hsl(25 100% 52% / 0.4)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </div>
                
                <span className={`text-[9px] font-devanagari font-semibold transition-colors duration-300 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}>
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div 
                    className="w-1 h-1 rounded-full bg-primary"
                    layoutId="navDot"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ boxShadow: '0 0 6px hsl(25 100% 52% / 0.6)' }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
