import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from "./generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import { nextCookies } from "better-auth/next-js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error(
        "DATABASE_URL environment variable is not set. " +
        "Make sure .env.local contains DATABASE_URL."
    );
}

const adapter = new PrismaNeon({ connectionString });
export const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql" }),
    emailAndPassword: { enabled: true },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    },
    plugins: [nextCookies()]
})

//export const { signIn, signUp, handleRequest } = auth.createHelpers();