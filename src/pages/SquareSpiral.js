import React, { Component } from 'react';
import { SquareSim } from '../sim/SquareSim';
import './square-sim.css';

export default class SquareSpiral extends Component {

    constructor(props) {
        super(props);
        this.sim = new SquareSim();
    }

    componentDidMount() {
        this.sim.init();
    }

    render() {
        return (
            <div class='square'>
                <input type="number" name='num' />
                <button onClick={() => { this.sim.run(); }}> Generate square</button>
                <div id="stable">
                    Go Here
                </div>
            </div>
        );
    }
}