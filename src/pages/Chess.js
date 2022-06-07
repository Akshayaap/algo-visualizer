
import React, { Component } from 'react';
import { ChessSim } from '../sim/ChessSim';
import './chess.css';


class Chess extends Component {
    constructor(props) {
        super(props);
        this.sim = new ChessSim();


    }

    componentDidMount() {
        this.sim.initComponents();

    }

    render() {
        return (
            <div className='chess'>
                <div className='board'>
                    <table className='grid'>
                        <tbody>
                            {
                                this.sim.board.board.map((elemI, i) => {
                                    return (
                                        <tr key={7 - i}>
                                            {
                                                elemI.map((elemJ, j) => {
                                                    return (<td className={'box-' + ((i + j) % 2 == 0 ? 'white' : 'black')} key={'' + ((7 - i) * 8 + j)} data-x={(7 - i)} data-y={j} onClick={(event) => {
                                                        console.log(event);
                                                        this.sim.onClick(parseInt(event.target.dataset.x), parseInt(event.target.dataset.y));
                                                    }} id={'back-' + (7 - i) + '-' + j} >
                                                        <img id={'box-' + (7 - i) + '-' + j} src='...' width={'80px'} height={'80px'} key={'' + ((7 - i) * 8 + j)} data-x={(7 - i)} data-y={j} />
                                                    </td>);
                                                })
                                            }
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Chess;