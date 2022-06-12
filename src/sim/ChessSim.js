



import { ChessBoard } from './ChessBoard';
import { State } from './Pieces';



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


move(i1, j1, i2, j2) {

    this.board.move(i1, j1, i2, j2);

    //this.boardBack[i2][j2].style.transition = 'all 0.5s';
    //this.boardBack[i1][j1].style.transition = 'all 0.5s';

    this.board.move(i1, j1, i2, j2);
    this.boardUI[i2][j2].src = this.boardUI[i1][j1].src;
    this.boardUI[i1][j1].src = null;
    this.boardUI[i2][j2].style.display = 'block';
    this.boardUI[i1][j1].style.display = 'none';




    this.boardBack[i1][j1].style.backgroundColor = '#ff0000';
    this.boardBack[i2][j2].style.backgroundColor = '#00ff00';
}

reset() {
    this.board.reset();
    this.playerBlack.reset();
    this.playerWhite.reset();
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

