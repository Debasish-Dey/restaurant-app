// import { restaurantSchema } from "@/app/lib/RestaurantsModel";
import { restaurantSchema } from "@/app/lib/RestaurantsModel";
import { ConnectDb } from "@/app/lib/db";

// import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    ConnectDb();
    console.log("helo");
    return NextResponse.json({ result: "hlo " })
}

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false
    ConnectDb();

    if (payload.login) {
        result = await restaurantSchema.findOne({ email: payload.email, password: payload.password })
        if (result) {
            success = true
        }
    } else {
        const restaurant = new restaurantSchema(payload);
        result = await restaurant.save();
        if (result) {
            success = true;
        }
    }
    console.log(success);
    return NextResponse.json({ result, success });
}