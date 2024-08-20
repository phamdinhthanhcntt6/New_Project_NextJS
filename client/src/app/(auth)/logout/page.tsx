"use client";

import authApiRequest from "@/apiRequest/auth";
import { clientSessionToken } from "@/lib/http";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();
  const sessionToken = searchParam.get("sessionToken");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (sessionToken === clientSessionToken.value) {
      authApiRequest
        .logoutFromNextClientToNextServer(true, signal)
        .then((res) => {
          router.push(`/login?redirectFrom=${pathname}`);
        });
    }

    return () => {
      //   controller.abort();
    };
  }, [sessionToken, pathname, router]);

  return <>LogoutPage</>;
};
export default LogoutPage;
