// @ts-check
import React, { Component } from 'react';
import PropTypes from 'prop-types'


/**
 * @usage
 * ```javascript
 *  <Breakpoints conditions={[
 *      '0 < width < 500'
 *  ]}>
 *      This will be visible only when we're below 500px width
 * </Breakpoints>
 * ```
 */
class Breakpoints extends Component {

    state = {
        shouldRender: false
    }

    static propTypes = {
        conditions: PropTypes.array
    }

    _debounce(func, timer){
        return function _debouncedFunc(){
            if(!_debouncedFunc.closed){
                func();
                _debouncedFunc.closed = true;
                setTimeout(() => {
                    _debouncedFunc.closed = false;
                }, timer)
            }
        }
    }
    

    componentDidMount(){

        // add listener for screen resizing. 
        this.breakpoints = this.parseBreakpoints();
        window.addEventListener('resize', this._debounce(() => {
            this.setState({
                shouldRender: this.evaluate(this.breakpoints)
            })
        }, 2000))
    
        this.setState({
            shouldRender: this.evaluate(this.breakpoints)
        })
    }

    /**
     * In the evaluation phase we evaluate the current window conditions 
     * vs all the conditionals
     */
    evaluate(breakpoints){
        const currentWindowWidth = window.innerWidth;
        const renderChildren = breakpoints.some(breakpoint => {

            let max = breakpoint.max || Number.MAX_SAFE_INTEGER;
            let min = breakpoint.min || 0;

            if(currentWindowWidth < max && currentWindowWidth > min){
                return true
            }
        })

        return renderChildren;
    }

    parseBreakpoints(){
        const breakpoints = this.props.conditions.map(bounds => {

            const components = bounds.split('<');
            let dimension ;
            let minMeasurement;
            let maxMeasurement;

    
            if(components.length < 2 || components.length > 3) return '';
    
            if(components.length === 2){
                dimension = components[0].trim();
                maxMeasurement = parseInt(components[1].trim());
    
                return {dimension, max: maxMeasurement}
            }
            
            if (components.length === 3){
                minMeasurement = parseInt(components[0].trim());
                dimension = components[1].trim();
                maxMeasurement = parseInt(components[2].trim());
    
                return {dimension, max: maxMeasurement, min: minMeasurement}
            }
        })

        return breakpoints;
    }

    render() {
        if(this.state.shouldRender){
            return this.props.children
        }else{
            return '';
        }
    }
}

export default Breakpoints;