"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { MapPin, Shield, Phone, Navigation, Zap, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type FeatureVariant = "default" | "critical" | "info";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant: FeatureVariant;
}

const features: Feature[] = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Real-time Tracking",
    description: "Advanced GPS mapping for pinpoint location accuracy at every moment.",
    variant: "info",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Emergency Contacts",
    description: "Instant access to verified emergency contacts when you need them most.",
    variant: "critical",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "SMS Verification",
    description: "Bank-grade phone verification to keep your account secure.",
    variant: "default",
  },
  {
    icon: <Navigation className="h-6 w-6" />,
    title: "Multi-modal Routing",
    description: "Drive, cycle, or walk — smart routes tailored to you.",
    variant: "info",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "AI Assistant",
    description: "Intelligent AI-powered support available around the clock.",
    variant: "default",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Close Ones Network",
    description: "Build a trusted circle for enhanced personal safety.",
    variant: "default",
  },
];

function getIconStyles(variant: FeatureVariant) {
  switch (variant) {
    case "critical":
      return "bg-red-600 text-white border-2 border-black";
    case "info":
      return "bg-white text-blue-600 border-2 border-black";
    default:
      return "bg-white text-black border-2 border-black";
  }
}

function getTitleStyles(variant: FeatureVariant) {
  switch (variant) {
    case "critical":
      return "text-red-600";
    case "info":
      return "text-blue-600";
    default:
      return "text-black";
  }
}

function getCardStyles(variant: FeatureVariant) {
  switch (variant) {
    case "critical":
      return "border-red-600 bg-white hover:bg-red-50/50";
    case "info":
      return "border-black bg-white hover:bg-neutral-50";
    default:
      return "border-black bg-white hover:bg-neutral-50";
  }
}

export default function FeaturesGrid() {
  return (
    <section id="about" className="border-y border-black/10 bg-neutral-50 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-3xl font-black text-black md:text-5xl">
            Built for Certainty
          </h2>
          <p className="mx-auto max-w-xl text-neutral-600">
            Powerful features designed to keep you safe in any situation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card
                className={cn(
                  "group flex flex-col gap-4 rounded-sm border-2 p-8 shadow-none transition-all duration-300 ease-out cursor-pointer",
                  getCardStyles(feature.variant)
                )}
              >
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-sm shrink-0",
                    getIconStyles(feature.variant)
                  )}
                >
                  {feature.icon}
                </div>
                <CardHeader className="p-0">
                  <CardTitle
                    className={cn(
                      "text-xl font-bold",
                      getTitleStyles(feature.variant)
                    )}
                  >
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="leading-relaxed text-neutral-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
