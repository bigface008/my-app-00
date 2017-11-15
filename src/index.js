import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import BackPic01 from './img/timg1.jpg'
import BackPic02 from './img/timg2.jpg'
import BackPic03 from './img/timg3.jpg'
import BackPic04 from './img/timg4.jpg'

// Get Info of Pictures

const backPicArray = [BackPic01, BackPic02, BackPic03, BackPic04];
let albumPicData = require('./data/albumImg.json');
albumPicData = ((albumPicArr) => {
  for (let i = 0, j = albumPicArr.length; i < j; i++) {
    let temp = albumPicArr[i];
    temp.imgURL = require('./img/' + temp.fileName);
    albumPicArr[i] = temp;
  }
  return albumPicArr;
})(albumPicData);

// Component for Login Panel

class Panel extends React.Component {
  constructor() {
    super();
    this.state = {

    }
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

// Component for Album

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      Constant: {
        centerPos: {
          left: 0,
          top: 0,
        },
        hPosRange: {      // Range of x
          leftSecX: 0,
          rightSecX: 0,
          y: 0,
        },
        vPosRange: {      // Range of y
          x: 0,
          topY: 0,
        },
      },
      imgsArrangeArr: [
         {
          pos: {
            left: '0',
            top: '0'
          }
        },        {
          pos: {
            left: '0',
            top: '0'
          }
        },        {
          pos: {
            left: '0',
            top: '0'
          }
        },       {
          pos: {
            left: '0',
            top: '0'
          }
        }
      ]
    };
  }

  /*
   * Rearrange all the pictures
   * @param centerIndex indicates which picture is at the center
   */
  rearrange(centerIndex) {

  }

  // Calculate the position for each AlbumImageFigure after loaded
  componentDidMount() {

    // Get the size of Album
    let albumDOM = ReactDOM.findDOMNode(this.refs.album);
    let albumW = albumDOM.scrollWidth;
    let albumH = albumDOM.scrollHeight;
    let halfAlbumW = Math.ceil(albumW / 2);
    let halfAlbumH = Math.ceil(albumH / 2);

    // Get the size of AlbumImageFigure
    let albumImgFigureDOM = ReactDOM.findDOMNode(this.refs.albumImgFigure0);
    let imgW = albumImgFigureDOM.scrollWidth;
    let imgH = albumImgFigureDOM.scrollHeight;
    let halfImgW = Math.ceil(imgW / 2);
    let halfImgH = Math.ceil(imgH / 2);

    this.setState({
      Constant: {
        centerPos: {
          left: halfAlbumW - halfImgW,
          top: halfAlbumH - halfImgH,
        },
        hPosRange: {      // Range of x
          leftSecX: [-halfImgW, halfAlbumW - halfImgW * 3],
          rightSecX: [halfAlbumW + halfImgW, albumW - halfImgW],
          y: [-halfImgH, albumH - halfImgH],
        },
        vPosRange: {      // Range of y
          x: [-halfImgH, halfAlbumH - halfImgH * 3],
          topY: [halfImgW - imgW, halfImgW]
        },
      },
    });

    this.rearrange(0);


  }

  render() {
    let controllerUnits = [];
    let imgFigures = [];

    albumPicData.forEach(function (value, index) {
      if (!this.state.imgsArrangeArr[index]) {
        // this.state.imgsArrangeArr[index] = {
        //   pos: {
        //     left: 0,
        //     top: 0
        //   }
        // }
        this.setState({
          imgsArrangeArr: {
            pos: {
              left: 0,
              top: 0
            }
          }
        });
      }
      imgFigures.push(<AlbumImageFigure
        data={value}
        key={value.title}
        ref={'albumImgFigure' + index}
      />);
    }.bind(this));

    return (
      <section className="album" ref="album">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

class AlbumImageFigure extends React.Component {
  render() {
    return (
      <figure className="img-figure">
        <img className="figure" src={this.props.data.imgURL}
          alt={this.props.data.title}
        />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}

// Main App

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