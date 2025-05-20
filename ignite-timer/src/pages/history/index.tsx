import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "../history/Styles";
import { CyclesContext } from "../../contexts/CycleContexts";

export function History() {
	const { cycles } = useContext(CyclesContext);
	return (
		<HistoryContainer>
			<h1>Meu historico:</h1>
			<pre>{JSON.stringify(cycles, null, 2)}</pre>
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
						<tr>
							<td>Tarefa</td>
							<td>25 minutos</td>
							<td>há 1 ano</td>
							<td>
								<Status StatusColor="yellow">em andamento</Status>
							</td>
						</tr>
						<tr>
							<td>Tarefa</td>
							<td>25 minutos</td>
							<td>há 1 ano</td>
							<td>
								<Status StatusColor="red">interropido</Status>
							</td>
						</tr>
						<tr>
							<td>Tarefa</td>
							<td>25 minutos</td>
							<td>há 1 ano</td>
							<td>
								<Status StatusColor="green">Concluido</Status>
							</td>
						</tr>
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	);
}
