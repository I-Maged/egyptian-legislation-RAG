// import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient();
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { fileURLToPath } from "node:url";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const connectionString = `${process.env.DATABASE_URL}`;

console.log("DATABASE_URL:", connectionString.replace(/:[^:@]+@/, ":****@"));

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
