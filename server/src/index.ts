import express from "express";
import AuthRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/users";
import JobsRouter from "./routes/jobs";
import ApplicationsRouter from "./routes/applications";
import CompaniesRouter from "./routes/companies";
import cors from "cors";

const app = express();

// Allowed origins
const allowedOrigins = ["http://localhost:3000"];
// 2. Configure CORS options
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies or authorization headers over CORS
  optionsSuccessStatus: 200, // Some legacy browsers (IE11) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/jobs", JobsRouter);
app.use("/api/applications", ApplicationsRouter);
app.use("/api/companies", CompaniesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
