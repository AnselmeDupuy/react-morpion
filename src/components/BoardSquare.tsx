export default function BoardSquare(props: {
    action: (squareId: number) => void;
    squareId: number;
    value: "X" | "O" | "";
}) {
    return (
        <button
            type="button"
            className="board-square"
            onClick={() => props.action(props.squareId)}
        >
            {props.value}
        </button>
    );
}