"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";
import React, { createContext, useContext, useRef, useState } from "react";

/* ─────────────────────────────────────────
   Navbar scroll state — invert colors when scrolled
───────────────────────────────────────── */
const NavbarContext = createContext<{ scrolled: boolean }>({ scrolled: false });
export const useNavbarScrolled = () => useContext(NavbarContext).scrolled;

/* ─────────────────────────────────────────
   Monochrome Navbar Design Tokens
   Only black, white and gray derivatives for minimal aesthetics
───────────────────────────────────────── */
const tokens = {
  bg: {
    base: "#FFFFFF",
    scroll: "#000000",
    hover: "#F5F5F5",
    subtleHover: "rgba(0,0,0,0.04)",
  },
  text: {
    primary: "#000000",
    secondary: "#6B6B6B",
    inverse: "#FFFFFF",
    critical: "#1F1F1F",
  },
  border: {
    subtle: "1px solid #E5E5E5",
    strong: "2px solid #000000",
  },
  radius: "10px",
};

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
   Navbar shell — fixed at top, transforms
   to inverted B&W pill on scroll
───────────────────────────────────────── */
export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <NavbarContext.Provider value={{ scrolled }}>
      <motion.div
        ref={ref}
        className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible: scrolled }
              )
            : child
        )}
      </motion.div>
    </NavbarContext.Provider>
  );
};

/* ─────────────────────────────────────────
   Desktop nav body — high contrast, sharp
───────────────────────────────────────── */
export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backgroundColor: visible ? "rgba(255,255,255,0.6)" : tokens.bg.base,
        backdropFilter: visible ? "saturate(120%) blur(8px)" : "none",
        WebkitBackdropFilter: visible ? "saturate(120%) blur(8px)" : "none",
        boxShadow: visible ? "0 8px 24px rgba(0,0,0,0.06)" : "none",
        borderBottom: visible ? tokens.border.subtle : tokens.border.subtle,
        borderRadius: visible ? tokens.radius : "0px",
        overflow: "hidden",
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
   Desktop nav links — bold, large, red on hover
───────────────────────────────────────── */
export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  // Do not change button styles based on scroll — keep consistent appearance
  const { scrolled } = useContext(NavbarContext);

  // Keep nav text dark to read against the translucent/blurred background
  const textColor = tokens.text.primary;
  const hoverColor = tokens.text.secondary;
  const pillBg = scrolled ? "rgba(255,255,255,0.06)" : tokens.bg.subtleHover;

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative flex flex-row items-center justify-center gap-1",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          key={`link-${idx}`}
          href={item.link.startsWith("/") || item.link.startsWith("#") ? item.link : `/${item.link}`}
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          className="group relative flex items-center px-5 py-3"
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: hovered === idx ? hoverColor : textColor,
            transition: "color 0.15s ease",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          {hovered === idx && (
            <motion.span
              layoutId="nav-pill"
              className="absolute inset-0"
              style={{
                backgroundColor: pillBg,
                borderRadius: tokens.radius,
                boxShadow: scrolled
                  ? "0 6px 18px rgba(255,255,255,0.04)"
                  : "0 6px 18px rgba(0,0,0,0.06)",
              }}
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
        backgroundColor: visible ? "rgba(255,255,255,0.7)" : tokens.bg.base,
        backdropFilter: visible ? "saturate(120%) blur(8px)" : "none",
        WebkitBackdropFilter: visible ? "saturate(120%) blur(8px)" : "none",
        boxShadow: visible ? "0 8px 24px rgba(0,0,0,0.06)" : "none",
        borderBottom: visible ? tokens.border.subtle : tokens.border.subtle,
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
          "absolute inset-x-0 top-full z-50 flex w-full flex-col gap-0 border-t-2 border-black bg-white px-5 py-5",
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
}) => {
  const { scrolled } = useContext(NavbarContext);
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className={cn(
        "flex items-center justify-center p-2 border-2 transition-colors",
        scrolled
          ? "border-black bg-transparent text-black hover:bg-black/6 hover:text-white"
          : "border-black bg-white text-black hover:bg-black hover:text-white"
      )}
      style={{ borderRadius: tokens.radius }}
    >
      {isOpen ? <IconX size={20} strokeWidth={2.5} /> : <IconMenu2 size={20} strokeWidth={2.5} />}
    </button>
  );
};

/* ─────────────────────────────────────────
   Logo — sharp, minimal, inverts when scrolled
───────────────────────────────────────── */
export const NavbarLogo = () => {
  const { scrolled } = useContext(NavbarContext);
  return (
    <Link
      href="/"
      className="flex items-center no-underline shrink-0  overflow-hidden"
    >
      <img
        src="/logo.jpeg"
        alt="Emergen Logo"
        className={cn(
          "h-20 w-20 md:h-12 md:w-12 object-cover transition-all duration-200 rounded-full"
        )}
      />
    </Link>
  );
};

/* ─────────────────────────────────────────
   Navbar Button — high contrast variants
   primary = black (urgent CTA), secondary = ghost,
   critical = red (alerts/danger), info = blue (sparingly)
   Inverts when navbar is scrolled (dark bg)
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
  variant?: "primary" | "secondary" | "critical" | "info";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
  | React.ComponentPropsWithoutRef<"span">
)) => {
  const { scrolled } = useContext(NavbarContext);

  const baseStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: "#000000",
      color: "#FFFFFF",
      border: "2px solid #000000",
      borderRadius: tokens.radius,
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: 700,
      cursor: "pointer",
      letterSpacing: "0.04em",
    },
    secondary: {
      background: "transparent",
      color: "#6B6B6B",
      border: "2px solid #E5E5E5",
      borderRadius: tokens.radius,
      padding: "10px 18px",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
    },
    critical: {
      background: "#FFFFFF",
      color: "#000000",
      border: "2px solid #000000",
      borderRadius: tokens.radius,
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: 700,
      cursor: "pointer",
      letterSpacing: "0.04em",
    },
    info: {
      background: "#F5F5F5",
      color: "#000000",
      border: "2px solid #E5E5E5",
      borderRadius: tokens.radius,
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
    },
  };

  const variantStyles = baseStyles;
  const style = variantStyles[variant];

  // Use base (non-scrolled) hover styles to avoid scroll-based visual changes
  const hoverStyles: Record<string, string> = {
    primary: "hover:bg-neutral-800 hover:border-neutral-800",
    secondary: "hover:border-black hover:text-black hover:bg-black/6",
    critical: "hover:bg-neutral-100 hover:border-neutral-900",
    info: "hover:bg-neutral-100 hover:border-neutral-200",
  };

  const Component = Tag || (href ? "a" : onClick ? "button" : "span");

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center text-center transition-all duration-150",
        hoverStyles[variant],
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};
