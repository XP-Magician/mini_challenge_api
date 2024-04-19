//Dependencies
import Express from "express";
import { TEXT } from "../config/constants.mjs";
import {
  validateBody,
  authUser,
  checkAuth,
} from "../middlewares/MiddleLogin.mjs";
import {
  checkAnswerStructure,
  validateAnswer,
  rateLimit,
} from "../middlewares/MiddleAnswer.mjs";
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

router.post(
  "/validate",
  checkAuth,
  checkAnswerStructure,
  validateAnswer,
  (req, res) => {
    res.json(req.x_message);
  }
);

export default router;
