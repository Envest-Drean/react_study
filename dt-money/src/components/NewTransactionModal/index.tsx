import * as Dialog from "@radix-ui/react-dialog";
import {
	Content,
	Overlay,
	CloseButton,
	TransactionType,
	TransactionTypeButton,
} from "./styles";
import * as z from "zod";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const newTransactionFormSchema = z.object({
	description: z.string(),
	price: z.number(),
	category: z.string(),
	type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
	const createTransactions = useContextSelector(
		TransactionsContext,
		(context) => {
			return context.createTransactions;
		}
	);

	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset,
	} = useForm<NewTransactionFormInputs>({
		resolver: zodResolver(newTransactionFormSchema),
		defaultValues: {
			type: "income",
		},
	});

	async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
		const { description, category, price, type } = data;
		await createTransactions({
			description,
			category,
			price,
			type,
		});
		reset();
	}

	return (
		<Dialog.Portal>
			<Overlay />
			<Content>
				<Dialog.Title>New Transation</Dialog.Title>
				<CloseButton>
					<X size={24} />
				</CloseButton>
				<form onSubmit={handleSubmit(handleCreateNewTransaction)}>
					<input
						type="text"
						placeholder="Descrição"
						required
						{...register("description")}
					/>
					<input
						type="number"
						placeholder="Preço"
						required
						{...register("price", { valueAsNumber: true })}
					/>
					<input
						type="text"
						placeholder="Categoria"
						required
						{...register("category")}
					/>
					<Controller
						control={control}
						name="type"
						render={({ field }) => {
							return (
								<TransactionType
									onValueChange={field.onChange}
									value={field.value}>
									<TransactionTypeButton variant="income" value="income">
										<ArrowCircleUp size={24} />
										Entrada
									</TransactionTypeButton>
									<TransactionTypeButton variant="outcome" value="outcome">
										<ArrowCircleDown size={24} />
										Saida
									</TransactionTypeButton>
								</TransactionType>
							);
						}}
					/>

					<button type="submit" disabled={isSubmitting}>
						Registrar
					</button>
				</form>
			</Content>
		</Dialog.Portal>
	);
}
