"use client";

import { signOut, signUp } from "@/lib/action/auth-client";
import { auth } from "@/lib/auth";
import { motion } from "motion/react";
import Link from "next/link";
import { MapPin, Shield, Phone, Navigation, Zap, Users } from "lucide-react";

export default function HeroSectionOne() {
  const features = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Real-time Location Tracking",
      description: "Track your location and get directions with our advanced mapping technology."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Emergency Contacts",
      description: "Add and verify emergency contacts for quick access when you need help."
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "SMS Verification",
      description: "Secure phone number verification to keep your account protected."
    },
    {
      icon: <Navigation className="h-6 w-6" />,
      title: "Multi-modal Routing",
      description: "Choose from driving, cycling, or walking directions for your journey."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI Assistant",
      description: "Get intelligent assistance and support through our AI-powered chatbot."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Close One Network",
      description: "Build your trusted network of close contacts for enhanced safety."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center px-4">
        <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
          <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
          <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
          <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>

        <div className="px-4 py-10 md:py-20">
          <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
            {"Stay Safe, Stay Connected"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h1>
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
            }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
          >
            Your personal safety companion with real-time location tracking, emergency contacts,
            and AI-powered assistance. Never feel alone when you need help most.
          </motion.p>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Get Started
              </button>
            </Link>
            <Link href="/contacts">
              <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
                Add Emergency Contacts
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id='about'  className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Everything you need for safety
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive safety features designed to keep you protected
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id='contact'  className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Ready to stay safe?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of users who trust our platform for their safety needs.
            </p>
            <div className="mt-8">
              <Link href="/dashboard">
                <button className="rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90">
                  Start Your Safety Journey
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer id="policy"  className="border-t bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Safety App</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your personal safety companion
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Features</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Location Tracking</li>
                <li>Emergency Contacts</li>
                <li>AI Assistant</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Support</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Legal</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Safety App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}








type  Session  = typeof auth.$Infer.Session

export const Navbar = ({session}:{
  session : Session | null
}) => {
  const handleSign =async ()=>{
    if(session && session?.user) return await signOut()

    const response = await signUp()
    
  }
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">Aceternity UI</h1>
      </div>

      <Link href="/contacts" className="flex items-center gap-2">
        Contacts
      </Link>
    
      <Link href="/assistant" className="flex items-center gap-2">
        Agent
      </Link>
    

      <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200" onClick={handleSign}>
       {session?.user ? "Logout" : "Sign Up"}
      </button>
    </nav>
  );
};
