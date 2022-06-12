
import { State, Piece, Pawn, Bishop, Knight, Rook, Queen, King } from './Pieces';

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



export class Player {
    constructor(board, white) {
        this.white = white; //true if white, false if black
        this.board = board;
        this.pieces = null;

        this.init = this.init.bind(this);
        this.reset = this.reset.bind(this);
        this.update = this.update.bind(this);
    }

    init() {
        this.pieces = {
            pawn0: new Pawn(1, 0, this.white),
            pawn1: new Pawn(1, 1, this.white),
            pawn2: new Pawn(1, 2, this.white),
            pawn3: new Pawn(1, 3, this.white),


            pawn4: new Pawn(1, 0, this.white),
            pawn5: new Pawn(1, 1, this.white),
            pawn6: new Pawn(1, 2, this.white),
            pawn7: new Pawn(1, 3, this.white),

            rook0: new Rook(0, 0, this.white),
            knight0: new Knight(0, 1, this.white),
            bishop0: new Bishop(0, 2, this.white),
            king: new King(0, 3, this.white),

            queen: new Queen(0, 0, this.white),
            bishop1: new Bishop(0, 1, this.white),
            knight1: new Knight(0, 2, this.white),
            rook1: new Rook(0, 3, this.white)
        };

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.board.board[i][j].piece = null;
            }
        }

        this.board.board[this.pieces.pawn0.x][this.pieces.pawn0.y] = this.pieces.pawn0;
        this.board.board[this.pieces.pawn1.x][this.pieces.pawn1.y] = this.pieces.pawn1;
        this.board.board[this.pieces.pawn2.x][this.pieces.pawn2.y] = this.pieces.pawn2;
        this.board.board[this.pieces.pawn3.x][this.pieces.pawn3.y] = this.pieces.pawn3;

        this.board.board[this.pieces.pawn4.x][this.pieces.pawn4.y] = this.pieces.pawn4;
        this.board.board[this.pieces.pawn5.x][this.pieces.pawn5.y] = this.pieces.pawn5;
        this.board.board[this.pieces.pawn6.x][this.pieces.pawn6.y] = this.pieces.pawn6;
        this.board.board[this.pieces.pawn7.x][this.pieces.pawn7.y] = this.pieces.pawn7;

        this.board.board[this.pieces.rook0.x][this.pieces.rook0.y] = this.pieces.rook0;
        this.board.board[this.pieces.knight0.x][this.pieces.knight0.y] = this.pieces.knight0;
        this.board.board[this.pieces.bishop0.x][this.pieces.bishop0.y] = this.pieces.bishop0;
        this.board.board[this.pieces.queen.x][this.pieces.queen.y] = this.pieces.queen;

        this.board.board[this.pieces.king.x][this.pieces.king.y] = this.pieces.king;
        this.board.board[this.pieces.bishop1.x][this.pieces.bishop1.y] = this.pieces.bishop1;
        this.board.board[this.pieces.knight1.x][this.pieces.knight1.y] = this.pieces.knight1;
        this.board.board[this.pieces.rook1.x][this.pieces.rook1.y] = this.pieces.rook1;
    }
    reset() {
        this.init();
    }
    update() {

    }
}

export class ChessBoard {
    constructor() {
        this.state = new State();
        this.board = [];
        this.playerWhite = new Player(this, true);
        this.playerBlack = new Player(this, false);

        this.boardUI = [];
        this.boardBack = [];


        //bindings
        this.reset = this.reset.bind(this);
        this.update = this.update.bind(this);
        this.move = this.move.bind(this);
        this.init = this.init.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    init() {


        for (let i = 0; i < 8; i++) {
            this.board.push([]);
            this.boardUI.push([]);
            this.boardBack.push([]);
            for (let j = 0; j < 8; j++) {
                this.board[i].push(new Box(this, i, j, null));
                this.boardUI[i].push(document.querySelector(`#box-${i}-${j}`));
                this.boardBack[i].push(document.querySelector(`#back-${i}-${j}`));
            }
        }

        this.playerBlack.init();
        this.playerBlack.init();

        this.boardUI[0][0].src = this.playerWhite.pieces.rook0.img;
        this.boardUI[0][1].src = this.playerWhite.pieces.knight0.img;
        this.boardUI[0][2].src = this.playerWhite.pieces.bishop0.img;
        this.boardUI[0][3].src = this.playerWhite.pieces.king.img;

        this.boardUI[0][4].src = this.playerWhite.pieces.queen.img;
        this.boardUI[0][5].src = this.playerWhite.pieces.bishop1.img;
        this.boardUI[0][6].src = this.playerWhite.pieces.knight1.img;
        this.boardUI[0][7].src = this.playerWhite.pieces.rook1.img;

        this.boardUI[1][0].src = this.playerWhite.pieces.pawn0.img;
        this.boardUI[1][1].src = this.playerWhite.pieces.pawn1.img;
        this.boardUI[1][2].src = this.playerWhite.pieces.pawn2.img;
        this.boardUI[1][3].src = this.playerWhite.pieces.pawn3.img;

        this.boardUI[1][4].src = this.playerWhite.pieces.pawn4.img;
        this.boardUI[1][5].src = this.playerWhite.pieces.pawn5.img;
        this.boardUI[1][6].src = this.playerWhite.pieces.pawn6.img;
        this.boardUI[1][7].src = this.playerWhite.pieces.pawn7.img;


        //Black Pieces
        this.boardUI[7][0].src = this.playerBlack.pieces.rook0.img;
        this.boardUI[7][1].src = this.playerBlack.pieces.knight0.img;
        this.boardUI[7][2].src = this.playerBlack.pieces.bishop0.img;
        this.boardUI[7][3].src = this.playerBlack.pieces.king.img;

        this.boardUI[7][4].src = this.playerBlack.pieces.queen.img;
        this.boardUI[7][5].src = this.playerBlack.pieces.bishop1.img;
        this.boardUI[7][6].src = this.playerBlack.pieces.knight1.img;
        this.boardUI[7][7].src = this.playerBlack.pieces.rook1.img;


        this.boardUI[6][0].src = this.playerBlack.pieces.pawn0.img;
        this.boardUI[6][1].src = this.playerBlack.pieces.pawn1.img;
        this.boardUI[6][2].src = this.playerBlack.pieces.pawn2.img;
        this.boardUI[6][3].src = this.playerBlack.pieces.pawn3.img;

        this.boardUI[6][4].src = this.playerBlack.pieces.pawn4.img;
        this.boardUI[6][5].src = this.playerBlack.pieces.pawn5.img;
        this.boardUI[6][6].src = this.playerBlack.pieces.pawn6.img;
        this.boardUI[6][7].src = this.playerBlack.pieces.pawn7.img;


        for (let i = 2; i < 6; i++) {
            for (let j = 0; j < 8; j++) {
                this.boardUI[i][j].style.display = 'none';
            }
        }
    }
    reset() {

        this.board[0][0].setPiece(this.playerWhite.piece);
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

        if (this.board[i1][j1].piece == null) {
            return;
        }
        this.board[i2][j2] = this.board[i1][j1].piece;
        this.board[i1][j1].piece = null;
        this.board[i2][j2].piece.x = i2;
        this.board[i2][j2].piece.y = j2;

        this.board.move(i1, j1, i2, j2);
        this.boardUI[i2][j2].src = this.boardUI[i1][j1].src;
        this.boardUI[i1][j1].src = null;
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

export class Box {
    constructor(board, x, y, white) {
        this.board = board;
        this.piece = null;
        this.white = white;
        this.x = x;
        this.y = y;
        this.init();

        this.init = this.init.bind(this);
        this.update = this.update.bind(this);
        this.reset = this.reset.bind(this);
    }

    init() {
    }

    update() {

    }

    reset() {
    }
}

