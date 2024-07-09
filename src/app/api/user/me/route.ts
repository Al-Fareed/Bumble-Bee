import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "@/helpers/getUserData";
import User from "@/models/user";
import { connect } from "@/db/config";

connect();

export async function GET(request:NextRequest) {
    try {
        const userId = await getUserData(request)
        console.log("User id : ", userId);
        
        const user = await User.findOne({_id: userId }).select("-password")
        console.log("User data from DB ",user);
        
        return NextResponse.json({
            message: "Got user details bro",
            data:user
        })
    } catch (error:any) {
        console.log(error.message);
        
    }
}