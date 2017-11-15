import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import BackPic01 from './img/timg1.jpg'
import BackPic02 from './img/timg2.jpg'
import BackPic03 from './img/timg3.jpg'
import BackPic04 from './img/timg4.jpg'

const backPicArray = [BackPic01, BackPic02, BackPic03, BackPic04];

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

class Panel extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }


}

class Album extends React.Component {
  render() {
    return (
      <section className="album" >
        <section className="img-sec">

        </section>
        <nav className="controller-nav">

        </nav>
      </section>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* <header>
          <h1 className="App-title">My First App</h1>
        </header> */}
        {/* <Background /> */}
        <Album />
      </div>
    );
  }
}

// =======================================

ReactDOM.render(
  <App />,
  document.getElementById('container')
)