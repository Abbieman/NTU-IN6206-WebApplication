import {
  Bell,
  Calendar,
  Camera,
  ChevronRight,
  CreditCard,
  Globe,
  HelpCircle,
  History,
  LogOut,
  MapPin,
  Phone,
  Settings,
  Shield,
  Star,
  TrendingUp,
  UserCircle,
  Wallet,
} from "lucide-react";
import React, { useState } from "react";

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  avatar: string;
  memberSince: string;
  totalTrips: number;
  totalSpent: number;
  points: number;
}

const Profile: React.FC = () => {
  const [profile] = useState<UserProfile>({
    name: "John Zhang",
    phone: "+65 9123 4567",
    email: "zhangsan@example.com",
    avatar: "",
    memberSince: "January 2023",
    totalTrips: 234,
    totalSpent: 456.8,
    points: 1280,
  });

  const statsCards = [
    {
      icon: TrendingUp,
      label: "Total Spent",
      value: `$${profile.totalSpent.toFixed(2)}`,
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Calendar,
      label: "Trips Taken",
      value: profile.totalTrips,
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Star,
      label: "Points",
      value: profile.points,
      color: "from-amber-500 to-orange-600",
    },
  ];

  const menuSections = [
    {
      title: "Account Management",
      items: [
        { icon: CreditCard, label: "My Cards", badge: "3", action: () => {} },
        { icon: Wallet, label: "My Wallet", action: () => {} },
        { icon: History, label: "Transaction History", action: () => {} },
      ],
    },
    {
      title: "Settings",
      items: [
        { icon: Bell, label: "Notifications", action: () => {} },
        { icon: Shield, label: "Privacy & Security", action: () => {} },
        {
          icon: Globe,
          label: "Language",
          subtitle: "English",
          action: () => {},
        },
        { icon: Settings, label: "General Settings", action: () => {} },
      ],
    },
    {
      title: "Help & Support",
      items: [
        { icon: HelpCircle, label: "Help Center", action: () => {} },
        { icon: Phone, label: "Contact Us", action: () => {} },
        { icon: MapPin, label: "Service Locations", action: () => {} },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 pt-8 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-white">Profile</h1>
          </div>

          {/* Profile Card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl px-6 py-4 text-white">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <UserCircle className="w-12 h-12 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 bg-white text-blue-600 rounded-full p-1.5 shadow-lg hover:scale-110 transition">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                </div>
                <p className="text-blue-100 text-sm">{profile.phone}</p>
                <p className="text-blue-100 text-sm">{profile.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-16 mb-6 relative z-10">
        <div className="grid grid-cols-3 gap-3">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-lg">
                <div
                  className={`bg-gradient-to-br ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-4 space-y-6">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">
              {section.title}
            </h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition ${
                      itemIndex !== section.items.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 rounded-xl p-2">
                        <Icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">
                          {item.label}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center gap-3 text-red-600 font-semibold hover:bg-red-50 transition">
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

        {/* Version Info */}
        <div className="text-center text-sm text-gray-400 pb-4">
          <p>Version 2.5.0</p>
          <p className="mt-1">© 2025 EZ-Link. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
