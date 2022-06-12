



import { ChessBoard } from './ChessBoard';



export class ChessSim {
    constructor() {
        this.board = new ChessBoard();

        this.init = this.init.bind(this);
        this.onClick = this.onClick.bind(this);
        this.reset = this.reset.bind(this);
    }

    init() {
        this.board.init();
    }

    onClick(x, y) {
        this.board.onClick(x, y);
    }

    reset() {
        this.board.reset();
    }
}
