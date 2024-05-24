import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // List of paths that need a logged-in user
  const protectedPaths = ['/', '/profile', '/verifyemail', '/admin','/login'];
  const token = request.cookies.get('token');

  // Check if the path is one of the protected ones and there is no token
  if (protectedPaths.includes(path) && !token) {
    // Redirect to login if trying to access a protected path without a token
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Allow Next.js to continue processing this request
  return NextResponse.next();
}

// Apply middleware to these paths, including the public ones for uniformity, but with no action on login and signup
export const config = {
  matcher: ['/', '/profile', '/signup', '/verifyemail', '/admin', ]
};