

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

    }
}





export class Piece {
    constructor(x, y, white) {
        this.box = null;
        this.x = x;
        this.y = y;
        this.type = -1;
        this.white = white;
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
    constructor(x, y, white) {
        super(x, y, white);
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

export class Knight extends Piece {
    constructor(x, y, white) {
        super(x, y, white);
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

export class Rook extends Piece {
    constructor(x, y, white) {
        super(x, y, white);
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

export class Bishop extends Piece {
    constructor(x, y, white) {
        super(x, y, white);
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

export class Queen extends Piece {
    constructor(x, y, white) {
        super(x, y, white);
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
    constructor(x, y, white) {
        super(x, y, white);
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
