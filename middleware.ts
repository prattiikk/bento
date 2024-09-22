// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';  // Use getToken from NextAuth
import type { NextRequest } from 'next/server';

// Define your secret
const secret = process.env.AUTH_SECRET!;

export async function middleware(req: NextRequest) {
    // Get the token (session) from the request
    const token = await getToken({ req, secret });

    

    if (!token) {
        // Redirect to login if no token is found
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Continue to the next middleware or page if the user is authenticated
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*', '/profile/:path*'], // Protect these routes
};
