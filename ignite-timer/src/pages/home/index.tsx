import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
	HomeContainer,
	StartCountDownButton,
	StopCountDownButton,
} from "./Styles";
import { useContext } from "react";
import { NewCycleForm } from "./Components/NewCycleForm";
import { Countdown } from "./Components/CountDown";
import { CyclesContext } from "../../contexts/CycleContexts";
/*import { secondsInDay } from "date-fns/constants";*/

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, "Informe a tarefa"),
	minutesAmount: zod
		.number()
		.min(5, "ciclo de no minimo 5 minutos")
		.max(60, "ciclo de no max de 60 minutos"),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
	const { createNewCycle, interruptCurrentCycle, activeCycle } =
		useContext(CyclesContext);
	const newCycleForm = useForm<newCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});
	const { handleSubmit, watch /*reset*/ } = newCycleForm;

	const task = watch("task");
	const isSubmitDisabled = !task;

	/*console.log(cycles);*/
	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(createNewCycle)} action="">
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>
				<Countdown />
				{activeCycle ? (
					<StopCountDownButton onClick={interruptCurrentCycle} type="button">
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
