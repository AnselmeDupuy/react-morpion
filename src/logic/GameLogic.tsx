import type { Square } from "../types/Square";

export class Board {
    private board: Square[];

    constructor(board: Square[]) {
        this.board = board;
    }

    playSymbol(squareId: number, symbol: "X" | "O" | "") {
        if (this.board[squareId].value !== "") {
            console.error("Square already played");
            return false;
        }
        this.board[squareId].value = symbol;
    }

    clearSymbol(squareId: number) {
        if (this.board[squareId].value !== "") {
            this.board[squareId].value = "";
        }
    }

    checkWin(): "X" | "O" | null {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                this.board[a].value !== "" &&
                this.board[a].value === this.board[b].value &&
                this.board[a].value === this.board[c].value
            ) {
                return this.board[a].value;
            }
        }
        return null;
    }

    getBoard() {
        return this.board;
    }

    static createBoard() {
        return new Board(
            Array.from({ length: 9 }, (_, index) => ({
                id: index,
                value: "",
            })),
        ).getBoard();
    }
}