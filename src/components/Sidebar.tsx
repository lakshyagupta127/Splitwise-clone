"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Flag, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/friends", label: "Friends", icon: Users },
    { href: "/groups", label: "Groups", icon: Flag },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 border-r bg-muted/40 h-screen hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-600 flex items-center gap-2">
          <Flag className="h-6 w-6" />
          Splitwise
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  isActive
                    ? "bg-green-100 text-green-700 font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Settings className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
}
