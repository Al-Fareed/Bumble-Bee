import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function getUserData(request:NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken: any = jwt.verify(token, "mySecretToken");
        return decodedToken.id;
    } catch (error:any) {
        console.log(error.message);
        
    }
}