
import React, { Component } from 'react';
import './Sorting.css';

export default class Sorting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
            test: false
        }
        this.size = props.size;
        this.resetArray.bind(this);
        this.testAlgo.bind(this);
        this.mergeSort.bind(this);
        this.merge.bind(this);
        this.isSorted.bind(this);
    }
    componentDidMount() {
        this.resetArray();
    }

    resetArray = () => {
        let array = createRandomArray(this.size);
        this.setState({ array: array, test: false });
    }




    testAlgo = () => {
        let array = [];
        let iterations = 1000;
        for (let i = 0; i < iterations; i++) {
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
        // setTimeout(() => {
            if (start < end) {
                let mid = Math.floor((start + end) / 2);


                this.mergeSort(array, start, mid);
                this.mergeSort(array, mid + 1, end);
                this.merge(array, start, mid, end);

            }
        // }, 10
        // );

    }

    async merge(array, start, mid, end) {
        let left = [];
        let right = [];
        for (let i = start; i <= mid; i++) {
            left.push(array[i]);
        }
        for (let i = mid + 1; i <= end; i++) {
            right.push(array[i]);
        }
        let k = start, i = 0, j = 0;
        while (k <= end && i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                array[k++] = left[i++];
            }
            else {
                array[k++] = right[j++];
            }
        }

        while(i<left.length){
            array[k++]=left[i++];
        }
        while(j<right.length){
            array[k++]=right[j++];
        }

        this.setState({ array: array, test: this.state.test });
        console.log("fuck");


        // await this.delay(200);

    }




    isSorted = (array) => {

        for (let i = 1; i < array.length; i++) {
            if (array[i] < array[i - 1]) {
                this.setState({ array: this.state.array, test: false });

                return;
                break;

            }
            console.log(i);
        }
        this.setState({ array: this.state.array, test: true });
        return;
    }

    render() {
        return (
            <React.Fragment>
                <div className="array-container">
                    {
                        this.state.array.map((value, index) => (
                            <div className="array-bar" key={index} style={{ height: `${value}px`, width: `${1200 / this.size - 2}px` }}>
                            </div>
                        )
                        )}
                </div>
                <div className="control">
                    <button onClick={() => { this.resetArray(); console.log(this.state.array) }}>
                        Generate new
                    </button>
                    <button>
                        Sort
                    </button>
                    <button onClick={() => { this.mergeSort(this.state.array, 0, this.size - 1); this.isSorted(this.state.array); console.log(this.state.array); }}>
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
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(randomIntFromInterval(5, 500));
    }
    return array;
}





