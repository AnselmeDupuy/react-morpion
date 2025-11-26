import { Link } from "react-router";

function DrawModal(props:{action: () => void}) {
    return (
        <div className="win-modal">
            <h2>Too bad!</h2>
            <p>The game is a draw!</p>

            <button type="button" onClick={props.action}>
                Reset Board
            </button>

            <Link to="/">Home</Link>
        </div>
    );
}

export default DrawModal;