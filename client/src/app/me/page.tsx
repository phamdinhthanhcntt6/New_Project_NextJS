import envConfig from "@/config";
import { cookies } from "next/headers";

const MyProfilePage = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  console.log(">>>>>", sessionToken);
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
    console.log(data);
    if (!res.ok) {
      throw data;
    }
    return data;
  });
  console.log(result);
  return (
    <div className="flex flex-col">
      Profile me1
      <span>Name: {result.payload.data?.name}</span>
    </div>
  );
};
export default MyProfilePage;
