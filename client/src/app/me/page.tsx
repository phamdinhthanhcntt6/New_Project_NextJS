import accountApiRequest from "@/apiRequest/account";
import ProfileForm from "@/app/me/profile-form";
import { cookies } from "next/headers";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
};

const MyProfilePage = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  const result = await accountApiRequest.getMyProfile(
    sessionToken?.value ?? ""
  );

  return (
    <div className="flex flex-col">
      <span>{result.payload?.data?.name}</span>
      <ProfileForm profile={result.payload.data} />
    </div>
  );
};

export default MyProfilePage;
