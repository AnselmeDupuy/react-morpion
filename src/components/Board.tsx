import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import BoardSquare from "./BoardSquare";
import type { Square } from "../types/Square";
import { Board as BoardLogic } from "../logic/GameLogic";
import WinModal from "./winModal";
import DrawModal from "./drawModal";
import Header from "./Header";


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
        const newBoard = BoardLogic.createBoard();
        setBoard(newBoard);
        setMoveListe([]);
        setWinner(null);
        setGameState("playing");
        setCurrentSymbol("X");
    };


    const getStoredScores = () => {
        const scores = localStorage.getItem("scores");
        return scores ? JSON.parse(scores) : { };
    };

    const saveStoredScores = (scores: any) => {
        localStorage.setItem("scores", JSON.stringify(scores));
    };

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
            
            if (playerO === "AI" && currentSymbol === "O") {
                const ID = Math.floor(Math.random() * 9);
                boardLogic.playSymbol(ID, currentSymbol, moveListe);
            }

            
            const winner = boardLogic.checkWin();
            if (winner) {
                console.log(winner, "wins!")
                setWinner(winner);
                setGameState("won");

                const winnerName = winner === "X" ? playerX : playerO;

                const scores = getStoredScores();

                scores[winnerName] = (scores[winnerName] || 0) + 1;

                saveStoredScores(scores);

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

    <Header
        currentPlayer={currentSymbol}
        onReset={resetBoard}
    />

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
            {gameState === "won" && (
                <WinModal
                    action={resetBoard}
                    winnerSymbol={winner}
                    winnerName={winner === "X" ? playerX : playerO}
                />
            )}
            {gameState === "draw" && <DrawModal action={resetBoard}/>}
            </>
        ))}
    </div>
    <button onClick={resetBoard}>Reset</button>


    </>
  );
};

export default Board;