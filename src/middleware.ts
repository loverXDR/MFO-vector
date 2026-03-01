import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "super-secret-key-12345" });

    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
    const isBankDashboard = req.nextUrl.pathname.startsWith("/bank-dashboard");

    if (isAuthPage) {
        if (isAuth) {
            if (token.role === "BANK") return NextResponse.redirect(new URL("/bank-dashboard", req.url));
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return null;
    }

    if (!isAuth && (isDashboard || isBankDashboard)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Prevent regular users from accessing bank dashboard
    if (isBankDashboard && token?.role !== "BANK") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Prevent banks from accessing user dashboard
    if (isDashboard && token?.role === "BANK") {
        return NextResponse.redirect(new URL("/bank-dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/bank-dashboard/:path*", "/login", "/register"],
};
