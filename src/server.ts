import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import catalogRoutes from "./routes/catalogs";
import serviceOrderRoutes from "./routes/serviceOrders";
import authRoutes from "./routes/auth";
import photosRoutes from "./routes/photos";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/catalog", catalogRoutes);
app.use("/service-orders", serviceOrderRoutes);
app.use("/auth", authRoutes);
app.use("/photos", photosRoutes);
app.use("/uploads", express.static("/tmp/uploads"));

app.use(
  (
    error: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (res.headersSent) {
      next(error);
      return;
    }

    const message =
      error instanceof Error ? error.message : "Internal server error.";
    console.error(error);
    res.status(500).json({ message });
  },
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
