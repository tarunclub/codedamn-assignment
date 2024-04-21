import express from "express";
import cors from "cors";
import { createPlayground } from "./lib/createPlayground";
import { PrismaClient } from "@prisma/client";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/api/v1/createPlayground", async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const { name, environment } = req.body;
    let image = "",
      port = 0;

    if (environment == "reactjs") {
      image = "tarunclub/tensor-react-playground-env:1.0.0";
      port = 5173;
    }

    await createPlayground(port, name, image);

    await prisma.playground.create({
      data: {
        title: name,
        containerPort: port,
        template: environment,
        containerImage: image,
      },
    });

    res.status(201).json({
      success: true,
      message: "Playground created successfully",
    });
  } catch (error) {
    throw new Error(`Failed to create playground: ${error}`);
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up and running",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
