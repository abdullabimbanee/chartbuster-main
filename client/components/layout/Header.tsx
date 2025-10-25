import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { NotificationBell } from "@/components/app/NotificationBell";
import { AuthDialog } from "@/components/app/AuthDialog";
import { useState } from "react";

export function Header() {
  const { user, signOut } = useAppStore();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[hsla(var(--glass-bg))] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple shadow-[0_0_24px_hsl(var(--brand-blue)/0.6)]" />
          <span className="font-display text-lg font-semibold tracking-wide bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
            Chartbuster
          </span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm ${isActive ? "text-white" : "text-white/70 hover:text-white"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm ${isActive ? "text-white" : "text-white/70 hover:text-white"}`
            }
          >
            Leaderboard
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm ${isActive ? "text-white" : "text-white/70 hover:text-white"}`
            }
          >
            Campus Lead
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm ${isActive ? "text-white" : "text-white/70 hover:text-white"}`
            }
          >
            Admin
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <NotificationBell />
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-white/70 sm:inline">
                {user.role.toUpperCase()}
              </span>
              <Button
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                onClick={signOut}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <Button
              className="bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-[0_0_24px_hsl(var(--brand-blue)/0.5)]"
              onClick={() => setOpen(true)}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
      <AuthDialog open={open} onOpenChange={setOpen} />
    </header>
  );
}
