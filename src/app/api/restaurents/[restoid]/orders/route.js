

import { ConnectDb } from "@/app/lib/db";

import { orderSchema } from "@/app/lib/order";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    ConnectDb();
    const {restoid}=params;

    let success = false;
    const result = await orderSchema.find({
        resto_id : restoid,
    });
    if (result) success = true;
    return NextResponse.json({ result , success });
}
