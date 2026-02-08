import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient({
  // if we are in development, log queries, errors and warnings, else errorsonly
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.connectDB();
    console.log("DB connected via prisma");
  } catch (error) {
    console.error(`DB connection error:${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.disconnectDB();
};

export { prisma, connectDB, disconnectDB };
