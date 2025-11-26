import { Link } from "react-router";

function WinModal({ action, winnerSymbol, winnerName }: {
    action: () => void;
    winnerSymbol: "X" | "O" | null;
    winnerName: string;
}) {
    return (
        <div className="win-modal">
            <h2>{winnerName} wins!</h2>
            <p>Player ({winnerSymbol}) has won this round.</p>

            <button onClick={action}>Play Again</button>
            <Link to="/">Return Home</Link>
        </div>
    );
}

export default WinModal;