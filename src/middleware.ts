import { NextRequest, NextResponse } from 'next/server';

// Make sure to export this function explicitly as a named export
export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  // Get cookies directly from the request
  const tokenCookie = request.cookies.get('token');
  const userCookie = request.cookies.get('user');

  // If no token or user cookie exists, user is not authenticated
  if (!tokenCookie || !userCookie) {
    if (
      nextUrl.pathname !== '/auth/login' &&
      nextUrl.pathname !== '/auth/register'
    ) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
  }

  // Parse the user data from the cookie
  try {
    const user = JSON.parse(userCookie.value);

    // Redirection for user role
    if (user.role === 'user') {
      if (nextUrl.pathname !== '/upload-document') {
        return NextResponse.redirect(new URL('/upload-document', request.url));
      }
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (error) {
    // If there's an error parsing the user cookie, redirect to login
    console.error('Error parsing user cookie:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
