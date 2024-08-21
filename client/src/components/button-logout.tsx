"use client";

import authApiRequest from "@/apiRequest/auth";
import { Button } from "@/components/ui/button";
import { handleErrorApi } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const ButtonLoguot = () => {
  const route = useRouter();
  const pathName = usePathname();
  const handleLogout = async () => {
    try {
      authApiRequest.logoutFromNextClientToNextServer();
      route.push("/login");
    } catch (error) {
      handleErrorApi({ error });
      authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {
        route.push(`/login?redirectFrom=${pathName}`);
      });
    }
  };
  return (
    <>
      <Button size={"lg"} onClick={handleLogout}>
        Log out
      </Button>
    </>
  );
};
export default ButtonLoguot;
