import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
	HomeContainer,
	StartCountDownButton,
	StopCountDownButton,
} from "./Styles";
import { createContext, useState } from "react";
import { NewCycleForm } from "./Components/NewCycleForm";
import { Countdown } from "./Components/CountDown";
import { secondsInDay } from "date-fns/constants";

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}
interface CycleContextType {
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	amountSecondsPassed: number;
	markCurrentCycleAsFinished: () => void;
	setSecondsPassed: (seconds: number) => void;
}

export const CycleContext = createContext({} as CycleContextType);

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, "Informe a tarefa"),
	minutesAmount: zod
		.number()
		.min(5, "ciclo de no minimo 5 minutos")
		.max(60, "ciclo de no max de 60 minutos"),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);

	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [amountSecondsPassed, setamountSecondsPassed] = useState(0);

	const newCycleForm = useForm<newCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});
	const { handleSubmit, watch, reset } = newCycleForm;
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

	function handleCreateNewCycle(data: newCycleFormData) {
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

		reset();
	}

	function handlerInterruptCycle() {
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

	const task = watch("task");
	const isSubmitDisabled = !task;

	console.log(cycles);
	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
				<CycleContext.Provider
					value={{
						activeCycle,
						activeCycleId,
						markCurrentCycleAsFinished,
						amountSecondsPassed,
						setSecondsPassed,
					}}>
					<FormProvider {...newCycleForm}>
						<NewCycleForm />
					</FormProvider>
					<Countdown />
				</CycleContext.Provider>

				{activeCycle ? (
					<StopCountDownButton onClick={handlerInterruptCycle} type="button">
						<HandPalm size={24} /> interromper
					</StopCountDownButton>
				) : (
					<StartCountDownButton disabled={isSubmitDisabled} type="submit">
						<Play size={24} /> Começar
					</StartCountDownButton>
				)}
			</form>
		</HomeContainer>
	);
}
