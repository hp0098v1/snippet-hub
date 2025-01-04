import Link from "next/link";

import { DASHBOARD_LINKS } from "@/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function DashboardMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger title="منوی کاربری" aria-label="منوی کاربری" asChild>
        <Button variant="ghost" size="icon">
          <User className="h-4 w-4" />
          <span className="sr-only">منوی کاربری</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {DASHBOARD_LINKS.map((link) => (
          <DropdownMenuItem
            dir="rtl"
            key={`dashboard-link-${link.href}`}
            asChild
          >
            <Link href={link.href} className="flex w-full items-center">
              <link.icon className="ml-2 h-4 w-4" />
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
