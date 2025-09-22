import { request } from "./request";

interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  funds: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const signupUser = (payload: SignupPayload) =>
  request({
    method: "POST",
    url: "/user/signup",
    data: payload,
  });

export const loginUser = (payload: LoginPayload) =>
  request({
    method: "POST",
    url: "/user/login",
    data: payload,
  });
