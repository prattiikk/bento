import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loginform } from '@/components/client/Form';
import { auth, signIn } from '../auth';
import { redirect } from 'next/navigation';

const page = async () => {
    const session = await auth();
    if (session?.user) redirect("/");

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-black">Login</CardTitle>
                    <CardDescription className="text-gray-600">Please enter your credentials to log in</CardDescription>
                </CardHeader>
                <CardContent>
                    <Loginform />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <span className="text-center text-gray-600">or</span>
                    <form action={async () => {
                        "use server";
                        await signIn("google");
                    }}>
                        <Button type="submit" variant={"outline"} className="w-full border-black text-black hover:bg-gray-200 rounded-xl">
                            Login with Google
                        </Button>
                    </form>
                    <Link href={"/signup"} className="text-center text-black hover:underline">
                        Don’t have an account? Sign up
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

export default page;
