// Dependencies
import Express from "express";
import CONFIG from "./config/constants.mjs";
const server = Express();

const PORT = process.env.PORT ?? 54321;
// Methods

server.get("/", (req, res) => {
  res.json(CONFIG);
});

server.listen(PORT, () => {
  console.log(`SERVER LISTENING AT : http://localhost:${PORT}`);
});
