import {
  AlertCircle,
  Bell,
  Clock,
  Gift,
  Mail,
  Search,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  type: "notification" | "promotion" | "system" | "transaction";
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  icon: "gift" | "bell" | "alert" | "transaction";
}

const Messages = () => {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "promotion",
      title: "🎉 Win a ¥60 e-voucher!",
      content:
        "Take 25 rides each month to join the lucky draw — check details now.",
      timestamp: "2 hours ago",
      read: false,
      icon: "gift",
    },
    {
      id: 2,
      type: "transaction",
      title: "Top-up Successful",
      content:
        "You’ve successfully added ¥50 to your Student Card. Current balance: ¥66.11.",
      timestamp: "5 hours ago",
      read: false,
      icon: "transaction",
    },
    {
      id: 3,
      type: "transaction",
      title: "Fare Deduction",
      content: "Oct 22, 2025 – MRT ride fare deducted: ¥2.50.",
      timestamp: "3 days ago",
      read: true,
      icon: "transaction",
    },
    {
      id: 4,
      type: "system",
      title: "Student Card Verification Expiring Soon",
      content:
        "Your student card verification will expire in 30 days. Please update your info in time.",
      timestamp: "1 week ago",
      read: true,
      icon: "alert",
    },
    {
      id: 5,
      type: "notification",
      title: "New Feature Available",
      content: "Transit Wallet now supports Alipay+™ payments — try it today!",
      timestamp: "1 week ago",
      read: true,
      icon: "bell",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case "gift":
        return Gift;
      case "bell":
        return Bell;
      case "alert":
        return AlertCircle;
      case "transaction":
        return TrendingUp;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "promotion":
        return "bg-gradient-to-br from-purple-500 to-pink-500";
      case "transaction":
        return "bg-gradient-to-br from-green-500 to-emerald-600";
      case "system":
        return "bg-gradient-to-br from-orange-500 to-red-600";
      case "notification":
        return "bg-gradient-to-br from-blue-500 to-indigo-600";
      default:
        return "bg-gradient-to-br from-gray-500 to-gray-600";
    }
  };

  const filteredMessages = messages.filter((message) => {
    const matchesTab =
      activeTab === "all" || (activeTab === "unread" && !message.read);
    const matchesSearch =
      searchQuery === "" ||
      message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  const markAsRead = (id: number) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const markAllAsRead = () => {
    setMessages(messages.map((msg) => ({ ...msg, read: true })));
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          {unreadCount > 0 && (
            <div
              onClick={markAllAsRead}
              className="text-sm text-blue-600 font-semibold hover:text-blue-700"
            >
              Mark All as Read
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
              activeTab === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Messages
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition relative ${
              activeTab === "unread"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="px-4 py-4 pb-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-16">
            <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">
              {searchQuery ? "No messages found" : "No messages yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMessages.map((message) => {
              const IconComponent = getIconComponent(message.icon);
              return (
                <div
                  key={message.id}
                  onClick={() => !message.read && markAsRead(message.id)}
                  className={`bg-white rounded-2xl p-4 shadow-sm transition-all cursor-pointer hover:shadow-md ${
                    !message.read ? "border-2 border-blue-500" : ""
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div
                      className={`${getIconColor(
                        message.type
                      )} rounded-xl p-3 flex-shrink-0 h-fit`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3
                          className={`font-bold text-gray-900 ${
                            !message.read ? "text-blue-600" : ""
                          }`}
                        >
                          {message.title}
                        </h3>
                        {!message.read && (
                          <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full ml-2 mt-2"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {message.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {message.timestamp}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMessage(message.id);
                            }}
                            className="text-gray-400 hover:text-red-500 transition p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
