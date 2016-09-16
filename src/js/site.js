;(function () {



/**
 * Site logic
 */

	$(document).ready(function(e){
		
		// register links on the navigation hovers
		$('.navigation a').hover(function(e){ $(e.currentTarget).find('label').addClass('active');

		// register on mouseout
		}, function(e){ $(e.currentTarget).find('label').removeClass('active'); });

		// add event handlers to the navigation for aborting the presentation and sliding down to the content
		$('.navigation .nav-item').click(function(e){

			// abort the presentation
			$.awd6.utility.unlockPresentation();

			// scroll down
			var id = $(e.currentTarget).data('target-content');
			$('html, body').animate( { scrollTop: $('#'+id).offset().top }, 2000 );
		});

		// add event listener for the expanding portfolio
		$('#work .toggle-trigger').click(function(e){
			$.awd6.utility.toggleWorkDetails( $(e.target).closest('.work-item') );
		});
		
		// initiate the first presentation
		// only initiate for larger width screen size and non-mobile
		if( $(window).width() > 700 && !$.awd6.utility.isMobile() ) {
			

		}
		
		if( $.awd6.utility.isMobile() ){
			$('body').addClass('is-mobile');
		}
		$.awdPres = new AWDSlideshow();
		
		
		// activate lightbox for story images
		$('.story a img').closest('a').attr('rel', 'lightbox');
		$('#personal a img').closest('a').attr('rel', 'lightbox');
	});
	
	$.awd6 = {};

	/**
	 * Preload the sprite
	 */
	
	
	$.awd6.utility = {

		isMobile: function(){
			return ( /Android|Mobile|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) );
		},
		
		activateScrollSpy : function(){
			// add scrollspy
			var eNavigation = $('#personal .divider-wrapper');
			var ePersonal = $('#personal');

			$('body').scrollspy( 
				{
						
					min: function(){ 
						return ePersonal.offset().top+100;
					},
					max: function(){ 
						return ePersonal.offset().top+ePersonal.height();
					},

					onEnter: function(element, position) {

						var left = eNavigation.offset().left;
						var width = eNavigation.width();
						eNavigation.css({'left': left+'px', 'top': '0px', 'width': width+'px'});
		     				eNavigation.addClass('fixed');
						eNavigation.width(width);

						// adjust for the height of the divider bar disapeading
						var iDividerHeight = eNavigation.height();
						ePersonal.find('.personal-container').addClass('fixed-adjustment');
					},
	 				onLeave: function(element, position) {
		     				eNavigation.removeClass('fixed');
						ePersonal.find('.personal-container').removeClass('fixed-adjustment');

		      		},
		      		onTick: function(element, position){
		      			
		      		}
	      		}
	      	);
		},

		unlockPresentation: function(){
			$('.slideshow').css('position', 'static');
			$('.slideshow').css('height', 'initial');


			// show the rest of the content
			$('.hidden-content').fadeIn();

			$.awdPres.pauseScroller = true;

			if( !$.awd6.utility.isMobile() ){
				$.awd6.utility.activateScrollSpy();
			}

			/* TODO: Clean this mess up */
			var eAbout = $('#about');
	      	spy1 = $('body').scrollspy( 
				{
					min: function(){ return eAbout.offset().top-150; },
					max: function(){ return eAbout.offset().top+eAbout.height(); },

					onEnter: function(element, position) { $('.nav-item.about').addClass('active'); },
	 				onLeave: function(element, position) { $('.nav-item.about').removeClass('active'); },
	      		}
	      	);
	      	var eContact = $('#contact');
	      	$('body').scrollspy( 
				{
					min: function(){ return eContact.offset().top-150; },
					max: function(){ return eContact.offset().top+eContact.height(); },

					onEnter: function(element, position) { $('.nav-item.contact').addClass('active'); },
	 				onLeave: function(element, position) { $('.nav-item.contact').removeClass('active'); },
	      		}
	      	);
	      	var eResume = $('#resume');
	      	$('body').scrollspy( 
				{
					min: function(){ return eResume.offset().top-150; },
					max: function(){ return eResume.offset().top+eResume.height(); },

					onEnter: function(element, position) { $('.nav-item.resume').addClass('active'); },
	 				onLeave: function(element, position) { $('.nav-item.resume').removeClass('active'); },
	      		}
	      	);
		},

		toggleWorkDetails: function( eWorkItem ){
			
			
			if( eWorkItem.find('.expanded-view').css('display') == 'none' ){ // show the details

				var eFeatured = eWorkItem.find('.featured');
				eWorkItem.data('original-height', eFeatured.height());

				// slide down the detailed view
				eWorkItem.find('.expanded-view').slideDown();
				eWorkItem.find('.minimized-view').slideUp();

				// animate the feature into a cover type banner
				eWorkItem.find('.featured').animate( {height: '250px'} );


			}else if( eWorkItem.find('.expanded-view').css('display') == 'block' ){
				
				// slide up the detailed view and down the caption
				eWorkItem.find('.expanded-view').slideUp();
				eWorkItem.find('.minimized-view').slideDown();
				eWorkItem.find('.featured').animate( {height: eWorkItem.data('original-height')} );


			}

		},

	};


	function AWDSlideshow(){
		
		var self = this;
			
		this.actions = {
			slides:{
				
				1:{
					action:[function(){ /* change slide */ }, function(){ /* rewind */ }],
					4:[function(){ /* action here */ }, function(){ /* reverse action here */ }],
					16:[function(){ /* action here */ }, function(){ /* reverse action here */ }],
				},
				2:{
					action:[function(){ /* change slide */ }, function(){ /* rewind */ }],
					4:[function(){ /* action here */ }, function(){ /* reverse action here */ }],
					16:[function(){ /* action here */ }, function(){ /* reverse action here */ }],
				},
				
			}
		};
			
		this.frames = [];
		this.slides = [];
		this.currentFrame = 0;
		this.currentSlide = 0;

		this.slideshow = $('.slideshow');
			
		this.transitionSpeedFrame = 0;
		this.transitionSpeedSlide = 'slow';
		this.pauseScroller = false;
		this.firstScrollHappened = false;
		this.autoplay = true;
		this.scrollEnabled = false;

		this.intervalID = null;

			
		var init = function(){
			
			// add frames and slides
			self.slides = $('.slide');
			self.frames = self.slides.eq(0).find('.frame');
			
			// fade in the first slide
			self.slideshow.fadeIn( 2000, function(){

				// bind scroll 	
				if( self.scrollEnabled ) $('body').mousewheel(self.onScroll);

				// autoplay
				if( self.autoplay ){
					self.intervalID = setInterval( self.autoPlayFunction, 120 );
				}
			});
		}
		
		this.autoPlayFunction = function(){

			self.onScroll({}, -1);
		}
			
		this.playTo = function( index, mode, type ){
				
			switch( type ){
				case 'slide':
					
					var fadeOutIndex = (mode == 'play') ? index-1 : index+1;
					var fadeInIndex = (mode == 'play') ? index : index;
					
					// change to next slide by first fading out the current
					self.pauseScroller = true;
					$(self.slides[fadeOutIndex]).fadeOut(self.transitionSpeedSlide, function(){
						
						// pause the scroll effect
						
						// and then fading in the next
						$(self.slides[fadeInIndex]).fadeIn(self.transitionSpeedSlide, function(){
							
							self.pauseScroller = false;
						});
					});
					
					
				break;
				
				case 'frame':
					
					switch( mode ){
						case 'play':
						
							// check if action exists
							if( self.actions[self.currentSlide] != undefined && self.actions[self.currentSlide][self.currentFrame] != undefined ){
								// play that action
								self.actions[self.currentSlide][self.currentFrame][0]();
								break;
							}
						
							// check frame attribute
							if( self.frames.filter('[data-frame="'+index+'"]').length != 0 ){
								
								self.frames.filter('[data-frame="'+index+'"]').fadeIn(self.transitionSpeedFrame);
								break;
							}
							
							// if there is no frame attribute and no action - we defer to the array index
							$(self.frames[index]).fadeIn(self.transitionSpeedFrame);
						
						break;
						
						case 'rewind':
						
							// check if action exists
							if( self.actions[self.currentSlide] != undefined && self.actions[self.currentSlide][self.currentFrame] != undefined ){
								// play that action
								self.actions[self.currentSlide][self.currentFrame][1]();
								break;
							}
						
							// check frame attribute
							if( self.frames.filter('[data-frame="'+index+'"]').length != 0 ){
								
								self.frames.filter('[data-frame="'+index+'"]').fadeOut(self.transitionSpeedFrame);
								break;
							}
							
							// if there is no frame attribute and no action - we defer to the array index
							$(self.frames[index]).fadeOut(self.transitionSpeedFrame);
							
						break;
					}
					
				break;
			}
			
		}
			
		this.onEnd = function(){
			
			// remove the setInterval
			window.clearInterval(self.intervalID);

			// fade out last slide
			self.slides.eq(self.slides.length-1).fadeOut(2000, function(){

				// show end slide
				$('.slideshow .end-slide').fadeIn(2000, function(){
					// show the rest of the content
					$.awd6.utility.unlockPresentation();

				});

			});
		}

		this.slideInLeft = function( speed, endHandler ){

		}
			
		this.rewindFrom = function( index ){
			
			self.frames.filter('[data-frame="'+index+'"]').fadeOut(self.transitionSpeed);
			
			// if there is no frame like this - we defer to the array index
			if( self.frames.filter('[data-frame="'+index+'"]').length == 0 ){ 
				$(self.frames[index]).fadeOut(self.transitionSpeed); 
			}
		}

		this.onStart = function(){

		}
			
		this.onScroll = function(e, delta){
			
			if( !self.firstScrollHappened ){
				
				// remove the scroll handle
				$('#content').removeClass('fake-length');
				self.firstScrollHappened = true;
			}

			if( self.pauseScroller ) return;
			
			
			// if the scroll is down play, otherwise rewind
			// we also increment or decrement the index of the array
			var type = '';
			
			if( delta < 0 ){ 
				
				// check bounds of frames
				if(self.currentFrame+1 > self.frames.length){
					
					// if outside we change slide
					
					// check bounds of slides
					if( self.currentSlide+1 >= self.slides.length ){
						self.onEnd();
						return;
					} 
					
					// we grab frames from next slide and reset current frame
					self.currentSlide++;
					self.currentFrame = 0;
					self.frames = $(self.slides[self.currentSlide]).find('.frame');
					type = 'slide';
					
					self.playTo(self.currentSlide, 'play', type); 
				
				}else{
					
					// if inside of bounds we change frame
					type = 'frame';
					self.playTo(self.currentFrame, 'play', type); 
						
					self.currentFrame++;
				}
				
			}else{
				
				
				
				// check bounds of frames
				if(self.currentFrame-1 < 0 ){
					
					// if outside we change slide
					
					// check bounds of slides
					if( self.currentSlide-1 < 0 ){
						self.onStart();
						return;
					} 
					
					// we grab frames from next slide and reset current frame
					self.currentSlide--;
					self.frames = $(self.slides[self.currentSlide]).find('.frame');
					self.currentFrame = self.frames.length-1;
					type = 'slide';
					
					self.playTo(self.currentSlide, 'rewind', type); 
				
				}else{
					
					// if inside of bounds we change frame
						
					type = 'frame';
					self.currentFrame--;
					self.playTo(self.currentFrame, 'rewind', type); 
				}
				
				
			}		
		},
			
		init.apply(this);
	}


})();