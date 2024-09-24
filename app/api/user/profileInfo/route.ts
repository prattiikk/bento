import client from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";

interface UserProfile {
    profileName: string;
    profileBio: string;
}

export async function POST(request: NextRequest) {
    const session = await auth();

    // Handle unauthenticated user
    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userEmail = session.user?.email;

    // Check if user email is available
    if (!userEmail) {
        return NextResponse.json({ error: "User email not found in session" }, { status: 400 });
    }

    try {
        // Parse the JSON body from the request
        const { profileName, profileBio }: UserProfile = await request.json();

        // Update the user info in the database
        const updatedUser = await client.user.update({
            where: { email: userEmail },
            data: {
                name: profileName,
                bio: profileBio,
            },
        });

        // Return a success response
        return NextResponse.json({ message: "User info updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user info:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET() {
    const session = await auth();

    // Handle unauthenticated user
    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userEmail = session.user?.email;

    // Check if user email is available
    if (!userEmail) {
        return NextResponse.json({ error: "User email not found in session" }, { status: 400 });
    }

    try {
        // Get user by email
        const user = await client.user.findFirst({
            where: { email: userEmail },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        console.log(user.name, user.bio)

        // Return user data
        return NextResponse.json({ name: user.name, bio: user.bio }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}