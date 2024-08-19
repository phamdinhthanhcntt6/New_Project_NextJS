"use client";

import accountApiRequest from "@/apiRequest/account";
import { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.meClient();
      console.log(result);
    };
    fetchRequest();
  }, []);

  return <div>Profile</div>;
};

export default Profile;
