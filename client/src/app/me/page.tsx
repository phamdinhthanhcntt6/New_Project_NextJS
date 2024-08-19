import { useAppContext } from "@/app/AppProvider";
import Profile from "@/app/me/profile";
import envConfig from "@/config";
import { cookies } from "next/headers";

const MyProfilePage = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  const result = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    }
  ).then(async (res) => {
    const payload = await res.json();
    console.log(payload);
    const data = {
      status: res.status,
      payload,
    };
    if (!res.ok) {
      throw data;
    }
    return data;
  });
  console.log(result);

  return (
    <div className="flex flex-col">
      <span>{result.payload.data.name}</span>
      <Profile />
    </div>
  );
};
export default MyProfilePage;
