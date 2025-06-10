import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { HistoryContainer, HistoryList, Status } from "../history/Styles";
import { CyclesContext } from "../../contexts/CycleContexts";

export function History() {
	const { cycles } = useContext(CyclesContext);
	return (
		<HistoryContainer>
			<h1>Meu historico:</h1>
			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Tarefa</th>
							<th>Duração</th>
							<th>inicio</th>
							<th>status</th>
						</tr>
					</thead>
					<tbody>
						{cycles.map((cycle) => {
							return (
								<tr key={cycle.id}>
									<td>{cycle.task}</td>
									<td>{cycle.minutesAmount} Minutos</td>
									<td>
										{formatDistanceToNow(new Date(cycle.startDate), {
											addSuffix: true,
											locale: ptBR,
										})}
									</td>
									<td>
										{cycle.finishedDate && (
											<Status StatusColor="green">concluid</Status>
										)}
										{cycle.interruptedDate && (
											<Status StatusColor="red">Interrompido</Status>
										)}
										{!cycle.finishedDate && !cycle.interruptedDate && (
											<Status StatusColor="yellow">em andamento</Status>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	);
}
