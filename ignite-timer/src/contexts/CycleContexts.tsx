import { createContext, ReactNode, useState } from "react";

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

interface CycleContextType {
	cycles: Cycle[];
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	amountSecondsPassed: number;
	markCurrentCycleAsFinished: () => void;
	setSecondsPassed: (seconds: number) => void;
	createNewCycle: (data: createCycledata) => void;
	interruptCurrentCycle: () => void;
}

interface createCycledata {
	task: string;
	minutesAmount: number;
}
export const CyclesContext = createContext({} as CycleContextType);

interface CycleContextproviderprops {
	children: ReactNode;
}

export function CyclesContextProvider({ children }: CycleContextproviderprops) {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [amountSecondsPassed, setamountSecondsPassed] = useState(0);
	const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);
	function setSecondsPassed(seconds: number) {
		setamountSecondsPassed(seconds);
	}
	function markCurrentCycleAsFinished() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id == activeCycleId) {
					return { ...cycle, interruptedDate: new Date() };
				} else {
					return cycle;
				}
			})
		);
	}
	function createNewCycle(data: createCycledata) {
		const id = String(new Date().getTime());
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};
		setCycles((state) => [...state, newCycle]);
		setActiveCycleId(id);
		setamountSecondsPassed(0);

		/*reset();*/
	}

	function interruptCurrentCycle() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id == activeCycleId) {
					return { ...cycle, interruptedDate: new Date() };
				} else {
					return cycle;
				}
			})
		);
		setActiveCycleId(null);
	}

	return (
		<CyclesContext.Provider
			value={{
				cycles,
				activeCycle,
				activeCycleId,
				markCurrentCycleAsFinished,
				amountSecondsPassed,
				setSecondsPassed,
				createNewCycle,
				interruptCurrentCycle,
			}}>
			{children}
		</CyclesContext.Provider>
	);
}
