import type { ResponseData } from "../index";
import { instance } from "../index";

export interface Notification {
  id: number;
  title: string;
  content: string;
  type: "TOP_UP" | "PAYMENT" | "REFUND" | "SYSTEM";
  isRead: boolean;
  createdAt: string;
}

export const getNotificationList = (): Promise<
  ResponseData<Notification[]>
> => {
  return instance.get("/notification/getNotificationList");
};
