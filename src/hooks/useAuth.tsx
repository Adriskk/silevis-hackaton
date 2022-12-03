import React from "react";
import Cookie from "js-cookie";
import LoggedUserInterface from "../interfaces/LoggedUser";
import RequestResponse from "../interfaces/RequestResponse";
import axios from "axios";
import { APIS, ENDPOINTS } from "../config";

export const useAuth = (): LoggedUserInterface | null => {
  const cookie = Cookie.get("user") || null;
  if (!cookie) return null;
  return JSON.parse(cookie);
};

export const logout = (
  callback?: () => void,
  errorCallback?: (e: any) => void
) => {
  const removeToken = async (): Promise<RequestResponse | null> => {
    const cookie = Cookie.get("user") || null;
    if (cookie) {
      const { data } = await axios.delete<RequestResponse | null>(
        APIS.API_V1 +
          ENDPOINTS.DELETE.REMOVE_AUTH_TOKEN.replace(
            ":userId",
            JSON.parse(cookie)?.id.toString() || "-1"
          )
      );

      return data;
    }

    return null;
  };

  try {
    removeToken()
      .then((data: RequestResponse | null) => {
        if (data && data?.status === "success") {
          Cookie.remove("user");
          if (callback) callback();
        }
      })
      .catch(({ res }) => {
        if (errorCallback) errorCallback("Error occurred");
      });
  } catch (e) {
    if (errorCallback) errorCallback("Error occurred");
  }
};
