//Dependencies
import Express from "express";
const router = Express.Router();

// Instructions frontend
router.get("/", (req, res) => {
  res.render("index");
});

export default router;
