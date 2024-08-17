import { cookies } from "next/headers";

const ProfileMe = () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  console.log(sessionToken);
  return <>Profile me</>;
};
export default ProfileMe;
