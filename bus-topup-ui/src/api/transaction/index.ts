import type { ResponseData } from "../index";
import { instance } from "../index";

interface Transaction {
  cardNumber: string;
  amount: number;
  type: "TOP_UP" | "PAYMENT" | "REFUND";
}

export const addTransaction = (
  data: Transaction
): Promise<ResponseData<object>> => {
  return instance.post("/transaction/addTransaction", data);
};
