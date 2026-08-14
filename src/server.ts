import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
