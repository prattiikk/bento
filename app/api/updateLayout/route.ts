import { NextResponse } from 'next/server';

interface LayoutItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    type: "socialMediaLinks" | "image" | "video" | "map" | "text" | "website";
    data: any;
}

// Mock function to simulate database update
async function updateLayoutInDatabase(layout: LayoutItem[]): Promise<boolean> {
    // Implement your logic to update the layout in the database or any storage
    // For example:
    // await db.collection('layouts').updateOne({ userId: 'some-user-id' }, { $set: { layout } });

    console.log('Updating layout in database:', layout);
    return true; // Return true if update is successful
}

export async function POST(req: Request) {
    try {
        const layout: LayoutItem[] = await req.json();

        if (!Array.isArray(layout)) {
            return NextResponse.json({ error: 'Invalid layout format' }, { status: 400 });
        }

        const success = await updateLayoutInDatabase(layout);

        if (success) {
            return NextResponse.json({ message: 'Layout updated successfully' });
        } else {
            return NextResponse.json({ error: 'Failed to update layout' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error updating layout:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'GET method is not allowed for this endpoint' }, { status: 405 });
}
