"use client";

import React from 'react';
import { motion } from "motion/react";
import Link from 'next/link';
import {
  Shield,
  FileText,
  MapPin,
  ShieldAlert,
  Wifi,
  Cpu,
  Database,
  Lock,
  Scale,
  RefreshCw,
  Mail,
  ChevronLeft,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const Section = ({ id, title, icon: Icon, children, delay = 0 }: { id: string, title: string, icon: any, children: React.ReactNode, delay?: number }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="mb-8 scroll-mt-24"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-neutral-50 rounded-lg text-neutral-900 border border-neutral-100 shadow-sm">
        <Icon size={18} strokeWidth={2} />
      </div>
      <h2 className="text-xl font-bold tracking-tight text-neutral-900">{title}</h2>
    </div>
    <div className="pl-4 border-l border-neutral-100 space-y-3 text-neutral-600 leading-relaxed text-base">
      {children}
    </div>
  </motion.section>
);

const TermsAndConditions = () => {
  const sections = [
    { id: "description", title: "1. Service Description", icon: FileText },
    { id: "responsibilities", title: "2. User Responsibilities", icon: MapPin },
    { id: "emergency", title: "3. Emergency Disclaimer", icon: ShieldAlert },
    { id: "connectivity", title: "4. Data & Connectivity", icon: Wifi },
    { id: "ai", title: "5. AI Assistant", icon: Cpu },
    { id: "privacy", title: "6. Privacy", icon: Database },
    { id: "prohibited", title: "7. Prohibited Uses", icon: Lock },
    { id: "liability", title: "8. Liability", icon: Scale },
    { id: "modifications", title: "9. Modifications", icon: RefreshCw },
    { id: "contact", title: "10. Contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* --- Header --- */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="group flex items-center gap-2 hover:bg-neutral-50 rounded-full h-10">
              <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span className="font-semibold text-sm">Return</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-500">
            <Shield size={12} />
            February 21, 2026
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">
        {/* --- Sidebar Navigation (Desktop) --- */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 px-3">Table of Contents</p>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all group"
              >
                <s.icon size={14} className="group-hover:text-blue-600" />
                {s.title.split('. ')[1]}
              </a>
            ))}
          </div>
        </aside>

        <main>
          {/* --- Condensed Hero --- */}
          <div className="mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 mb-4"
            >
              Terms & <span className="text-neutral-400">Conditions.</span>
            </motion.h1>
            <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl">
              By using Emergen, you agree to the following framework for a safe and secure companion experience.
            </p>
          </div>

          <div className="space-y-1">
            <Section id="description" title="1. Description of Service" icon={FileText}>
              <p>Emergen provides high-fidelity safety tools including:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {[
                  "Real-time GPS Tracking",
                  "Emergency Contacts",
                  "SMS Identity Verification",
                  "Multi-modal Routing",
                  "AI-Powered Support",
                  "Close Ones Network"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                    <div className="h-1 w-1 rounded-full bg-blue-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </Section>

            <Section id="responsibilities" title="2. User Responsibilities" icon={MapPin}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  <h4 className="font-bold text-neutral-900 text-sm mb-1 text-blue-600">Location Sharing</h4>
                  <p className="text-sm">You consent to GPS collection and sharing with designated contacts for safety services.</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  <h4 className="font-bold text-neutral-900 text-sm mb-1 text-green-600">Security & Accuracy</h4>
                  <p className="text-sm">You are responsible for account confidentiality and providing accurate information.</p>
                </div>
              </div>
            </Section>

            <Section id="emergency" title="3. Emergency Services Disclaimer" icon={ShieldAlert}>
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 items-start">
                <ShieldAlert className="text-red-500 shrink-0 mt-0.5" size={18} />
                <p className="text-red-800 text-sm font-semibold leading-relaxed uppercase tracking-wide">
                  NOT A SUBSTITUTE FOR A DOCTOR in an EMERGENCY condition/incident .
                </p>
              </div>
            </Section>

            <Section id="connectivity" title="4. Data and Connectivity" icon={Wifi}>
              <p className="text-sm">Service reliability depends on your device's GPS and network connectivity. We are not liable for signal loss or latency errors.</p>
            </Section>

            <Section id="ai" title="5. AI Assistant Limitations" icon={Cpu}>
              <p className="text-sm">Informational support only. Do not rely on AI for professional medical, legal, or safety advice. Use at your own risk.</p>
            </Section>

            <Section id="privacy" title="6. Privacy and Data Usage" icon={Database}>
              <p className="text-sm">We collect location and contact lists (with permission) solely for safety features. View our full Privacy Policy for details.</p>
            </Section>

            <Section id="prohibited" title="7. Prohibited Uses" icon={Lock}>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {["No Stalking", "No Harassment", "No Illegal Activity"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-medium text-red-600">
                    <span className="h-1 w-1 rounded-full bg-red-400" />
                    {item}
                  </div>
                ))}
              </div>
            </Section>

            <Section id="liability" title="8. Limitation of Liability" icon={Scale}>
              <p className="text-sm">Emergen and affiliates are not liable for any indirect or consequential damages resulting from your use of the Service.</p>
            </Section>

            <Section id="modifications" title="9. Modifications to Terms" icon={RefreshCw}>
              <p className="text-sm">We reserved the right to modify these terms. Continued use after notification constitutes acceptance of new terms.</p>
            </Section>

            <Section id="contact" title="10. Contact Us" icon={Mail}>
              <div className="p-6 bg-neutral-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold">Need assistance?</h4>
                  <p className="text-xs text-neutral-400">Reach out to our support team.</p>
                </div>
                <Button className="bg-white text-black hover:bg-neutral-200 rounded-full h-10 px-6 font-bold text-sm">
                  <Mail size={14} className="mr-2" />
                  keshwor12@gmail.app
                </Button>
              </div>
            </Section>
          </div>

          <footer className="mt-16 pt-8 border-t border-neutral-100 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            <span>© 2026 Emergen Inc.</span>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-black transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-black transition-colors">Support</Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default TermsAndConditions;