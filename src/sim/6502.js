/**
 * 
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * This file contains the 6502 CPU implementation.
 * @author @Akshay
 * Twitter: @_The_Akshay
 * Reddit: /u/_The_Akshay
 * Website: https://Akshayaap.github.io
 * Github: Akshayaap
 */

/**
 * Background of 6502 CPU:
 * https://en.wikipedia.org/wiki/6502
 * https://www.youtube.com/watch?v=_X-_7-_X-_8
 *
 */

/**
 * Architecture of 6502 CPU:
 * 6502 CPU is 8 bit microprocessor with 16 bit address bus.
 * It has 3 General Purpose Registers (A, X, Y) and 1 Stack Pointer (S) and one Program Counter (PC).
 * original 6502 cpu has pipeline execution mode, but for making things simple I did not implemented pipeline.
 */


//this JavaScript Object contains string representation of various coponents in 6502 CPU
const _6502 = {
    PCH: 0,
    PCL: 1,
    A: 2,
    X: 3,
    Y: 4,

    ALU: 5,
    DOL: 6, DIL: 7,
    IR: 8,
    ADH: 9,
    ADL: 10,
    SP: 11,

    addBusH: 12,
    addBUsL: 13,
    dataBus: 14,
    M: 15,
    SR: 16

}



//this is general Bus class to represent various buses in 6502 CPU.
class Bus {
    constructor(width) {
        //width of bus
        this.width = width;

        //maximum possible value on bus
        this.max = 2 ** width;

        //a data present on bus at any given time
        this.data = 0x00;

        //Read function to read contents of bus
        this.read = this.read.bind(this);

        //Write function to write contents to the bus
        this.write = this.write(this);

        //Clear function to clear the bus
        this.clear = this.clear.bind(this);

        //Set function to set the content of bus to maximum possible value
        this.set = this.set.bind(this);
    }

    //implmentation of read function
    read() {
        return this.data;
    }

    //implementation of write function
    write(data) {
        this.data = data % this.max;
    }

    //implementation of read function
    clear() {
        this.data = 0x00;
    }

    //implementation of set function
    set() {
        this.data = 2 ** this.width - 1;
    }
}

//class M6502 is class that represents 6502 CPU

class M6502 {
    constructor(memory) {
        //intrnal 8 bit data bus
        this.dataBusInt = new Bus(8);

        //Internal 8 bit bus for MSB of address
        this.addBusHInt = new Bus(8);
        //Internal 8 bit bus for LSB of address
        this.addBusLInt = new Bus(8);

        //Interfacing External Memory
        this.memory = memory;



        //reset the cpu
        this.reset = this.reset.bind(this);

        //Intrrupt handler
        this.IRQ = this.IRQ.bind(this);
        this.NMI = this.NMI.bind(this);

        //Steps one clock forward
        this.stepClock = this.stepClock.bind(this);

        //increment PC by one
        this.incrementPC = this.incrementPC.bind(this);

        //Steps one operation forward
        this.stepForward = this.stepForward.bind(this);

        //Steps one instruction forward
        this.stepInstruction = this.stepInstruction.bind(this);

        //excetutes one instruction
        this.execute = this.execute.bind(this);
    }

    reset() {
        //PCH and PCL are the high and low bytes of the program counter
        this.PCH = 0x00;
        this.PCL = 0x00;

        //Stack pointer
        this.SP = 0x00;

        //General purpose registers
        this.A = 0x00;
        this.X = 0x00;
        this.Y = 0x00;

        //address Buffer registers
        this.ADH = 0x00;
        this.ADL = 0x00;

        // Data and Instruction Registers
        this.DOL = 0x00;
        this.IR = 0x00;

        //Input Data Latch registers
        this.DIL = 0x00;

        //16 bit counter
        this.ctr16 = 0x00;
        this.clock = 0x00;

        //Status Register as a an JSON object
        this.status = {
            C: false,
            Z: false,
            I: false,
            D: false,

            B: false,
            U: false,
            V: false,
            N: false,
        };

        //status of ALU
        this.ALU = {
            A: 0x00,
            B: 0x00,
            O: 0x00,
            OP: "N",
        };

        //Status of Buses
        this.buses = {
            data: 0x00,
            addH: 0x00,
            addL: 0x00
        }

        //List of writing components
        this.writters = [];

        //List of Reading components
        this.readers = [];

        //Interface to External Devices
        //External Data Bus
        this.DPin = 0x00;   //8 bit Pin

        //External Data Pins
        this.ADDPin = 0x00; //16 bit pin

    }

    stepClock() {
        //if clock is zero then we have to fecth next instruction by reading from memory


        //Intsruction Fetch
        if (this.clock == 0) {
            //putting content of Program Counter to the Address Low and Address hight buses
            this.addBusHInt.write(this.PCH);
            this.addBusLInt.write(this.PCL);

            //Reading Address Bus content to ADH and ADL registers Respectively
            this.ADH = this.addBusHInt.read();
            this.ADL = this.addBusLInt.read();

            //Put content of ADH and ADH to external Pin inteface
            this.ADDPin = this.ADH * 256 + this.ADL;

            //Now Read From External Memory from given Address
            this.DPin = this.memory[this.ADDPin];

            //Reading an instruction from input Data lines
            this.IR = this.DPin;

            this.writters = [_6502.PCH, _6502.PCL, _6502.M];
            this.readers = [_6502.ADH, _6502.ADL, _6502.IR];

            //Update Bus Status
            this.buses = {
                data: _6502.IR,
                addH: _6502.ADH,
                addL: _6502.ADL
            }

            //increment Program Counter
            this.incrementPC();
        }

        else {


            switch (this.IR) {
                // ADC Instruction ( Add with carry )
                // ADC Immediate mode
                case 0x69:
                    switch (this.clock) {
                        case 1:
                            //1.Fetch Immediate value

                            this.addBusHInt.write(this.PCH);
                            this.addBusLInt.write(this.PCL);

                            this.ADH = this.addBusHInt.read();
                            this.ADL = this.addBusLInt.read();

                            this.ADDPin = this.ADH * 256 + this.ADL;

                            this.DPin = this.memory[this.ADDPin];
                            this.DIL = this.DPin;



                            this.DPin = this.memory[this.addBusLInt.read()];
                            this.ALU.A = this.A;
                            this.ALU.B = this.B;
                            this.ALU.OP = "ADC";

                            break;

                        default:
                            break;
                    }



                default:
                    break;
            }

        }
    }

    incrementPC(cycles = 1) {
        //Incrementing PC by incrementig contents of PCH and PCL
        this.PCL += cycles;
        if (this.PCL == 0x00) {
            this.PCH++;
        }
    }

    stepForward() { }

    stepInstruction() {



        switch (this.IR) {
            case 0x69:

                break;
        }
    }

    decode() { }
    execute() { }

    //Intrrupt
    IRQ() { }

    NMI() { }

    //Never used but scared to remove
    _8to16(H, L) {
        return H * 256 + L;
    }
}

class Memory {
    constructor(size) {
        this.size = size;
        this.ram = Uint8Array(size);

        this.read = this.read.bind(this);
        this.write = this.write(this);
    }

    read(addr) {
        return this.ram[addr];
    }

    write(addr, data) {
        this.ram[addr] = data;
    }
}

_16to8 = function (num) {
    return { H: Math.floor(num / 256), L: num % 256 };
};
