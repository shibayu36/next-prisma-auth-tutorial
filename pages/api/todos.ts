import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";
import { NextApiHandler } from "next-auth/internals/utils";

const prisma = new PrismaClient();

const todosHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).end("Please log in to view");

  const userId = session.user.id;

  if (req.method === "GET") {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId },
    });
    return res.status(200).json(todos);
  }
};

export default todosHandler;
