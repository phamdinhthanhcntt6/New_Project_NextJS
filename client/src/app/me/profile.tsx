"use client";

import accountApiRequest from "@/apiRequest/account";
import { handleErrorApi } from "@/lib/utils";
import { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.getMyProfileClient();
      } catch (error) {
        handleErrorApi({
          error,
        });
      }
    };
    fetchRequest();
  }, []);

  return <div>Profile</div>;
};

export default Profile;
