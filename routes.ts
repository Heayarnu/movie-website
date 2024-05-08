/**
 * An array of public routes that do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = ['/SignIn', '/SignUp'];

/**
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthprefix = '/api/auth';

/**
 * Default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/Home';
