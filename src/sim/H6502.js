




//class representing 6502 cpu
class H6502 {
    constructor(memory) {
        this.RAM = memory;
        this.A = 0;
        this.X = 0;
        this.Y = 0;
        this.PC = 0;
        this.SP = 0;
        this.IR = 0;
        this.cycles = 0;

        //binary flags
        this.flags = {
            C: 0,
            Z: 0,
            I: 0,
            D: 0,

            B: 0,
            U: 1,
            V: 0,
            N: 0
        };

    }

    //reset cpu
    reset() {
        this.A = 0;
        this.X = 0;
        this.Y = 0;
        this.PC = 0;
        this.SP = 0;
        this.IR = 0;
        this.cycles = 0;

        //binary flags
        this.flags = {
            C: 0,
            Z: 0,
            I: 0,
            D: 0,

            B: 0,
            U: 1,
            V: 0,
            N: 0
        };
    }

    //functions for all the instructions
    //addressing modes
    //immediate
    imm() {
        return this.PC++;
    }
    //zero page
    zp() {
        return this.read(this.PC++);
    }
    //zero page,X
    zpx() {
        return this.read(this.PC++ + this.X) & 0xFF;
    }
    //zero page,Y
    zpy() {
        return this.read(this.PC++ + this.Y) & 0xFF;
    }
    //absolute
    abs() {
        return this.read(this.PC++) | this.read(this.PC++) << 8;
    }

    //absolute,X
    abx() {
        let addr = this.read(this.PC++) | this.read(this.PC++) << 8;
        addr += this.X;
        return addr;
    }

    //absolute,Y
    aby() {
        let addr = this.RAM.read(this.PC++) | this.RAM.read(this.PC++) << 8;
        addr += this.Y;
        return addr;
    }

    //indirect
    ind() {
        let addr = this.RAM.read(this.PC++) | this.RAM.read(this.PC++) << 8;
        return this.RAM.read(addr) | this.RAM.read(addr + 1) << 8;
    }

    //indirect,X
    ix() {
        let addr = this.read(this.PC++) + this.X;
        return this.read(addr & 0xFF) | this.read((addr + 1) & 0xFF) << 8;
    }

    //indirect,Y
    iy() {
        let addr = this.read(this.PC++) | this.read(this.PC++) << 8;
        addr += this.Y;
        return this.read(addr & 0xFF) | this.read((addr + 1) & 0xFF) << 8;
    }

    //relative
    rel() {
        let offset = this.RAM.read(this.PC++);
        if (offset & 0x80)
            offset -= 0x100;
        return this.PC + offset;
    }

    //read byte from address
    read(addr) {
        return this.memory[addr];
    }

    //write byte to address
    write(addr, value) {
        if (addr < 0 || addr >= this.size)
            return;
        this.memory[addr] = value;
    }

    //All the instructions
    //ADC
    ADC() {
        let value = this.read(this.addr);
        let result = this.A + value + this.flags.C;
        this.flags.C = result > 0xFF;
        this.flags.Z = result & 0xFF;
        this.flags.N = result & 0x80;
        this.flags.V = ((this.A ^ result) & 0x80) && ((this.A ^ value) & 0x80);
    }

    //AND
    AND() {
        this.A &= this.read(this.addr);
        this.flags.Z = this.A;
        this.flags.N = this.A & 0x80;
    }

    //ASL
    ASL() {
        let value = this.read(this.addr);
        this.flags.C = value & 0x80;
        value <<= 1;
        this.flags.Z = value;
        this.flags.N = value & 0x80;
        this.write(this.addr, value);
    }

}


class RAM {
    constructor(size) {
        this.size = size;
        this.memory = new Uint8Array(size);
    }

    //read a byte from memory
    read(addr) {
        if (addr < 0 || addr >= this.size)
            return 0;
        return this.memory[addr];
    }

    //write a byte to memory
    write(addr, value) {
        if (addr < 0 || addr >= this.size)
            return;
        this.memory[addr] = value;
    }
}