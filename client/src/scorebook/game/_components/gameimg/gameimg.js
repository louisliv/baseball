import React, { Component } from 'react';

import ReactResizeDetector from 'react-resize-detector';

import TeamBrands from 'utils/team-branding';
import Constants from 'utils/constants';

class GameImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            awayX: 0,
            awayY: 0,
            homeX: 0,
            homeY: 0
        };
        this.refCallback = this.refCallback.bind(this);
        this.onResize = this.onResize.bind(this);
        this.awayRef = this.awayRef.bind(this);
        this.homeRef = this.homeRef.bind(this);
        this.setLogoPoints = this.setLogoPoints.bind(this);

        this.awayTeamBrand = TeamBrands[this.props.awayTeam.id];
        this.homeTeamBrand = TeamBrands[this.props.homeTeam.id];
    }

    refCallback(element) {
        if (element) {
            let dimensions = element.getBoundingClientRect();
            let height = dimensions.width / 3
            this.setState({
                width: dimensions.width,
                height: height,
                awayPoints: this.calculateAwayPoints(dimensions.width, height),
                homePoints: this.calculateHomePoints(dimensions.width, height)
            })
        }
    }

    awayRef(element) {
        if (element) {
            let dimensions = element.getBoundingClientRect();
            this.setState({
                awayHeight: dimensions.height,
                awayWidth: dimensions.width
            })
        }
    }

    homeRef(element) {
        if (element) {
            let dimensions = element.getBoundingClientRect();
            this.setState({
                homeHeight: dimensions.height,
                homeWidth: dimensions.width
            })
            this.setLogoPoints();
        }
    }

    onResize(width, height) {
        let resizeHeight = width / 3
        this.setState({
            width: width,
            height: resizeHeight,
            awayPoints: this.calculateAwayPoints(width, resizeHeight),
            homePoints: this.calculateHomePoints(width, resizeHeight)
        })
        this.setLogoPoints();
    }

    setLogoPoints() {
        let halfY = this.state.height / 2;
        let quarterX = this.state.width * .25;
        let quarter3X = this.state.width * .75;
        let halfAwayHeight = this.state.awayHeight / 2;
        let halfAwayWidth = this.state.awayWidth / 2;
        let halfHomeHeight = this.state.homeHeight / 2;
        let halfHomeWidth = this.state.homeWidth / 2;
        let awayX = (quarterX - halfAwayWidth)
        let awayY = (halfY - halfAwayHeight)
        let homeX = (quarter3X - halfHomeWidth)
        let homeY = (halfY - halfHomeHeight)

        console.log(awayX, awayY, homeX, homeY)

        this.setState({
            awayX: !isNaN(awayX) ? awayX: 0,
            awayY: !isNaN(awayY) ? awayY: 0,
            homeX: !isNaN(homeX) ? homeX: 0,
            homeY: !isNaN(homeY) ? homeY: 0
        })
    }

    calculateAwayPoints(width, height) {
        let leftUp = [0,0]
        let leftBottom = [0, height]
        let rightUp = [(width * .55), height]
        let rightBottom = [(width * .45), 0]

        return [leftUp, leftBottom, rightUp, rightBottom];
    }

    calculateHomePoints(width, height) {
        let leftUp = [width,0]
        let leftBottom = [width, height]
        let rightUp = [(width * .55), height]
        let rightBottom = [(width * .45), 0]

        return [leftUp, leftBottom, rightUp, rightBottom];
    }

    render () {
        return (
            <div ref={this.refCallback} style={{height: this.state.height}}>
                <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
                <svg width={this.state.width} height={this.state.height}>
                    <polygon points={this.state.awayPoints} 
                        style={{
                            fill: this.awayTeamBrand.primary, 
                            stroke: 'white', 
                            strokeWidth: 1
                        }} 
                    />
                    <image ref={this.awayRef} 
                        xlinkHref={Constants.getTeamLogo(this.props.awayTeam.id)} 
                        x={this.state.awayX} 
                        y={this.state.awayY}/>
                    <polygon points={this.state.homePoints} 
                        style={{
                            fill: this.homeTeamBrand.primary, 
                            stroke: 'white', 
                            strokeWidth: 1
                        }} 
                    />
                    <image ref={this.homeRef} 
                        xlinkHref={Constants.getTeamLogo(this.props.homeTeam.id)} 
                        x={this.state.homeX} 
                        y={this.state.homeY}/>
                </svg>
            </div>
        )
    }
}

export default GameImg;