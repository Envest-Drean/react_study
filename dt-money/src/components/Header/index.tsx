import { HeaderContainer, HeaderContent, NewTrasactionButton } from "./styles";
import logoImg from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";

export function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img src={logoImg} alt="Logo da DT-Money" />
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<NewTrasactionButton>New Transation</NewTrasactionButton>
					</Dialog.Trigger>
					<NewTransactionModal></NewTransactionModal>
				</Dialog.Root>
			</HeaderContent>
		</HeaderContainer>
	);
}
