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
                "type": "socialMediaLinks",
                "data": {
                    "platform": "Twitter",
                    "url": "https://twitter.com/Twitter"
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
                    "url": "https://picsum.photos/200/300?grayscale",
                    "alt": "Placeholder Image"
                }
            },
            {
                "i": "3",
                "x": 0,
                "y": 2,
                "w": 1,
                "h": 1,
                "type": "video",
                "data": {
                    "url": "https://www.w3schools.com/html/mov_bbb.mp4",
                    "title": "Sample Video"
                }
            },
            {
                "i": "4",
                "x": 1,
                "y": 2,
                "w": 1,
                "h": 2,
                "type": "map",
                "data": {
                    "location": "New York",
                    "zoom": 10
                }
            },
            {
                "i": "5",
                "x": 3,
                "y": 1,
                "w": 2,
                "h": 1,
                "type": "socialMediaLinks",
                "data": {
                    "platform": "LinkedIn",
                    "url": "https://www.linkedin.com/in/sundarpichai"
                }
            },
            {
                "i": "6",
                "x": 2,
                "y": 2,
                "w": 2,
                "h": 1,
                "type": "image",
                "data": {
                    "url": "https://picsum.photos/seed/picsum/200/300",
                    "alt": "Another Placeholder Image"
                }
            },
            {
                "i": "7",
                "x": 0,
                "y": 4,
                "w": 2,
                "h": 2,
                "type": "video",
                "data": {
                    "url": "https://www.w3schools.com/html/movie.mp4",
                    "title": "Another Sample Video"
                }
            }
        ]
    }

    return NextResponse.json(portfolioData);
}