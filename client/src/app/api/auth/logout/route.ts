import authApiRequest from "@/apiRequest/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";
export const POST = async (request: Request) => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  if (!sessionToken) {
    return Response.json(
      { message: "Unable to receive session token" },
      {
        status: 401,
      }
    );
  }

  try {
    const res = await authApiRequest.logoutFromNextServerToServer(
      sessionToken.value
    );
    return Response.json(res.payload, {
      status: 200,
      headers: {
        //Xóa cookie sessionToken
        "Set-Cookie": `sessionToken=; Path=/; HttpOnly Max-Age=0`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Unknow Error",
        },
        {
          status: 500,
        }
      );
    }
  }
};
