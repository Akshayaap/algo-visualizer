

import Sketch from 'react-p5';
import React from 'react';
import { Planet, Vec2 } from '../sim/Objects.js';
import { SimPlanet } from '../sim/Simulation';


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight - 100
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
});


const sim = new SimPlanet();

const Planets = (props) => {
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(sizes.width, sizes.height).parent(canvasParentRef);
        p5.fill(255);

        sim.addPlanet(new Planet(new Vec2(window.innerWidth / 2 - 500, window.innerHeight / 2), new Vec2(0, 2), 50000, [25, 84, 65]));
        sim.addPlanet(new Planet(new Vec2(window.innerWidth / 2 + 400, window.innerHeight / 2), new Vec2(0, -2), 10000, [255, 45, 12]));
    };

    const draw = (p5) => {
        p5.background(0);
        sim.stepForward();
        sim.draw(p5);
    };

    return <Sketch setup={setup} draw={draw} className="home" />;
}

export default Planets;