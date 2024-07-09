import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";
import bcryptjs from "bcryptjs";
import User from "@/models/user";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("Request Body ", reqBody);

    const user = await User.findOne({ email });
    console.log(user ? "Found user" : "Not found", user);

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }
    const tokenBody = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenBody, "mySecretToken", {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      {
        message: "Signed In successfully",
        id: user._id,
        username: user.username,
        email: user.email,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
