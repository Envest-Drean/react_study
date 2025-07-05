"use client";

import next from "next";
import { redirect } from "next/navigation";

interface ProductsProps {
	params: Promise<{ id: string; type: string }>;
}
export default async function Products({ params }: ProductsProps) {
	const paramsStore = await params;

	return <h1>products: {paramsStore.id} </h1>;
}
