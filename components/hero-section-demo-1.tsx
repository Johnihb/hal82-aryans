"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MapPin, Shield, Phone, Navigation, Zap, Users, ArrowRight, ChevronRight, UserPlus, ShieldCheck, Pointer, Activity } from "lucide-react";
import LoginDialog from "./LoginDialog";

const SafeHighlight = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-blue-500 px-4 py-2 rounded-sm transform -rotate-1 shadow-lg text-white inline-block">
    {children}
  </span>
);

const ConnectedHighlight = ({ children }: { children: React.ReactNode }) => (
  <span className="flex items-center bg-red-500 px-4 py-2 rounded-sm transform rotate-1 shadow-lg text-white inline-block">
    {children}
  </span>
);

const ShimmerPulseIcon = () => (
  <div className="relative ml-4 flex items-center">
    {/* Ghost icon for background */}
    <Activity className="h-8 w-8 md:h-12 md:w-12 text-white/20" />

    {/* Glowing icon sweep */}
    <motion.div
      className="absolute inset-0 overflow-hidden"
      animate={{
        clipPath: [
          "inset(0 100% 0 0)",
          "inset(0 0% 0 0)",
          "inset(0 0% 0 100%)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Activity className="h-8 w-8 md:h-12 md:w-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]" />
    </motion.div>

    {/* Subtle shimmer line */}
    <motion.div
      className="absolute top-0 bottom-0 w-1 bg-white/80 blur-[2px]"
      animate={{
        left: ["0%", "100%"],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

export default function HeroSectionOne() {
  const features = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Real-time Tracking",
      description: "Advanced GPS mapping for pinpoint location accuracy at every moment.",
      color: "text-blue-600",
      bg: "bg-blue-50",
      hoverShadow: "hover:shadow-blue-600/5",
      hoverBorder: "hover:border-blue-600/30",
      iconHover: "group-hover:bg-blue-600",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Emergency Contacts",
      description: "Instant access to verified emergency contacts when you need them most.",
      color: "text-red-600",
      bg: "bg-red-50",
      hoverShadow: "hover:shadow-red-600/5",
      hoverBorder: "hover:border-red-600/30",
      iconHover: "group-hover:bg-red-600",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "SMS Verification",
      description: "Bank-grade phone verification to keep your account secure.",
      color: "text-gray-600",
      bg: "bg-gray-50",
      hoverShadow: "hover:shadow-gray-600/5",
      hoverBorder: "hover:border-gray-600/30",
      iconHover: "group-hover:bg-gray-600",
    },
    {
      icon: <Navigation className="h-6 w-6" />,
      title: "Multi-modal Routing",
      description: "Drive, cycle, or walk — smart routes tailored to you.",
      color: "text-purple-600",
      bg: "bg-purple-50",
      hoverShadow: "hover:shadow-purple-600/5",
      hoverBorder: "hover:border-purple-600/30",
      iconHover: "group-hover:bg-purple-600",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI Assistant",
      description: "Intelligent AI-powered support available around the clock.",
      color: "text-amber-600",
      bg: "bg-amber-50",
      hoverShadow: "hover:shadow-amber-600/5",
      hoverBorder: "hover:border-amber-600/30",
      iconHover: "group-hover:bg-amber-600",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Close Ones Network",
      description: "Build a trusted circle for enhanced personal safety.",
      color: "text-teal-600",
      bg: "bg-teal-50",
      hoverShadow: "hover:shadow-teal-600/5",
      hoverBorder: "hover:border-teal-600/30",
      iconHover: "group-hover:bg-teal-600",
    },
  ];
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      {/* ─── Hero Section ─── */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl"
        >

          <h1 className="mb-8 text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl flex items-center justify-center flex-wrap gap-x-4">
            <SafeHighlight>Stay Safe,</SafeHighlight>
            <ConnectedHighlight>
              Stay Connected
              <ShimmerPulseIcon />
            </ConnectedHighlight>
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-neutral-600 md:text-xl">
            The world's most intuitive safety companion. Real-time tracking,
            emergency response, and AI assistance — all on one clean, reliable platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* <Link href="/dashboard">
              <Button className="h-14 rounded-sm border-2 border-black bg-black px-10 text-base font-bold tracking-wide text-white transition-all hover:bg-neutral-800 active:scale-95">
                Join Now — It's Free
              </Button>
            </Link> */}
             <LoginDialog sessionUser={''} name="Join Now — It's Free"/>
            <Link href="/terms&condition">
              <Button variant="outline" className="h-14 rounded-sm border-2 border-black bg-white px-10 text-base font-bold tracking-wide text-black transition-all hover:bg-neutral-50 active:scale-95">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── Features Grid ─── */}
      <section id="about" className="bg-neutral-50 px-6 py-32 border-y border-neutral-100">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-3xl font-black text-gray-950 md:text-5xl"> Built for Certainty</h2>
            <p className="mx-auto max-w-xl text-neutral-600">Powerful features designed to keep you safe in any situation.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={cn(
                  "group rounded-3xl border border-neutral-200 bg-white p-8 transition-all hover:shadow-2xl",
                  feature.hoverBorder,
                  feature.hoverShadow
                )}
              >
                <div className={cn(
                  "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors group-hover:text-white",
                  feature.bg,
                  feature.color,
                  feature.iconHover
                )}>
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-950">{feature.title}</h3>
                <p className="leading-relaxed text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works Section ─── */}
      <section id="how-it-works" className="px-6 py-32 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <span className="mb-4 inline-block text-sm font-bold tracking-widest text-gray-600 uppercase">
              Simple & Fast
            </span>
            <h2 className="mb-4 text-3xl font-black text-gray-950 md:text-5xl">How it Works</h2>
            <p className="mx-auto max-w-xl text-neutral-600">Join 50k+ users who trust Emergen for their peace of mind.</p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                icon: <UserPlus className="h-8 w-8" />,
                title: "Create Account",
                desc: "Sign up in seconds and verify your identity for absolute security.",
                step: "01",
                circleBg: "bg-indigo-50",
                circleText: "text-indigo-700",
                circleHoverBg: "group-hover:bg-indigo-700",
                circleHoverText: "group-hover:text-white",
                ringShadow: "shadow-indigo-700/5"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Add Network",
                desc: "Link your trusted emergency contacts and closest friends.",
                step: "02",
                circleBg: "bg-teal-50",
                circleText: "text-teal-700",
                circleHoverBg: "group-hover:bg-teal-700",
                circleHoverText: "group-hover:text-white",
                ringShadow: "shadow-teal-700/5"
              },
              {
                icon: <ShieldCheck className="h-8 w-8" />,
                title: "Stay Protected",
                desc: "Our AI and network keep watch, ready to assist 24/7.",
                step: "03",
                circleBg: "bg-red-50",
                circleText: "text-red-700",
                circleHoverBg: "group-hover:bg-red-700",
                circleHoverText: "group-hover:text-white",
                ringShadow: "shadow-red-700/5"
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative text-center group"
              >
                <div className={cn(
                  "mb-8 mx-auto flex h-20 w-20 items-center justify-center rounded-3xl transition-all group-hover:scale-105 shadow-sm",
                  step.circleBg,
                  step.circleText,
                  step.circleHoverBg,
                  step.circleHoverText,
                  step.ringShadow
                )}>
                  {step.icon}
                  <span className={cn(
                    "absolute -top-2 -right-2 text-4xl font-black",
                    "text-black/10",
                    "group-hover:text-white/20"
                  )}>
                    {step.step}
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-950">{step.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{step.desc}</p>

                {idx < 2 && (
                  <div className="hidden lg:block absolute top-10 -right-6 w-12 text-neutral-200">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-24 text-center">
            {/* <Link href="/dashboard">
              <Button className="h-16 rounded-sm border-2 border-black bg-black px-12 text-lg font-bold tracking-wide text-white transition-all hover:bg-neutral-800 active:scale-95">
                Ready to take control? Start Now
              </Button>
            </Link> */}
                
             <LoginDialog sessionUser={''} name="Ready to take control? Start Now"/>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer id="policy" className="border-t border-neutral-100 bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="mb-6 flex items-center gap-3">
                <img src="/logo.svg" alt="Emergen Logo" className="h-12 w-12 object-contain" />
              </div>
              <p className="max-w-xs text-neutral-500">
                Building a safer world through connection and intelligent assistance.
              </p>
            </div>
            {['Features', 'Support', 'Legal'].map((title) => (
              <div key={title}>
                <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-950">{title}</h4>
                <ul className="space-y-4 text-neutral-500" id="contact">
                  {title === 'Features' && ['Location Tracking', 'Emergency Contacts', 'AI Assistant'].map(l => <li key={l} className="hover:text-red-600 cursor-pointer transition-colors">{l}</li>)}
                  {title === 'Support' && ['Help Center', 'Contact Us <br /> keshwor12@gmail.com', 'Privacy Policy'].map(l => <li key={l} className="hover:text-red-600 cursor-pointer transition-colors" dangerouslySetInnerHTML={{ __html: l }} />)}
                  {title === 'Legal' && ['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map(l => <li key={l} className="hover:text-red-600 cursor-pointer transition-colors">{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-20 border-t border-neutral-100 pt-10 text-center text-sm text-neutral-400">
            © {new Date().getFullYear()} Emergen. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
