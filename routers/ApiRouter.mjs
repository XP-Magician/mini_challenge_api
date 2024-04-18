//Dependencies
import Express from "express";
import { TEXT } from "../config/constants.mjs";
import {
  validateBody,
  authUser,
  checkAuth,
} from "../middlewares/MiddleLogin.mjs";
const router = Express.Router();

// Instructions API
router.post("/login", validateBody, authUser, (req, res) => {
  return res.json(req.x_result);
});

router.get("/challenge", checkAuth, (req, res) => {
  return res.send(TEXT.CHALLENGE);
});

router.get("/dumps/onlinepsql", checkAuth, (req, res) => {
  return res.send(TEXT.POSTGRESCRIPT);
});

export default router;
