import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import BoardSquare from "./BoardSquare";
import type { Square } from "../types/Square";
import { Board as BoardLogic } from "../logic/GameLogic";
import WinModal from "./winModal";

export type CellValue = "X" | "O" | null;
export type GameState = "playing" | "won" | "draw";
export type GameVariant = "basic" | "variant";

const initialState = {
    currentPlayer: "X" as CellValue,
    gameState: "playing" as GameState,
    variant: "basic" as GameVariant,
};

function Board() {

    const [init, setInit] = useState(initialState);
    const [board, setBoard] = useState<Square[]>(BoardLogic.createBoard());
    const [currentSymbol, setCurrentSymbol] = useState<"X" | "O">("X");
    const [moveListe, setMoveListe]= useState<number[]>([]);
    const [winner, setWinner] = useState<"X" | "O" | null>(null);
    const [gameState, setGameState] = useState<"playing" | "won" | "draw">("playing");
    const [gameVariant, setGameVariant] = useState<"basic" | "variant">("basic");
    const [player, setPlayer] = useState<{X: string, O: string}>({X: "Player 1", O: "Player 2"});
    const [score, setScore] = useState<{score: number}>({score: 0});

    const { state } = useLocation();
    const { variant, playerX, playerO } = state;

    const scoreContext = createContext({ winner, playerX, playerO, score})

    const resetBoard = () => {
        board.map((square) => {
            square.value = "";
        });
        setMoveListe([])
    }
    useEffect(() => {
        setGameVariant(variant === "variant" ? "variant" : "basic");
        setInit({currentPlayer: currentSymbol, gameState, variant: gameVariant});
    }, [variant, currentSymbol, gameState, gameVariant]);

    const handleClick = (squareId: number, moveListe: number[]) => {
        if (gameState !== "playing") { return; }
        const boardLogic = new BoardLogic(board);

        console.log(gameState);
        
        if (boardLogic.playSymbol(squareId, currentSymbol, moveListe) !== false) {
            if (gameVariant === "variant") {
                if (moveListe.length == 6) {
                    boardLogic.clearSymbol(moveListe[0]);
                    moveListe.shift();
                    setMoveListe(moveListe);
                }
            }

 
            boardLogic.playSymbol(squareId, currentSymbol, moveListe);
            moveListe.push(squareId);
            setMoveListe([...moveListe]);
            setBoard(boardLogic.getBoard());
            setCurrentSymbol(currentSymbol === "X" ? "O" : "X");

            
            const winner = boardLogic.checkWin();
            if (winner) {
                console.log(winner, "wins!")
                setWinner(winner);
                setGameState("won");
                setScore({score: score.score + 1});
                return winner;
            }

            if (gameVariant === "basic" && moveListe.length === 9 && !winner) {
                setGameState("draw");
                console.log("It's a draw!");
            }
        }

    }

  
  return (
    <>
    <div>
    <p>Variant: {init.variant}</p>
    <h1>Au tour de {init.currentPlayer} de jouer</h1>
    </div>
    <div className="board">
        {board.map((square) => (
            <>
            <BoardSquare
                key={square.id}
                action={handleClick}
                squareId={square.id}
                value={square.value}
                moveListe={moveListe}
                nextToRemove={moveListe.length === 6 && gameVariant === "variant" ? moveListe[0] : -1}
                winner={winner}
            />
            
            {gameState === "won" && <WinModal />}
            </>
        ))}
    </div>

    <button type="button" onClick={() => {resetBoard();}}>
        Reset Board
    </button>
    </>
  );
};

export default Board;

/*
import { useCallback, useState } from "react";
import Grid from "./Grid";

export type CellValue = "X" | "O" | null;
export type GameState = "playing" | "won" | "draw";
export type GameVariant = "classic" | "3-shots";

const initialState = {
    variant: "classic" as GameVariant,
    currentPlayer: "X" as CellValue,
    cells: Array(9).fill(null) as CellValue[],
    gameState: "playing" as GameState,
};

export default function Game() {
    const [state, setState] = useState(initialState);

    

    function handleCellClick(index: number) {
        const newCells = [...state.cells];
        if (newCells[index] !== null) {
            alert("Cell already filled");
            return;
        }

        newCells[index] = state.currentPlayer;
        setState((prevState) => ({
            ...prevState,
            cells: newCells,
            currentPlayer: prevState.currentPlayer === "X" ? "O" : "X",
        }));
    }

    return (
        <div className="max-w-md mx-auto">
            <p>Variant: {state.variant}</p>
            <h1>Au tour de {state.currentPlayer} de jouer</h1>
            <Grid cells={state.cells} onCellClick={handleCellClick} />
            <button type="button" onClick={() => resetBoard()}>
                Reset no options
            </button>
            <button type="button" onClick={() => resetBoard({ variant: "3-shots" })}>
                Reset 3-shots
            </button>
            <button
                type="button"
                onClick={() => resetBoard({ cells: Array(9).fill("X") })}
            >
                Reset cells
            </button>
        </div>
    );
}
*/