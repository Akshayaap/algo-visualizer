
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
        this.attackMap = [];
        this.isCheck = false;
        this.isCheckMate = false;

        this.init = this.init.bind(this);
        this.reset = this.reset.bind(this);
        this.update = this.update.bind(this);
    }

    setOpp(opp) {
        this.opponent = opp;
    }
    init() {
        if (this.white) {
            this.pieces = {
                pawn0: new Pawn(this.board, 1, 0, true),
                pawn1: new Pawn(this.board, 1, 1, true),
                pawn2: new Pawn(this.board, 1, 2, true),
                pawn3: new Pawn(this.board, 1, 3, true),

                pawn4: new Pawn(this.board, 1, 4, true),
                pawn5: new Pawn(this.board, 1, 5, true),
                pawn6: new Pawn(this.board, 1, 6, true),
                pawn7: new Pawn(this.board, 1, 7, true),

                rook0: new Rook(this.board, 0, 0, true),
                knight0: new Knight(this.board, 0, 1, true),
                bishop0: new Bishop(this.board, 0, 2, true),
                king: new King(this.board, 0, 3, true, this),

                queen: new Queen(this.board, 0, 4, true),
                bishop1: new Bishop(this.board, 0, 5, true),
                knight1: new Knight(this.board, 0, 6, true),
                rook1: new Rook(this.board, 0, 7, true)
            };
        }
        else {
            this.pieces = {
                pawn0: new Pawn(this.board, 6, 0, false),
                pawn1: new Pawn(this.board, 6, 1, false),
                pawn2: new Pawn(this.board, 6, 2, false),
                pawn3: new Pawn(this.board, 6, 3, false),

                pawn4: new Pawn(this.board, 6, 4, false),
                pawn5: new Pawn(this.board, 6, 5, false),
                pawn6: new Pawn(this.board, 6, 6, false),
                pawn7: new Pawn(this.board, 6, 7, false),

                rook0: new Rook(this.board, 7, 0, false),
                knight0: new Knight(this.board, 7, 1, false),
                bishop0: new Bishop(this.board, 7, 2, false),
                king: new King(this.board, 7, 3, false, this),

                queen: new Queen(this.board, 7, 4, false),
                bishop1: new Bishop(this.board, 7, 5, false),
                knight1: new Knight(this.board, 7, 6, false),
                rook1: new Rook(this.board, 7, 7, false)
            };
        }



        this.board.board[this.pieces.pawn0.x][this.pieces.pawn0.y].piece = this.pieces.pawn0;
        this.board.board[this.pieces.pawn1.x][this.pieces.pawn1.y].piece = this.pieces.pawn1;
        this.board.board[this.pieces.pawn2.x][this.pieces.pawn2.y].piece = this.pieces.pawn2;
        this.board.board[this.pieces.pawn3.x][this.pieces.pawn3.y].piece = this.pieces.pawn3;

        this.board.board[this.pieces.pawn4.x][this.pieces.pawn4.y].piece = this.pieces.pawn4;
        this.board.board[this.pieces.pawn5.x][this.pieces.pawn5.y].piece = this.pieces.pawn5;
        this.board.board[this.pieces.pawn6.x][this.pieces.pawn6.y].piece = this.pieces.pawn6;
        this.board.board[this.pieces.pawn7.x][this.pieces.pawn7.y].piece = this.pieces.pawn7;

        this.board.board[this.pieces.rook0.x][this.pieces.rook0.y].piece = this.pieces.rook0;
        this.board.board[this.pieces.knight0.x][this.pieces.knight0.y].piece = this.pieces.knight0;
        this.board.board[this.pieces.bishop0.x][this.pieces.bishop0.y].piece = this.pieces.bishop0;
        this.board.board[this.pieces.queen.x][this.pieces.queen.y].piece = this.pieces.queen;

        this.board.board[this.pieces.king.x][this.pieces.king.y].piece = this.pieces.king;
        this.board.board[this.pieces.bishop1.x][this.pieces.bishop1.y].piece = this.pieces.bishop1;
        this.board.board[this.pieces.knight1.x][this.pieces.knight1.y].piece = this.pieces.knight1;
        this.board.board[this.pieces.rook1.x][this.pieces.rook1.y].piece = this.pieces.rook1;

        console.log(this.board.board);
    }
    reset() {
        this.init();
    }
    update() {
        this.attackMap = [];
        for (let i = 0; i < 8; i++) {
            this.attackMap[i] = [];
            for (let j = 0; j < 8; j++) {
                this.attackMap[i][j] = false;
            }
        }
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.attackMap[i][j] =
                    this.opponent.pieces.pawn0.map[i][j] ||
                    this.opponent.pieces.pawn1.map[i][j] ||
                    this.opponent.pieces.pawn2.map[i][j] ||
                    this.opponent.pieces.pawn3.map[i][j] ||
                    this.opponent.pieces.pawn4.map[i][j] ||
                    this.opponent.pieces.pawn5.map[i][j] ||
                    this.opponent.pieces.pawn6.map[i][j] ||
                    this.opponent.pieces.pawn7.map[i][j] ||
                    this.opponent.pieces.rook0.map[i][j] ||
                    this.opponent.pieces.knight0.map[i][j] ||
                    this.opponent.pieces.bishop0.map[i][j] ||
                    this.opponent.pieces.queen.map[i][j] ||
                    this.opponent.pieces.king.map[i][j] ||
                    this.opponent.pieces.bishop1.map[i][j] ||
                    this.opponent.pieces.knight1.map[i][j] ||
                    this.opponent.pieces.rook1.map[i][j];
            }
        }
    }
}

export class ChessBoard {
    constructor() {
        this.state = new State();
        this.board = [];

        for (let i = 0; i < 8; i++) {
            this.board.push([]);
            for (let j = 0; j < 8; j++) {
                this.board[i].push(new Box(this, i, j, null));
            }
        }

        this.playerWhite = new Player(this, true);
        this.playerBlack = new Player(this, false);
        this.playerBlack.setOpp(this.playerWhite);
        this.playerWhite.setOpp(this.playerBlack);

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

        this.clearState();

        this.boardUI = [];
        this.boardBack = [];
        for (let i = 0; i < 8; i++) {
            this.boardUI.push([]);
            this.boardBack.push([]);
            for (let j = 0; j < 8; j++) {
                this.boardUI[i].push(document.querySelector(`#box-${i}-${j}`));
                this.boardBack[i].push(document.querySelector(`#back-${i}-${j}`));
            }
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.board[i][j].piece = null;
            }
        }

        this.playerWhite.init();
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
        console.log(this.board);
        this.update();
    }
    reset() {
        this.state.reset();
        this.init();
    }

    update() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.board[i][j].update();
            }
        }
        this.playerWhite.update();
        this.playerBlack.update();


    }

    move(i1, j1, i2, j2) {

        console.log(this.board);
        if (this.board[i1][j1].piece == null) {
            return;
        }
        this.board[i1][j1].piece.moved = true;
        this.board[i2][j2].piece = this.board[i1][j1].piece;
        console.log(this.board[i2][j2]);
        console.log(this.board[i1][j1]);
        this.board[i1][j1].piece = null;
        this.board[i2][j2].piece.x = i2;
        this.board[i2][j2].piece.y = j2;

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
                if (this.board[x][y].piece == null) {
                    break;
                }
                if (this.state.turn) {
                    if (this.board[x][y].piece.white) {

                        this.boardBack[x][y].style.backgroundColor = '#0000ff';
                        this.state.chXPrev = this.state.chX;
                        this.state.chYPrev = this.state.chY;

                        this.state.chX = x;
                        this.state.chY = y;
                        this.state.state = State.CHOOSEN;
                        if (this.state.chXPrev >= 0 && this.state.chYPrev >= 0) {
                            this.boardBack[this.state.chXPrev][this.state.chYPrev].style.backgroundColor = (this.state.chXPrev + this.state.chYPrev) % 2 == 0 ? '#666666' : '#ffffff';
                        }
                        if (this.state.chX >= 0 && this.state.chY >= 0) {
                            this.boardBack[this.state.chX][this.state.chY].style.backgroundColor = (this.state.chX + this.state.chY) % 2 == 0 ? '#666666' : '#ffffff';;
                        }
                        for (let i = 0; i < 8; i++) {
                            for (let j = 0; j < 8; j++) {
                                if (this.board[x][y].piece.map[i][j]) {
                                    this.boardBack[i][j].style.backgroundColor = '#ffff00';
                                } else {
                                    this.boardBack[i][j].style.backgroundColor = (i + j) % 2 == 0 ? '#666666' : '#ffffff';;
                                }
                            }
                        }

                    }

                } else {
                    if (!this.board[x][y].piece.white) {

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

                        for (let i = 0; i < 8; i++) {
                            for (let j = 0; j < 8; j++) {
                                if (this.board[x][y].piece.map[i][j]) {
                                    this.boardBack[i][j].style.backgroundColor = '#ffff00';
                                } else {
                                    this.boardBack[i][j].style.backgroundColor = (i + j) % 2 == 0 ? '#666666' : '#ffffff';;
                                }
                            }
                        }
                    }
                }




                //this.boardBack[x][y].style.backgroundColor = '#ff0000ff';
                break;
            case State.CHOOSEN:

                if (this.state.chX == x && this.state.chY == y) {
                    this.clearState();
                    break;
                }
                console.log(this.board[this.state.chX][this.state.chY].piece.map[x][y]);

                if (this.board[this.state.chX][this.state.chY].piece.map[x][y]) {

                    this.move(this.state.chX, this.state.chY, x, y);
                    this.state.state = State.NORMAL;
                }
                else {
                    this.clearState();
                    break;
                }

                // this.boardBack[this.state.chX][this.state.chY].style.backgroundColor = '#00ff00ff';
                // this.boardBack[x][y].style.backgroundColor = '#ff0000ff';

                this.state.chXPrev = this.state.chX;
                this.state.chYPrev = this.state.chY;
                this.state.chX = x;
                this.state.chY = y;
                this.state.turn = !this.state.turn;
                break;
            default:
                break;

        }
        this.update();
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
        this.x = x;
        this.y = y;

        this.init = this.init.bind(this);
        this.update = this.update.bind(this);
        this.reset = this.reset.bind(this);
    }

    init() {
    }

    update() {
        if (this.piece != null) {
            this.piece.update();
        }
    }

    reset() {
    }
}

