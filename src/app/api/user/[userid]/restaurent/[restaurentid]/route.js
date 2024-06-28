
import { cartSchema } from "@/app/lib/cart";
import { ConnectDb } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request ,{ params }) {
    const {userid , restaurentid}=params;
    let result;
    let success = false
    ConnectDb();

    result = await cartSchema.find({ resto_id: restaurentid, user_id: userid });

    if (result.length) {
        success = true;
    }

    return NextResponse.json({ result, success });
}