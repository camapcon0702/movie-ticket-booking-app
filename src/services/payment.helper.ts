import { createPayment } from "./booking";

const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const handleCreatePayment = async (bookingId: number | string) => {
  await sleep(500);

  const payment = await createPayment(bookingId);

  if (!payment.success || !payment.payUrl) {
    throw new Error(payment.message || "Payment failed");
  }

  window.location.href = payment.payUrl;
};