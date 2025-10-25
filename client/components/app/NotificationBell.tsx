import { Bell } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NotificationBell() {
  const { notifications } = useAppStore();
  const unread = notifications.length;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative rounded-full p-2 text-white/80 hover:bg-white/10">
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-[10px] text-white">
            {unread}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-72 border-white/10 bg-[hsla(var(--glass-bg))] text-white backdrop-blur-xl"
      >
        <DropdownMenuLabel>Motivation feed</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        {notifications.length === 0 ? (
          <DropdownMenuItem className="text-white/70">
            No notifications yet
          </DropdownMenuItem>
        ) : (
          notifications.slice(0, 8).map((n) => (
            <DropdownMenuItem
              key={n.id}
              className="flex flex-col items-start gap-1 whitespace-normal text-white"
            >
              <span>{n.message}</span>
              <span className="text-xs text-white/60">
                {new Date(n.ts).toLocaleTimeString()}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
