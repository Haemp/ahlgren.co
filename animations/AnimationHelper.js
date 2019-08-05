import anime from 'animejs';

export default class AnimationHelper{

    static applyAnimation(element, animationClass, timing){
        return new Promise(fulfill => {
            element.style.animationDuration = (timing / 1000) + 's';
            element.classList.toggle(animationClass, true);
            setTimeout(_ => {
                //element.classList.toggle(animationClass, false);
                fulfill();
            }, timing);
        })
    }

    static animatePromise(target, animation){
        return new Promise(fulfill => {
            anime({
                targets: target, 
                ...animation,
                complete(){
                    fulfill();
                }
            });
        })
    }
}