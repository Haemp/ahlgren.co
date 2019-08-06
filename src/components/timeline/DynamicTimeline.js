import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @todo
 *  - Should be able to draw a non scalable path from point to point
 *    with a fixed width and height
 *
 * @description
 * structure - coords relative to previous
 *
 * @usage
 * ```javascript
 *  <DynamicTimeline
 *      height={500}
 *      width={1024}
 *      points={[
 *          [0,0] // starts in the upper left corner
 *          [20, 20]  // moves 20 units to the right and bottom
 *          [40, 40] // moves 40 pixels from the last position ending up in 60,60
 *      ]} />
 * ```
 */
class DynamicTimeline extends Component {
    static propTypes = {
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        points: PropTypes.array.isRequired
    };

    componentDidMount() {
        // build the svg path element from the input coords
        const coords = this.props.structure;
    }

    renderPathFromCoords(coords) {

        const pathString = coords.map((coord, index) => {
            // its going to look like this
            // [
            //    0 <-- this is our x value
            //    100 <-- this is our y value
            // ]
            const { x, y } = coord;

            // so for the first time around we want to
            // start by moving the line to the first coords
            // position
            if (index === 0) {
                return `M${x} ${y}`;
            } else {
                const { x: prevX, y: prevY } = coords[index - 1];

                if(index === coords.length -1){
                    return `C ${prevX} ${y} ${x} ${prevY} ${x} ${y - 50}`;
                }else{
                    return `C ${prevX} ${y} ${x} ${prevY} ${x} ${y}`;
                }
            }
        });

        // To simulate the dashed line at the end of the arrow
        // we will draw three rectangles cutting the line off.
        // The lines should be drawn from the Y position of the
        // next to last point. To the Y position of the last point
        const nextToLastPoint = coords[coords.length - 2];
        const lastPoint = coords[coords.length - 1];
        const distanceBetweenPoints = Math.abs(lastPoint.x - nextToLastPoint.x);

        const numberOfDashSpaces = 4;
        const rectGap = 40;
        // We use this to align the dash rectangles
        // if the last dot is an even number we align the
        // rects to the right
        // Otherwise we align them to the left.
        const evenOddMultiplier = coords.length % 2 === 0 ? 1 : -1;
        const midPoint = (distanceBetweenPoints / 2);
        const rectWidth = 20;
        const totalWidth = (numberOfDashSpaces * rectWidth) + ((numberOfDashSpaces -1) * (rectGap/2))
        const adjustment = evenOddMultiplier * (distanceBetweenPoints * 0.25)
        const rect = {
            y: nextToLastPoint.y,
            x:
                midPoint - (totalWidth/2) + adjustment,
            height: lastPoint.y - nextToLastPoint.y,
            width: rectWidth
        };

        const rects = [...new Array(numberOfDashSpaces)].map((value, index) => {
            return {
                ...rect,
                x: rect.x + rectGap * index
            };
        });
        // the X position should be distributed along the mid point
        // of x1 and x2

        return (
            <>
                <path
                    markerEnd="url(#arrow)"
                    stroke="#D0D0D0"
                    vectorEffect="non-scaling-stroke"
                    strokeWidth="8px"
                    d={pathString}
                    fill="transparent"
                />
                {rects.map((rect, index) => {
                    return <rect key={index} fill="white" {...rect} />;
                })}
            </>
        );
    }

    render() {
        return (
            <svg
                {...this.props}
                viewBox={`0 0 ${this.props.width} ${this.props.height}`}
                preserveAspectRatio="none"
            >
                <defs>
                    <marker
                        id="arrow"
                        viewBox="0 0 12 12"
                        refX="5"
                        refY="5"
                        fill="#d0d0d0"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" />
                    </marker>
                </defs>

                {this.renderPathFromCoords(this.props.points)}
            </svg>
        );
    }
}

export default DynamicTimeline;
