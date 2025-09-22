import toast from "react-hot-toast";
import api from "./api";

interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: any;
  showToast?: boolean; // default true
}

export const request = async <T = any>({
  method,
  url,
  data,
  showToast = true,
}: RequestOptions): Promise<T | null> => {
  try {
    const response = await api.request({ method, url, data });

    const resData = response.data;

    // Handle toast messages
    if (showToast) {
      if (resData.Error) {
        if (Array.isArray(resData.message)) {
          resData.message.forEach((msg: string) => toast.error(msg));
        } else {
          toast.error(resData.message || "Something went wrong");
        }
      } else {
        if (Array.isArray(resData.message)) {
          resData.message.forEach((msg: string) => toast.success(msg));
        } else if (resData.message) {
          toast.success(resData.message);
        }
      }
    }

    return resData;
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Request failed");
    return null;
  }
};
