

import { ConnectDb } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/food";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    ConnectDb();
    const id = content.params.id;
    let success = false;
    const result = await foodSchema.findOne({_id:id});
    if (result) success = true;
    return NextResponse.json({ result , success });
}

export async function PUT(request, content) {
    ConnectDb();
    const payload = await request.json();
    const id = content.params.id;
    let success = false;
    const result = await foodSchema.findOneAndUpdate({_id:id} , payload);
    if (result) success = true;
    return NextResponse.json({ result , success });
}