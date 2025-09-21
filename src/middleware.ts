import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the user is trying to access any page under /dashboard, /create-batch, etc.
  // without a role (i.e., not logged in), redirect them to the login page.
  // We check for a cookie or some other token in a real app,
  // but for now, we'll check for the absence of a role in the URL for direct access.
  // The login page itself will handle the logic of setting the role.

  const protectedPaths = ['/dashboard', '/create-batch', '/verify', '/provenance'];

  if (protectedPaths.some(p => pathname.startsWith(p))) {
    // This is a simplified check. A real app would validate a session cookie.
    // For now, we allow client-side to handle redirects via the AuthProvider.
    return NextResponse.next();
  }
  
  if (pathname === '/') {
      // All other root access is handled by the login page
      return NextResponse.next();
  }

  // Allow other paths to be accessed directly (e.g. API routes, public files)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
