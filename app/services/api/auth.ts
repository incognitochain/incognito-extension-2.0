import { v4 } from "uuid";
import axiosInstance from "@services/http";

const getAccesTokenFromServer = async (DeviceID: string = v4(), DeviceToken: string = v4()) => {
  const tokenData: { Token: string; Expired: string } = await axiosInstance.post("/auth/new-token", {
    DeviceID,
    DeviceToken,
  });
  const token = tokenData.Token;

  return token;
};

export { getAccesTokenFromServer };
