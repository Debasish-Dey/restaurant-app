
import { ConnectDb } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/order";

// import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false
    ConnectDb();
    console.log(payload);
    const order = new orderSchema(payload);
    if (payload.orderdetails.length)
        result = await order.save();

    if (result) {
        success = true;
    }
    console.log(success);
    return NextResponse.json({ success });
}

