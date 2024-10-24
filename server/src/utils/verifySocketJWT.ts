import jwt from "jsonwebtoken";

export const verifySocketJWT = async (
  token: string
): Promise<string | null> => {
  try {
    const decoded: any = jwt.verify(
      token,
      `${process.env.ACCESS_TOKEN_SECRET}` as string
    );
    // console.log("token", token);
    // console.log("decode", decoded);

    return decoded?.id;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};
