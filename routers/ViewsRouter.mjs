//Dependencies
import path from "node:path";
import Express from "express";
import CONSTANTS from path.join('..','config','constants.mjs')
const router = Express.Router();

// Instructions frontend
router.get("/", (req, res) => {
  return res.render("index", { CONSTANTS });
});

export default router;
