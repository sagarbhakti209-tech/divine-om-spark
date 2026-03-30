import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, BellOff, X, Clock } from "lucide-react";
import { toast } from "sonner";

const REMINDER_KEY = "divine-bhakti-reminder";

interface ReminderSettings {
  enabled: boolean;
  time: string;
}

const PrayerReminder = () => {
  const [show, setShow] = useState(false);
  const [settings, setSettings] = useState<ReminderSettings>(() => {
    const saved = localStorage.getItem(REMINDER_KEY);
    return saved ? JSON.parse(saved) : { enabled: false, time: "06:00" };
  });

  useEffect(() => {
    localStorage.setItem(REMINDER_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (!settings.enabled) return;
    const checkReminder = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      if (currentTime === settings.time) {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("🙏 Divine Bhakti", {
            body: "प्रार्थना का समय हो गया है। भगवान का नाम लीजिए।",
          });
        }
        toast("🙏 प्रार्थना का समय", { description: "भगवान का नाम लीजिए। आज का दिन शुभ हो।" });
      }
    };
    const interval = setInterval(checkReminder, 60000);
    return () => clearInterval(interval);
  }, [settings]);

  const enableReminder = async () => {
    if ("Notification" in window) {
      await Notification.requestPermission();
    }
    setSettings({ ...settings, enabled: true });
    toast.success("🔔 Reminder enabled!");
  };

  return (
    <>
      <motion.button
        onClick={() => setShow(true)}
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-2xl glass-card-elevated flex items-center justify-center"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
      >
        {settings.enabled ? (
          <Bell className="w-4 h-4 text-primary" />
        ) : (
          <BellOff className="w-4 h-4 text-muted-foreground" />
        )}
      </motion.button>

      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
            <motion.div
              className="glass-card-elevated p-6 w-full max-w-sm space-y-5 relative z-10"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-foreground text-glow-saffron font-devanagari">🔔 प्रार्थना रिमाइंडर</h2>
                <button onClick={() => setShow(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground font-devanagari">डेली रिमाइंडर</span>
                  <button
                    onClick={() => {
                      if (settings.enabled) {
                        setSettings({ ...settings, enabled: false });
                        toast("🔕 Reminder disabled");
                      } else {
                        enableReminder();
                      }
                    }}
                    className={`w-12 h-6 rounded-full transition-all relative ${
                      settings.enabled ? "gradient-saffron" : "bg-muted"
                    }`}
                    style={settings.enabled ? { boxShadow: '0 0 12px hsl(25 100% 52% / 0.3)' } : {}}
                  >
                    <div className={`w-5 h-5 rounded-full bg-foreground absolute top-0.5 transition-all ${
                      settings.enabled ? "left-6" : "left-0.5"
                    }`} />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="time"
                    value={settings.time}
                    onChange={(e) => setSettings({ ...settings, time: e.target.value })}
                    className="bg-muted/50 text-foreground text-sm px-3 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-primary border border-border/50"
                  />
                </div>

                <p className="text-xs text-muted-foreground font-devanagari">
                  {settings.enabled
                    ? `✅ रोज़ ${settings.time} पर रिमाइंडर आएगा`
                    : "रोज़ाना प्रार्थना का रिमाइंडर पाने के लिए चालू करें"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PrayerReminder;
