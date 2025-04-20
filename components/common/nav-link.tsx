"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({href,children,className}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = (pathname === href) || (href !== "/" && pathname.startsWith(href));
  return (
    <Link href={href} 
      className={cn("transition-colors text-l duration-200 text-gray-700 hover:text-emerald-600",
        className,
        isActive && "text-emerald-600"
      )} aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
