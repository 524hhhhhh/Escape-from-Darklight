import { app } from "@/app";
import { connectDB } from "@/config/database";
import { env } from "@/config/env";

export async function startServer() {
  try {
    await connectDB();

    const port = env.PORT;
    app.listen(port, () => {
      console.log(
        `🚀 서버 실행 중: http://localhost:${port} (${env.NODE_ENV})`,
      );
    });
  } catch (error) {
    console.error("❌ 서버 시작 실패:", error);
    process.exit(1);
  }
}

startServer();
