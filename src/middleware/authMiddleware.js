import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
  let token;

  //header has an authorization field and the value starts with Bearer
  const authorized =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");
  //check if the cookie we set during login is there
  const hasCookieJwt = req.cookie?.jwt;

  if (authorized) {
    //Bearer jwt        -- we split to get the jwt
    token = req.headers.authorization.split(" ")[1];
  } else if (hasCookieJwt) {
    token = req.cookie?.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "not authorized, no jwt provided" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    //get user with the decoded id
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ error: "user no longer exists" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "not authorized,  jwt failed" });
  }
};
