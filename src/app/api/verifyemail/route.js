import { connectionFunction } from "@/lib/dbConfig";
import { NextResponse } from "next/server";


connectionFunction();

export async function POST(req, res) {
    try {


    } catch (error) {
        NextResponse.status(500).json(error.message);
    }
}