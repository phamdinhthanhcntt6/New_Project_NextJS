"use client";

import authApiRequest from "@/apiRequest/auth";
import { clientSessionToken } from "@/lib/http";
import { useEffect } from "react";
import { differenceInHours } from "date-fns";

const SlideSession = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const expiresAt = new Date(clientSessionToken.expiresAt);

      if (differenceInHours(expiresAt, now) > 1) {
        const res =
          await authApiRequest.slideSessionFromNextClientToNextServer();
        clientSessionToken.expiresAt = res.payload.data.expiresAt;
      }
    }, 1800000);

    return clearInterval(interval);
  }, []);

  return null;
};

export default SlideSession;
