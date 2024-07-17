import { NextResponse } from "next/server";
import { connectionFunction } from "@/lib/dbConfig";

connectionFunction();

export async function POST(req, res) {
    try {
        const response = NextResponse.json({
            success: true,
            message: 'Logout SuccessFully',
        })
        // Remove the token from the user's session
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}