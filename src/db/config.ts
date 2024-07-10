import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(
      process.env.DATABASE_URI!
    );
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected Successfully");
    });
    connection.on("error", (err: String) => {
      console.log("Couldn't connect with DB", err);
    });
  } catch (error) {
    console.log("Something went wrong : ", error);
  }
}
