import React            from 'react';
import Greeting         from '../animations/Greeting';
import HandAnimation    from '../animations/HandAnimation';
import AnimatedText     from '../animations/AnimatedText';
import CodeIcon         from '../animations/CodeIcon';
import {Transition, Frame, Animator} from '../animations/Animator';

import codeIconSvg      from '../icons/icon-code.svg';
import designIconSvg    from '../icons/icon-design.svg';
import leadIconSvg      from '../icons/icon-lead.svg';
import ahlgrenIconSvg   from '../icons/icon-ahlgren.svg';

import '../shared.css';
import '../typography.css';
import './intro.css';

export default class Intro extends React.Component{

    constructor(){
        super();

        this.animationFulfillPromise = {};
        this.state = {};
    }

    componentDidMount(){

        if(this.props.play){
            this.play();
        }
    }

    componentWillReceiveProps(newProps){
        if(this.props.play !== newProps.play && newProps.play){
            this.play();
        }

        if(this.props.pause !== newProps.pause){
            if(newProps.pause)
                this.pause();
            else
                this.unPause()
        }
    }

    unPause(){
        this.setState({pause: false})
    }

    pause(){
        this.setState({pause: true})
    }

    async play(){
        await this.animator.start();
        if(this.props.onFinished)
            this.props.onFinished();
    }

    delay(miliseconds){
        return new Promise(fulfill => {
            setTimeout(fulfill, miliseconds)
        });
    }

    onReady(){
        this.setState({allFilesLoaded: true});

        if(this.props.onReady)
            this.props.onReady();

        if(this.props.autoPlay)
            this.play();
    }

    setAnimationState(animationComponent, playState){
        return new Promise(fulfill => {
            this.setState({[animationComponent]: playState});
            this.animationFulfillPromise[animationComponent] = fulfill;
        })
    }

    render(){
        return (
            <div className="ah-intro">
                <Animator ref={ref => this.animator = ref} pause={this.state.pause}>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('greeting', 'write')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('hand', 'visible')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('hand', 'wave')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('hand', 'hidden')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('text1', 'write')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('text1', 'hidden')} />
                        <Transition animateFunc={_ => this.setAnimationState('greeting', 'hidden')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('code', 'showing')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('text2', 'write')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('code', 'minimized')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('text2', 'hidden')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('design', 'showing')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('text3', 'write')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('design', 'minimized')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('text3', 'hidden')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('lead', 'showing')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('text4', 'write')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('lead', 'minimized')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('text4', 'hidden')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('code', 'hidden')} />
                        <Transition animateFunc={_ => this.setAnimationState('design', 'hidden')} />
                        <Transition animateFunc={_ => this.setAnimationState('lead', 'hidden')} />
                        <Transition animateFunc={_ => this.setAnimationState('ahlgren', 'showing')} />
                        <Transition animateFunc={_ => this.setAnimationState('text5', 'write')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('ahlgren', 'rise')} />
                    </Frame>
                    <Frame>
                        <Transition animateFunc={_ => this.setAnimationState('text5', 'hidden')} />
                        <Transition animateFunc={_ => this.setAnimationState('text6', 'write')} />
                    </Frame>
                    
                    <div className="ah-intro--frame">
                        <div className="ah-intro--greeting ah-intro--frame__centered ah-intro--frame__mid">
                            <Greeting onAnimationComplete={_ => this.animationFulfillPromise['greeting']()} 
                                      onReady={_ => this.onReady()}
                                      playState={this.state.greeting}/>
                        </div>
                    </div>
                    <div className="ah-intro--hand-container ah-intro--frame">
                        <div className="ah-intro--hand ah-intro--frame__centered ah-intro--frame__mid">
                            <HandAnimation onAnimationComplete={_ => this.animationFulfillPromise['hand']()} playState={this.state.hand}/>
                        </div>
                    </div>
                    <div className="ah-intro--frame ah-intro--text ah-intro--frame__centered">
                        <div className="ah-intro--position-bottom">
                            <AnimatedText playState={this.state.text1} className="Typo-para" onAnimationComplete={_ => this.animationFulfillPromise['text1']()}>
                                <div className="Typo-para">I’m Hampus and I build digital products</div>
                            </AnimatedText>
                        </div>
                    </div>
                    <div className="ah-intro--frame ah-intro--text ah-intro--frame__centered">
                        <div className="ah-intro--position-bottom">
                            <AnimatedText playState={this.state.text2}  onAnimationComplete={_ => this.animationFulfillPromise['text2']()}>
                                <div className="Typo-para">Sometimes I'm a Frontend Developer</div>
                            </AnimatedText>
                        </div>
                    </div>
                    <div className="ah-intro--frame ah-intro--text ah-intro--frame__centered">
                        <div className="ah-intro--position-bottom">
                            <AnimatedText playState={this.state.text3}  onAnimationComplete={_ => this.animationFulfillPromise['text3']()}>
                                <div className="Typo-para">Sometimes I'm a Designer</div>
                            </AnimatedText>
                        </div>
                    </div>
                    <div className="ah-intro--frame ah-intro--text ah-intro--frame__centered">
                        <div className="ah-intro--position-bottom"> 
                            <AnimatedText playState={this.state.text4}  onAnimationComplete={_ => this.animationFulfillPromise['text4']()}>
                                <div className="Typo-para">And sometimes I lead teams of both</div>
                            </AnimatedText>
                        </div>
                    </div>
                    <div className="ah-intro--frame ah-intro--text ah-intro--frame__centered">
                        <div className="ah-intro--position-bottom">
                            <AnimatedText playState={this.state.text5}  onAnimationComplete={_ => this.animationFulfillPromise['text5']()}>
                                <div className="Typo-para">But the one thing I love is building great products</div>
                            </AnimatedText>
                        </div>
                    </div>
                    <div className="ah-intro--frame ah-intro--text ah-intro--frame__centered">
                        <div className="ah-intro--position-bottom">
                            <AnimatedText playState={this.state.text6}  onAnimationComplete={_ => this.animationFulfillPromise['text6']()}>
                                <div className="Typo-para">Let me show you some of my favorite work.</div>
                            </AnimatedText>
                        </div>
                    </div>

                    <div className="ah-intro--frame ">
                        <div className="ah-intro--icons ah-intro--frame__centered ah-intro--frame__mid">
                            <CodeIcon icon={codeIconSvg}
                                    position="left"
                                    onAnimationComplete={_ => this.animationFulfillPromise['code']()} 
                                    playState={this.state.code} />
                        </div>  
                    </div>
                    <div className="ah-intro--frame">
                        <div className="ah-intro--icons ah-intro--frame__centered ah-intro--frame__mid">
                            <CodeIcon icon={designIconSvg} 
                                    position="center"
                                    onAnimationComplete={_ => this.animationFulfillPromise['design']()} 
                                    playState={this.state.design} />
                        </div>
                    </div>
                    <div className="ah-intro--frame">
                        <div className="ah-intro--icons ah-intro--frame__centered ah-intro--frame__mid">
                            <CodeIcon icon={leadIconSvg} 
                                    position="right"
                                    onAnimationComplete={_ => this.animationFulfillPromise['lead']()} 
                                    playState={this.state.lead} />
                        </div>
                    </div>
                    <div className="ah-intro--frame">
                        <div className="ah-intro--icons ah-intro--frame__centered ah-intro--frame__mid">
                            <CodeIcon icon={ahlgrenIconSvg} 
                                    position="center"
                                    onAnimationComplete={_ => this.animationFulfillPromise['ahlgren']()} 
                                    playState={this.state.ahlgren} />
                        </div>
                    </div>
                
                </Animator>
            </div>
        )
    }
}