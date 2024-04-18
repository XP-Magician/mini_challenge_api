//Dependencies
import Express from "express";
import { validateBody, authUser } from "../middlewares/MiddleLogin.mjs";
const router = Express.Router();

// Instructions API
router.post("/login", validateBody, authUser, (req, res) => {
  return res.json(req.x_result);
});

export default router;
