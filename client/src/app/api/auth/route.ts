export const POST = async (request: Request) => {
  const res = await request.json();

  const sesstionToken = res.payload?.data?.token;
  if (!sesstionToken) {
    return Response.json(
      { message: "Unable to receive session token" },
      {
        status: 400,
      }
    );
  }
  return Response.json(res.payload, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sesstionToken}; Path=/; HttpOnly`,
    },
  });
};
