

import { ConnectDb } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/food";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    ConnectDb();
    const {foodid}=params;

    let success = false;
    const result = await foodSchema.find({
        _id:foodid,
    });
    if (result) success = true;
    return NextResponse.json({ result , success });
}
