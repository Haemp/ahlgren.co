;(function () {
    angular.module('co.ahlgren.Slideshow', [])
        .directive('slideshow', Slideshow)
        .directive('wordFramer', WordFramer)
        .directive('slide', Slide)

    /**
     * @ngdoc directive
     * @name Slideshow
     * @restrict AE
     * @description
     * usage:
     * ```
     *  <slideshow>
     *      <slide>
     *          <div word-framer>First slide</div>
     *          <img src="/some/image.png">
     *      </slide>
     *      <slide>
     *          <div word-framer>Second slide</div>
     *          <img src="/some/image.png">
     *      </slide>
     *  </slideshow>
     * ```
     */
    function Slideshow(){
        return{
            transclude: true,
            restrict: 'AE',
            scope:{
                autoPlay: '@',
                scrollEnabled: '@',
                onEnd: '&',
                apiPlay: '=?',
                speed:'=?'
            },
            template: '<div class="Slideshow" ng-transclude></div>',
            link: function(scope, element){


                var self = this;
                if(!scope.speed){
                    scope.speed = 120;
                }
                this.frames = [];
                this.slides = [];
                this.currentFrame = 0;
                this.currentSlide = 0;

                this.slideshow = $(element);

                this.transitionSpeedFrame = 0;
                this.transitionSpeedSlide = 'slow';
                this.pauseScroller = false;
                this.firstScrollHappened = false;

                var intervalID = null;


                function init() {

                    // add frames and slides
                    self.slides = this.slideshow.find('slide');
                    self.frames = self.slides.eq(0).find('.frame');

                    // fade in the first slide
                    if (scope.autoPlay) {
                        start();
                    }
                }

                scope.apiPlay = function(){
                    start();
                }

                function start(){

                    $(element).animate({opacity: 1}, 2000, function(e){
                        
                        // bind scroll
                        if (scope.scrollEnabled){
                            if(typeof $('body').mousewheel != 'function' ){
                                throw Error('To enable scrolling you need the mousewheel jquery plugin');
                            }
                            $('body').mousewheel(self.onScroll);
                        }

                        // start loop
                        intervalID = setInterval(self.autoPlayFunction, scope.speed);
                    })
                }

                this.autoPlayFunction = function () {

                    self.onScroll({}, -1);
                }

                this.playTo = function (index, mode, type) {

                    switch (type) {
                        case 'slide':

                            var fadeOutIndex = (mode == 'play') ? index - 1 : index + 1;
                            var fadeInIndex = (mode == 'play') ? index : index;

                            // change to next slide by first fading out the current
                            self.pauseScroller = true;
                            $(self.slides[fadeOutIndex]).fadeOut(self.transitionSpeedSlide, function () {

                                // pause the scroll effect

                                // and then fading in the next
                                $(self.slides[fadeInIndex]).fadeIn(self.transitionSpeedSlide, function () {

                                    self.pauseScroller = false;
                                });
                            });


                            break;

                        case 'frame':

                            switch (mode) {
                                case 'play':

                                    // if there is no frame attribute and no action - we defer to the array index
                                    $(self.frames[index]).fadeIn(self.transitionSpeedFrame);

                                    break;

                                case 'rewind':

                                    // if there is no frame attribute and no action - we defer to the array index
                                    $(self.frames[index]).fadeOut(self.transitionSpeedFrame);

                                    break;
                            }

                            break;
                    }

                }

                this.onEnd = function () {

                    // remove the setInterval
                    window.clearInterval(self.intervalID);

                    // fade out next to last slide
                    self.slides.eq(self.slides.length - 2).fadeOut(2000, function () {

                        // show end slide
                        self.slides.eq(self.slides.length - 1).fadeIn(2000);

                    });
                }

                this.rewindFrom = function (index) {

                    self.frames.filter('[data-frame="' + index + '"]').fadeOut(self.transitionSpeed);

                    // if there is no frame like this - we defer to the array index
                    if (self.frames.filter('[data-frame="' + index + '"]').length == 0) {
                        $(self.frames[index]).fadeOut(self.transitionSpeed);
                    }
                }

                this.onStart = function () {

                }

                this.onScroll = function (e, delta) {

                    if (!self.firstScrollHappened) {

                        // remove the scroll handle
                        $('#content').removeClass('fake-length');
                        self.firstScrollHappened = true;
                    }

                    if (self.pauseScroller) return;


                    // if the scroll is down play, otherwise rewind
                    // we also increment or decrement the index of the array
                    var type = '';

                    if (delta < 0) {

                        // check bounds of frames
                        if (self.currentFrame + 1 > self.frames.length) {

                            // if outside we change slide

                            // check bounds of slides
                            if (self.currentSlide + 2 >= self.slides.length) {
                                self.onEnd();
                                return;
                            }

                            // we grab frames from next slide and reset current frame
                            self.currentSlide++;
                            self.currentFrame = 0;
                            self.frames = $(self.slides[self.currentSlide]).find('.frame');
                            type = 'slide';

                            self.playTo(self.currentSlide, 'play', type);

                        } else {

                            // if inside of bounds we change frame
                            type = 'frame';
                            self.playTo(self.currentFrame, 'play', type);

                            self.currentFrame++;
                        }

                    } else {



                        // check bounds of frames
                        if (self.currentFrame - 1 < 0) {

                            // if outside we change slide

                            // check bounds of slides
                            if (self.currentSlide - 1 < 0) {
                                self.onStart();
                                return;
                            }

                            // we grab frames from next slide and reset current frame
                            self.currentSlide--;
                            self.frames = $(self.slides[self.currentSlide]).find('.frame');
                            self.currentFrame = self.frames.length - 1;
                            type = 'slide';

                            self.playTo(self.currentSlide, 'rewind', type);

                        } else {

                            // if inside of bounds we change frame

                            type = 'frame';
                            self.currentFrame--;
                            self.playTo(self.currentFrame, 'rewind', type);
                        }


                    }
                }

                init();
            }
        }
    }

    function Slide(){
        return {
            transclude:true,
            template: '<div class="slide" ng-transclude></div>',
        }
    }

    /**
     * @ngdoc directive
     * @name WordFramer
     * @description
     * Turns "Hi you" into
     * ```
     *  <span class="word">
     *      <span class="frame">H</span>
     *      <span class="frame">i</span>
     *  </span>
     *  <span class="word">
     *      <span class="frame">y</span>
     *      <span class="frame">o</span>
     *      <span class="frame">u</span>
     *  </span>
     * ```
     */
    function WordFramer(){
        return {
            link: function(scope, elem){

                var newElements = $('<div>');
                elem.text().split(' ').forEach(function(word){
                    var eWord = $('<span class="word"></span>');
                    newElements.append(eWord)

                    word.split('').forEach(function(letter){
                        var eFrame = $('<span class="frame">'+letter+'</span>');
                        eWord.append(eFrame)
                    })
                })

                elem.text('');
                elem.append(newElements);
            }
        }
    }

})();

