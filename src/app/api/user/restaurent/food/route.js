
import { cartSchema } from "@/app/lib/cart";
import { ConnectDb } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/food";
import { NextResponse } from "next/server";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false
    ConnectDb();

    const findingcart = await cartSchema.findOne({ resto_id: payload.resto_id, user_id: payload.user_id, food_id: payload.food_id })

    if (findingcart) {

    } else {
        let findingfood = await foodSchema.findOne({ _id: payload.food_id })

        const cartitem = new cartSchema({
            resto_id: payload.resto_id,
            user_id: payload.user_id,
            food_id: payload.food_id,
            menu: findingfood,
        });
        result = await cartitem.save();
        if (result) {
            success = true;
        }
    }
    return NextResponse.json({ result, success });
}