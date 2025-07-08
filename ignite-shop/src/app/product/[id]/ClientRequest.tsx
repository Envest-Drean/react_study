"use client";

import {
	ImageContainer,
	ProductContainer,
	ProductDetails,
} from "@/styles/pages/product";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

interface Product {
	id: string;
	name: string;
	imageUrl: string;
	price: string;
	description: string;
	defaultPriceId: string;
}
interface ClientProductsProps {
	product: Product;
}
export function ClientRequest({ product }: ClientProductsProps) {
	const [iscreatingCheckoutSession, setiscreatingCheckoutSession] =
		useState(false);
	async function handleBuyProduct() {
		try {
			setiscreatingCheckoutSession(true);
			const response = await axios.post("/api/checkout", {
				priceId: product.defaultPriceId,
			});

			const { checkoutUrl } = response.data;
			window.location.href = checkoutUrl;
		} catch (err) {
			//conectar uma ferramenta de observabilidade(datalog/sentry)
			setiscreatingCheckoutSession(false);
			alert("falha ao redirecionar ao checkout!");
		}
	}
	return (
		<ProductContainer>
			<ImageContainer>
				<Image src={product.imageUrl} width={520} height={480} alt="" />
			</ImageContainer>
			<ProductDetails>
				<h1>{product.name}</h1>
				<span>{product.price}</span>
				<p>{product.description}</p>
				<button disabled={iscreatingCheckoutSession} onClick={handleBuyProduct}>
					BUY NOW
				</button>
			</ProductDetails>
		</ProductContainer>
	);
}
