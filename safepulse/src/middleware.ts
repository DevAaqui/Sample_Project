import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Only handle authentication for protected routes
    // Let client-side handle the routing logic
    if (pathname === '/') {
        // Allow access to root, client-side will handle redirect if needed
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - login (public route)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    ],
} 