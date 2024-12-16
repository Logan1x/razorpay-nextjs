// app/page.tsx
import PaymentButton from "./components/PaymentButton";
import Script from "next/script";

export default function Home() {
  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <h1>Razorpay Payment Integration</h1>
      <PaymentButton amount={500} />{" "}
      {/* Amount in paise (50000 paise = 500 INR) */}
    </div>
  );
}
