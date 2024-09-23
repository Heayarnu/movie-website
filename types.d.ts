import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface session {
    user?: DefaultUser & {
      id: string;
      stripeCustomerId: string;
      isActive: boolean;
      subscription: string;
    };
  }
    interface User extends DefaultUser {
        stripeCustomerId: string;
        isActive: boolean;
        subscription: string;
  }
}
