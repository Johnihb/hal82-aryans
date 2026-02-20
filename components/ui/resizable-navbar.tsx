"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Shield, Activity, ShieldCheck } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";
import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

/* ─────────────────────────────────────────
   Navbar shell — fixed at top, scrolls into
   a pill style once user scrolls past 60px
───────────────────────────────────────── */
export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 60);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible }
          )
          : child
      )}
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Desktop nav body
───────────────────────────────────────── */
export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "none",
        backgroundColor: visible ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,1)",
        boxShadow: visible
          ? "0 1px 0 rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.06)"
          : "0 1px 0 rgba(0,0,0,0.06)",
        paddingLeft: visible ? "20px" : "0px",
        paddingRight: visible ? "20px" : "0px",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 40 }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between lg:flex",
        className
      )}
      style={{ height: "72px" }}
    >
      {/* 
        We use a specific layout structure here:
        Logo (Left, flex-1) | Links (Center, flex-initial) | Action (Right, flex-1)
        This ensures the center links are perfectly centered in the viewport.
      */}
      {React.Children.map(children, (child, idx) => {
        if (idx === 0) return <div className="flex flex-1 justify-start">{child}</div>;
        if (idx === 1) return <div className="flex flex-initial justify-center">{child}</div>;
        if (idx === 2) return <div className="flex flex-1 justify-end">{child}</div>;
        return child;
      })}
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Desktop nav links
───────────────────────────────────────── */
export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative flex flex-row items-center justify-center gap-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          key={`link-${idx}`}
          href={item.link.startsWith("/") || item.link.startsWith("#") ? item.link : `/${item.link}`}
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          className="group relative flex items-center px-4 py-2"
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: hovered === idx ? "#dc2626" : "#374151",
            transition: "color 0.2s ease",
            textDecoration: "none",
          }}
        >
          {hovered === idx && (
            <motion.span
              layoutId="nav-pill"
              className="absolute inset-0 bg-red-50"
              style={{ borderRadius: "8px" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────
   Mobile nav shell
───────────────────────────────────────── */
export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backgroundColor: visible ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,1)",
        boxShadow: visible ? "0 1px 0 rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.07)" : "0 1px 0 rgba(0,0,0,0.06)",
        backdropFilter: visible ? "blur(16px)" : "none",
      }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative z-50 flex w-full flex-col px-5 py-3 lg:hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => (
  <div className={cn("flex w-full flex-row items-center justify-between", className)}>
    {children}
  </div>
);

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18 }}
        className={cn(
          "absolute inset-x-0 top-full z-50 flex w-full flex-col gap-2 border-t border-gray-100 bg-white px-5 py-5 shadow-lg",
          className
        )}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={isOpen ? "Close menu" : "Open menu"}
    style={{
      padding: "6px",
      borderRadius: "6px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "#374151",
      display: "flex",
      alignItems: "center",
    }}
  >
    {isOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
  </button>
);

/* ─────────────────────────────────────────
   Logo
───────────────────────────────────────── */
export const NavbarLogo = () => (
  <Link
    href="/"
    className="flex items-center no-underline shrink-0 group"
  >
    <img
      src="/logo.svg"
      alt="Emergen Logo"
      className="h-10 w-10 md:h-12 md:w-12 object-contain transition-transform group-hover:scale-110"
    />
  </Link>
);

/* ─────────────────────────────────────────
   CTA Button (used in Navbar.tsx)
───────────────────────────────────────── */
export const NavbarButton = ({
  href,
  onClick,
  as: Tag,
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  onClick?: () => void;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
    | React.ComponentPropsWithoutRef<"span">
  )) => {
  // NEW branding
  const logoColor = "#052c22"; // deep green

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: "#ffffff",
      color: "#052c22",
      border: "1.5px solid #e5e7eb",
      borderRadius: "8px",
      padding: "8px 18px",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
    },
    secondary: {
      background: "#f9fafb",
      color: "#6b7280",
      border: "none",
      padding: "8px 14px",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
    },
    dark: {
      background: "#052c22",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      padding: "8px 18px",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
    },
    gradient: {
      background: "#1d4ed8",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      padding: "8px 18px",
      fontSize: "14px",
      fontWeight: 700,
      cursor: "pointer",
    },
  };

  const Component = Tag || (href ? "a" : onClick ? "button" : "span");

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn("inline-block text-center transition-all duration-150 hover:-translate-y-px", className)}
      style={variantStyles[variant]}
      {...props}
    >
      {children}
    </Component>
  );
};
