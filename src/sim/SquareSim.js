

export class SquareSim {

    constructor() {
        this.container = null;
        this.num = 16;//default value
        this.side = 4;
        this.table = null;
        this.elems = [];


        //bindings
        this.init = this.init.bind(this);
        this.run = this.run.bind(this);
        this.createTable = this.createTable.bind(this);
        this.setVal = this.setVal.bind(this);

    }


    init() {
        this.container = document.querySelector('#stable');
        console.log(this.container);
        this.run(this.num);
    }

    run() {
        let num = parseInt(document.querySelector('input[name=num]').value);
        this.num = num;
        let side = Math.ceil(Math.sqrt(num));
        let square = this.side * this.side;
        this.side = side;
        this.createTable();
        let level = 1;
        let count = 0;
        let val = 1;
        let i = Math.floor((side - 1) / 2);
        let j = Math.floor((side - 1) / 2);
        let w = 1;
        let h = 1;
        for (let i = 0; i < side; i++) {
            for (let j = 0; j < side; j++) {
                this.setVal(i, j, val);
                val++;
            }
        }

    }

    createTable() {
        this.elems = [];
        this.container.innerHTML = '';
        let table = document.createElement('table');
        table.setAttribute('class', 'grid');
        for (let i = 0; i < this.side; i++) {
            let tr = document.createElement('tr');
            this.elems.push([]);
            for (let j = 0; j < this.side; j++) {
                let td = document.createElement('td');
                td.innerHTML = '0';
                tr.appendChild(td);
                this.elems[i].push(td);
            }
            table.appendChild(tr);
        }
        this.container.appendChild(table);
    }

    setVal(i, j, val) {
        this.elems[i][j].innerHTML = val;
    }



}