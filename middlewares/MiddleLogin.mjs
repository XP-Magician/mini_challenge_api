import jwt from "jsonwebtoken";
import CONFIG from "../config/constants.mjs";
import { TEXT } from "../config/constants.mjs";

export const validateBody = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ message: "You forgot sending credentials." }).end();
  } else {
    next();
  }
};

export const authUser = (req, res, next) => {
  const { username, password } = req.body;
  if (username === CONFIG.USERNAME && password === CONFIG.PASSWORD) {
    const expiresIn = "1h";
    const token = jwt.sign(
      { username, password },
      process.env.SECRET ?? "localbackendLS(ToChange);",
      { expiresIn }
    );
    req.x_result = {
      access_token: token,
      instructions: TEXT.INSTRUCTIONS,
    };
    next();
  } else {
    req.x_result = {
      error: "Invalid credentials provided, check your entries",
    };
    next();
  }
};

export const checkAuth = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (
    !authorizationHeader ||
    !authorizationHeader.toLowerCase().startsWith("bearer")
  ) {
    return res.status(401).json({ message: "Missing authorization header." });
  }
  const authorizationToken = authorizationHeader.substring(7);
  try {
    const decodedToken = jwt.verify(
      authorizationToken,
      process.env.SECRET ?? "localbackendLS(ToChange);"
    );
    if (decodedToken === false || decodedToken === undefined) {
      return res.status(401).send({ message: "Invalid or missing auth token" });
    }
    next();
  } catch (e) {
    return res.status(401).send({ message: "Invalid or missing auth token" });
  }
};
