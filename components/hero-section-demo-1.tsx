"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MapPin, Shield, Phone, Navigation, Zap, Users, ArrowRight, ChevronRight, UserPlus, ShieldCheck, Pointer, Activity } from "lucide-react";

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
      color: "text-green-600",
      bg: "bg-green-50",
      hoverShadow: "hover:shadow-green-600/5",
      hoverBorder: "hover:border-green-600/30",
      iconHover: "group-hover:bg-green-600",
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

          <h1 className="mb-8 text-4xl font-black tracking-tight text-green-950 md:text-6xl lg:text-7xl flex items-center justify-center flex-wrap gap-x-4">
            <span className="text-blue-700">Stay Safe,</span>
            <span className="flex items-center text-red-600">
              Stay Connected
              <Activity className="ml-2 h-8 w-8 md:h-12 md:w-12 text-red-600 animate-pulse" />
            </span>
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-neutral-600 md:text-xl">
            The world's most intuitive safety companion. Real-time tracking,
            emergency response, and AI assistance — all on one clean, reliable platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard">
              <button className="h-14 rounded-full bg-blue-700 px-10 text-base font-bold text-white transition-all hover:bg-blue-800 hover:shadow-xl active:scale-95">
                Join Now — It's Free
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="h-14 rounded-full border-2 border-neutral-200 bg-white px-10 text-base font-bold text-green-950 transition-all hover:border-green-600 hover:text-green-600 active:scale-95">
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── Features Grid ─── */}
      <section id="about" className="bg-neutral-50 px-6 py-32 border-y border-neutral-100">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-3xl font-black text-green-950 md:text-5xl"> Built for Certainty</h2>
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
                <h3 className="mb-3 text-xl font-bold text-green-950">{feature.title}</h3>
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
            <span className="mb-4 inline-block text-sm font-bold tracking-widest text-green-600 uppercase">
              Simple & Fast
            </span>
            <h2 className="mb-4 text-3xl font-black text-green-950 md:text-5xl">How it Works</h2>
            <p className="mx-auto max-w-xl text-neutral-600">Join 50k+ users who trust Emergen for their peace of mind.</p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                icon: <UserPlus className="h-8 w-8" />,
                title: "Create Account",
                desc: "Sign up in seconds and verify your identity for absolute security.",
                step: "01"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Add Network",
                desc: "Link your trusted emergency contacts and closest friends.",
                step: "02"
              },
              {
                icon: <ShieldCheck className="h-8 w-8" />,
                title: "Stay Protected",
                desc: "Our AI and network keep watch, ready to assist 24/7.",
                step: "03"
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
                <div className="mb-8 mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-600 transition-all group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white shadow-lg shadow-green-600/5">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 text-4xl font-black text-green-600/10 group-hover:text-white/20">
                    {step.step}
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-green-950">{step.title}</h3>
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
            <Link href="/dashboard">
              <button className="h-16 rounded-full bg-green-950 px-12 text-lg font-bold text-white transition-all hover:bg-green-900 hover:shadow-2xl hover:shadow-green-950/20 active:scale-95">
                Ready to take control? Start Now
              </button>
            </Link>
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
                <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-green-950">{title}</h4>
                <ul className="space-y-4 text-neutral-500">
                  {title === 'Features' && ['Location Tracking', 'Emergency Contacts', 'AI Assistant'].map(l => <li key={l} className="hover:text-red-600 cursor-pointer transition-colors">{l}</li>)}
                  {title === 'Support' && ['Help Center', 'Contact Us', 'Privacy Policy'].map(l => <li key={l} className="hover:text-red-600 cursor-pointer transition-colors">{l}</li>)}
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

