import client from "@/db";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { compare, hash } from "bcryptjs";

// Define a User type (this should match the NextAuth User type)
type User = {
    id: number;
    name: string | null;
    email: string;
    // Add any other fields that NextAuth might expect (if applicable)
};

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password", placeholder: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !password) {
                    throw new CredentialsSignin("Enter both email and password");
                }

                // Check if the user exists in the database
                const user = await client.user.findFirst({ where: { email } });

                if (!user) {
                    throw new CredentialsSignin({ cause: "Invalid Email or Password" });
                }

                // Check if the user has a password (meaning the user registered with credentials)
                if (!user.password) {
                    throw new CredentialsSignin({
                        cause: "You have logged in using another provider like Google before",
                    });
                }

                // Verify the password with bcryptjs
                const isPassMatch = await compare(String(password), user.password);

                if (isPassMatch) {
                    // Return the user object that matches the expected User type
                    const loggedInUser: User = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    };
                    return loggedInUser; // This matches the expected User type
                } else {
                    throw new CredentialsSignin({ cause: "Invalid Email or Password" });
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            if (account?.provider === "google" || account?.provider === "github") {
                try {
                    const { email, name } = user;
                    if (email) {
                        // Check if the user already exists in the database
                        const existingUser = await client.user.findFirst({ where: { email } });

                        // If the user doesn't exist, create a new user with an empty hashed password
                        if (!existingUser) {
                            const hashedPassword = await hash("temporary_password", 10); // Set a placeholder hash for the password
                            await client.user.create({
                                data: { email, name: name || "", password: hashedPassword, layout: [] },
                            });
                        }
                        return true;
                    }
                } catch (error) {
                    throw new CredentialsSignin({ cause: "Error while creating user" });
                }
            } else if (account?.provider === "credentials") {
                return true;
            }
            return false;
        },
    },
    // Optional JWT/session config
    session: {
        strategy: "jwt",
    },
});

export default handlers;
