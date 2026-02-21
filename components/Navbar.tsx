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
import { Bell, PhoneCall } from "lucide-react";
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
      link: "/terms&condition",
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


  const navItems = session?.user?.email ? navItemsAfterLogin : navItemsBeforeLogin;

  return (
    <div className="w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />

          <div className="flex items-center gap-3  ">
              <NavbarButton variant="critical" as={Link} href="tel:+102" className="p-2.5">
                <PhoneCall 
                 className="h-4 w-4" strokeWidth={2.5} />
              </NavbarButton>
            {session?.user && (
             <NavbarButton variant="critical" as={Link} href="/notification" className="p-2.5">
                <Bell className="h-4 w-4" strokeWidth={2.5} />
              </NavbarButton>
            )}
            <LoginDialog sessionUser={session?.user?.email} name="Login" />
          </div>
        </NavBody>

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
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-4 text-lg font-bold text-black hover:text-black/80 transition-colors border-b-2 border-black last:border-0"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 gap-4 flex items-center justify-center">
              <NavbarButton variant="critical" as={Link} href="tel:+102" className="p-2.5">
                <PhoneCall 
                 className="h-4 w-4" strokeWidth={2.5} />
              </NavbarButton>
              <LoginDialog sessionUser={session?.user?.email} name="Login"/>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default NavbarDemo;