import Hammer from 'hammerjs';

class SlidePage extends HTMLElement{

    constructor(){
        super();

        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.innerHTML = `
            <style>
                .main{
                    background-color: red;
                    position:absolute;
                    top:0;left:0;right:0;bottom:0;
                    box-shadow: 10px 0px 4px rgba(0,0,0,0.4);
                }
                .stationary{
                    transition: transform 1s;
                }
            </style>
            <div class="main">
                Some slide
            </div>
        `;
        this._distance = 0;
        this.mainEl = this.shadow.querySelector('.main');
    }

    connectedCallback(){

        this._hammer = new Hammer(this.mainEl, {direction: Hammer.DIRECTION_HORIZONTAL});
        
        this._hammer.on('panstart', e => this.startAnimationLoop())
        this._hammer.on('panend', e => {
            this._distance = 0;
            this.endAnimationLoop()
        })
        
        this._hammer.on('pan', e => {
            this._distance = e.deltaX;
        })
    }

    _loop(){
        requestAnimationFrame(_ => {

            // queue up animation 
            this.mainEl.style.transform = 'translateX(' + this._distance + 'px)';
            
            if(this._playAnimationLoop)
                this._loop();
            else{
                console.log('Animation end')
                this.mainEl.style.transform = 'translate(0px)'; 
            }
        })
    }

    startAnimationLoop(){
        this.mainEl.classList.toggle('transition', true);
        this.mainEl.classList.toggle('stationary', false);
        console.log('Animation start')
        this._playAnimationLoop = true; 
        this._loop();
    }

    endAnimationLoop(){
        this.mainEl.classList.toggle('transition', false);
        this.mainEl.classList.toggle('stationary', true);
        this._playAnimationLoop = false;
    }
}

customElements.define('x-slide-page', SlidePage);