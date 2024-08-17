export const POST = async (request: Request) => {
  const res = await request.json();

  const sesstionToken = res.payload?.data?.token;
  if (!sesstionToken) {
    return Response.json(
      { message: "khong nhan dc session token" },
      {
        status: 400,
      }
    );
  }
  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sesstionToken}`,
      },
    }
  );
};
