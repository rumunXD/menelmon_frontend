
type TableRowProps = {
    id: number;
    playedAt: string;
    result: boolean;
    hp1: number;
    hp2: number;
}

export default function TableRow(props: TableRowProps) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.playedAt}</td>
            <td>{props.result ? "Wygrana" : "Przegrana"}</td>
            <td>{props.hp1 < 0 ? 0 : props.hp1}</td>
            <td>{props.hp2 < 0 ? 0 : props.hp2}</td>
        </tr>
    )
}