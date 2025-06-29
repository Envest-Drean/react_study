import { useCallback, useEffect, useState, type ReactNode } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
	id: number;
	description: string;
	type: "income" | "outcome";
	price: number;
	fecthTransactions: () => Promise<void>;
	category: string;
	createdAt: string;
}
interface CreateTransactionsInput {
	description: string;
	price: number;
	category: string;
	type: "income" | "outcome";
}

interface TransactionContextType {
	transactions: Transaction[];
	fetchTransactions: (query?: string) => Promise<void>;
	createTransactions: (data: CreateTransactionsInput) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionContextType);

interface transactionsProviderProps {
	children: ReactNode;
}

export function TransactionsProvider({ children }: transactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	const fetchTransactions = useCallback(async (query?: string) => {
		const response = await api.get("transactions", {
			params: {
				_sort: "createdAt",
				_order: "desc",
				q: query,
			},
		});
		setTransactions(response.data);
	}, []);

	const createTransactions = useCallback(
		async (data: CreateTransactionsInput) => {
			const { description, price, category, type } = data;
			const response = await api.post("transactions", {
				description,
				price,
				category,
				type,
				createdAt: new Date(),
			});
			setTransactions((state) => [response.data, ...state]);
		},
		[]
	);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);
	return (
		<TransactionsContext.Provider
			value={{
				transactions,
				fetchTransactions,
				createTransactions,
			}}>
			{children}
		</TransactionsContext.Provider>
	);
}
