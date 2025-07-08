import { stripe } from "@/lib/stripe";
import { SuccessContainer, ImageContainer } from "@/styles/pages/success";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Sucesso | Ignite Shop",
	};
}

interface SuccessProps {
	searchParams: Promise<{ session_id?: string }>;
}
export default async function Success({ searchParams }: SuccessProps) {
	const { session_id } = await searchParams;
	if (!session_id) redirect("/");
	const sessionId = session_id ?? "";
	if (sessionId === "") return notFound();

	const session = await stripe.checkout.sessions.retrieve(sessionId, {
		expand: ["line_items", "line_items.data.price.product"],
	});

	const custumerName = session.customer_details?.name;
	const product = session.line_items?.data[0].price?.product as Stripe.Product;
	return (
		<SuccessContainer>
			<h1>Compra efetuada!</h1>
			<ImageContainer>
				<Image src={product.images[0]} width={120} height={120} alt="" />
			</ImageContainer>
			<p>
				Uhulll, <strong>{custumerName}, </strong>
				sua <strong>{product.name}</strong>
				já está a caminho de sua residência
			</p>
			<Link href="/">voltar ao catalogo</Link>
		</SuccessContainer>
	);
}
