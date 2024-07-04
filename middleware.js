import NextAuth from "next-auth";
import { auth } from "./auth";
import {
    authRoutes, 
    publicRoutes,
    DEFAULT_MANAGER_ROUTE,
    DEFAULT_EMPLOYEE_ROUTE,
    employeeRoutes,
    managerRoutes,

}     from "@/routes"

export default auth(async (req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    const isAuthRoute = authRoutes.includes(nextUrl.pathname); 
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isEmployeeRoute = nextUrl.pathname.startsWith(employeeRoutes);
    const isManagerRoute = nextUrl.pathname.startsWith(managerRoutes);
    const session = await auth();
    const user  = session?.user;
    const isEmployee = user?.role === "employee";
    const isManager = user?.role === "manager";

    if (isAuthRoute){
        if (isLoggedIn){
            if (isEmployee){
                return Response.redirect( new URL(DEFAULT_EMPLOYEE_ROUTE, nextUrl.origin));
            }
            if (isManager){
                return Response.redirect (new URL(DEFAULT_MANAGER_ROUTE, nextUrl.origin));
            }
        }
    }

    if (isEmployeeRoute){
        if (isLoggedIn){
            if (isManager){
                return Response.redirect( new URL(DEFAULT_MANAGER_ROUTE, nextUrl.origin));
            } 
        }
        if (!isLoggedIn){
            return Response.redirect( new URL("/auth/login", nextUrl.origin));
        }
    }

    if (isManagerRoute){
        if (isLoggedIn){
            if (isEmployee){
                return Response.redirect( new URL(DEFAULT_EMPLOYEE_ROUTE, nextUrl.origin));
            }
        }
        if (!isLoggedIn){
            return Response.redirect( new URL("/auth/login", nextUrl.origin));
        }
    }

    // if ()

    // if (isPublicRoute){
    //     if (isLoggedIn){
    //         if (isEmployee){
    //             return Response.redirect( new URL(DEFAULT_EMPLOYEE_ROUTE, nextUrl.origin));
    //         }
    //     }
    // }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}