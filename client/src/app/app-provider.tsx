"use client";
import { clientSessionToken } from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";
import { createContext, ReactNode, useContext, useState } from "react";

type User = AccountResType["data"];

const AppContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export const AppProvider = ({
  children,
  initialSessionToken = "",
  user: userProp,
}: {
  children: ReactNode;
  initialSessionToken?: string;
  user: User | null;
}) => {
  const [user, setUser] = useState<User | null>(userProp);

  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken;
    }
  });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
