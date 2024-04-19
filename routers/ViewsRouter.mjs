//Dependencies
import Express from "express";
import CONSTANTS from "../config/constants.mjs";
const router = Express.Router();

// Instructions frontend
router.get("/", (req, res) => {
  return res.render("index", { CONSTANTS });
});

export default router;
