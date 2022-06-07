
import "./home.css"

import Sketch from 'react-p5';
import React from 'react';
import { SimGravity } from '../sim/Simulation';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight - 100
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
});


const sim = new SimGravity(30);

const Home = (props) => {
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(sizes.width, sizes.height).parent(canvasParentRef);
        p5.fill(255);
    };

    const draw = (p5) => {
        p5.background(0);
        sim.stepForward();
        sim.draw(p5);
    };

    return <Sketch setup={setup} draw={draw} className="home" />;
}

export default Home;