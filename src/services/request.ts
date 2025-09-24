import toast from "react-hot-toast";
import api from "./api";

interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
  token?: string;
  showToast?: boolean; // default true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = async <T = any>({
  method,
  url,
  data,
  params,
  showToast = true,
}: RequestOptions): Promise<T | null> => {
  try {
    const token = localStorage.getItem("authToken") ?? '';
    const response = await api.request({
      method,
      url,
      data,
      params,
      headers: token ? { Authorization: token } : undefined,
    });

    const resData = response.data;

    // Toast notifications
    if (showToast) {
      if (resData.Error) {
        const messages = Array.isArray(resData.message)
          ? resData.message
          : [resData.message || "Something went wrong"];
        messages.forEach((msg: string) => toast.error(msg));
      } else {
        if (resData.message) {
          const messages = Array.isArray(resData.message)
            ? resData.message
            : [resData.message];
          messages.forEach((msg: string) => toast.success(msg));
        }
      }
    }

    return resData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("API request error:", err);
    toast.error(err.response?.data?.message || "Request failed");
    return null;
  }
};
