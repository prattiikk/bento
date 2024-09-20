"use server";

import { CredentialsSignin } from "next-auth";
import { signIn } from "../auth";

export const Login = async (email: string, password: string) => {

    try {
        await signIn("credentials", {
            email,
            password,
            // redirect: true,
            // redirectTo: "/"
        });
    } catch (error) {
        const err = error as CredentialsSignin;
        return err.cause;
    }

}