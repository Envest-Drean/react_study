import {
	createContext,
	ReactNode,
	useState,
	useReducer,
	useEffect,
} from "react";
import { cyclesReducer, Cycle } from "../reducers/cycles/reducer";
import {
	addNewCycleAction,
	interruptCurrentCycleAction,
	markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/action";
import {} from "../reducers/cycles/action";
import { differenceInSeconds } from "date-fns";

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
	const [cyclesState, dispatch] = useReducer(
		cyclesReducer,
		{
			cycles: [],
			activeCycleId: null,
		},
		(initialState) => {
			const storedStateAsJSON = localStorage.getItem(
				"@ignite-timer:cycles-state-1.0.0"
			);
			if (storedStateAsJSON) {
				return JSON.parse(storedStateAsJSON);
			}
			return initialState;
		}
	);
	const { cycles, activeCycleId } = cyclesState;

	const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

	const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
		if (activeCycle)
			return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
		return 0;
	});

	useEffect(() => {
		const stateJSON = JSON.stringify(cyclesState);

		localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
	}, [cyclesState]);

	function setSecondsPassed(seconds: number) {
		setAmountSecondsPassed(seconds);
	}

	function markCurrentCycleAsFinished() {
		dispatch(markCurrentCycleAsFinishedAction());
	}

	function createNewCycle(data: createCycledata) {
		const newCycle: Cycle = {
			id: String(new Date().getTime()),
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		dispatch(addNewCycleAction(newCycle));

		setAmountSecondsPassed(0);
	}

	function interruptCurrentCycle() {
		dispatch(interruptCurrentCycleAction());
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
