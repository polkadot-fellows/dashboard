"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { routes } from "@/lib/utils";
import { Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const linkStyle = (pathname: string, link: string) => {
  return `link ${
    pathname === link
      ? "bg-accent text-accent-foreground "
      : "text-muted-foreground"
  } flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`;
};

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Image
          src="/img/polkadotIcon.svg"
          width="100"
          height="100"
          style={{
            maxHeight: "100%",
          }}
          alt="Picture of the author"
        />
        {routes.map((r) => (
          <Tooltip key={r.name}>
            <TooltipTrigger asChild>
              <Link
                className={linkStyle(pathname, "/" + (r.link || ""))}
                href={`/${r.link || ""}`}
              >
                <r.icon className="h-5 w-5" />
                <span className="sr-only">{r.name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{r.name}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings2 className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};
