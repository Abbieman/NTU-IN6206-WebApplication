import { Bus, Mail, User } from "lucide-react";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/my-card", label: "Cards", icon: Bus },
    { path: "/messages", label: "Messages", icon: Mail },
    { path: "/profile", label: "Me", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* main content */}
      <div className="flex-1 pb-20">
        <Outlet />
      </div>

      {/* foot bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F9F9F9] border-t border-gray-200 px-6 py-3 flex justify-around z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition w-16 h-12 ${
                isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Layout;
