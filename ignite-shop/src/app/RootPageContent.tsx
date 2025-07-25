"use client";

import { HomeContainer, Product } from "../styles/pages/home";

import { useKeenSlider } from "keen-slider/react";
import Head from "next/head";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import { Metadata } from "next";

interface RootContentProps {
	products: {
		id: string;
		name: string;
		imageUrl: string;
		price: string;
		defaultpriceid: string;
	}[];
}

export default function RootPageContent({ products }: RootContentProps) {
	const [sliderRef] = useKeenSlider({
		slides: {
			perView: 3,
			spacing: 48,
		},
	});
	return (
		<HomeContainer ref={sliderRef} className="keen-slider">
			{products.map((product) => {
				return (
					<Link
						href={`/product/${product.id}`}
						key={product.id}
						prefetch={false}>
						<Product className="keen-slider__slide">
							<Image src={product.imageUrl} alt="" width={520} height={480} />
							<footer>
								<strong>{product.name}</strong>
								<span>{product.price}</span>
							</footer>
						</Product>
					</Link>
				);
			})}
		</HomeContainer>
	);
}
