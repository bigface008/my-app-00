import React from 'react'
import ReactDOM from 'react-dom';

/**
 * Get random value between low & high
 */
function getRangeRandom(low, high) {
    return Math.ceil(low + Math.random() * (high - low));
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
            imgsArrangeArr: Array(imageDatas.length).fill({
                pos: {
                    top: 0,
                    left: 0,
                }
            }),
        };

        this.rearrange = this.rearrange.bind(this);
    }

    /* 
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

        console.log('centerIndex=', centerIndex);
        console.log('topImgNum=', topImgNum);
        console.log('centerPos.top=' + centerPos.top);
        console.log('centerPos.left=' + centerPos.left);
        console.log('hPosRange=' + hPosRange);
        console.log('vPosRange=' + vPosRange);
        console.log('hPosRangeLeftSecX=' + hPosRangeLeftSecX);
        console.log('hPosRangeRightSecX=' + hPosRangeRightSecX);
        console.log('hPosRangeY=' + hPosRangeY);
        console.log('vPosRangeTopY=' + vPosRangeTopY);
        console.log('vPosRangeX=' + vPosRangeX);

        // Fisrt, put the picture of centerIndex to the center
        imgsArrangeCenterArr[0].pos = centerPos;
        console.log('centerPos.top=' + centerPos.top);
        console.log('centerPos.left=' + centerPos.left);
        console.log('imgsArrangeCenterArr[0].top', imgsArrangeCenterArr[0].pos.top);
        console.log('imgsArrangeCenterArr[0].left', imgsArrangeCenterArr[0].pos.left);

        // Get info of the picture of Top 
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // Locate the pictures of Top.
        imgsArrangeTopArr.forEach((value, index) => {
            imgsArrangeTopArr[index].pos = {
                top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
            };
            console.log('top=', imgsArrangeTopArr[index].pos.top);
            console.log('left=', imgsArrangeTopArr[index].pos.left);
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

            imgsArrangeArr[i].pos = {
                top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
            }
            console.log('i', i);
            console.log('imgsArrangeArr[i].pos.top=', imgsArrangeArr[i].pos.top);
            console.log('imgsArrangeArr[i].pos.left=', imgsArrangeArr[i].pos.left);
        };
        console.log('topImgSpliceIndex', topImgSpliceIndex);
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
        console.log('imgsArrangeArr', imgsArrangeArr);
        this.setState({
            imgsArrangeArr: imgsArrangeArr,
        });
    }

    // Calculate the position for each ImgFigure after loaded
    componentDidMount() {
        console.log('imageData.lenght', imageDatas.length);

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
                    x: [-halfImgH, halfAlbumH - halfImgH * 3],
                    topY: [halfImgW - imgW, halfImgW]
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
    render() {

        let styleObj = {};

        // If the position of the picture is written, use it.
        if (this.props.arrange) {
            styleObj = this.props.arrange.pos;
        };

        // console.log(this.props.data.title, styleObj);
        return (
            <figure className="img-figure" style={styleObj}>
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