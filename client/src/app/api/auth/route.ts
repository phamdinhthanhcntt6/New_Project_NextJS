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
  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly`,
    },
  });
};
