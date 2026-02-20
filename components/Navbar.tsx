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

  const navItemsAfterLogin =[
     {
      name: "Map",
      link: "map",
    },
    {
      name: "Assistant",
      link: "assistant",
    },
    {
      name: "Contact",
      link: "contacts",
    },
  ]


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 
  return (
    <div className="relative w-full text-black">
      <Navbar>
        {/* Desktop Navigation */}

        <NavBody>
          <NavbarLogo />
          {
            session?.user?.email ? 
            <NavItems items={navItemsAfterLogin} /> : <NavItems items={navItemsBeforeLogin} />
          }

          <div className="flex items-center gap-4">
            {session?.user && (
              <NavbarButton variant="secondary">
                <Link href={"/notification"}>
                  <Bell className="h-4 w-4" />
                </Link>
              </NavbarButton>
            )}
          <LoginDialog sessionUser={session?.user?.email}/>          
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
            {session?.user?.email ?
            navItemsBeforeLogin.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={`/${item.link}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300 z-[5000]"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))
            :
            navItemsAfterLogin.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={`/${item.link}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300 z-[5000]"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))
            }
            <LoginDialog sessionUser={session?.user?.email }/>
          </MobileNavMenu>{" "}
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}

export default NavbarDemo;
