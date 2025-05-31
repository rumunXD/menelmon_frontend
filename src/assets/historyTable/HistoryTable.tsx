import TableRow from "./TableRows/TableRow.tsx"
import "./HistoryTable.scss"

type TableParams = {
    data: any[];
}

export default function HistoryTable(params: TableParams) {
    const rows = params.data.map((parameter) => <TableRow id={parameter.id} playedAt={parameter.playedAt} result={parameter.result} hp1={parameter.hp1} hp2={parameter.hp2}/>)

    return (<div id={"table"}><table>
        <tr>
            <th>ID gry</th>
            <th>Data gry</th>
            <th>Rezultat</th>
            <th>Hp gracza</th>
            <th>Hp bota</th>
        </tr>
        {rows}
    </table></div>)
}