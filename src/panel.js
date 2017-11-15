import React from 'react'
import ReactDOM from 'react-dom'
import LoginPic from './img/login.jpg'
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
                <h1 className="title_for_login">My Fisrt App</h1>
                <LoginForm />
                <img className="back_picture" src={LoginPic} alt="pic1" />
            </div>
        );
    }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
            <input className="text_for_panel" type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input className="text_for_panel" type="submit" value="Submit" />
            </form>
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
            <img className="back_picture" src={backPicArray[this.state.show_pic]} alt='' />
        );
    }
}