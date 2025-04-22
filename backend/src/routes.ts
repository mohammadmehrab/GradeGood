import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /profile
router.get("/profile", async (req: Request, res: Response): Promise<any> => {
  const { email } = req.query;

  if (typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email parameter" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /profile
router.put("/profile", async (req: Request, res: Response): Promise<any> => {
  const { email, firstName, lastName } = req.body;

  if (!email || !firstName || !lastName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updatedUser = await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {
        firstName: firstName,
        lastName: lastName,
      },
      create: {
        email: email,
        firstName: firstName,
        lastName: lastName,
      },
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Server error updating profile" });
  }
});

export default router;
