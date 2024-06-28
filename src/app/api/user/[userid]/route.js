
import { cartSchema } from "@/app/lib/cart";
import { ConnectDb } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request ,{ params }) {
    console.log(params);

    const {userid}=params;
    let result;
    let success = false
    ConnectDb();
    result = await cartSchema.find({ user_id: userid });
    if (result.length) {
        success = true;
    }
    return NextResponse.json({ result, success });
}