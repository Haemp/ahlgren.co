import preloadImages from './../ImagePreloader';
import files from './PreloadedFiles';
import getLever from 'common/lever';

// Woah! Keep your pants on - don't unify these regex into a 
// variable - webpack requires them to be written like this
// or it will break


// allLogosContext.keys().forEach(key => {
//     console.log('Contenxt key: ', key, ' module ', allLogosContext(key));
//     imageUrls.push(allLogosContext(key));
// })

/**
 * Loading component intentionally written in legacy style since
 * we want the first load javascript (that renders first paint) to
 * be as light of a bundle as possible.
 */


/**
 * On first loaded it will create an overlay and start adding circles to it.
 * When we hear the "load" event - determining that all the resources are
 * fetched, we animate out the circles and remove the overlay
 */
var SvgCircle = `<svg>
    <circle cx="50%" cy="50%" r="50%"></circle>
</svg>`;

class LoadingComponent{

    
    constructor(){
        
        this.state = {
            numCircles: 0
        };
        this.domContentLoaded = getLever();
        this.imagesLoaded = getLever();
        this.element = document.createElement('div');
        this.element.classList.add('ah-loading');
        this.element.innerHTML = `
            <style>
                .ah-loading svg{
                    width: 20px;
                    height: 20px;
                    transition: all 0.5s;
                    margin-right: 20px;
                }
                .ah-loading circle{
                    fill: #f5faff;
                    opacity: 0.7;
                }
                .ah-loading .container{
                    background-color: #193754;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .ah-loading.finished svg{
                    transition: all 0.5s;
                    transform: translateY(-100px);
                    opacity: 0;
                }
            </style>
            <div class="container"></div>
        `;

        // listen for terminating event
        window.addEventListener('DOMContentLoaded', _ => this.domContentLoaded.fulfill())

        Promise.all([
            this.domContentLoaded,
            this.imagesLoaded
        ]).then(_ => this._onAllResourcesLoaded())
        
        // add itself to the DOM
        document.body.appendChild(this.element);
        this.container = this.element.querySelector('.container');            
        
        console.log('Preloading images:', files);
        preloadImages(files).then(this.imagesLoaded.fulfill)
    
        // startup
        this._startTicking();
    }    

    start(){
    }

    _addCircle(){
        this.setState({numCircles: this.state.numCircles+1});
    }

    setState(newState){
        Object.getOwnPropertyNames(newState).forEach(name => {
            this.state[name] = newState[name];
        })

        this._render();
    }

    _render(){
        const {numCircles, hide, finished} = this.state;

        // rendering the balls
        let circlesHTMLString = '';
        for(var i = numCircles; i > 0; i--){ 
            circlesHTMLString += SvgCircle;
        }
        this.container.innerHTML = circlesHTMLString;
        
        // adding the classes to the component
        this.element.classList.toggle('finished', !!finished);
        
        // toggling the visibility
        if(hide){
            this.element.style.display = 'none';
        }else{
            this.element.style.display = 'block';
        }
    }

    _startTicking(){
        this._intervalId = setInterval(_ => {   
            if(this.state.numCircles >= 10){
                this.setState({numCircles: 0});
            }
            this._addCircle();
        }, 1000);
    }

    _onAllResourcesLoaded(){
        console.log('All resources loaded')
        // stop the ticking
        clearInterval(this._intervalId);
        this.setState({finished: true})
        
        setTimeout(_ => {
            window.loadingFinished = true;
            window.dispatchEvent(new Event('loading-finished'));
            this.setState({hide: true})
        }, 500);
    }
}
window.LoadingComponent = new LoadingComponent();

