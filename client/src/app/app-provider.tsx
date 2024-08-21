"use client";
import { clientSessionToken } from "@/lib/http";
import { ReactNode, useState } from "react";

export const AppProvider = ({
  children,
  initialSessionToken = "",
}: {
  children: ReactNode;
  initialSessionToken?: string;
}) => {
  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken;
    }
  });

  return <>{children}</>;
};
