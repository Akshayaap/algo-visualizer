
import { sleep } from '../util/Util.js';

export class Sim6502 {
    constructor() {

        //All the registers of 6502.svg
        this.A = document.querySelector('#Areg');
        this.X = document.querySelector('#Xreg');
        this.Y = document.querySelector('#Yreg');
        this.SP = document.querySelector('#Sreg');
        this.IR = document.querySelector('#IReg');
        this.PCH = document.querySelector('#PCH');
        this.PCL = document.querySelector('#PCL');
        this.db = document.querySelector('#db');

        //make strokeWidth = 4
        this.PCH.style.strokeWidth = '4';
        this.PCL.style.strokeWidth = '4';
        this.db.style.strokeWidth = '4';
        this.A.style.strokeWidth = '4';
        this.X.style.strokeWidth = '4';
        this.Y.style.strokeWidth = '4';
        this.SP.style.strokeWidth = '4';
        this.IR.style.strokeWidth = '4';




        //this bindings

        this.toggle = this.toggle.bind(this);
        this.ADC = this.ADC.bind(this);
    }

    toggle() {
        this.PCH.style.stroke = this.PCH.style.stroke === 'black' ? 'red' : 'black';
        this.PCL.style.stroke = this.PCL.style.stroke === 'red' ? 'black' : 'red';
        this.db.style.stroke = this.db.style.stroke === 'red' ? 'black' : 'red';
        this.A.style.stroke = this.A.style.stroke === 'red' ? 'black' : 'red';
        this.X.style.stroke = this.X.style.stroke === 'red' ? 'black' : 'red';
        this.Y.style.stroke = this.Y.style.stroke === 'red' ? 'black' : 'red';
        this.SP.style.stroke = this.SP.style.stroke === 'red' ? 'black' : 'red';
        this.IR.style.stroke = this.IR.style.stroke === 'red' ? 'black' : 'red';


    }


    //ADD instruction sequence with 1000ms delay
    async ADC() {


        this.A.style.stroke = '#ff0000';
        await sleep(1000);
        this.A.style.stroke = '#000000';
    }

}


export async function DemoSim() {
    document.querySelector('#Program-control').style.strokeWidth = '4';
    var sim = new Sim6502();
    while (true) {

        await sleep(1000);
        await sim.ADC();
        console.log('tick');
    }

}

