import { FaRedoAlt } from "react-icons/fa";

export default function Header({
    currentPlayer,
    onReset,
}: {
    currentPlayer: "X" | "O";
    onReset: () => void;
}) {
    return (
        <div className="header">
            <div className="header-left">
                <span className="symbol x">X</span>
                <span className="symbol o">O</span>
            </div>

            <div className="turn-indicator">
                {currentPlayer} TURN
            </div>

            <button className="reset-btn" onClick={onReset}>
                <FaRedoAlt size={16} />
            </button>
        </div>
    );
}
