// app/api/order/verify/route.ts
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
// import { connectDB } from "@/lib/mongodb"; // Ensure you have a MongoDB connection setup
// import Order from "@/models/OrderModel"; // Your Order model

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request: Request) {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } =
    await request.json();
  const body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpaySignature;

  if (!isAuthentic) {
    return NextResponse.json(
      { message: "invalid payment signature", error: true },
      { status: 400 }
    );
  }

  // Connect to the database and update the order status
  //   await connectDB();
  //   await Order.findOneAndUpdate({ email: email }, { hasPaid: true });

  return NextResponse.json(
    { message: "payment success", error: false },
    { status: 200 }
  );
}
