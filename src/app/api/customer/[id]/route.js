

import { restaurantSchema } from "@/app/lib/RestaurantsModel";
import { ConnectDb } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/food";
import { NextResponse } from "next/server";

export async function GET(request , content) {
    const id=content.params.id;
    // let query = request.nextUrl.searchParams;
    ConnectDb();
    let success = false;
    // let filter = {};
    // if (query.get('location')) {
    //     let city = query.get('location');
    //     filter = { city: { $regex: new RegExp(city, 'i') } };
    // } else if (query.get('restaurant')) {
    //     let name = query.get('restaurant');
    //     filter = { name: { $regex: new RegExp(name, 'i') } };
    // }
    let result = await restaurantSchema.findOne({_id:id});
    let food_items = await foodSchema.find({resto_id : id});
    // // result = result.map((item) => item.city.charAt(0).toUpperCase() + item.city.slice(1));
    // // result = [...new Set(result.map((item) => item))];
    if (result) success = true;
    return NextResponse.json({result , success , food_items });
}