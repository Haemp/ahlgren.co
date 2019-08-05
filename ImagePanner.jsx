import React from 'react';
import './image-panner.css';
import Cropper from './Cropper';

export default class ImagePanner extends React.Component{

    render(){
        return(
            <div>
                <Cropper src={this.props.imageUrl} />
            </div>
        )
    }
}