

import { ConnectDb } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/order";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {

    ConnectDb();
    const {id}=params;

    console.log(id);

    let success = false;
    const result = await orderSchema.find({
        user_id : id,
    });
    if (result) success = true;
    return NextResponse.json({ result , success });
}
