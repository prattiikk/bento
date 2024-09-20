"use client";

import { Login } from "@/app/actions/formActions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Loginform = () => {
    const router = useRouter()
    return (
        <form action={async (formData) => {
            const email = formData.get('email') as string
            const password = formData.get('password') as string
            if (!email || !password) {
                toast.error("Please provide all fields!")
            }
            const toastId = toast.loading("Logging in")
            const error = await Login(email, password)
            if (!error) {
                toast.success("Logged in!", { id: toastId });
                router.refresh()
            }
            else {
                toast.error(String(error), { id: toastId })
            }
        }} className='flex flex-col gap-4'>
            <Input className="rounded-xl bg-gray-100 text-black placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-600" type="email" placeholder='Email' name='email' />
            <Input className="rounded-xl bg-gray-100 text-black placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-600" type='password' placeholder='Password' name='password' />
            <Button className="bg-black text-white hover:bg-gray-800 rounded-xl" type='submit' variant={"outline"}>Login</Button>
        </form>
    )
}

export {
    Loginform
}
