import { useEffect, useContext } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CycleContexts";

export function Countdown() {
	const {
		activeCycle,
		activeCycleId,
		markCurrentCycleAsFinished,
		amountSecondsPassed,
		setSecondsPassed,
	} = useContext(CyclesContext);
	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

	useEffect(() => {
		let interval: number;
		if (activeCycle) {
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(
					new Date(),
					new Date(activeCycle.startDate)
				);

				if (secondsDifference >= totalSeconds) {
					markCurrentCycleAsFinished();
					setSecondsPassed(totalSeconds);
					clearInterval(interval);
				} else {
					setSecondsPassed(secondsDifference);
				}
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [
		activeCycle,
		totalSeconds,
		activeCycleId,
		markCurrentCycleAsFinished,
		setSecondsPassed,
	]);
	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondsAmount = currentSeconds % 60;
	const minutes = String(minutesAmount).padStart(2, "0");
	const seconds = String(secondsAmount).padStart(2, "0");
	console.log(activeCycle);

	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutes} : ${seconds}`;
		}
	}, [minutes, seconds, activeCycle]);
	return (
		<CountDownContainer>
			<span>{minutes[0]}</span>
			<span>{minutes[1]}</span>
			<Separator>:</Separator>
			<span>{seconds[0]}</span>
			<span>{seconds[1]}</span>
		</CountDownContainer>
	);
}
