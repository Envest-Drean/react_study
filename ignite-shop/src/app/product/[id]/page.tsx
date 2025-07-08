import { stripe } from "@/lib/stripe";

import Stripe from "stripe";
import { ClientRequest } from "./ClientRequest";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Produto | Ignite Shop",
	};
}

interface Product {
	id: string;
	name: string;
	imageUrl: string;
	price: string;
	description: string;
	defaultPriceId: string;
}

interface ProductsProps {
	params: Promise<{ id: string }>;
}
export default async function Products({ params }: ProductsProps) {
	const { id } = await params;

	const responseData = await stripe.products.retrieve(id, {
		expand: ["default_price"],
	});

	const price = responseData.default_price as Stripe.Price;

	const product: Product = {
		id: responseData.id,
		name: responseData.name,
		imageUrl: responseData.images[0],
		price: new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(price.unit_amount ? price.unit_amount / 100 : 0),
		description: responseData.description ? responseData.description : "",
		defaultPriceId: price.id,
	};

	return <ClientRequest product={product} />;
}

export async function generateStaticParams() {
	if (process.env.NODE_ENV === "development") return [];
	return [
		{
			id: "prod_Sb9cH96b9v8m6H",
		},
	];
}
