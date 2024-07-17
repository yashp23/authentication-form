import { NextResponse } from "next/server";
import { connectionFunction } from "@/lib/dbConfig";
import bcryptjs from 'bcryptjs'
import User from "@/models/userModel";
import jwt from 'jsonwebtoken'
import { getDataFromToken } from "@/helper/getDataFromToken";

connectionFunction();

export async function POST(req, res) {
    //extract data from token
    const userId = await getDataFromToken(req);

    if (!userId) {
        return NextResponse.status(401).json({ message: "Invalid token" });
    }

    //find user by id and return user data with password removed
    const user = await User.findOne({ _id: userId }).select("-password")

    return NextResponse.json({
        message: "User found",
        data: user
    })
}