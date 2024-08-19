"use client";

import { useAppContext } from "@/app/AppProvider";
import envConfig from "@/config";
import { useEffect } from "react";

const Profile = () => {
  const { sessionToken } = useAppContext();
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
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
    };
    fetchRequest();
  }, []);

  return <div>Profile</div>;
};

export default Profile;
