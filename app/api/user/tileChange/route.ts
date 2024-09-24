import client from "@/db";
import { NextRequest, NextResponse } from "next/server";
import LayoutItem from "@/utils/Types";
import { auth } from "@/app/auth";

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
        const { TileInfo, content }: { TileInfo: LayoutItem; content: string } = await request.json();

        // Get the user's layout from the database
        const userLayout = await getUserLayoutFromDatabase(userEmail);

        if (!userLayout) {
            return NextResponse.json({ error: "User layout not found" }, { status: 404 });
        }

        // Update the user's layout with new content
        const updatedLayout = userLayout.map((layoutItem: LayoutItem) => {
            if (layoutItem.i === TileInfo.i) {
                return { ...layoutItem, data: content }; // Update 'data' field
            }
            console.log("tile information changed! ")
            return layoutItem; // Return unchanged items
        });

        // Save the updated layout to the database
        await updateUserLayoutInDatabase(userEmail, updatedLayout);

        // Return the updated layout as a JSON response
        return NextResponse.json({ layout: updatedLayout });
    } catch (error) {
        console.error("Error updating user layout:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

async function getUserLayoutFromDatabase(email: string): Promise<LayoutItem[] | null> {
    const user = await client.user.findFirst({ where: { email } });

    if (user?.layout) {
        const layoutData: LayoutItem[] = JSON.parse(user.layout as string);

        // Ensure that all items in the layout are valid
        const validLayout = layoutData.every(item =>
            typeof item.i === "string" &&
            typeof item.x === "number" &&
            typeof item.y === "number" &&
            typeof item.w === "number" &&
            typeof item.h === "number" &&
            ["socialMediaLinks", "image", "video", "map", "text", "website", "sectionTile"].includes(item.type) &&
            "data" in item
        );

        if (validLayout) {
            return layoutData;
        } else {
            throw new Error("Invalid layout data format");
        }
    }

    return null;
}

async function updateUserLayoutInDatabase(email: string, updatedLayout: LayoutItem[]): Promise<void> {
    // Update user's layout in the database
    await client.user.update({
        where: { email },
        data: {
            layout: JSON.stringify(updatedLayout), // Save updated layout as JSON string
        },
    });
}