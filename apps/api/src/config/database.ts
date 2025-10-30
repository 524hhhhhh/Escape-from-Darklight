import { prisma } from "@/lib/prisma";

export async function connectDB() {
  await prisma.$connect();
  console.log("✅ 데이터베이스 연결 성공");
}
