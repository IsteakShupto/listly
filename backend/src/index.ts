import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { taskRouter } from "./routes/task";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "https://listlywebapp.netlify.app",
  })
);
app.route("/api/v1/user", userRouter);
app.route("/api/v1/task", taskRouter);

export default app;
