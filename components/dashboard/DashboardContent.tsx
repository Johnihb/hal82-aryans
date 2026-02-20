"use client";

import {  motion } from "motion/react";
import {
  MapPin,
  Shield,
  Phone,
  Navigation,
  User,
  Settings,
  Activity,
  Users,
  CheckCircle,
  AlertCircle,
  Mail
} from "lucide-react";
import Link from "next/link";
import { signOut } from "@/lib/action/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SMSButton from "../smsButton";

type CloseOne = {
  id: string;
  phoneNumber: string;
  isVerified: boolean;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type User = typeof import("@/lib/user").userStatus extends () => Promise<infer T> ? T : never;
type CloseOneData = typeof import("@/lib/user").userCloseOne extends () => Promise<infer T> ? T : never;

interface DashboardContentProps {
  user: User;
  closeOneData: CloseOneData;
  username: string;
}

export default function DashboardContent({ user, closeOneData, username }: DashboardContentProps) {
  

  const stats = [
    {
      title: "Emergency Contacts",
      value: closeOneData.userCloseOne?.closeOnePhoneNumbers?.length || 0,
      description: "Verified close ones",
      icon: <Users className="h-4 w-4" />,
      color: "text-blue-600"
    },
    {
      title: "Phone Verified",
      value: user.isVerified ? "Yes" : "No",
      description: user.isVerified ? "Your number is verified" : "Verification needed",
      icon: user.isVerified ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />,
      color: user.isVerified ? "text-green-600" : "text-orange-600"
    },
    {
      title: "Account Status",
      value: "Active",
      description: "Your account is in good standing",
      icon: <Shield className="h-4 w-4" />,
      color: "text-green-600"
    }
  ];

  const quickActions = [
    {
      title: "View Map",
      description: "Navigate and track locations",
      icon: <MapPin className="h-5 w-5" />,
      href: "/map",
      color: "bg-blue-500 hover:bg-blue-600"

    },
    {
      title: "Emergency Contacts",
      description: "Manage your close ones",
      icon: <Phone className="h-5 w-5" />,
      href: "/contacts",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "AI Assistant",
      description: "Get help from our AI",
      icon: <User className="h-5 w-5" />,
      href: "/assistant",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Settings",
      description: "Account preferences",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
      color:"bg-black hover:bg-gray-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">
                Welcome back, {username || "User"}!
              </h1>
              <p className="text-muted-foreground">
                Here&apos;s what&apos;s happening with your safety dashboard
              </p>
            </div>
            <div className="flex items-center gap-4">
              <SMSButton />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 grid gap-6 md:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="cursor-pointer transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg text-white ${action.color}`}>
                      {action.icon}
                    </div>
                    <h3 className="font-medium text-card-foreground">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            Recent Activity
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {closeOneData.userCloseOne?.closeOnePhoneNumbers && closeOneData.userCloseOne.closeOnePhoneNumbers.length > 0 ? (
                  closeOneData.userCloseOne.closeOnePhoneNumbers.slice(0, 3).map((contact: CloseOne, index: number) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">
                          Added emergency contact: {contact.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {contact.isVerified ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {contact.isVerified ? "Verified" : "Pending"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-card-foreground mb-2">
                      No recent activity
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Start by adding your emergency contacts and exploring the map features.
                    </p>
                    <Link href="/contacts">
                      <Button>Add Emergency Contact</Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Safety Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            Safety Tips
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-medium text-card-foreground mb-2">
                  Keep Contacts Updated
                </h3>
                <p className="text-sm text-muted-foreground">
                  Regularly verify and update your emergency contacts to ensure they&apos;re reachable when needed.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Navigation className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-medium text-card-foreground mb-2">
                  Share Your Location
                </h3>
                <p className="text-sm text-muted-foreground">
                  Use the map feature to share your real-time location with trusted contacts during travel.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}