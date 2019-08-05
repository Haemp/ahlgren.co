class IntroAnimations{

    constructor({greeting, hand}){
        this.greetingElement = greetingElement;


        return [
            { 
                start(){
                    return greeting.play;
                }
            },
            {
                start(){
                    hand.classList.toggle('ah-anim--fade-in');
                    await this.delay(500)
                    this.wavingHand.classList.toggle('hidden');
                    this.wavingHand.classList.toggle('ah-anim--fade-in');
                    this.wavingHand.classList.toggle('ah-intro--waving-anim');
                    await this.delay(1000)
                    this.wavingHand.classList.toggle('ah-intro--waving-anim');
                }
            },{
                start(){
                    // fade away the greeting
                    // fade away the hand
                }
            },
            {
                start(){
                    // bounce in the coder logo
                }
            },
            {
                start(){
                    // type in the text
                }
            },
            {
                start(){
                    // float up the logo to the right
                    // fade out the text
                }
            }
        ]
    }

    start(){
        return this.greetingElement.play()
    }
}