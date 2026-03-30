import { useMemo } from "react";

const FloatingParticles = ({ count = 20 }: { count?: number }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const type = Math.random();
        return {
          id: i,
          left: `${Math.random() * 100}%`,
          duration: `${8 + Math.random() * 12}s`,
          delay: `${Math.random() * 8}s`,
          size: type > 0.7 ? `${3 + Math.random() * 5}px` : `${1.5 + Math.random() * 3}px`,
          isGold: type > 0.5,
          opacity: 0.3 + Math.random() * 0.5,
        };
      }),
    [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute bottom-0 rounded-full animate-float-particle ${
            p.isGold ? "bg-gold" : "bg-saffron"
          }`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            ["--duration" as string]: p.duration,
            ["--delay" as string]: p.delay,
            filter: `blur(${p.isGold ? '0.5px' : '0px'})`,
          }}
        />
      ))}
      
      {/* Ambient orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full animate-breathe"
        style={{
          background: 'radial-gradient(circle, hsl(25 100% 52% / 0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full animate-breathe"
        style={{
          background: 'radial-gradient(circle, hsl(42 100% 55% / 0.03) 0%, transparent 70%)',
          filter: 'blur(30px)',
          animationDelay: '2s',
        }}
      />
    </div>
  );
};

export default FloatingParticles;
