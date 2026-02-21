"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Activity } from "lucide-react";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl"
      >
        <h1 className="mb-8 flex flex-wrap items-center justify-center gap-x-4 text-5xl font-black tracking-tight text-black md:text-6xl lg:text-7xl">
          <span>Stay Safe,</span>
          <span className="flex items-center text-red-600">
            Stay Connected
            <Activity className="ml-2 h-8 w-8 animate-pulse text-red-600 md:h-12 md:w-12" />
          </span>
        </h1>
        <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-neutral-600 md:text-xl">
          The world's most intuitive safety companion. Real-time tracking,
          emergency response, and AI assistance — all on one clean, reliable platform.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            className="h-14 rounded-sm border-2 border-black bg-black px-10 text-base font-bold tracking-wide text-white transition-all hover:bg-neutral-800 active:scale-95"
          >
            <Link href="/dashboard">Join Now — It's Free</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-14 rounded-sm border-2 border-black bg-white px-10 text-base font-bold tracking-wide text-black transition-all hover:bg-neutral-100 active:scale-95"
          >
            <Link href="/dashboard">Learn More</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
