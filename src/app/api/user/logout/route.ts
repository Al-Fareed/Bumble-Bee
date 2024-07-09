import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export async function GET() {
  try {
    const response = await NextResponse.json(
      { message: "you are signed out successfully" },
      { status: 200 }
    );
      response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
      return response;
  } catch (error: any) {
    console.log(error.message);
  }
}
