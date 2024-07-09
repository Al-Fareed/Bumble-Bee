import { connect } from "@/db/config";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    // check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password:hashedPassword,
    });
    console.log("Going to save",newUser);
    
    const savedUser = await newUser.save();
    console.log("Saved user : ",savedUser);

    return NextResponse.json({
      message: "User has been created Successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}