import React from 'react'
import ReactDOM from 'react-dom';

/**
 * Get random value between low & high.
 */
function getRangeRandom(low, high) {
    return Math.ceil(low + Math.random() * (high - low));
}

/**
 * Get random deg between -30 & 30.
 */
function get30DegRandom() {
    return Math.ceil(Math.random() * 60 - 30);
}

// Get Info of Pictures

let imageDatas = require('./data/albumImg.json');
imageDatas = ((albumPicArr) => {
    for (let i = 0, j = albumPicArr.length; i < j; i++) {
        let temp = albumPicArr[i];
        temp.imgURL = require('./img/' + temp.fileName);
        albumPicArr[i] = temp;
    }
    return albumPicArr;
})(imageDatas);

// Component for Album

export default class Album extends React.Component {
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
            imgsArrangeArr: ((len) => {
                let tempArr = [];
                for (let i = 0; i < len; i++) tempArr.push({
                    pos: {
                        left: 0,
                        top: 0,
                    },
                    rotate: 0,
                    isInverse: false
                });
                return tempArr;
            })(imageDatas.length),
        };

        this.rearrange = this.rearrange.bind(this);
    }

    /**
     * Inverse the picture.
     * @param index Input index of the inversing picture.
     * @returns {Function} A real function put into use.
     */
    inverse(index) {
        return function () {
            let imgsArrangeArr = this.state.imgsArrangeArr;
            // console.log('inverse', index, '=', imgsArrangeArr[index].isInverse);
            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
            // console.log('inverse', index, '=', imgsArrangeArr[index].isInverse);
            this.setState({
                imgsArrangeArr: imgsArrangeArr,
            });
        }.bind(this);
    }

    /**
    * Rearrange all the pictures
    * @param centerIndex indicates which picture is at the center
    */
    rearrange(centerIndex) {
        let imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.state.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgsArrangeTopArr = [],
            topImgNum = Math.ceil(Math.random() * 2),
            topImgSpliceIndex = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        // Fisrt, put the picture of centerIndex to the center
        imgsArrangeCenterArr[0].pos = centerPos;
        imgsArrangeCenterArr[0].rotate = 0;

        // Get info of the picture of Top 
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // Locate the pictures of Top.
        imgsArrangeTopArr.forEach((value, index) => {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom()
            };
        });

        // Locate the pictures on right & left.
        for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            let hPosRangeLORX = null;

            // The fisrt part is on the left. The next part is on the right.
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            }
            else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
            }
            imgsArrangeArr[i].rotate = get30DegRandom();
        };
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
        this.setState({
            imgsArrangeArr: imgsArrangeArr,
        });
    }

    // Calculate the position for each ImgFigure after loaded
    componentDidMount() {

        // Get the size of Album
        let albumDOM = ReactDOM.findDOMNode(this.refs.album),
            albumW = albumDOM.scrollWidth,
            albumH = albumDOM.scrollHeight,
            halfAlbumW = Math.ceil(albumW / 2),
            halfAlbumH = Math.ceil(albumH / 2);

        // Get the size of ImgFigure
        let albumImgFigureDOM = ReactDOM.findDOMNode(this.refs.albumImgFigure0),
            imgW = albumImgFigureDOM.scrollWidth,
            imgH = albumImgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        this.setState({
            sb: 1,
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
                    topY: [-halfImgH, halfAlbumH - halfImgH * 3],
                    x: [halfAlbumW - imgW, halfAlbumW]
                },
            },
        },
            () => {
                this.rearrange(0);
            }
        );
    }

    render() {
        let controllerUnits = [];
        let imgFigures = [];

        imageDatas.forEach(function (value, index) {
            imgFigures.push(<ImgFigure
                data={value}
                key={value.title}
                ref={'albumImgFigure' + index}
                arrange={this.state.imgsArrangeArr[index]}
                inverse={this.inverse(index)}
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

class ImgFigure extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    /**
     * Deal with click on ImgFigure
     */
    handleClick(e) {
        // this.props.inverse();
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        let styleObj = {};
        let imgFigureClassName = 'img-figure';

        // If the position of the picture is written, use it.
        if (this.props.arrange) {
            let top_1 = this.props.arrange.pos.top;
            let left_1 = this.props.arrange.pos.left;
            let rotate_1 = this.props.arrange.rotate;
            styleObj = {
                top: top_1,
                left: left_1,
                transform: 'rotate(' + rotate_1 + 'deg)',
            };
            imgFigureClassName += this.props.arrange.isInverse ? '-is-inverse' : '';
        };

        // console.log('imgFigureClassName', imgFigureClassName);
        // console.log(this.props.data.title, styleObj);
        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img className="figure" src={this.props.data.imgURL}
                    alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    {/* <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div> */}
                </figcaption>
            </figure>
        );
    }
}