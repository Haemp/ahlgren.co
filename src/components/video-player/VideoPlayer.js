// @ts-check
import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import PlayButton from './PlayButton';
// @ts-ignore
const iconReplay = require('./icon-replay.svg');



const StyledVideoSnippet = styled.div`
    display: flex;
    justify-content: center;
    position: relative;

    width: 100%;

    video {
        /* position:relative;
        z-index: -1; */
        -webkit-mask-image: -webkit-radial-gradient(white, black);
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
    }
`;


const StyledPlayButton = styled(PlayButton)`
    transition: opacity 0.3s;
    width: 30%;
    opacity: 0.5;
`;

const PlayButtonContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    :hover {
        ${StyledPlayButton} {
            transition: opacity 0.3s;
            opacity: 0.8;

            &:active {
                opacity: 0.5;
            }
        }
    }
`;

const PosterImage = styled.img`
    width: 100%;
    height: 100%;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const IconReplay = styled.img`
    width: 40px;
    opacity: 0.8;
    cursor: pointer;
    position: relative;
    z-index: 3;
`;

export { Spinner };

export default class VideoSnippet extends React.Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        name: PropTypes.string,
        playerProps: PropTypes.object,
        playing: PropTypes.bool,
        autoPlay: PropTypes.bool,
        posterImage: PropTypes.string,
        renderPoster: PropTypes.func,
        showReplay: PropTypes.bool,
        renderSpinner: PropTypes.func,
        className: PropTypes.string,
        spinnerProps: PropTypes.object
    };

    static defaultProps = {
        playerProps: {}
    }

    state = {
        isBuffering: false,
        isPlaying: false,
        didFinish: false,
        hasStarted: false,
        isPaused: false,

        // responsible for driving the play
        playControl: false
    };

    playerWrapper
    defaultPlayerProps = {
        controls: true,
        muted: true,
        width: null,
        height: null,
        config: {
            file: {
                attributes: {
                    type: 'video/mp4',
                    playsInline: true,
                    preload: 'metadata'
                }
            }
        }
    }

    componentDidMount() {
        let playerConfig = {...this.defaultPlayerProps, ...this.props.playerProps};
        this.video = this.playerWrapper.getInternalPlayer();
        this.video.addEventListener('waiting', () => {
            this.setState({ isBuffering: true });
        });

        this.video.addEventListener('playing', () => {
            this.setState({
                isBuffering: false,
                isPlaying: true,
                hasStarted: true
            });
        });

        this.setState({
            // @ts-ignore
            playControl: playerConfig.autoPlay
        });
    }

    /**
     * @api
     */
    play = () => {
        this.setState({
            playing: true
        });
    };

    /**
     * @api
     */
    pause = () => {
        this.setState({
            playing: false
        });
    };

    onClickReplay = () => {
        this.video.currentTime = 0;
        this.video.play();
    };

    onEnded = () => {
        this.setState({ didFinish: true, isPlaying: false });
    };

    onStart = () => {
    };

    onBuffer = () => {
        this.setState({ isBuffering: true });
    };

    onPause = () => {
        this.setState({ isPlaying: false });
    };

    renderPoster() {
        // @ts-ignore
        const { posterImage, posterEl } = this.props;

        if (posterImage) {
            return <PosterImage src={posterImage} />;
        } else if (posterEl) {  
            return posterEl;
        }
    }

    renderOverlay() {
        // @ts-ignore
        const { spinnerProps, showReplay } = this.props;
        let playerConfig = {...this.defaultPlayerProps, ...this.props.playerProps};
        const {
            hasStarted,
            isPaused,
            isPlaying,
            isBuffering,
            didFinish,
            playControl
        } = this.state;

        // if the video is playing we don't want to show
        // any overlay
        if(playerConfig.controls){
            return '';
        }

        if (!hasStarted || isBuffering || didFinish) {
            return (
                <Overlay>
                    {!hasStarted && this.renderPoster()}
                    {(!playControl) && (
                        <PlayButtonContainer onClick={this.onClickPlayButton}>
                            <StyledPlayButton />
                        </PlayButtonContainer>
                    )}
                    {didFinish && !isPlaying && showReplay && (
                        <IconReplay
                            onClick={this.onClickReplay}
                            src={iconReplay}
                        />
                    )}
                    {isBuffering && (
                        <Overlay>
                            <Spinner {...spinnerProps} />
                        </Overlay>
                    )}
                </Overlay>
            );
        }
    }

    onClickPlayButton = () => {
        this.setState({
            playControl: true
        });
    };

    onClickVideo = () => {
        this.setState({
            playControl: !this.state.playControl
        })
    }

    render() {
        // @ts-ignore
        const {
            url,
            className,
            spinnerProps = {}
        } = this.props;


        let playerConfig = {...this.defaultPlayerProps, ...this.props.playerProps};

        const { playControl } = this.state;

        return (
            <StyledVideoSnippet className={className}>
                <ReactPlayer
                    {...playerConfig}
                    
                    ref={ref => (this.playerWrapper = ref)}

                    url={url}
                    playing={playControl}

                    onClick={this.onClickVideo}
                    onPause={this.onPause}
                    onStart={this.onStart}
                    onEnded={this.onEnded}
                    onBuffer={this.onBuffer}
                />
                {this.renderOverlay()}
            </StyledVideoSnippet>
        );
    }
}
