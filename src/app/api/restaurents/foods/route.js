
import { ConnectDb } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/food";
import { NextResponse } from "next/server";

export async function POST(request) {
    ConnectDb();
    let success=false;
    const payload = await request.json();
    const food = new foodSchema(payload);

    const result = await food.save();
    if(result) success=true;

    return NextResponse.json({ result, success });
}