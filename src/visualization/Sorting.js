
import React, { Component } from 'react';
import './Sorting.css';

export default class Sorting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
            test: false
        }

        this.counter = 1;
        this.size = props.size;
        this.i = this.size - 1;
        this.j = 0;
        this.resetArray.bind(this);
        // this.resetAndDispaly.bind(this);
        this.testAlgo.bind(this);
        this.mergeSort.bind(this);
        this.merge.bind(this);
        this.isSorted.bind(this);
        this.bubbleSort.bind(this);
    }
    componentDidMount() {
        this.resetArray();
        // this.resetAndDisplay();
    }

    resetArray = () => {
        var array = createRandomArray(this.size);
        this.setState({ array: array, test: false });
        console.log(this.state.array);

        this.i = this.size - 1;
        this.j = 0;
    }

    //for debug purpose only
    resetAndDisplay = async () => {
        await this.resetArray();
        console.log(this.state.array);
    }

    testAlgo = () => {
        var array = [];
        var iterations = 1000;
        for (var i = 0; i < iterations; i++) {
            array = createRandomArray(1000);
            this.mergeSort(array, 0, array.length - 1);
            if (!this.isSorted(array)) {
                this.setState({ array: this.state.array, test: false });
                return false;
            }
        }
        this.setState(
            {
                array: this.state.array,
                test: true
            });
        return true;
    }

    async mergeSort(array, start, end) {
        await setInterval(() => {
            if (start < end && !this.isSorted(array)) {
                var mid = Math.floor((start + end) / 2);
                this.mergeSort(array, start, mid);
                this.mergeSort(array, mid + 1, end);
                this.merge(array, start, mid, end);
                this.setState({ array: array, test: this.state.test });
            }
        }, 100);
    }

    merge(array, start, mid, end) {
        var left = [];
        var right = [];
        for (var i = start; i <= mid; i++) {
            left.push(array[i]);
        }
        for (var i = mid + 1; i <= end; i++) {
            right.push(array[i]);
        }
        var k = start, i = 0, j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                array[k++] = left[i++];
            }
            else {
                array[k++] = right[j++];
            }
            // this.setState({ array: array, test: this.state.test });
        }

        while (i < left.length) {
            array[k++] = left[i++];
            // this.setState({ array: array, test: this.state.test });
        }
        while (j < right.length) {
            array[k++] = right[j++];
        }
    }


    async bubbleSort(array) {

        await setInterval(() => {
            if (this.i > 0) {
                if (this.j < this.i) {
                    if (array[this.j] > array[this.j + 1]) {
                        let temp = array[this.j];
                        array[this.j] = array[this.j + 1];
                        array[this.j + 1] = temp;
                    }
                    this.setState({ array: array, test: this.state.test });
                    this.j++;
                } else {
                    this.j = 0;
                    this.i--;
                }
                this.bubbleSort(array);
                this.setState({ array: array, test: this.state.test });
            }
            else {
                this.setState({ array: array, test: this.state.test });
                return;
            }
        }, 250);

    }

    isSorted = (array) => {
        for (var i = 1; i < array.length; i++) {
            if (array[i] < array[i - 1]) {
                this.setState({ array: this.state.array, test: false });
                return false;
            }
        }
        this.setState({ array: this.state.array, test: true });
        return true;
    }

    render() {
        return (
            <React.Fragment>
                <div className="array-container">
                    {
                        this.state.array.map((value, index) => (
                            <div className="array-bar" key={index} style={{ height: `${value + 5}px`, width: `${1200 / this.size - 1}px` }}>
                            </div>
                        ))
                    }
                </div>
                <div className="control">
                    <button onClick={() => { this.resetArray(); }}>
                        Generate new
                    </button>
                    <button onClick={() => {
                        this.i = this.size - 1;
                        this.j = 0; this.bubbleSort(this.state.array); console.log(this.state.array)
                    }}>
                        Sort
                    </button>
                    <button onClick={() => { this.mergeSort(this.state.array, 0, this.size - 1); this.isSorted(this.state.array); }}>
                        Merge Sort
                    </button>
                    <button>
                        Quick Sort
                    </button>
                    <button className={(this.state.test ? "bg-success" : "bg-danger") + " text-white"} onClick={() => this.isSorted(this.state.array)}>
                        isSorted
                    </button>
                </div>
            </React.Fragment>
        );
    }
}


const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const createRandomArray = (size) => {
    var array = [];
    for (var i = 0; i < size; i++) {
        array.push(randomIntFromInterval(5, 500));

    }
    return array;
}


