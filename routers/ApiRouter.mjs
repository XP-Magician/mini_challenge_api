//Dependencies
import Express from "express";
import rateLimit from "express-rate-limit";
import { TEXT } from "../config/constants.mjs";
import {
  validateBody,
  authUser,
  checkAuth,
} from "../middlewares/MiddleLogin.mjs";
import {
  checkAnswerStructure,
  validateAnswer,
} from "../middlewares/MiddleAnswer.mjs";
const router = Express.Router();

// Rate limit for /validate endpoint config
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, //1 hour
  max: 5, // after sending 1 response user must wait
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    message:
      "You reached the maximum number of validation requests, try again in one hour.",
  },
  skipFailedRequests: true,
});

router.use("/validate", limiter);

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
