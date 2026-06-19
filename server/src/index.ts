import express from "express";
import AuthRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/users";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
