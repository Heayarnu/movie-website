import NextAuth from 'next-auth';
import authConfig from './auth.config';

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthprefix,
  authRoutes,
  publicRoutes,
} from '@/routes';
import { currentUser } from './lib/auth';
import { checkSubscription } from './lib/subscription';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const user = await currentUser();
  const userId = user?.id;

  let isSubscribed = false;

  if (isLoggedIn) {
    try {
      if (userId) {
        isSubscribed = await checkSubscription({ userId });
      } else {
        throw new Error('User ID is undefined');
      }
    } catch (error) {
      console.error('Failed to check subscription:', error);
      throw error;
    }
  }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthprefix);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  /// Redirect logic for user authentication and subscription status
  if (isLoggedIn) {
    if (isAuthRoute || isPublicRoute) {
      if (isSubscribed) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
    } else if (!isPublicRoute && !isSubscribed) {
      const signupUrl = new URL('/SignUp/planform', nextUrl);
      // Prevent redirect to the same page
      if (signupUrl.href !== nextUrl.href) {
        return Response.redirect(signupUrl);
      }
    }
  } else if (!isPublicRoute && !isAuthRoute) {
    return Response.redirect(new URL('/SignIn', nextUrl));
  }

  return;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
