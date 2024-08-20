"use client";

import authApiRequest from "@/apiRequest/auth";
import { Button } from "@/components/ui/button";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";

const ButtonLoguot = () => {
  const route = useRouter();
  const handleLogout = async () => {
    try {
      authApiRequest.logoutFromNextClientToNextServer();
      route.push("/login");
    } catch (error) {
      handleErrorApi({ error });
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
