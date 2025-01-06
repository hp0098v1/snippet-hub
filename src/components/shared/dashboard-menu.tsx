import { User } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DASHBOARD_LINKS } from "@/constants";

export function DashboardMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild aria-label="منوی کاربری" title="منوی کاربری">
        <Button size="icon" variant="ghost">
          <User className="h-4 w-4" />
          <span className="sr-only">منوی کاربری</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {DASHBOARD_LINKS.map((link) => (
          <DropdownMenuItem
            asChild
            dir="rtl"
            key={`dashboard-link-${link.href}`}
          >
            <Link className="flex w-full items-center" href={link.href}>
              <link.icon className="ml-2 h-4 w-4" />
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
