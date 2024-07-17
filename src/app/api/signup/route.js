
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectionFunction } from "@/lib/dbConfig";
import { sendEmail } from "@/helper/mailer";

connectionFunction();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        // Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
