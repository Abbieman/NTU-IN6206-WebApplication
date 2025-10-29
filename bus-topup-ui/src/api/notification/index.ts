import type { ResponseData } from "../index";
import { instance } from "../index";

export interface Notification {
  id: string;
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

export const readNotification = (
  data:
    | {
        id: string;
      }
    | { ids: string[] }
): Promise<ResponseData<object>> => {
  return instance.post("/notification/readNotification", data);
};

export const deleteNotification = (
  data:
    | {
        id: string;
      }
    | { ids: string[] }
): Promise<ResponseData<object>> => {
  return instance.post("notification/delete", data);
};
