import ReactPlayer      from 'react-player';
import React            from 'react';
import PropTypes        from 'prop-types';
import Image            from './../cropper/Image';
import svgLoader        from './puff.svg';

import '../shared.css'
import './clip-player.css';

const youtubeConfig = {
    autoplay: 1,
    fs: 0,
    showinfo: 0,
    loop: 1,
    vq: 'hd720',
    controls: 0,
    modestbranding: 1
};


const ClipPlayerLoader = props => {
    return <div>
        <img src={svgLoader} />
    </div>
}

const ClipPlayerButton = props => 
    <button onClick={props.onClickOverlay} className="ah-clip-player--button">
        <svg width="43px" height="50px" viewBox="0 0 43 50">
            <polygon transform="translate(-958.000000, -1028.000000)" 
                        className="ah-clip-player--button-triangle"
                        points="1000.83517 1052.66483 958.164834 1077.16483 958.164834 1028.16483"></polygon>
        </svg>
    </button>


const PlayerOverlay = props => {
    let indicator;
    if(props.loading){
        indicator = <ClipPlayerLoader />
    }else{
        indicator = <ClipPlayerButton onClickOverlay={props.onClickPlay} />
    }

    return <div className="ah-clip-player--overlay">
        <Image  src={props.overlayImage} {...props.overlayImageOptions} />
        <div className="ah-clip-player--button-container">
            {indicator}
        </div>
    </div>;
}



export default class ClipPlayer extends React.Component{

    constructor(){
        super();
        console.log('In constructor')

        // @inspect
        this.state = {
            hasInitiated: false,
            playing: false,
            loading: false
        }
    }

    componentWillReceiveProps({playing}){


        console.log('Clip Player receiving props', playing)
        if(playing !== undefined && playing !== this.state.playing){

            // we don't allow youtube videos to be auto played
            if(!this.props.url.match(/^https?\:\/\/(www.)?youtube.com/))
                this._setPlaying(playing);   
        }
    }

    onClickedOverlay(){
        this._setPlaying(true)
    }

    _setPlaying(shouldPlay){
        if(!this.state.hasInitiated){
            this.setState({hasInitiated: true, loading: true})
        }

        this.setState({playing: shouldPlay})
    }

    onClickedPlayer(){
        this._setPlaying(false);
    }

    onPlayerStartLoading(){
        console.log('On buffer')
        this.setState({loading: true})
    }

    
    onPlayerEndLoading(){
        this.setState({loading: false})
    }
    onPlayerRef(ref){
        if(!this.playerAdded){
            this.playerAdded = true; //ref.player.player.player.play();
            this.setState({innerPlaying: true})
        }
    }

    render(){
        const {
            overlayImage, 
            overlayImageOptions, 
            url, 
            fillWidth, 
            fillHeight, 
            alignTop
        } = this.props;

        // if we have a youtube url there is no need
        // for the overlay - the player handles that itself
        let overlayElement = '';
        let isYoutube = !!url.match(/^https?\:\/\/(www.)?youtube.com/);

        let playerComponent;

        if(this.state.playing){
            playerComponent = <ReactPlayer loop
                                            muted={!isYoutube}
                                            autoPlay={true}
                                            controls={isYoutube}
                                            ref={ref => this.onPlayerRef(ref)}
                                            className={alignTop ? 'ah-clip-player--align-top' : ''}
                                            onClick={_ => this.onClickedPlayer()}
                                            onReady={_ => this.onPlayerEndLoading()}
                                            onProgress={_ => this.onPlayerEndLoading()}
                                            onStart={_ => this.onPlayerStartLoading()}
                                            playing={this.state.innerPlaying}
                                            url={url} 
                                            config={{
                                                file: {
                                                    attributes: {
                                                        type: 'video/mp4',
                                                        muted: "true",
                                                        playsInline: 'true',
                                                    }
                                                }
                                            }}
                                            style={{
                                                alignItems: alignTop ? 'flex-start' : 'center',
                                                justifyContent: 'center',
                                                display: 'flex'
                                            }}
                                            width={fillWidth ? '100%' : ''} 
                                            height={fillHeight ? '100%' : ''} />;
                                            
            // playerComponent = <video loop muted autoPlay playsInline
            //                                 className={alignTop ? 'ah-clip-player--align-top' : ''}
            //                                 onClick={_ => this.onClickedPlayer()}
            //                                 onPlay={_ => this.onPlayerEndBuffer()}
            //                                 src={url} 
            //                                 style={{
            //                                     alignItems: alignTop ? 'flex-start' : 'center',
            //                                     justifyContent: 'center',
            //                                     display: 'flex'
            //                                 }}
            //                                 width={fillWidth ? '100%' : ''} 
            //                                 height={fillHeight ? '100%' : ''} />;
        }

        let overlay = '';
        if(!this.state.playing || (this.state.playing && this.state.loading)){
            overlay = <PlayerOverlay onClickPlay={_ => this.onClickedOverlay()} 
                                     overlayImage={this.props.overlayImage} 
                                     overlayImageOptions={this.props.overlayImageOptions}
                                     loading={this.state.loading} />
        }

        return (
            <div className="ah-clip-player" style={{
                alignItems: alignTop ? 'flex-start' : 'center'
             }}>
                <div className="ah-clip-player--player-wrapper L-crop-center">
                    {playerComponent}
                </div>
                {overlay}
            </div>
        );
    }
}

ClipPlayer.propTypes = {
    url: PropTypes.string.isRequired,
    overlayImage: PropTypes.string
}