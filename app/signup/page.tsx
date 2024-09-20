import client from "@/db";
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { hash } from "bcryptjs";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from "next/navigation";

const signup = async (formData: FormData) => {
    "use server";
    try {
        const name = formData.get('name') as string | undefined;
        const email = formData.get('email') as string | undefined;
        const password = formData.get('password') as string | undefined;

        if (!name || !email || !password) {
            throw new Error("Please provide all fields!");
        }

        const user = await client.user.findFirst({ where: { email } });
        if (user) {
            throw new Error("User already exists!");
        }

        const hashedPassword = await hash(password, 10);
        await client.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                layout: []
            }
        });

        return redirect("/login");
    } catch (error: any) {
        console.error("Error during signup:", error.message);
        // Handle error feedback to the user (could be a toast or error message)
    }
}

const page = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <Card className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-black">Sign Up</CardTitle>
                    <CardDescription className="text-gray-600">Create a new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={signup} className="flex flex-col gap-4">
                        <Input
                            type="text"
                            placeholder="Name"
                            name="name"
                            className="border border-gray-300 rounded-xl focus:border-black focus:ring-black"
                            required
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="border border-gray-300 rounded-xl focus:border-black focus:ring-black"
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="border border-gray-300 rounded-xl focus:border-black focus:ring-black"
                            required
                        />
                        <Button
                            type="submit"
                            variant={"outline"}
                            className="w-full border border-black bg-black text-white hover:scale-105 rounded-xl">
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 items-center">
                    <span className="text-gray-600">or</span>
                    <form action="">
                        <Button
                            type="submit"
                            variant={"outline"}
                            className="w-full border border-black bg-black text-white hover:scale-105 rounded-xl">
                            Sign up with Google
                        </Button>
                    </form>
                    <Link href={"/login"} className="text-black hover:underline">
                        Already have an account? Log in
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default page;
