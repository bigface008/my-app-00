import React from 'react'
import ReactDOM from 'react-dom'
import BackPic01 from './img/timg1.jpg'
import BackPic02 from './img/timg2.jpg'
import BackPic03 from './img/timg3.jpg'
import BackPic04 from './img/timg4.jpg'

const backPicArray = [BackPic01, BackPic02, BackPic03, BackPic04];

// Component for Login Panel

export default class Panel extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Background />
            </div>
        );
    }
}

class Background extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show_pic: 0,
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            30000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            show_pic: (this.state.show_pic + 1) % backPicArray.length,
        });
    }

    render() {

        return (
            <img src={backPicArray[this.state.show_pic]} alt='' />
        );
    }
}