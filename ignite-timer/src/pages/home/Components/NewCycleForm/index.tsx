import { FormContainer, TaskInput, MinutesAmountInput } from "./styled";
import { useFormContext } from "react-hook-form";
import { CycleContext } from "../..";
import { useContext } from "react";

export function NewCycleForm() {
	const { activeCycle } = useContext(CycleContext);
	const { register } = useFormContext();
	return (
		<FormContainer>
			<label htmlFor="task">Vou trabalhar em</label>
			<TaskInput
				id="task"
				list="task-suggestions"
				placeholder="Dê nome para o seu projeto"
				disabled={!!activeCycle}
				{...register("task")}
			/>
			<datalist id="task-suggestions">
				<option value="Projeto Itto" />
				<option value="Projeto Sanzzo" />
				<option value="Projeto Shura" />
			</datalist>
			<label htmlFor="minutesAmount">durante</label>
			<MinutesAmountInput
				type="number"
				id="minutesAmount"
				placeholder="00"
				step={5}
				min={5}
				max={60}
				disabled={!!activeCycle}
				{...register("minutesAmount", { valueAsNumber: true })}
			/>

			<span>minutos.</span>
		</FormContainer>
	);
}
