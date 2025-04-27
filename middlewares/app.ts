import express from "express";
import authRouter from "../routes/auth.route";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "../swagger";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
export default app;
