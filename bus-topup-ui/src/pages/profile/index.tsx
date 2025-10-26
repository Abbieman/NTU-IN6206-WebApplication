import Cookies from "js-cookie";
import {
  Bell,
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
  UserCircle,
  Wallet,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authLogout, getUserInfo } from "../../api/auth";
import { useToast } from "../../hooks/useToast";

interface UserProfile {
  username: string;
  phone: string;
  email: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { toast, ToastWrapper } = useToast();

  const [profile, setProfile] = useState<UserProfile>({
    username: "",
    phone: "",
    email: "",
  });

  const menuSections = [
    {
      title: "Account Management",
      items: [
        {
          icon: CreditCard,
          label: "My Cards",
          badge: "3",
          action: () => {
            toast.error("Sorry, not available yet.");
          },
        },
        {
          icon: Wallet,
          label: "My Wallet",
          action: () => {
            toast.error("Sorry, not available yet.");
          },
        },
        {
          icon: History,
          label: "Transaction History",
          action: () => {
            toast.error("Sorry, not available yet.");
          },
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          action: () => {
            toast.error("Sorry, not available yet.");
          },
        },
        {
          icon: Shield,
          label: "Privacy & Security",
          action: () => {
            toast.error("Sorry, not available yet.");
          },
        },
        {
          icon: Globe,
          label: "Language",
          subtitle: "English",
          action: () => {
            toast.error("Sorry, not available yet.");
          },
        },
        {
          icon: Settings,
          label: "General Settings",
          action: () => {
            toast.error("Sorry, not available yet.");
          },
        },
      ],
    },
    {
      title: "Help & Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help Center",
          action: () => {
            toast.error("Sorry, not available yet.");
          },
        },
        {
          icon: Phone,
          label: "Contact Us",
          action: () => {
            toast.error("Sorry, not available yet.");
          },
        },
        {
          icon: MapPin,
          label: "Service Locations",
          action: () => {
            toast.error("Sorry, not available yet.");
          },
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await getUserInfo();
      setProfile({
        username: res.data.username,
        phone: "+65 " + res.data.phone,
        email: res.data.email,
      });
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    const res = await authLogout();
    if (res.code === 200) {
      toast.success(res.msg || "Logged out successfully!");
      Cookies.remove("token");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      return toast.error(res.msg || "Logout failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-4">
      {ToastWrapper}
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 pt-8 pb-8 relative overflow-hidden">
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
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold">{profile.username}</h2>
                </div>
                <p className="text-blue-100 text-sm">{profile.phone}</p>
                <p className="text-blue-100 text-sm">{profile.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="pt-8 px-4 space-y-6">
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
                    className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-200 transition ${
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
        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center gap-3 text-red-600 font-semibold hover:bg-red-50 transition"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

        {/* Version Info */}
        <div className="text-center text-sm text-gray-400 pb-4">
          <p>Version 1.1.0</p>
          <p className="mt-1">© 2025 NTU-Course. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
