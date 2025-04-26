import dotenv from "dotenv";
import express, { Request, RequestHandler, Response } from "express";
import { prisma } from "./prisma";
import cors from "cors";
import { Event, Recurrence } from "@prisma/client";
import { timeToDate } from "./helper";

dotenv.config({ path: "../../.env" });

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

type User = {
  firstName: string;
  lastName: string;
  email: string;
};

type CourseRequest = {
  name: string;
  creditHours: number;
  grade: number;
  userId: number;
  schedule: ScheduleDay[];
};

type EventRequest = {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  userId: number;
  courseId?: number;
  recurrence: Recurrence;
};

type ScheduleDay = {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
};

app.get("/", (req: Request, res: Response) => {
  res.send("hi there");
});

app.get("/users", async (req: Request, res: Response) => {
  if (req.query.email) {
    const result = await prisma.user.findFirst({
      where: {
        email: req.query.email as string,
      },
    });
    res.send(result);
  } else {
    const result = await prisma.user.findMany();
    res.send(result);
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const result = await prisma.user.findMany({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.send(result);
});

app.post("/users", (async (req: Request, res: Response) => {
  const body: User = req.body;

  if (
    !body ||
    typeof body.firstName !== "string" ||
    typeof body.email !== "string" ||
    typeof body.lastName !== "string"
  ) {
    return res.status(400).send({ error: "Name and email are required." });
  }

  try {
    const result = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
      },
    });

    res.send(result);
  } catch (err: any) {
    console.error("Error creating user:", err);
    if (err.meta.target[0] === "email") {
      res.status(400).send({ error: "Email already in use" });
    } else {
      res.status(500).send({ error: "Internal server error", blah: err });
    }
  }
}) as RequestHandler);

app.put("/users", async (req: Request, res: Response): Promise<any> => {
  const { email, firstName, lastName } = req.body;

  if (!email || !firstName || !lastName) {
    return res.status(400).send({ error: "Email and name are required." });
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { firstName, lastName },
    });

    res.send(user);
  } catch (err: any) {
    console.error("Error updating user:", err);
    res.status(500).send({ error: "Could not update user." });
  }
});

app.get("/users/:id/courses", async (req: Request, res: Response) => {
  //return all courses given user id
  const result = await prisma.course.findMany({
    where: {
      userId: parseInt(req.params.id),
    },
    include: {
      gradeLogs: {
        orderBy: {
          datetime: "desc", // 👈 descending = newest first
        },
      },
    },
  });

  res.send(result);
});

app.post("/courses", (async (req: Request, res: Response) => {
  const body: CourseRequest = req.body;

  // console.log(body);

  if (
    !body ||
    typeof body.name !== "string" ||
    isNaN(body.creditHours) ||
    isNaN(body.grade) ||
    isNaN(body.userId) ||
    typeof body.schedule !== "object"
  ) {
    return res.status(400).send({
      error:
        "Course name, Credit hours, Grade, User ID, and Schedule are required.",
    });
  }

  try {
    const result = await prisma.course.create({
      data: {
        name: body.name,
        creditHours: body.creditHours,
        gradeLogs: {
          create: [{ datetime: new Date(), grade: body.grade }],
        },
        userId: body.userId,
        events: {
          create: body.schedule.map((day) => ({
            title: body.name,
            description: "",
            startTime: timeToDate(day.startTime),
            endTime: timeToDate(day.endTime),
            userId: body.userId,
            recurrence: Recurrence.WEEKLY,
          })),
        },
      },
      include: {
        gradeLogs: true,
      },
    });

    res.send(result);
  } catch (err: any) {
    console.error("Error creating course:", err);
  }
}) as RequestHandler);

app.get("/users/:userId/events", async (req: Request, res: Response) => {
  //return all courses given user id
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid User ID" });
  }

  try {
    const events: Event[] = await prisma.event.findMany({
      where: { userId },
    });

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.post("/events", (async (req: Request, res: Response) => {
  const body: EventRequest = req.body;

  // console.log(body)

  if (
    !body ||
    typeof body.title !== "string" ||
    typeof body.description !== "string" ||
    typeof body.startTime !== "string" ||
    typeof body.endTime !== "string" ||
    isNaN(body.userId)
  ) {
    return res.status(400).send({
      error:
        "Event title, description, start time, end time, and User ID are required.",
    });
  }

  try {
    const startTime = timeToDate(body.startTime);

    const endTime = timeToDate(body.endTime);

    const result = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        startTime: startTime,
        endTime: endTime,
        userId: body.userId,
        recurrence: body.recurrence || Recurrence.NONE,
      },
    });

    res.send(result);
  } catch (err: any) {
    console.error("Error creating event:", err);
  }
}) as RequestHandler);

app.listen(port);
