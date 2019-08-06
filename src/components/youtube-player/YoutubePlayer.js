// Here we're importing react - since SideView has created
// this file in your project directory it will use your
// version of react.
import React from 'react';

// This is the stub component - just remove and start building!
export default class YoutubeVideo extends React.Component {
    render() {
        return (
            // @ts-ignore
            <iframe
                {...this.props}
                frameBorder={0}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        );
    }
}
