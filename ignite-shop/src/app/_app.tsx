"use client";

import { ReactNode } from "react";
import { globalStyles } from "../styles/global";
import logoImg from "../assets/Logo.svg";
import Image from "next/image";
import { Container, Header } from "@/styles/pages/app";

interface AppProps {
	children: ReactNode;
}
globalStyles();
export function App({ children }: AppProps) {
	return (
		<Container>
			<Header>
				<Image src={logoImg.src} alt="" width={130} height={52} />
			</Header>
			{children}
		</Container>
	);
}
