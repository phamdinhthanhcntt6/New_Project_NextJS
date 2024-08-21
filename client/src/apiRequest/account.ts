import http from "@/lib/http";
import {
  AccountResType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

const accountApiRequest = {
  getMyProfile: (sessionToken: string) =>
    http.get<AccountResType>("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  getMyProfileClient: () => http.get<AccountResType>("/account/me"),
  updateProfile: (body: UpdateMeBodyType) =>
    http.put<AccountResType>("account/me", body),
};

export default accountApiRequest;
