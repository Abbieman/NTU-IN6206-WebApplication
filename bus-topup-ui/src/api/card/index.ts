import type { ResponseData } from "../index";
import { instance } from "../index";

export const getCardList = (): Promise<ResponseData<object>> => {
  return instance.get("/card/getCardList");
};

export const bindCard = (data: {
  cardNumber: string;
  cardType: string;
}): Promise<ResponseData<object>> => {
  return instance.post("/card/bindCard", data);
};
