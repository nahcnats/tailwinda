import { NextResponse } from "next/server";
import withAuth from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized({ token }) {
                if (token) return true;
            },
        },
    }
);

// export async function middleware(req) {
//     const response = NextResponse.next();

//     const cookie = req.cookies?.get("next-auth.session-token");

//     if (!cookie) {
//         return NextResponse.rewrite(new URL("/login", req.url));
//     }

//     return response;
// }

export const config = {
    matcher: ["/shipping/:path*", "/placeorder/:path*", "/payment/:path*"],
};
