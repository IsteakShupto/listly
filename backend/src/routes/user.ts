import { Hono } from "hono";
import { getPrisma } from "../getPrisma";
import { sign } from "hono/jwt";
import { jwt_secret } from "../config";
import { z } from "zod";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

const signupBody = z.object({
  email: z.string(),
  password: z.string(),
});

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const { success } = signupBody.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({
      message: "Please provide correct inputs.",
    });
  }

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign(
      {
        id: user.id,
      },
      jwt_secret
    );

    return c.json({
      message: "You have successfully createn an account.",
      id: user.id,
      token: token,
    });
  } catch (err) {
    c.status(400);
    return c.json({
      message: "Invalid request. Please try with proper inputs.",
    });
  }
});

const signinBody = z.object({
  email: z.string(),
  password: z.string(),
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  const { success } = signinBody.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({
      message: "Please provide correct inputs.",
    });
  }

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (user) {
      const token = await sign(
        {
          id: user.id,
        },
        jwt_secret
      );

      return c.json({
        message: "You have successfully logged in.",
        token: token,
      });
    } else {
      c.status(400);
      return c.json({
        message: "User doesn't exist.",
      });
    }
  } catch (err) {
    c.status(400);
    return c.json({
      message: "Invalid request. Please provide correct inputs.",
    });
  }
});
