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
    const token = jwt.sign(
      { username, password },
      process.env.SECRET ?? "localbackend"
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
