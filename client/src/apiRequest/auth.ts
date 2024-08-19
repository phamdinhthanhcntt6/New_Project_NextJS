import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";
import { Register } from "@tanstack/react-query";

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  register: (body: Register) =>
    http.post<RegisterResType>("/auth/register", body),
  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
};
export default authApiRequest;
