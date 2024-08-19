import accountApiRequest from "@/apiRequest/account";
import Profile from "@/app/me/profile";
import envConfig from "@/config";
import { cookies } from "next/headers";

const MyProfilePage = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return (
    <div className="flex flex-col">
      <span>{result.payload.data.name}</span>
      <Profile />
    </div>
  );
};
export default MyProfilePage;
