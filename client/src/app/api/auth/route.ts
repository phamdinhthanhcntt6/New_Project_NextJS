import { decocdeJWT } from "@/lib/utils";

type PayloadJWT = {
  userId: number;
  tokenType: string;
  iat: number;
  exp: number;
};

export const POST = async (request: Request) => {
  const res = await request.json();

  const sessionToken = res.sessionToken as string;

  if (!sessionToken) {
    return Response.json(
      { message: "Unable to receive session token" },
      {
        status: 400,
      }
    );
  }

  const payload = decocdeJWT<PayloadJWT>(sessionToken);
  const expiresDate = new Date(payload.exp * 1000).toUTCString();
  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`,
    },
  });
};
