"use client";

import authApiRequest from "@/apiRequest/auth";
import { useAppContext } from "@/app/app-provider";
import { Button } from "@/components/ui/button";
import { handleErrorApi } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const ButtonLogout = () => {
  const { user } = useAppContext();
  console.log(user);
  const router = useRouter();
  const pathName = usePathname();
  const handleLogout = async () => {
    try {
      authApiRequest.logoutFromNextClientToNextServer();
      router.refresh();
      router.push("/login");
    } catch (error) {
      handleErrorApi({ error });
      authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {
        router.push(`/login?redirectFrom=${pathName}`);
        router.refresh();
      });
    } finally {
      router.refresh();
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
export default ButtonLogout;
