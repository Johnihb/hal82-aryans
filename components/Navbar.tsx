"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { auth } from "@/lib/auth";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LoginDialog from "./LoginDialog";

type Session = typeof auth.$Infer.Session;

function NavbarDemo({ session }: { session: Session | null }) {
  const navItemsBeforeLogin = [
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Contact Us",
      link: "#contact",
    },
    {
      name: "Policy",
      link: "#policy",
    },
  ];

  const navItemsAfterLogin = [
    {
      name: "Map",
      link: "/map",
    },
    {
      name: "Assistant",
      link: "/assistant",
    },
    {
      name: "Contact",
      link: "/contacts",
    },
  ]


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  return (
    <div className="w-full text-black">
      <Navbar>
        {/* Desktop Navigation */}

        <NavBody>
          <NavbarLogo />
          {
            session?.user?.email ?
              <NavItems items={navItemsAfterLogin} /> : <NavItems items={navItemsBeforeLogin} />
          }

          <div className="flex items-center gap-3">
            {session?.user && (
              <NavbarButton variant="secondary" className="rounded-full text-neutral-500 hover:text-red-600 p-2">
                <Link href={"/notification"}>
                  <Bell className="h-5 w-5" />
                </Link>
              </NavbarButton>
            )}
            <LoginDialog sessionUser={session?.user?.email} />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {(session?.user?.email ? navItemsAfterLogin : navItemsBeforeLogin).map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-lg font-semibold text-neutral-800 hover:text-red-600 transition-colors border-b border-neutral-50 last:border-0"
              >
                {item.name}
              </Link>
            ))
            }
            <div className="pt-4">
              <LoginDialog sessionUser={session?.user?.email} />
            </div>
          </MobileNavMenu>{" "}
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}

export default NavbarDemo;
