import { Hono } from "hono";
import { getPrisma } from "../getPrisma";
import { verify } from "hono/jwt";
import { jwt_secret } from "../config";
import { z } from "zod";

export const taskRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

taskRouter.use("/*", async (c: any, next) => {
  const authToken = c.req.header("authorization");
  const user = await verify(authToken, jwt_secret);
  if (user.id) {
    c.userId = user.id;
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "Please provide correct input credentials!",
    });
  }
});

const createTaskBody = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
});

taskRouter.post("/", async (c: any) => {
  const body = await c.req.json();

  const { success } = createTaskBody.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({
      message: "Please provide correct inputs.",
    });
  }

  const prisma = getPrisma(c.env.DATABASE_URL);

  const task = await prisma.task.create({
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
      authorId: c.userId,
    },
  });

  return c.json({
    message: "You have successfully created a task!",
    id: task.id,
  });
});

taskRouter.get("/:task_id/individual", async (c: any) => {
  const prisma = getPrisma(c.env.DATABASE_URL);

  try {
    const task = await prisma.task.findUnique({
      where: {
        authorId: parseInt(c.userId),
        id: parseInt(c.req.param("task_id")),
      },
    });

    return c.json({
      task: task,
    });
  } catch (err) {
    c.status(403);
    return c.json({
      message: "Please login with proper credentials!",
    });
  }
});

taskRouter.get("/bulk", async (c: any) => {
  const prisma = getPrisma(c.env.DATABASE_URL);

  try {
    const tasks = await prisma.task.findMany({
      where: {
        authorId: parseInt(c.userId),
      },
    });

    return c.json({
      tasks: tasks,
    });
  } catch (err) {
    c.status(403);
    return c.json({
      message: "Please provide correct credentials!",
    });
  }
});

const updateTaskBody = z.object({
  published: z.boolean(),
});

taskRouter.put("/:task_id/edit", async (c: any) => {
  const body = await c.req.json();

  const { success } = updateTaskBody.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({
      message: "Please provide correct credentials!",
    });
  }

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);

    const task = await prisma.task.update({
      where: {
        authorId: parseInt(c.userId),
        id: parseInt(c.req.param("task_id")),
      },
      data: body,
    });

    return c.json({
      message: "You have successfully updated your task",
      task,
    });
  } catch (err) {
    c.status(403);
    return c.json({
      message:
        "You do not have permission to view this route / please provide correct input credentials.",
    });
  }
});

taskRouter.delete("/:task_id/delete", async (c: any) => {
  const prisma = getPrisma(c.env.DATABASE_URL);

  try {
    const del_task = await prisma.task.delete({
      where: {
        authorId: parseInt(c.userId),
        id: parseInt(c.req.param("task_id")),
      },
    });

    return c.json({
      del_task: del_task,
    });
  } catch (err) {
    c.status(403);
    return c.json({
      message: "You have successfully deleted your task!",
    });
  }
});
