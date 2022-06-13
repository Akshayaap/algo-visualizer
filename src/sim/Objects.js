

export class Vec2 {
    constructor(px, py) {

        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.theta = 0;

        //this bindings
        this.add = this.add.bind(this);
        this.sub = this.sub.bind(this);
        this.getMagnitude = this.getMagnitude.bind(this);
        this.normalize = this.normalize.bind(this);
        this.adjustRT = this.adjustRT.bind(this);
        this.adjustXY = this.adjustXY.bind(this);
        this.dotProduct = this.dotProduct.bind(this);
        this.getAngle = this.getAngle.bind(this);
        this.addition = this.addition.bind(this);
        this.subtraction = this.subtraction.bind(this);
        this.scalarMultiplication = this.scalarMultiplication.bind(this);
        this.scal = this.scal.bind(this);
        this.distance = this.distance.bind(this);


        this.x = px;
        this.y = py;
        this.adjustRT();

    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.adjustRT();
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;

        this.adjustRT();
    }

    getMagnitude() {
        return this.r;
    }

    normalize() {
        this.x /= this.r;
        this.y /= this.r;

        this.adjustRT();
    }


    adjustRT() {
        if (this.x == 0 && this.y == 0) {
            this.r = 0;
            this.theta = 0;
            return;
        }
        if (this.x == 0) {
            if (this.y > 0) {
                this.r = this.y;
                this.theta = Math.PI / 2;
            }
            else {
                this.r = -this.y;
                this.theta = 3 * Math.PI / 2;
            }
            return;
        }
        if (this.y == 0) {
            if (this.x > 0) {
                this.r = this.x;
                this.theta = 0;
            }
            else {
                this.r = -this.x;
                this.theta = Math.PI;
            }
            return;
        }

        this.r = Math.sqrt(this.x * this.x + this.y * this.y);
        if (this.x >= 0) {
            if (this.y >= 0) {
                this.t = Math.asin(this.y / this.r);
            }
            else {
                this.t = 2 * Math.PI + Math.asin(this.y / this.r);
            }
        }
        else {
            if (this.y >= 0) {
                this.t = Math.PI - Math.asin(this.y / this.r);
            }
            else {
                this.t = Math.PI - Math.asin(this.y / this.r);
            }
        }
    }

    adjustXY() {
        this.x = this.r * Math.cos(this.theta);
        this.y = this.r * Math.sin(this.theta);
    }

    dotProduct(v) {
        return this.x * v.x + this.y * v.y;
    }

    getAngle(v) {
        return Math.acos(this.dotProduct(v) / (this.r * v.r));
    }

    addition(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    subtraction(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }

    scalarMultiplication(s) {
        return new Vec2(this.x * s, this.y * s);
    }

    scal(s) {
        this.x *= s;
        this.y *= s;

        this.adjustRT();
    }

    distance(v) {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
        this.adjustRT();
    }
}

export class Objects {
    constructor(pos, vel, mass, radius, color) {

        this.pos = pos;
        this.vel = vel;
        this.mass = mass;
        this.radius = radius;
        this.color = color;
        this.name = "";
        this.consumed = false;
        this.force = new Vec2(0, 0);
        this.acc = new Vec2(0, 0);

        //this bindings
        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
        this.interact = this.interact.bind(this);


    }


    draw(p5) {
        p5.ellipse(this.pos.x, this.pos.y, 2 * this.radius, 2 * this.radius);
    }


    //Interact with other object and update force and acceleration according to newtons universal law of gravitation

    interact(other) {
        if (other == null) {
            return;
        }
        let sDist = (this.pos.x - other.pos.x) * (this.pos.x - other.pos.x) + (this.pos.y - other.pos.y) * (this.pos.y - other.pos.y); //Math.sqrt(Math.pow(this.pos.x - other.pos.x, 2) + Math.pow(this.pos.y - other.pos.y, 2));

        /**if ((this.radius + other.radius) * (this.radius + other.radius) > sDist) {
            this.mass += other.mass;
            this.force.add(other.force);
            this.radius = Math.cbrt(this.mass * 100);
            other.consumed = true;
            return;
        }*/

        let force = (this.mass * other.mass) / sDist * .2;

        let direction = new Vec2(other.pos.x - this.pos.x, other.pos.y - this.pos.y);


        direction.normalize();

        direction.scal(force);
        this.force.add(direction);
    }


    update() {

        this.acc = this.force.scalarMultiplication(1 / this.mass);

        this.vel.add(this.acc);

        this.pos.add(this.vel);
        this.force.setXY(0, 0);

    }
}



//class to represent planet
export class Planet {

    constructor(pos, vel, mass, color) {
        this.pos = pos;
        this.vel = vel;
        this.mass = mass;
        this.radius = Math.cbrt(mass);
        this.color = color;

        this.force = new Vec2(0, 0);
        this.acc = new Vec2(0, 0);

        //bindings
        this.interact = this.interact.bind(this);
        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
    }

    //Function to interact with Sun
    interact(sun) {

        let distance = sun.pos.distance(this.pos);
        let force = (sun.mass * this.mass) / Math.pow(distance, 2) * 0.0001;
        let direction = sun.pos.subtraction(this.pos);
        direction.normalize();
        direction.scal(force);
        this.force.add(direction);
        this.acc.add(this.force.scalarMultiplication(1 / this.mass));
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.acc.setXY(0, 0);
    }

    draw(p5) {
        p5.fill(this.color)
        p5.ellipse(this.pos.x, this.pos.y, 2 * this.radius, 2 * this.radius);
    }
}