

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





export class State {
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

        this.reset = this.reset.bind(this);
    }
    reset() {
        this.state = State.NORMAL;
        this.chX = -1;
        this.chY = -1;
        this.turn = true; //true for white, false for black
        this.chXPrev = -1;
        this.chYPrev = -1;

    }
}





export class Piece {
    constructor(x, y, white) {
        this.box = null;
        this.x = x;
        this.y = y;
        this.type = -1;
        this.white = white;
        this.moved = false;
        this.map = [];

        this.init = this.init.bind(this);
        this.update = this.update.bind(this);
        this.reset = this.reset.bind(this);
    }

    init() {
        for (let i = 0; i < 8; i++) {
            this.map.push([]);
            for (let j = 0; j < 8; j++) {
                this.map[i].push(false);
            }
        }
    }

    update() {

    }

    reset() {
        this.init();
    }
}

export class Pawn extends Piece {
    constructor(board, x, y, white) {
        super(x, y, white);
        this.board = board;
        this.type = 0;
        if (this.white) {
            this.img = whitePawn;
        }
        else {
            this.img = blackPawn;
        }


        //bindings
        this.update = this.update.bind(this);
        this.reset = this.reset.bind(this);
        this.init = this.init.bind(this);

        this.init();
    }

    init() {
        for (let i = 0; i < 8; i++) {
            this.map.push([]);
            for (let j = 0; j < 8; j++) {
                this.map[i].push(false);
            }
        }
    }

    update() {
        this.map = []
        for (let i = 0; i < 8; i++) {
            this.map.push([]);
            for (let j = 0; j < 8; j++) {
                this.map[i].push(false);
            }
        }

        if (this.white) {
            if (this.x + 1 < 8 && this.board.board[this.x + 1][this.y].piece == null) {
                this.map[this.x + 1][this.y] = true;
                if (!this.moved && this.board.board[this.x + 1][this.y].piece == null) {
                    this.map[this.x + 2][this.y] = true;
                }
            }


            if (this.x + 1 < 8 && this.y + 1 < 8 && this.board.board[this.x + 1][this.y + 1].piece != null) {
                if (!this.board.board[this.x + 1][this.y + 1].piece.white) {
                    this.map[this.x + 1][this.y + 1] = true;
                }
            }

            if (this.x + 1 < 8 && this.y - 1 >= 0) {
                if (this.board.board[this.x + 1][this.y - 1].piece != null) {
                    if (!this.board.board[this.x + 1][this.y - 1].piece.white) {
                        this.map[this.x + 1][this.y - 1] = true;
                    }
                }

            }
        }
        else {
            if (this.x - 1 >= 0 && this.board.board[this.x - 1][this.y].piece == null) {
                this.map[this.x - 1][this.y] = true;
                if (!this.moved && this.board.board[this.x - 2][this.y].piece == null) {
                    this.map[this.x - 2][this.y] = true;
                }
            }

            if (this.x - 1 >= 0 && this.y + 1 < 8 && this.board.board[this.x - 1][this.y + 1].piece != null) {
                if (this.board.board[this.x - 1][this.y + 1].piece.white) {
                    this.map[this.x - 1][this.y + 1] = true;

                }
            }

            if (this.x - 1 >= 0 && this.y - 1 >= 0 && this.board.board[this.x - 1][this.y - 1].piece != null) {
                if (this.board.board[this.x - 1][this.y - 1].piece.white) {
                    this.map[this.x - 1][this.y - 1] = true;
                }

            }
        }
    }

    reset() {

    }
}

export class Knight extends Piece {
    constructor(board, x, y, white) {
        super(x, y, white);
        this.board = board;
        this.type = 0;


        if (this.white) {
            this.img = whiteKnight;
        }
        else {
            this.img = blackKnight;
        }

        ////bindings
        this.update = this.update.bind(this);
        this.reset = this.reset.bind(this);
        this.init = this.init.bind(this);


        this.init();
    }

    init() {
        this.map = [];
        for (let i = 0; i < 8; i++) {
            this.map.push([]);
            for (let j = 0; j < 8; j++) {
                this.map[i].push(false);
            }
        }
    }

    update() {
        this.init();
        if (this.x + 2 < 8 && this.y + 1 < 8) {
            if (this.board.board[this.x + 2][this.y + 1].piece == null) {
                this.map[this.x + 2][this.y + 1] = true;
            } else {
                if (this.board.board[this.x + 2][this.y + 1].piece.white != this.white) {
                    this.map[this.x + 2][this.y + 1] = true;
                    console.log("Here Missbehaing ");
                }
            }
        }
        if (this.x + 2 < 8 && this.y - 1 >= 0) {
            if (this.board.board[this.x + 2][this.y - 1].piece == null) {

                this.map[this.x + 2][this.y - 1] = true;
            } else {
                if (this.board.board[this.x + 2][this.y - 1].piece.white != this.white) {
                    this.map[this.x + 2][this.y - 1] = true;
                    console.log("Here Missbehaing ");
                }
            }
        }
        if (this.x - 2 >= 0 && this.y + 1 < 8) {
            if (this.board.board[this.x - 2][this.y + 1].piece == null) {

                this.map[this.x - 2][this.y + 1] = true;
            } else {
                if (this.board.board[this.x - 2][this.y + 1].piece.white != this.white) {
                    this.map[this.x - 2][this.y + 1] = true;
                    console.log("Here Missbehaing ");
                }
            }
        }
        if (this.x - 2 >= 0 && this.y - 1 >= 0) {
            if (this.board.board[this.x - 2][this.y - 1].piece == null) {
                this.map[this.x - 2][this.y - 1] = true;
            } else {
                if (this.board.board[this.x - 2][this.y - 1].piece.white != this.white) {
                    this.map[this.x - 2][this.y - 1] = true;
                    console.log("Here Missbehaing ");
                }
            }
        }
        if (this.x + 1 < 8 && this.y + 2 < 8) {
            if (this.board.board[this.x + 1][this.y + 2].piece == null) {
                this.map[this.x + 1][this.y + 2] = true;
            } else {
                if (this.board.board[this.x + 1][this.y + 2].piece.white != this.white) {
                    this.map[this.x + 1][this.y + 2] = true;
                    console.log("Here Missbehaing ");
                }
            }
        }
        if (this.x + 1 < 8 && this.y - 2 >= 0) {
            if (this.board.board[this.x + 1][this.y - 2].piece == null) {

                this.map[this.x + 1][this.y - 2] = true;
            } else {
                if (this.board.board[this.x + 1][this.y - 2].piece.white != this.white) {
                    this.map[this.x + 1][this.y - 2] = true;
                    console.log("Here Missbehaing ");
                }
            }
        }
        if (this.x - 1 >= 0 && this.y + 2 < 8) {
            if (this.board.board[this.x - 1][this.y + 2].piece == null) {
                this.map[this.x - 1][this.y + 2] = true;
            } else {
                if (this.board.board[this.x - 1][this.y + 2].piece.white != this.white) {
                    this.map[this.x - 1][this.y + 2] = true;
                    console.log("Here Missbehaing ");
                }
            }
        }
        if (this.x - 1 >= 0 && this.y - 2 >= 0) {
            if (this.board.board[this.x - 1][this.y - 2].piece == null) {
                this.map[this.x - 1][this.y - 2] = true;
            } else {
                if (this.board.board[this.x - 1][this.y - 2].piece.white != this.white) {
                    console.log("Here Missbehaing ");
                    this.map[this.x - 1][this.y - 2] = true;
                }
            }
        }
    }
    reset() {

    }
}

export class Rook extends Piece {
    constructor(board, x, y, white) {
        super(x, y, white);
        this.board = board;
        this.type = 0;

        if (this.white) {
            this.img = whiteRook;
        }
        else {
            this.img = blackRook;
        }

        ////bindings
        this.update = this.update.bind(this);
        this.reset = this.reset.bind(this);
        this.init = this.init.bind(this);


        this.init();
    }

    init() {
        this.map = [];
        for (let i = 0; i < 8; i++) {
            this.map.push([]);
            for (let j = 0; j < 8; j++) {
                this.map[i].push(false);
            }
        }
    }

    update() {
        this.init();

        let i = this.x;
        let j = this.y;
        i++;
        while (i < 8) {
            if (this.board.board[i][j].piece == null) {
                this.map[i][j] = true;
            }
            else {
                if (this.board.board[i][j].piece.white != this.white) {
                    this.map[i][j] = true;
                }
                break;
            }
            i++;
        }


        i = this.x;
        j = this.y;
        i--;
        while (i >= 0) {
            if (this.board.board[i][j].piece == null) {
                this.map[i][j] = true;
            }
            else {
                if (this.board.board[i][j].piece.white != this.white) {
                    this.map[i][j] = true;
                }
                break;
            }
            i--;
        }

        i = this.x;
        j = this.y;
        j++;
        while (j < 8) {
            if (this.board.board[i][j].piece == null) {
                this.map[i][j] = true;
            }
            else {
                if (this.board.board[i][j].piece.white != this.white) {
                    this.map[i][j] = true;
                }
                break;
            }
            j++;
        }

        i = this.x;
        j = this.y;
        j--;
        while (j >= 0) {
            if (this.board.board[i][j].piece == null) {
                this.map[i][j] = true;
            }
            else {
                if (this.board.board[i][j].piece.white != this.white) {
                    this.map[i][j] = true;
                }
                break;
            }
            j--;
        }
    }
    reset() {

    }
}

export class Bishop extends Piece {
    constructor(board, x, y, white) {
        super(x, y, white);
        this.board = board;
        this.type = 0;
        if (this.white) {
            this.img = whiteBishop;
        }
        else {
            this.img = blackBishop;
        }
        ////bindings
        this.update = this.update.bind(this);
        this.reset = this.reset.bind(this);
        this.init = this.init.bind(this);


        this.init();
    }

    init() {
        this.map = [];
        for (let i = 0; i < 8; i++) {
            this.map.push([]);
            for (let j = 0; j < 8; j++) {
                this.map[i].push(false);
            }
        }
    }

    update() {
        this.map = []
        for (let i = 0; i < 8; i++) {
            this.map.push([]);
            for (let j = 0; j < 8; j++) {
                this.map[i].push(false);
            }
        }

        let i = this.x;
        let j = this.y;
        i++;
        j++;
        while (i < 8 && j < 8) {
            if (this.board.board[i][j].piece == null) {
                this.map[i][j] = true;
            }
            else {
                if (this.board.board[i][j].piece.white != this.white) {
                    this.map[i][j] = true;
                }
                break;
            }
            i++;
            j++;
        }

        i = this.x;
        j = this.y;
        i--;
        j--;
        while (i >= 0 && j >= 0) {
            if (this.board.board[i][j].piece == null) {
                this.map[i][j] = true;
            }
            else {
                if (this.board.board[i][j].piece.white != this.white) {
                    this.map[i][j] = true;

                }
                break;
            }
            i--;
            j--;

        }

        i = this.x;
        j = this.y;
        i--;
        j++;
        while (i >= 0 && j < 8) {
            if (this.board.board[i][j].piece == null) {
                this.map[i][j] = true;
            }
            else {
                if (this.board.board[i][j].piece.white != this.white) {
                    this.map[i][j] = true;

                }
                break;
            }
            i--;
            j++;
        }

        i = this.x;
        j = this.y;
        i++;
        j--;
        while (j >= 0 && i < 8) {
            if (this.board.board[i][j].piece == null) {
                this.map[i][j] = true;
            }
            else {
                if (this.board.board[i][j].piece.white != this.white) {
                    this.map[i][j] = true;

                }
                break;
            }
            i++;
            j--;
        }

    }
    reset() {

    }
}

export class Queen extends Piece {
    constructor(board, x, y, white) {
        super(x, y, white);
        this.board = board;
        this.type = 0;
        if (this.white) {
            this.img = whiteQueen;
        }
        else {
            this.img = blackQueen;
        }
        ////bindings
        this.update = this.update.bind(this);
        this.reset = this.reset.bind(this);
        this.init = this.init.bind(this);


        this.init();
    }

    init() {
        for (let i = 0; i < 8; i++) {
            this.map.push([]);
            for (let j = 0; j < 8; j++) {
                this.map[i].push(false);
            }
        }
    }

    update() {

    }
    reset() {

    }
}

export class King extends Piece {
    constructor(board, x, y, white) {
        super(x, y, white);
        this.board = board;
        this.type = 0;
        if (this.white) {
            this.img = whiteKing;
        }
        else {
            this.img = blackKing;
        }
        //bindings
        ////bindings
        this.update = this.update.bind(this);
        this.reset = this.reset.bind(this);
        this.init = this.init.bind(this);


        this.init();
    }

    init() {
        for (let i = 0; i < 8; i++) {
            this.map.push([]);
            for (let j = 0; j < 8; j++) {
                this.map[i].push(false);
            }
        }
    }

    update() {

    }
    reset() {

    }
}
