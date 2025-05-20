import { HistoryContainer, HistoryList, Status } from "../history/Styles";

export function History() {
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
