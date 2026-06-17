import express, { Request, Response } from "express";
import AuthRouter from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// routes
app.use("/api/auth", AuthRouter);

// Middleware to parse JSON bodies

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
