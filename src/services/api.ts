import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// GET request with optional query params and token
export const getRequest = async (
  url: string,
  params?: Record<string, any>,
  token?: string
) => {
  try {
    const response = await api.get(url, {
      params,
      headers: token
        ? {
            Authorization: token,
          }
        : undefined,
    });
    return response.data;
  } catch (err: any) {
    console.error("GET request error:", err.response || err.message);
    return {
      Error: true,
      message: ["Failed to fetch data"],
      data: null,
    };
  }
};

// POST request with optional body and token
export const postRequest = async (
  url: string,
  body?: any,
  token?: string
) => {
  try {
    const response = await api.post(url, body, {
      headers: token
        ? {
            Authorization: token,
          }
        : undefined,
    });
    return response.data;
  } catch (err: any) {
    console.error("POST request error:", err.response || err.message);
    return {
      Error: true,
      message: ["Failed to post data"],
      data: null,
    };
  }
};

export const deleteRequest = async (url: string, token?: string) => {
  try {
    const response = await api.delete(url, {
      headers: token
        ? {
            Authorization: token,
          }
        : undefined,
    });
    return response.data;
  } catch (err: any) {
    console.error("DELETE request error:", err.response || err.message);
    return {
      Error: true,
      message: ["Failed to delete"],
      data: null,
    };
  }
};

export default api;
