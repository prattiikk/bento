import { NextRequest, NextResponse } from 'next/server';
import client from "@/db";
import LayoutItem from '@/utils/Types';
import { auth } from '@/app/auth';

export async function GET(request: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userEmail = session.user?.email;
    if (!userEmail) {
        return NextResponse.json({ error: "User email not found in session" }, { status: 400 });
    }

    try {
        const userLayout = await getUserLayoutFromDatabase(userEmail);

        if (!userLayout) {
            return NextResponse.json({ error: "User layout not found" }, { status: 404 });
        }

        return NextResponse.json({ layout: userLayout });
    } catch (error) {
        console.error("Error fetching user layout:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

async function getUserLayoutFromDatabase(email: string): Promise<LayoutItem[] | null> {
    const user = await client.user.findFirst({ where: { email } });

    if (user?.layout) {
        // Parse the layout JSON string into an object
        const layoutData: LayoutItem[] = JSON.parse(user.layout as string);

        // Validate that layoutData is an array of LayoutItem objects
        if (Array.isArray(layoutData)) {
            const validLayout = layoutData.every(item =>
                typeof item.i === "string" &&
                typeof item.x === "number" &&
                typeof item.y === "number" &&
                typeof item.w === "number" &&
                typeof item.h === "number" &&
                ["socialMediaLinks", "image", "video", "map", "text", "website"].includes(item.type) &&
                "data" in item
            );

            if (validLayout) {
                return layoutData; // Return the validated layout
            } else {
                throw new Error("Invalid layout data format");
            }
        }
    }

    return null; // Return null if layout is not found or invalid
}
