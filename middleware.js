import NextAuth from "next-auth";
import { auth } from "./auth";
import {
    authRoutes, 
    publicRoutes,
    DEFAULT_MANAGER_ROUTE
}     from "@/routes"

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    const isAuthRoute = authRoutes.includes(nextUrl.pathname); 
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    if (isAuthRoute){
        if (isLoggedIn){
            return Response.redirect( new URL(DEFAULT_MANAGER_ROUTE, nextUrl ))
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect( new URL("/auth/login", nextUrl));
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}