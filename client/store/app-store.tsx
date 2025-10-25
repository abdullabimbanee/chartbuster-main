import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type Role = "admin" | "lead";

export interface Lead {
  id: string;
  name: string;
  score: number;
  history: number[]; // score over time
  avatarHue: number;
}

export interface NotificationItem {
  id: string;
  message: string;
  ts: number;
}

export interface AppUser {
  name: string;
  role: Role;
}

interface AppStore {
  user: AppUser | null;
  leads: Lead[];
  notifications: NotificationItem[];
  signIn: (user: AppUser) => void;
  signOut: () => void;
  addNotification: (message: string) => void;
}

const initialLeads: Lead[] = [
  {
    id: "l1",
    name: "Aisha Khan",
    score: 420,
    history: [320, 340, 355, 370, 390, 405, 420],
    avatarHue: 265,
  },
  {
    id: "l2",
    name: "Rohan Mehta",
    score: 380,
    history: [280, 300, 320, 335, 350, 365, 380],
    avatarHue: 210,
  },
  {
    id: "l3",
    name: "Sara Ali",
    score: 445,
    history: [330, 350, 372, 390, 410, 430, 445],
    avatarHue: 190,
  },
  {
    id: "l4",
    name: "Vikram Singh",
    score: 295,
    history: [210, 230, 245, 255, 270, 285, 295],
    avatarHue: 12,
  },
  {
    id: "l5",
    name: "Neha Verma",
    score: 360,
    history: [260, 275, 290, 310, 330, 345, 360],
    avatarHue: 300,
  },
];

const AppStoreCtx = createContext<AppStore | null>(null);

function usePersistentState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [key, state]);
  return [state, setState] as const;
}

export const AppStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = usePersistentState<AppUser | null>("app_user", null);
  const [leads, setLeads] = usePersistentState<Lead[]>(
    "app_leads",
    initialLeads,
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const timerRef = useRef<number | null>(null);

  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => b.score - a.score);
  }, [leads]);

  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setLeads((prev) => {
        const next = prev.map((l) => {
          const bump = Math.random() < 0.4 ? Math.floor(Math.random() * 6) : 0; // 0-5
          const newScore = l.score + bump;
          const newHistory = [...l.history.slice(-20), newScore];
          return { ...l, score: newScore, history: newHistory };
        });
        const winner = [...next].sort((a, b) => b.score - a.score)[0];
        if (winner && Math.random() < 0.5) {
          addNotification(
            `${winner.name} is on fire! +${Math.max(1, winner.score - (prev.find((p) => p.id === winner.id)?.score ?? winner.score))} points`,
          );
        }
        return next;
      });
    }, 4000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [setLeads]);

  const signIn = (u: AppUser) => setUser(u);
  const signOut = () => setUser(null);
  const addNotification = (message: string) =>
    setNotifications((n) =>
      [{ id: crypto.randomUUID(), message, ts: Date.now() }, ...n].slice(0, 20),
    );

  const value: AppStore = {
    user,
    leads: sortedLeads,
    notifications,
    signIn,
    signOut,
    addNotification,
  };

  return <AppStoreCtx.Provider value={value}>{children}</AppStoreCtx.Provider>;
};

export const useAppStore = () => {
  const ctx = useContext(AppStoreCtx);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
};

export function getBadgeForScore(score: number): {
  label: string;
  color: string;
} {
  if (score >= 500)
    return { label: "Legend", color: "from-fuchsia-400 to-cyan-400" };
  if (score >= 400)
    return { label: "Platinum", color: "from-violet-400 to-sky-400" };
  if (score >= 300)
    return { label: "Gold", color: "from-amber-300 to-yellow-400" };
  if (score >= 200)
    return { label: "Silver", color: "from-slate-300 to-slate-100" };
  return { label: "Bronze", color: "from-orange-300 to-amber-400" };
}
