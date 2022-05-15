import express from "express";
import { prisma } from "./prisma";

const PORT = 3333;
const app = express();

app.use(express.json());

app.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  return res.status(201).json({ data: feedback });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
