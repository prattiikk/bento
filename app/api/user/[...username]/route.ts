import { NextResponse } from "next/server";

export async function GET() {
    const portfolioData = {
        "layout": [
            {
                "i": "1",
                "x": 0,
                "y": 0,
                "w": 2,
                "h": 2,
                "type": "image",
                "data": {
                    "url": "https://plus.unsplash.com/premium_photo-1673285285994-6bfff235db97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwYWVzdGhldGljfGVufDB8fDB8fHww", // High-quality nature image
                    "alt": "Aesthetic Nature Image"
                }
            },
            {
                "i": "2",
                "x": 2,
                "y": 0,
                "w": 2,
                "h": 1,
                "type": "image",
                "data": {
                    "url": "https://images.unsplash.com/photo-1693050011869-575b67ae3c72?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlJTIwYWVzdGhldGljfGVufDB8fDB8fHww", // High-quality architecture image
                    "alt": "Aesthetic Architecture Image"
                }
            },
            {
                "i": "3",
                "x": 0,
                "y": 2,
                "w": 2,
                "h": 1,
                "type": "video",
                "data": {
                    "url": "https://cdn.pixabay.com/video/2023/10/02/183285-870515512_tiny.mp4",
                    "title": "Aesthetic Canyon Video"
                }
            },
            {
                "i": "4",
                "x": 2,
                "y": 2,
                "w": 2,
                "h": 1,
                "type": "image",
                "data": {
                    "url": "https://images.unsplash.com/photo-1714552271149-250fb5742354?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG5hdHVyZSUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D", // High-quality landscape image
                    "alt": "Aesthetic Landscape Image"
                }
            },
            {
                "i": "5",
                "x": 0,
                "y": 4,
                "w": 2,
                "h": 2,
                "type": "video",
                "data": {
                    "url": "https://cdn.pixabay.com/video/2021/02/25/66257-516924671_tiny.mp4",
                    "title": "Aesthetic Time-Lapse Video"
                }
            }
        ]
    }

    return NextResponse.json(portfolioData);
}