import { Hono } from "hono";
import { getPrisma } from "./getPrisma";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.post("/api/v1/user/signup", async (c) => {
  const body = await c.req.json();

  const prisma = getPrisma(c.env.DATABASE_URL);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  return c.json({
    id: user.id,
  });
});

export default app;
