import { NextResponse } from 'next/server';
import LayoutItem from '@/utils/Types';
import client from '@/db';
import { auth } from '@/app/auth';

// Function to update the user layout in the database
export async function updateLayoutInDatabase(userEmail: string, layout: LayoutItem[]): Promise<boolean> {
    try {
        // Convert the layout to a JSON string
        const updatedLayout = JSON.stringify(layout);

        // Update the layout for the user with the matching email
        await client.user.update({
            where: { email: userEmail },
            data: { layout: updatedLayout }, // Assuming layout is a JSON field in the database
        });

        console.log('Layout successfully updated in the database for user:', userEmail);
        return true; // Return true if update is successful
    } catch (error) {
        console.error('Error updating layout in the database:', error);
        return false; // Return false if there's an error
    }
}

// POST method handler for updating user layout
export async function POST(req: Request) {
    try {
        // Authenticate user
        const session = await auth();

        if (!session) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const userEmail = session.user?.email;
        const layout: LayoutItem[] = await req.json();

        // Validate the layout format
        if (!Array.isArray(layout)) {
            return NextResponse.json({ error: 'Invalid layout format' }, { status: 400 });
        }

        if (userEmail) {
            // Update the layout in the database
            const success = await updateLayoutInDatabase(userEmail, layout);

            if (success) {
                return NextResponse.json({ message: 'Layout updated successfully' });
            } else {
                return NextResponse.json({ error: 'Failed to update layout' }, { status: 500 });
            }
        }

        return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    } catch (error) {
        console.error('Error updating layout:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// GET method handler for this endpoint
export async function GET() {
    return NextResponse.json({ message: 'GET method is not allowed for this endpoint' }, { status: 405 });
}
