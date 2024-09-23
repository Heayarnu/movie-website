import NextAuth from 'next-auth';
import authConfig from './auth.config';

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthprefix,
  authRoutes,
  publicRoutes,
} from '@/routes';
import { checkSubscription } from './lib/subscription';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  let isSubscribed;
  try {
    isSubscribed = await checkSubscription();
  } catch (error) {
    console.error('Failed to check subscription:', error);
    throw error;
  }

  const isApiAuthRouth = nextUrl.pathname.startsWith(apiAuthprefix);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRouth) {
    return;
  }

  if (isLoggedIn && isAuthRoute) {
    if (isSubscribed) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    } else if (!isPublicRoute) {
      return Response.redirect(new URL('/SignUp/planform', nextUrl));
    }
  }

  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return Response.redirect(new URL('/SignIn', nextUrl));
  }

  return;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
