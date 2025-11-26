import clsx from "clsx";
import Circle from "./circle.tsx"
import Cross from "./cross.tsx"
import { useMemo } from "react";

export default function BoardSquare(props: {
    action: (squareId: number, moveListe: number[]) => void;
    squareId: number;
    value: "X" | "O" | "";
    moveListe: number[];
    nextToRemove: number;
    winner: "X" | "O" | null;
}) {
    const isWinnerClassName = useMemo(() => {
        if (!props.winner) return "";
        if (props.moveListe.includes(props.squareId) && (props.value === props.winner)) {
            return `winner-${props.winner?.toLowerCase()}`;
        }
        return "";
    }, [props.squareId, props.winner, props.moveListe, props.value]);

    return (
        <button
            type="button"
            className={clsx(
                "board-square",
                props.squareId === props.nextToRemove && "will-be-cleared",
                isWinnerClassName,
                {
                    "circle": props.value === 'O',
                    "cross": props.value === "X"
                }
            )}
            onClick={() => props.action(props.squareId, props.moveListe)}
        >
            {props.value === "X" && <Cross />}
            {props.value === "O" && <Circle />}
        </button>
    );
}