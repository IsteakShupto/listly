import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { taskRouter } from "./routes/task";

const app = new Hono();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/task", taskRouter);

export default app;
