// Dependencies
import Express from "express";
import ViewsRouter from "./routers/ViewsRouter.mjs";

// Constants
const server = Express();
const PORT = process.env.PORT ?? 54321;

// Template engine
server.set("views", "views");
server.set("view engine", "ejs");

// Main server instance config
server.use(Express.static("public"));
server.use("/", ViewsRouter);

// Server init
server.listen(PORT, () => {
  console.log(`SERVER LISTENING AT : http://localhost:${PORT}`);
});
