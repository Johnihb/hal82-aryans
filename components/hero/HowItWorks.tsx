"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { UserPlus, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const steps = [
  {
    icon: <UserPlus className="h-8 w-8" />,
    title: "Create Account",
    desc: "Sign up in seconds and verify your identity for absolute security.",
    step: "01",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Add Network",
    desc: "Link your trusted emergency contacts and closest friends.",
    step: "02",
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Stay Protected",
    desc: "Our AI and network keep watch, ready to assist 24/7.",
    step: "03",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-blue-600">
            Simple & Fast
          </span>
          <h2 className="mb-4 text-3xl font-black text-black md:text-5xl">
            How it Works
          </h2>
          <p className="mx-auto max-w-xl text-neutral-600">
            Join 50k+ users who trust Emergen for their peace of mind.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative text-center"
            >
              <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-sm border-2 border-black bg-white text-black transition-colors group-hover:bg-neutral-100">
                {step.icon}
                <span className="absolute -top-2 -right-2 text-4xl font-black text-black/10">
                  {step.step}
                </span>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-black">{step.title}</h3>
              <p className="leading-relaxed text-neutral-600">{step.desc}</p>

              {idx < 2 && (
                <div className="absolute top-10 -right-6 hidden w-12 text-neutral-300 lg:block">
                  <ArrowRight className="h-8 w-8" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Button
            asChild
            className="h-16 rounded-sm border-2 border-black bg-black px-12 text-lg font-bold tracking-wide text-white transition-all hover:bg-neutral-800 active:scale-95"
          >
            <Link href="/dashboard">Ready to take control? Start Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
