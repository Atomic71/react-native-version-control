import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

/**
 * Any Server Component route that uses a Supabase client must be added to this
 * middleware's `matcher` array. Without this, the Server Component may try to make a
 * request to Supabase with an expired `access_token`.
 */
export async function middleware(req: NextRequest): Promise<NextResponse> {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // TODO: I think this is needed to refresh session - not sure.
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/', '/dashboard'],
};
