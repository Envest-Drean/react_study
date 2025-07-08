import { Metadata } from "next";
import { stripe } from "../lib/stripe";
import RootPageContent from "./RootPageContent";
import Stripe from "stripe";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Home | Ignite Shop",
	};
}

export default async function Root() {
	const response = await stripe.products.list({
		expand: ["data.default_price"],
	});
	const products = response.data.map((product) => {
		const price = product.default_price as Stripe.Price;
		return {
			id: product.id,
			name: product.name,
			imageUrl: product.images[0],
			price: new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
			}).format(price.unit_amount ? price.unit_amount / 100 : 0),
			defaultpriceid: price.id,
		};
	});
	return <RootPageContent products={products} />;
}

export const dynamic = "force-static";
