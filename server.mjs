// Dependencies
import Express from "express";
import ViewsRouter from "./routers/ViewsRouter.mjs";
import ApiRouter from "./routers/ApiRouter.mjs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Constants
const server = Express();
const PORT = process.env.PORT ?? 54321;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Template engine
server.set("views", `${__dirname}/views`);
server.set("view engine", "ejs");

// Main server instance config
server.use(cors());
server.use(Express.static(`${__dirname}/public`));
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
