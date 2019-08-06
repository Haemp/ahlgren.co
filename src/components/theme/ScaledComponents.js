// @ts-check
import React, { Component } from 'react';
import ScalingProvider from '../scaling/ScalingProvider';
import { Title, SecondTitle } from './ThemeComponents';

class ScaledTitle extends Component {
    render() {
        return (
            <ScalingProvider min={320} max={1024}>
                {ratio => (
                    <SecondTitle {...this.props} size={(32 + ratio * 36) + 'px'} >
                        {this.props.children}
                    </SecondTitle>
                )}
            </ScalingProvider>
        );
    }
}

export { ScaledTitle };
