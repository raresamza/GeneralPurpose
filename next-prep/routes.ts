export const publicRoutes= [
    "/",
    "/auth/new-verification",
]

export const authRoutes= [
    "/auth/login",
    "/auth/register",
    '/auth/error',
    '/auth/reset',
    "/auth/new-password"

]

// prefix for api authentification routes, used this for all authentication routes
export const apiAuthPrefix="/api/auth"

export const DEFAULT_LOGIN_REDIRECT="/settings"