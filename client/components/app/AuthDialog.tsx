import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAppStore, type Role } from "@/store/app-store";

export function AuthDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { signIn } = useAppStore();
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("lead");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-[hsla(var(--glass-bg))] text-white backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>
            Choose a role to explore the app. For production auth, connect
            Supabase in MCP.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="border-white/20 bg-white/10 text-white placeholder:text-white/60"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => setRole("lead")}
              className={`bg-white/10 ${role === "lead" ? "ring-2 ring-brand-blue" : ""}`}
            >
              Campus Lead
            </Button>
            <Button
              onClick={() => setRole("admin")}
              className={`bg-white/10 ${role === "admin" ? "ring-2 ring-brand-purple" : ""}`}
            >
              Admin
            </Button>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="border-white/20 bg-transparent text-white"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={!name.trim()}
            className="bg-gradient-to-r from-brand-blue to-brand-purple"
            onClick={() => {
              signIn({ name: name.trim(), role });
              onOpenChange(false);
            }}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
