import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @usage
 * ```javascript
 *  <ScalingProvider min={320} max={800} targetEl={element}>
 *      {
 *       // @param widthRatio a value from 0 -> 1 based on the active width in the interval 320 -> 800
 *       ({widthRatio}) => (
 *          <Title size={(widthRatio * 12) + "px"} >Some title</Title>
 *      )}
 * </ScalingProvider>
 * ```
 */
class ScalingProvider extends Component {
    state = {
        scaling: 0,
    };

    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        targetEl: PropTypes.any
    };

    static defaultProps = {
        targetEl: window
    }

    getTargetElWidth(){
        let width;
        let element = this.props.targetEl;
        if(element instanceof window.constructor){
            width = window.innerWidth;
        }
        
        if(element instanceof HTMLElement){
            width = element.getBoundingClientRect().width;
        }

        if(typeof element === 'string'){
            width = document.querySelector(element).getBoundingClientRect().width;
        }

        return width;
    }

    refresh() {
        
        let activeWidth = this.getTargetElWidth();
        if (activeWidth < this.props.min) {
            activeWidth = this.props.min;
        } else if (activeWidth > this.props.max) {
            activeWidth = this.props.max;
        }

        // now we normalize it in the interval
        // of min -> max
        const interval = this.props.max - this.props.min;
        const ratio = (activeWidth - this.props.min) / interval;

        this.setState({
            scaling: ratio
        });
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.refresh()
        });
        this.refresh()
    }

    render() {
        return this.props.children(this.state.scaling);
    }
}

export default ScalingProvider;
