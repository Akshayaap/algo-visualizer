
import "./home.css"

import Sketch from 'react-p5';
import React from 'react';
import { SimGravity } from '../sim/Simulation';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight - 100
}

const sim = new SimGravity(100);

const Home = (props) => {


    return <Sketch setup={(p5, canvasParentRef) => {
        p5.createCanvas(sizes.width, sizes.height).parent(canvasParentRef);
    }
    } draw={(p5) => {
        p5.background(0);
        sim.stepForward();
        sim.draw(p5);
    }} className="home" />;
}

export default Home;