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
    <div className="game-options-screen">
      <h2>Choose Your Player</h2>

      <input
        type="text"
        placeholder="Player 1 Name"
        value={playerX}
        onChange={(e) => setPlayerX(e.target.value)}
      />

      <input
        type="text"
        placeholder="Player 2 Name (AI)"
        value={playerO}
        onChange={(e) => setPlayerO(e.target.value)}
      />

      <div className="variant-section">
        <label>
          <input
            type="radio"
            name="symbol"
            value="basic"
            checked={variant === "basic"}
            onChange={(e) => setVariant(e.target.value)}
          />
          Basic
        </label>

        <label>
          <input
            type="radio"
            name="symbol"
            value="variant"
            checked={variant === "variant"}
            onChange={(e) => setVariant(e.target.value)}
          />
          Variant
        </label>
      </div>

      <button type="submit" onClick={startGame}>
        Enter
      </button>
    </div>
  );
}

export default PlayerModal;
