import express from "express";
import { env } from "./env";
import healthRouter from "./routes/health";

const app = express();
app.use(express.json());

app.use("/api", healthRouter);

app.listen(env.PORT, () => {
  console.log(`🚀 Server: http://localhost:${env.PORT} (${env.NODE_ENV})`);
});
