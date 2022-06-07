



import blackKing from '../assets/chess/black-king.png';
import whiteKing from '../assets/chess/white-king.png';
import blackQueen from '../assets/chess/black-queen.png';
import whiteQueen from '../assets/chess/white-queen.png';
import blackBishop from '../assets/chess/black-bishop.png';
import whiteBishop from '../assets/chess/white-bishop.png';
import blackKnight from '../assets/chess/black-knight.png';
import whiteKnight from '../assets/chess/white-knight.png';
import blackRook from '../assets/chess/black-rook.png';
import whiteRook from '../assets/chess/white-rook.png';
import blackPawn from '../assets/chess/black-pawn.png';
import whitePawn from '../assets/chess/white-pawn.png';



class State {
    static INVALID = 0;
    static NORMAL = 1;
    static CHOOSEN = 10;
    constructor() {
        this.state = State.NORMAL;
        this.chX = -1;
        this.chY = -1;
        this.turn = true; //true for white, false for black
        this.chXPrev = -1;
        this.chYPrev = -1;

    }
}



export class ChessSim {
    constructor() {
        this.board = new ChessBoard();
        this.boardUI = [];
        this.state = new State();
        this.boardBack = [];

        this.initComponents = this.initComponents.bind(this);
        this.onClick = this.onClick.bind(this);
        this.move = this.move.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    initComponents() {
        //this.boardUI = [];
        for (let i = 0; i < 8; i++) {
            this.boardUI.push([]);
            this.boardBack.push([]);
            for (let j = 0; j < 8; j++) {
                this.boardUI[i].push(document.querySelector(`#box-${i}-${j}`));
                this.boardBack[i].push(document.querySelector(`#back-${i}-${j}`));
            }
        }

        this.boardUI[0][0].src = whiteRook;
        this.boardUI[0][1].src = whiteKnight;
        this.boardUI[0][2].src = whiteBishop;
        this.boardUI[0][3].src = whiteQueen;

        this.boardUI[0][4].src = whiteKing;
        this.boardUI[0][5].src = whiteBishop;
        this.boardUI[0][6].src = whiteKnight;
        this.boardUI[0][7].src = whiteRook;

        for (let i = 0; i < 8; i++) {
            this.boardUI[1][i].src = whitePawn;
        }

        this.boardUI[7][0].src = blackRook;
        this.boardUI[7][1].src = blackKnight;
        this.boardUI[7][2].src = blackBishop;
        this.boardUI[7][3].src = blackQueen;

        this.boardUI[7][4].src = blackKing;
        this.boardUI[7][5].src = blackBishop;
        this.boardUI[7][6].src = blackKnight;
        this.boardUI[7][7].src = blackRook;

        for (let i = 0; i < 8; i++) {
            this.boardUI[6][i].src = blackPawn;
        }

        for (let i = 2; i < 6; i++) {
            for (let j = 0; j < 8; j++) {
                this.boardUI[i][j].style.display = 'none';
            }
        }
    }

    move(i1, j1, i2, j2) {
        this.board.move(i1, j1, i2, j2);
        this.boardUI[i2][j2].src = this.boardUI[i1][j1].src;
        this.boardUI[i1][j1].src = '...';
        this.boardUI[i2][j2].style.display = 'block';
        this.boardUI[i1][j1].style.display = 'none';

        this.boardBack[i1][j1].style.backgroundColor = '#ff0000';
        this.boardBack[i2][j2].style.backgroundColor = '#00ff00';
    }

    onClick(x, y) {
        switch (this.state.state) {
            case State.NORMAL:
                if (this.state.chXPrev >= 0 && this.state.chYPrev >= 0) {
                    this.boardBack[this.state.chXPrev][this.state.chYPrev].style.backgroundColor = (this.state.chXPrev + this.state.chYPrev) % 2 == 0 ? '#666666' : '#ffffff';
                }
                if (this.state.chX >= 0 && this.state.chY >= 0) {
                    this.boardBack[this.state.chX][this.state.chY].style.backgroundColor = (this.state.chX + this.state.chY) % 2 == 0 ? '#666666' : '#ffffff';;
                }
                this.boardBack[x][y].style.backgroundColor = '#0000ff';
                this.state.chXPrev = this.state.chX;
                this.state.chYPrev = this.state.chY;

                this.state.chX = x;
                this.state.chY = y;
                this.state.state = State.CHOOSEN;

                //this.boardBack[x][y].style.backgroundColor = '#ff0000ff';
                break;
            case State.CHOOSEN:

                if (this.state.chX == x && this.state.chY == y) {
                    this.clearState();
                    break;
                }
                this.move(this.state.chX, this.state.chY, x, y);
                this.state.state = State.NORMAL;

                // this.boardBack[this.state.chX][this.state.chY].style.backgroundColor = '#00ff00ff';
                // this.boardBack[x][y].style.backgroundColor = '#ff0000ff';

                this.state.chXPrev = this.state.chX;
                this.state.chYPrev = this.state.chY;
                this.state.chX = x;
                this.state.chY = y;

                break;
            default:
                break;

        }
    }
    clearState() {
        this.state.state = State.NORMAL;
        if (this.state.chXPrev >= 0 && this.state.chYPrev >= 0) {
            this.boardBack[this.state.chXPrev][this.state.chYPrev].style.backgroundColor = (this.state.chXPrev + this.state.chYPrev) % 2 == 0 ? '#666666' : '#ffffff';
        }
        if (this.state.chX >= 0 && this.state.chY >= 0) {
            this.boardBack[this.state.chX][this.state.chY].style.backgroundColor = (this.state.chX + this.state.chY) % 2 == 0 ? '#666666' : '#ffffff';;
        }
        this.state.chX = -1;
        this.state.chY = -1;
        this.state.chXPrev = -1;
        this.state.chYPrev = -1;
    }
}


export class ChessBoard {
    constructor() {
        this.board = [];
        for (let i = 0; i < 8; i++) {
            this.board.push([]);
            for (let j = 0; j < 8; j++) {
                this.board[i].push(new Box(this, i, j));
            }
        }



        //bindings
        this.reset = this.reset.bind(this);
        this.attack = this.attack.bind(this);
        this.getPiece = this.getPiece.bind(this);
        this.update = this.update.bind(this);
        this.move = this.move.bind(this);
    }

    reset() {

        this.board[0][0] = new Box(this.board, 0, 0);
        this.board[0][0].setPiece(new Rook(0, 0, true));
        this.board[0][1] = new Box(this.board, 0, 1);
        this.board[0][1].setPiece(new Knight(0, 1, true));
        this.board[0][2] = new Box(this.board, 0, 2);
        this.board[0][2].setPiece(new Bishop(0, 2, true));
        this.board[0][3] = new Box(this.board, 0, 3);
        this.board[0][3].setPiece(new Queen(0, 3, true));

        this.board[0][4] = new Box(this.board, 0, 4);
        this.board[0][4].setPiece(new King(0, 4, true));
        this.board[0][5] = new Box(this.board, 0, 5);
        this.board[0][5].setPiece(new Bishop(0, 5, true));
        this.board[0][6] = new Box(this.board, 0, 6);
        this.board[0][6].setPiece(new Knight(0, 6, true));
        this.board[0][7] = new Box(this.board, 0, 7);
        this.board[0][7].setPiece(new Rook(0, 7, true));

        for (let i = 0; i < 8; i++) {
            this.board[1][i] = new Box(this.board, 1, i);
            this.board[1][i].setPiece(new Pawn(1, i, true));
        }

        this.board[7][0] = new Box(this.board, 7, 0);
        this.board[7][0].setPiece(new Rook(7, 0, false));
        this.board[7][1] = new Box(this.board, 7, 1);
        this.board[7][1].setPiece(new Knight(7, 1, false));
        this.board[7][2] = new Box(this.board, 7, 2);
        this.board[7][2].setPiece(new Bishop(7, 2, false));
        this.board[7][3] = new Box(this.board, 7, 3);
        this.board[7][3].setPiece(new Queen(7, 3, false));

        this.board[7][4] = new Box(this.board, 7, 4);
        this.board[7][4].setPiece(new King(7, 4, false));
        this.board[7][5] = new Box(this.board, 7, 5);
        this.board[7][5].setPiece(new Bishop(7, 5, false));
        this.board[7][6] = new Box(this.board, 7, 6);
        this.board[7][6].setPiece(new Knight(7, 6, false));
        this.board[7][7] = new Box(this.board, 7, 7);
        this.board[7][7].setPiece(new Rook(7, 7, false));

        for (let i = 0; i < 8; i++) {
            this.board[6][i] = new Box(this.board, 6, i);
            this.board[6][i].setPiece(new Pawn(6, i, false));
        }
    }


    getPiece(x, y) {
        return this.boardx[x][y];
    }

    update() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.board[i][j].update();
            }
        }
    }

    move(i1, j1, i2, j2) {
        this.board[i2][j2] = this.board[i1][j1].piece;
        this.board[i1][j1].piece = null;
        this.board[i2][j2].piece.x = i2;
        this.board[i2][j2].piece.y = j2;
    }

}

export class Box {
    constructor(board, x, y, white) {
        this.board = board;
        this.piece = null;

        this.x = x;
        this.y = y;
        this.attackMap = [];
        for (let i = 0; i < 8; i++) {
            this.attackMap.push([]);
            for (let j = 0; j < 8; j++) {
                this.attackMap[i].push(false);
            }
        }

        this.setPiece = this.setPiece.bind(this);
        this.checkAttacks = this.checkAttacks.bind(this);
        //.attack = this.attack.bind(this);
        this.update = this.update.bind(this);
    }

    setPiece(piece) {
        this.piece = piece;
        this.piece.box = this;
    }

    checkAttacks() {

    }
    update() {

    }
}


export class Piece {
    constructor(x, y, white) {
        this.box = null;
        this.x = x;
        this.y = y;
        this.type = -1;
        this.white = white;
    }

    update() {

    }
}

export class Pawn extends Piece {
    constructor(box, x, y) {
        super(box, x, y);
        this.type = 0;

        //bindings
        this.update = this.update.bind(this);
    }


    update() {

    }
}

export class Knight extends Piece {
    constructor(box, x, y) {
        super(box, x, y);
        this.type = 1;
    }
}

export class Rook extends Piece {

}

export class Bishop extends Piece {

}

export class Queen extends Piece {

}

export class King extends Piece {

}

export class Player {
    constructor(board, white) {
        this.white = white; //true if white, false if black
        this.pieces = [];
        this.board = board;

        //initialize with all pieces
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.board.board[i][j].piece != null) {
                    this.pieces.push(this.board.board[i][j].piece);
                }
            }
        }
    }
}