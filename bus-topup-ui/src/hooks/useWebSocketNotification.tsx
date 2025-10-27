import { useEffect, useRef, useState } from "react";
import { NotificationBanner } from "../components/NotificationBanner";

export const useWebSocketNotification = (userId?: string) => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const connect = () => {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const socketUrl = `${protocol}//www.bus.topup.com/ws/notifications?userId=${userId}`;
      console.log("🔌 Connecting WebSocket:", socketUrl);

      ws.current = new WebSocket(socketUrl);

      ws.current.onopen = () => {
        console.log("✅ WebSocket connected");
        setIsConnected(true);
        if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const msg = data.message || event.data;
          setMessage(msg);
        } catch {
          setMessage(event.data);
        }

        // 自动隐藏消息
        setTimeout(() => setMessage(null), 3000);
      };

      ws.current.onclose = (e) => {
        console.log("⚠️ WebSocket closed:", e.reason);
        setIsConnected(false);

        // 重连机制（3 秒后重试）
        if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
        reconnectTimer.current = setTimeout(() => {
          console.log("♻️ Attempting to reconnect WebSocket...");
          connect();
        }, 3000);
      };

      ws.current.onerror = (err) => {
        console.log("❌ WebSocket error:", err);
        ws.current?.close(); // 强制关闭，让 onclose 去触发重连
      };
    };

    connect();

    // 清理函数：组件卸载或 userId 改变时
    return () => {
      console.log("🔌 Closing WebSocket connection...");
      setIsConnected(false);
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      ws.current?.close();
      ws.current = null;
    };
  }, [userId]);

  const Notification = <NotificationBanner message={message} />;

  return { Notification, isConnected };
};
