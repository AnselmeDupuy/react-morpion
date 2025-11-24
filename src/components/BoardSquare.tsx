import crossSvg from "../assets/cross.svg";
import circleSvg from "../assets/circle.svg";

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
            {props.value === "X" && <img src={crossSvg} alt="X" />}
            {props.value === "O" && <img src={circleSvg} alt="O" />}
        </button>
    );
}