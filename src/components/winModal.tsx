import { Link } from "react-router";

function WinModal() {
    return (
        <div className="win-modal">
            <h2>Congratulations!</h2>
            <p>You have won the game!</p>
            <Link to="/">Home</Link>
        </div>
    );
}

export default WinModal;