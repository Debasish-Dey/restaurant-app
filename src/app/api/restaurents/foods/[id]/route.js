
import { ConnectDb } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/food";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    ConnectDb();
    const id = content.params.id;
    let success = false;
    const result = await foodSchema.find({
        resto_id:id,
    });
    if (result) success = true;
    return NextResponse.json({ result , success });
}

export async function DELETE(request, content) {
    ConnectDb();
    const id = content.params.id;
    let success = false;
    const result = await foodSchema.deleteOne({_id : id});
    if (result.deletedCount>0) success = true;
    return NextResponse.json({ result , success });
}



