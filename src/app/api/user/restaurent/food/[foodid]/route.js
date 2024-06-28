

import { cartSchema } from "@/app/lib/cart";
import { ConnectDb } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
    ConnectDb();
    const payload = await request.json();
    const id = content.params.foodid;
    let success = false;
    const result = await cartSchema.findOneAndUpdate({_id:id} , payload);
    if (result) success = true;
    return NextResponse.json({ result , success });
}

export async function DELETE(request, content) {
    ConnectDb();
    const id = content.params.foodid;
    let success = false;
    const result = await cartSchema.deleteOne({_id : id});
    if (result.deletedCount>0) success = true;
    return NextResponse.json({ result , success });
}
