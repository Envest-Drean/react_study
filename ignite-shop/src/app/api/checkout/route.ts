import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { priceId } = await req.json();
		if (!priceId)
			return NextResponse.json({ error: "price not found" }, { status: 400 });
		const checkoutSessions = await stripe.checkout.sessions.create({
			success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_URL}`,
			mode: "payment",
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
		});

		return NextResponse.json(
			{ checkoutUrl: checkoutSessions.url },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json({ error: "Error at checkout" }, { status: 500 });
	}
}
