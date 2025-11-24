import { useEffect, useState } from "react";
import BoardSquare from "./BoardSquare";
import type { Square } from "../types/Square";
import { Board as BoardLogic } from "../logic/GameLogic"

function Board() {

    const [board, setBoard] = useState<Square[]>(BoardLogic.createBoard());
    const [currentSymbol, setCurrentSymbol] = useState<"X" | "O">("X");
    const [moveListe, setMoveListe]= useState<number[]>([]);


    const handleClick = (squareId: number) => {
        const boardLogic = new BoardLogic(board);

        if (moveListe.length == 6) {
            boardLogic.clearSymbol(moveListe[0]);
            moveListe.shift();
            moveListe[0]
        }
        
        if (boardLogic.playSymbol(squareId, currentSymbol) !== false) {
            boardLogic.playSymbol(squareId, currentSymbol);
            moveListe.push(squareId);
            setBoard(boardLogic.getBoard());
            setCurrentSymbol(currentSymbol === "X" ? "O" : "X");
        }

        const winner = boardLogic.checkWin();
        if (winner) {
            console.log(winner, "wins!")
        }
    }

  
  return (
    <div className="board">
        {board.map((square) => (
            <BoardSquare
                key={square.id}
                action={handleClick}
                squareId={square.id}
                value={square.value}
            />
        ))}
    </div>
  );
};

export default Board;