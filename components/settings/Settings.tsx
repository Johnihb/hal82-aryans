"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  User as UserIcon,
  Phone,
  Mail,
  Calendar,
  Save,
  Camera,
  ChevronRight,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react'
import { Button } from '../ui/button'
import { User } from '@/app/settings/page'
import { updateUser } from '@/lib/action/updateUser'
import Link from 'next/link'

const Settings = ({ userData }: { userData: User }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const phone = formData.get('phone') as string;
    const username = formData.get('username') as string;

    if (!phone && !username) {
      setIsUpdating(false);
      return;
    }

    if (phone === userData.phoneNumber && username === userData.username) {
      setIsUpdating(false);
      return;
    }

    try {
      await updateUser({ data: { phone, username } });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsUpdating(false);
    }
  };

  const formattedDate = userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) : 'N/A';

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-black selection:text-white font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">

        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-black transition-colors mb-4 group">
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-bold uppercase tracking-widest">Dashboard</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic">
              Account <span className="text-neutral-300">Settings</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 px-4 py-2 bg-neutral-100 rounded-full border border-neutral-200"
          >
            <ShieldCheck size={16} className="text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Verified identity</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

          {/* --- Main Content --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* --- Profile Header (Visual only) --- */}
            <div className="relative group w-32 h-32 md:w-40 md:h-40">
              <div className="absolute inset-0 bg-black rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white border-2 border-black rounded-3xl overflow-hidden z-10">
                <Image
                  src={userData?.image || '/default/defaultUser.jfif'}
                  alt={`${userData?.username}'s avatar`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-white border-2 border-black p-2 rounded-xl z-20 shadow-lg hover:bg-neutral-50 transition-colors">
                <Camera size={18} />
              </button>
            </div>

            {/* --- Form Section --- */}
            <form onSubmit={handleUpdate} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                    <UserIcon size={12} /> Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    defaultValue={userData?.username || ''}
                    className="w-full bg-white border-b-2 border-neutral-200 focus:border-black outline-none py-3 text-lg font-bold transition-all placeholder:text-neutral-300"
                    placeholder="Set your identifier"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                    <Phone size={12} /> Contact Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    defaultValue={userData?.phoneNumber || ''}
                    className="w-full bg-white border-b-2 border-neutral-200 focus:border-black outline-none py-3 text-lg font-bold transition-all placeholder:text-neutral-300"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              <div className="p-6 border-2 border-neutral-100 rounded-2xl bg-neutral-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl border border-neutral-200 text-neutral-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Account Email</p>
                    <p className="font-bold text-neutral-900">{userData.email || 'No email associated'}</p>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full uppercase tracking-tighter">
                  Primary contact method
                </div>
              </div>

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border-2 font-bold text-sm ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
                    }`}
                >
                  {message.text}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isUpdating}
                className="w-full md:w-auto min-w-[200px] bg-black text-white hover:bg-neutral-800 h-14 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-transform active:scale-95 disabled:opacity-50"
              >
                {isUpdating ? 'Synchronizing...' : (
                  <>
                    Save Configuration
                    <Save size={18} />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* --- Information Sidebar --- */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="p-6 border-2 border-black rounded-3xl bg-neutral-900 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                <UserIcon size={120} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">Member Standing</p>
              <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4">Elite Safety Network</h3>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <Calendar size={14} className="text-neutral-500" />
                  <p className="text-xs font-bold">Joined {formattedDate}</p>
                </div>
                <div className="pt-4 border-t border-neutral-800">
                  <Link href="/terms&condition" className="flex items-center justify-between group/link">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover/link:text-white transition-colors">Privacy Control Center</span>
                    <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border-2 border-neutral-100 bg-white">
              <h4 className="text-xs font-black uppercase tracking-widest text-neutral-900 mb-4">Access Logs</h4>
              <p className="text-[10px] text-neutral-400 font-medium leading-relaxed">
                Your account is monitored for suspicious activity. Security updates are applied automatically based on your location and risk profile.
              </p>
            </div>
          </motion.aside>

        </div>
      </div>
    </div>
  )
}

export default Settings