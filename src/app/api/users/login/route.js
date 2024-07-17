
import { NextResponse } from "next/server";
import { connectionFunction } from "@/lib/dbConfig";
import bcryptjs from 'bcryptjs'
import User from "@/models/userModel";
import jwt from 'jsonwebtoken'

connectionFunction();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if password matches
        const passwordMatch = await bcryptjs.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "Logged in successfully", success: true
        });

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
