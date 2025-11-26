import { useState } from "react";
import { useNavigate } from "react-router";

function PlayerModal() {
  const navigate = useNavigate();

  const [playerX, setPlayerX] = useState("Guest");
  const [playerO, setPlayerO] = useState("AI"); 
  const [variant, setVariant] = useState("basic");

  const startGame = () => {
    navigate("/Game", {
      state: {
        variant,
        playerX: playerX || "Player 1",
        playerO: playerO || "AI"
      }
    });
  };

  return (
    <div className="home-wrapper">
      <div className="home-card">
        <h2>Choose Your Players</h2>

        <input
          className="input-field"
          type="text"
          placeholder="Player X name"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
        />

        <input
          className="input-field"
          type="text"
          placeholder="Player O name"
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
        />

        <h3>Game Mode</h3>

        <div className="radio-row">
          <label>
            <input
              type="radio"
              name="mode"
              value="basic"
              checked={variant === "basic"}
              onChange={(e) => setVariant(e.target.value)}
            />
            Basic
          </label>

          <label>
            <input
              type="radio"
              name="mode"
              value="variant"
              checked={variant === "variant"}
              onChange={(e) => setVariant(e.target.value)}
            />
            Variant
          </label>
        </div>

        <button className="enter-btn" onClick={startGame}>
          Start Game
        </button>
      </div>
    </div>
  );
}

export default PlayerModal;
