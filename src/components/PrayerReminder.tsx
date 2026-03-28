import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, BellOff, X, Clock } from "lucide-react";
import { toast } from "sonner";

const REMINDER_KEY = "divine-bhakti-reminder";

interface ReminderSettings {
  enabled: boolean;
  time: string; // HH:mm
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

  // Check reminder every minute
  useEffect(() => {
    if (!settings.enabled) return;

    const checkReminder = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      if (currentTime === settings.time) {
        // Show notification
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("🙏 Divine Bhakti", {
            body: "प्रार्थना का समय हो गया है। भगवान का नाम लीजिए।",
            icon: "/favicon.ico",
          });
        }
        toast("🙏 प्रार्थना का समय", {
          description: "भगवान का नाम लीजिए। आज का दिन शुभ हो।",
        });
      }
    };

    const interval = setInterval(checkReminder, 60000);
    return () => clearInterval(interval);
  }, [settings]);

  const enableReminder = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setSettings({ ...settings, enabled: true });
        toast.success("🔔 Prayer reminder enabled!");
      } else {
        // Still enable in-app reminder even without notification permission
        setSettings({ ...settings, enabled: true });
        toast.success("🔔 In-app reminder enabled!");
      }
    } else {
      setSettings({ ...settings, enabled: true });
      toast.success("🔔 In-app reminder enabled!");
    }
  };

  return (
    <>
      {/* Floating bell button */}
      <motion.button
        onClick={() => setShow(true)}
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full glass-card flex items-center justify-center"
        whileTap={{ scale: 0.9 }}
        title="Prayer Reminder"
      >
        {settings.enabled ? (
          <Bell className="w-5 h-5 text-primary" />
        ) : (
          <BellOff className="w-5 h-5 text-muted-foreground" />
        )}
      </motion.button>

      {/* Settings modal */}
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
          >
            <motion.div
              className="glass-card p-6 w-full max-w-sm space-y-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground text-glow-saffron">
                  🔔 Prayer Reminder
                </h2>
                <button onClick={() => setShow(false)} className="text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Daily Reminder</span>
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
                      settings.enabled ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-primary-foreground absolute top-0.5 transition-all ${
                        settings.enabled ? "left-6" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="time"
                    value={settings.time}
                    onChange={(e) => setSettings({ ...settings, time: e.target.value })}
                    className="bg-muted text-foreground text-sm px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  {settings.enabled
                    ? `✅ Reminder set for ${settings.time} daily`
                    : "Enable to get daily prayer notifications"}
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
