/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    '/',
]

/**
 * An array of routes that are for authentication
 * These routes redirects logges in users to the /settings
 * @type {string[]}
 */

export const authRoutes = [
    '/auth/login',
    '/auth/register',
]

export const DEFAULT_MANAGER_ROUTE = "/manager/dashboard"