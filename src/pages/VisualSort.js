import React, { Component } from 'react';
import './sorting.css';
import { Sorting } from '../sim/Sorting';

class VisualSort extends Component {
    constructor(props) {
        super(props)
        this.size = 20;
        this.sim = new Sorting(this.size);
        // console.log(this.size);
    }

    componentDidMount() {
        this.sim.getElements();
    }

    render() {
        return (
            <div className='sorting'>
                <center>
                <div className='death-div'>
                    <div id='close' onClick={() => {
                        document.querySelector('.death-div').style.display = 'none';
                    }}>close</div>
                    <img id='death' src="https://en.meming.world/images/en/0/02/So_you_have_chosen..._death..jpg" />
                </div></center>
                <div className='control'>
                    <button onClick={() => {if(!this.sim.isRunnning){this.sim.shuffle()}}}>Generate</button>
                    <button onClick={() => {if(!this.sim.isRunnning){this.sim.bubbleSort()}}}>Bubble Sort</button>
                    <button onClick={() => {if(!this.sim.isRunnning){this.sim.mergeSort()}}}>Merge Sort</button>
                    <button onClick={() => {if(!this.sim.isRunnning){this.sim.quickSort()}}}>Quick Sort</button>
                    <button onClick={() => {if(!this.sim.isRunnning){document.querySelector('.death-div').style.display = 'flex';}}}>Bogo Sort</button>
                    <button onClick={() => {if(!this.sim.isRunnning){this.sim.insertionSort()}}}>Insertion Sort</button>
                    <button onClick={() => {if(!this.sim.isRunnning){this.sim.selectionSort()}}}>Selection Sort</button>
                </div>

                <div className='visual'>
                    {
                        this.sim.array.map((element, index) => {
                            return (
                                <div id={`bar-${index}`} className='array-bar' key={index}>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}


export default VisualSort;