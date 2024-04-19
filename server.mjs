// Dependencies
import Express from "express";
import ViewsRouter from "./routers/ViewsRouter.mjs";
import ApiRouter from "./routers/ApiRouter.mjs";

// Constants
const server = Express();
const PORT = process.env.PORT ?? 54321;

// Template engine
server.set("views", "./views");
server.set("view engine", "ejs");

// Main server instance config
server.use(Express.static("./public"));
server.use(Express.json());
server.use("/", ViewsRouter);
server.use("/", ApiRouter);
server.disable("x-powered-by");

// Handle 404 , 500 and other bad requests
server.use((error, request, response) => {
  if (error.status >= 500) {
    return request.status(500).json({ error: "Internal server error." });
  }
  return request.status(400).json({ error: "Method not allowed." });
});

// Server export
export default server;
