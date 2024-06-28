import { ConnectDb } from "@/app/lib/db";
import { userSchema } from "@/app/lib/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false
    ConnectDb();
    if (payload.login) {
        result = await userSchema.findOne({ email: payload.email, password: payload.password })
        if (result) {
            success = true
        }
    } else {
        const user = new userSchema(payload);
        result = await user.save();
        if (result) {
            success = true;
        }
    }
    console.log(success);
    return NextResponse.json({ result, success });
}