import { connectionFunction } from "@/lib/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connectionFunction();

export async function POST(request) {

    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token);

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiration: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiration = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}