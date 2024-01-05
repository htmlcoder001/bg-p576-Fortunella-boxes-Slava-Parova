jQuery(document).ready(function($){

	
	////////// 	CHECK MEDIA QUERIES
	function checkMQ() {
		return window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}



	////////// MISSBLOOM APP
	var App = {





		// /******************************************************************************* 
		//
		//	 STICKY HEADER
		//
		// *******************************************************************************/
		stickyHeaderFn: function(){
			
			var stickyHeader = $('header .inner').stick_in_parent({
				parent: "body",
				spacer: ".header-spacer",
				//inner_scrolling: false 
			});
		
		},






		// /******************************************************************************* 
		//
		//	 STICKY KIT
		//
		// *******************************************************************************/
		stickySidebarFn: function(){
			
			var mediaQueries = checkMQ();
			var stickyRight = $('.sticky__container .right');
			stickyRight.each(function() {
				if (mediaQueries == 'desktop'){
					$(this).stick_in_parent({
						offset_top: 75, 
						inner_scrolling: false,
						spacer: ".sticky-spacer",
						parent: ".sticky__container"
					});
				} else if (mediaQueries == 'tablet') {
					$(this).trigger("sticky_kit:detach");
					TweenMax.set($('.sticky__container .sticky-spacer'), {clearProps: "all"});
				}
			});
			
			// About Page
			$('.about__container .cover').each(function() {
				if (mediaQueries == 'desktop'){
					$(this).stick_in_parent({
						offset_top: 56, 
						inner_scrolling: false,
						parent: ".about__container"
					});
				} else if (mediaQueries == 'tablet') {
					$(this).trigger("sticky_kit:detach");
					TweenMax.set($('.about__container .cover'), {clearProps: "all"});
				}
			});
		
		},






		// /******************************************************************************* 
		//
		//	 BURGER MENU LINES ANIMATION ON HOVER
		//
		// *******************************************************************************/
		burgerHoverFn: function() {
			
			var burger = $('.burger'),
				primaryLines = burger.find('.line.primary'),
				secondaryLines = burger.find('.line.secondary'),
				burgerTl = new TimelineMax({paused:true, reversed: true, onReverseComplete: clearAll})
					.staggerTo(primaryLines, 0.3, 
						{x: '100%', y: "-50%", transformOrigin: "50% 50%", ease:Power2.easeOut}, 0.08)
					.staggerTo(secondaryLines, 0.3, 
						{x: '0%', y: "-50%", transformOrigin: "50% 50%", ease:Power2.easeOut}, 0.08, 0.1);

			burger.animation = burgerTl;
			burger.hover(burgerOver, burgerOut);
			function burgerOver(){ 
				burger.animation.play();
			}
			function burgerOut(){ 
				burger.animation.reverse();
			}
			function clearAll() {
				TweenMax.set([primaryLines, secondaryLines], {clearProps: "all"});
			}
		
		},





		// /******************************************************************************* 
		//
		//	 SIDE NAVIGATION 
		//
		// *******************************************************************************/
		sideNavigationFn: function() { 
			
			var triggerNav = $('header .burger'),
				navigationPopup = $('.navigation__popup'),
				navigationInner = navigationPopup.find(".inner"),
				navigationLinks = navigationInner.find('.navigation li a'),
				overlay = $('.overlay'),
				closeButton = $(".close__button"),
				closeButtonLinesFn = closeButton.find('.line');
			
			// For hover effect
			navigationLinks.each(function() {
				var dataText = $(this).text();
				$(this).attr('data-text', dataText);
			});
			
			// Overlay Tl
			var overlayTl = new TimelineMax()
				.to(overlay, 0.3, {autoAlpha: 1, ease:Power2.easeOut});
			
			// Navigation Inner Tl
			var navigationInnerTl = new TimelineMax()
				.to([navigationPopup, navigationInner], 0.4, {y: "0%", ease: Expo.easeOut})
				.set(navigationLinks, {className: "+=active"});

			// Close Button Tl
			var closeTl = new TimelineMax()
				.staggerTo(closeButtonLinesFn, 0.5, {
					y:'0', 
					x: "0",
					autoAlpha: 1, 
					transformOrigin: "50% 50%", 
					ease: Back.easeOut.config(1.7)}, 0.08);

			// Master Navigation Timeline
			var navigationTl = new TimelineMax({paused: true, reversed: true, onStart: closeNav})
				.set(navigationPopup, {className: "+=active"})
				.set(closeButton, {className:"+=left"})
				.set(closeButton, {className:"+=white"})
				.set(closeButton, {className: "+=active"})
				.set(overlay, {className: "+=active"})
				// Add Timelines here
				.add(overlayTl)
				.add(navigationInnerTl)
				.add(closeTl);

			// Open Navigation 
			triggerNav.on("click", function(event) {
				event.preventDefault();
				navigationTl.play();
			});

			// Close Nav Function
			function closeNav(){
				$('.close__button button, .overlay').click(function(event){
					event.preventDefault();
					navigationTl.reverse();
				});
				document.addEventListener('keyup', function(e){ 
					if(e.which == 27 ){
						navigationTl.reverse();
					 }
				});
			}
		},











		// /******************************************************************************* 
		//
		//	 MAIN BUTTON LINES
		//
		// *******************************************************************************/
		buttonLinesFn: function() {
			
			$('*[class^="button"]').each(function(){
				var button = $(this),
					lineTop = $('<span class="line__top"/>').appendTo(this),
					lineBottom = $('<span class="line__bottom"/>').appendTo(this),
					lineLeft = $('<span class="line__left"/>').appendTo(this),
					lineRight = $('<span class="line__right"/>').appendTo(this),
					linesTl = new TimelineMax({paused:true, reversed: true})
						.to([lineTop, lineBottom], 0.3, 
							{width: '100%', ease:Power2.easeOut})
						.to([lineLeft, lineRight], 0.3, 
							{height: '100%', ease:Power2.easeOut}, 0.4);

				button.animation = linesTl;
				button.hover(buttonOver, buttonOut);
				function buttonOver(){ 
					button.animation.play();
				}
				function buttonOut(){ 
					button.animation.reverse();
				}
			});

		},





		// /******************************************************************************* 
		//
		//	 HERO SLIDER
		//
		// *******************************************************************************/
		heroSliderFn: function() {

			var hero = $('.hero'),
				heroSlider = $('.hero__slider'),
				prevArrow = hero.find('.slick__prev'),
				nextArrow = hero.find('.slick__next');


			// Set Elements on Init
			heroSlider.on('init', function(event, slick) {
				var slideItem = $('.hero__slider .slick-slide .item')
				var slidesContent = $('.hero__slider .slick-slide .item .content');
				var currentSlideContent = $('.hero__slider .slick-slide.slick-current .item .content');
				var slideImageHeight = $('.hero__slider .slick-slide.slick-current .item .image').height();

				TweenMax.set(slideItem, {perspective:800});
				TweenMax.set(slidesContent, {autoAlpha: 0, rotationX:20, yPercent: 20, transformStyle:"preserve-3d"});
				TweenMax.set(currentSlideContent, {autoAlpha: 1, rotationX: 0, yPercent: 0});
				
				TweenMax.delayedCall(1, function(){
					TweenMax.set([prevArrow, nextArrow], {height: slideImageHeight});
					TweenMax.to([prevArrow, nextArrow], 0.3, {autoAlpha:1, ease: Power2.easeOut});
				});

			});

			// Repositioning Arrows on windoe resize
			$( window ).resize(function() {
				TweenMax.delayedCall(1, function(){
					var imageHeight = $('.hero__slider .slick-slide.slick-current .item .image').outerHeight();
					TweenMax.to([prevArrow, nextArrow], 1, { height: imageHeight, ease: Power2.easeOut });
				});
			});
	

			heroSlider.slick({
					centerMode: true,
					centerPadding: '480px',
					slidesToShow: 1,
					slidesToScroll: 1,
					dots:true,
					autoplay: true,
					autoplaySpeed: 4000,
					prevArrow: prevArrow,
					nextArrow: nextArrow,
					lazyLoad: 'ondemand',
					responsive: [
						{
							breakpoint: 1700,
							settings: {
								centerPadding: '320px'
							}
						},
						{
							breakpoint: 1170,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								centerMode: false,
								autoplay: false,
								adaptiveHeight: true,
								centerPadding: '0px'
							}
						}
					]
				});


                        //Slide Effects
                        var mediaQueries = checkMQ();
                        heroSlider.on('afterChange', function(event, slick, currentSlide) {
                                var currentSlideContent = $('.hero__slider .slick-slide.slick-current .item .content');
                                var slidesContent = $('.hero__slider .slick-slide .item .content');
                                if (mediaQueries == "desktop") {
                                        TweenMax.to(slidesContent, 1, {autoAlpha:0, rotationX: 40, yPercent: 40,        ease: Power2.easeOut});
                                        TweenMax.fromTo(currentSlideContent, 1,
                                                {autoAlpha:0, rotationX: 40, yPercent: 40},
                                                {autoAlpha:1, rotationX:0, yPercent: 0, transformOrigin: "50% 50%", ease:Back.easeOut}
                                        );
                                } else if (mediaQueries == "tablet") {
                                        TweenMax.set([slidesContent, currentSlideContent],  {autoAlpha:1, rotationX: 0, yPercent: 0, ease: Power2.easeOut});
                                }
                        });
		},





		// /******************************************************************************* 
		//
		//	 ITEM SLIDER	( EXAMPLE SHOPPING PAGE E-SHOPS )
		//
		// *******************************************************************************/
		popularSliderFn: function() {

			var itemSlider = $('.item.item__slider'),
				slider = itemSlider.find('.slider'),
				controls = itemSlider.find('.slider__title .controls'),
				prevArrow = controls.find('.slick__prev'),
				nextArrow = controls.find('.slick__next');

			// Slider Settings
			slider.slick({
				infinite: false,
				slidesToShow:2,
				slidesToScroll:2,
				dots: false,
				autoplay: false,
				pauseOnHover: true,
				prevArrow: prevArrow,
				nextArrow: nextArrow,
				lazyLoad: 'ondemand',
				responsive: [
					{
						breakpoint: 670,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},





		// /******************************************************************************* 
		//
		//	 ARTICLE PAGE SLIDER	
		//
		// *******************************************************************************/
		articleSliderFn: function() {

			var mediaQueries = checkMQ();
			var articlePage = $('#main section.article'),
				articleSlider = articlePage.find('.slider'),
				controls = articlePage.find('.controls'),
				prevArrow = controls.find('.slick__prev'),
				nextArrow = controls.find('.slick__next');

			// Slider Settings
			articleSlider.slick({
				infinite: true,
				slidesToShow:1,
				slidesToScroll:1,
				adaptiveHeight: true,
				dots: false,
				autoplay: false,
				pauseOnHover: true,
				prevArrow: prevArrow,
				nextArrow: nextArrow,
				lazyLoad: 'ondemand',
			});

			 articleSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			 	//ga('send', 'pageview', window.location.href ); 
			 	//ga('send', 'event', 'Gallery', 'Slide Change' );
			 	googletag.pubads().refresh();
				//if (typeof slot23 !== 'undefined') {
			 		// googletag.pubads().refresh([ slot23, slot24, slot11, slot12, slot13, slot1, slot2, slot3, slot4, slot21, slot22 ]);
				//}
			 	if (mediaQueries == "desktop") {
					jQuery(document.body).trigger("sticky_kit:recalc");
			 	}  
			 });

			 articleSlider.on('afterChange', function(event, slick, currentSlide, nextSlide) {

				var rootUrl = window.location.href.indexOf( 'attachment/' ) > -1 ?  window.location.href.substring( 0, window.location.href.indexOf( 'attachment/' ) ) : window.location.href;
				rootUrl = rootUrl.match(/[?#]/) ? rootUrl.split(/[?#]/)[0] : rootUrl;
				var historyState = slick.slickCurrentSlide() == 0 ? rootUrl :  rootUrl+ '?gallery-photo='+ slick.slickCurrentSlide() ; 
				//history.pushState({}, "", historyState);
				history.replaceState({}, "", historyState);
				var originalTitle = document.title.split(' -');
				document.title = originalTitle[0] + ' - Gallery Photo ' + slick.slickCurrentSlide() + ' - Missbloom.gr';

				//googletag.pubads().refresh();
				//jQuery(document.body).trigger("sticky_kit:recalc");
				//var gallery_ph = document.location;
				//console.log( 'position: ' + gallery_ph );

				ga('send', 'pageview', window.location.href ); 
				ga('send', 'event', 'Gallery', 'Slide Change' );

				var gallery_ph = document.location;
				pp_gemius_extraparameters = new Array('gallery-photo='+ slick.slickCurrentSlide() );
				// pp_gemius_hit( 'zZqQoqrAo4KkH1rDeDh5XqcTTKOIiOyDgWPx4_XiY83.c7' );
				//console.log( 'position: ' + gallery_ph );



			 	if (mediaQueries == "tablet") {
			 		App.responsiveAdsFn();
			 		TweenMax.delayedCall(1.5, function(){
			 			App.responsiveAdsFn();
			 		});
				 }
			 });

		},





		// /******************************************************************************* 
		//
		//	 GALLERY PAGE SLIDER 
		//
		// *******************************************************************************/
/*
		gallerySliderFn: function() {

			var mediaQueries = checkMQ();
			var gallery = $('.gallery__content'),
				gallerySlider = gallery.find('.gallery__slider'),
				pager = gallery.find('.pager'),
				trigger = gallery.find('.intro .trigger'),
				galleryLength = gallerySlider.find('.slick-slide').length,
				prevArrow = gallery.find('.slick__prev'),
				nextArrow = gallery.find('.slick__next'),
				current = 0;

			// Set Elements on Init
			gallerySlider.on('init', function(slick, currentSlide) {
				
				trigger.find('span').html((galleryLength - 1) + ' photos');
				trigger.click(function() {
					$('.gallery__slider').slick('slickGoTo', 1);
				});
				pager.html("<span>" + slick.currentSlide + "</span>" + "<span>" + 'of' + "</span>" + "<span>" + (slick.slideCount - 1) + "</span>");

			});

			// Slider Settings
			gallerySlider.slick({
				infinite: true,
				slidesToShow:1,
				slidesToScroll:1,
				dots: false,
				arrows: true,
				autoplay: false,
				pauseOnHover: true,
				lazyLoad: 'ondemand',
				prevArrow: prevArrow,
				nextArrow: nextArrow,
				fade: true,
				cssEase: 'linear'
			});
		
			 gallerySlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
				googletag.pubads().refresh();
			 	if (mediaQueries == "desktop") {
					jQuery(document.body).trigger("sticky_kit:recalc");
				}
			 });

			// Hide Arrows On First Slide and Pager
			gallerySlider.on('afterChange', function(event, slick, currentSlide, nextSlide) {

				pager.html("<span>" + slick.currentSlide + "</span>" + "<span>" + 'of' + "</span>" + "<span>" + (slick.slideCount - 1) + "</span>");

				var rootUrl = window.location.href.indexOf( 'attachment/' ) > -1 ?  window.location.href.substring( 0, window.location.href.indexOf( 'attachment/' ) ) : window.location.href;
				rootUrl = rootUrl.match(/[?#]/) ? rootUrl.split(/[?#]/)[0] : rootUrl;
				var historyState = slick.slickCurrentSlide() == 0 ? rootUrl :  rootUrl+ '?gallery-photo='+ slick.slickCurrentSlide() ; 
				//history.pushState({}, "", historyState);
				history.replaceState({}, "", historyState);
				var originalTitle = document.title.split(' -');
				document.title = originalTitle[0] + ' - Gallery Photo ' + slick.slickCurrentSlide() + ' - Missbloom.gr';

				//googletag.pubads().refresh();
				//jQuery(document.body).trigger("sticky_kit:recalc");
				//var gallery_ph = document.location;
				//console.log( 'position: ' + gallery_ph );

				ga('send', 'pageview', window.location.href ); 
				ga('send', 'event', 'Gallery', 'Slide Change' );
				var ATtag = new ATInternet.Tracker.Tag();
				ATtag.page.send({ name:'' });


				if(currentSlide > 0) {
					TweenMax.set([prevArrow,nextArrow,pager], {className: "+=active"})
				} else (
					TweenMax.set([prevArrow,nextArrow,pager], {className: "-=active"})
				)

			});
		},
*/





		// /******************************************************************************* 
		//
		//	 SLIDER CONTROLS LINE ANIMATION
		//
		// *******************************************************************************/
		sliderControlsFn: function() {
			
			$('.controls').each(function(index, element) {
				var line = $(this).find("span.line"),
					prevArrow = $(this).find('.slick__prev').hover(lineLeft, lineCenter),
					nextArrow = $(this).find('.slick__next').hover(lineRight, lineCenter);
				function lineLeft() { TweenMax.to(line, 0.6, {x: "-100%", width: "22px", transformOrigin: "50% 50%", ease: Expo.easeOut}); }
				function lineRight() { TweenMax.to(line, 0.6, {x: "100%", width: "22px",	transformOrigin: "50% 50%", ease: Expo.easeOut}); }
				function lineCenter() { TweenMax.to(line, 0.6, {x: "0%", width: "17px",	transformOrigin: "50% 50%", ease: Back.easeOut}); }
			});
		
		},





		// /******************************************************************************* 
		//
		//	 BLOGGERS
		//
		// *******************************************************************************/
		bloggersSliderFn: function() {

			var mediaQueries = checkMQ();
			var bloggerItem = $('.bloggers__grid').find('.blogger__item');
			var bloggersNav = $('.bloggers__nav ul');
			var bloggersNavWidth = bloggersNav.width();
			var bloggersNavHeight = bloggersNav.height();
			var animatedCircle = $(".svg__circle .animated__circle");


			if (mediaQueries == "desktop") {

				function createThumbs() {
					var html = "";
					bloggerItem.each(function (index, item) {
						var image = $(item).find(".image img");
						if (image) {
							html += "<li>";
							html += "<a>";
							html += "<img src=\"" + image.attr("src") + "\" \/>";
							html += "<\/a>";
							html += "<\/li>";
						}
						// Add Data attribute to blogger items
						$(this).attr('data-blogger', $(this).index() + 1);
					});
					if (html.length > 0) {
						bloggersNav.html(html);
					}
					TweenMax.set(bloggerItem.first(), {className: "+=active"});
					setThumbs();
				}
				createThumbs();

				function setThumbs() { 
					var bloggersLinks = $('.bloggers__nav ul li');
					var angle = 0;
					var step = ( 2 * Math.PI ) / bloggersLinks.length;
					var radius = bloggersNavWidth / 2;

					// Arrange bloggers nav around circle
					bloggersLinks.each(function() {
						var x = Math.round(bloggersNavWidth / 2 + radius * Math.sin(angle) - $(this).width() / 2 );
						var y = Math.round(bloggersNavHeight / 2 + radius * Math.cos(angle) - $(this).height() / 2 );
						TweenMax.set($(this), { left: x + "px", bottom: y + "px"});
						$(this).find('a').attr('data-blogger', $(this).index() + 1);
						angle += step;
					});
					TweenMax.set(bloggersLinks.first().find('a'), {className: "+=active"});
					TweenMax.to(animatedCircle, 0.3, {drawSVG:"0%"});

				
					// Change Blogger On click Nav li
					function bloggerSlider(bloggerIn, bloggerOut, bloggerAttr) {
						var animatedCircleLenght = $(".svg__circle .animated__circle")[0].getTotalLength();
						var bloggersNavLenght = bloggersLinks.length;
						var newNavLen = animatedCircleLenght / bloggersNavLenght * (bloggerAttr - 1);
						var bgCircles = $('.circles__bg .circle');
						var bloggersTl = new TimelineMax()
							.to(bloggerOut, 0.5, {scale: 0.7, x: '-50%', y: "-50%", transformOrigin: "50% 50%", autoAlpha: 0, ease: Power2.easeOut})
							.set(bloggerOut, {className:"-=active"})
							.set(bloggerIn, {className:"+=active"})
							.fromTo(bloggerIn, 0.5, 
								{scale: 0.7, x: '-50%', y: "-50%", transformOrigin: "50% 50%", autoAlpha: 0, ease: Power2.easeOut},
								{scale: 1, x: '-50%', y: "-50%", transformOrigin: "50% 50%", autoAlpha: 1, ease: Back.easeOut})
							.to(animatedCircle, 1, {drawSVG: newNavLen, ease: Power2.easeOut}, 0.3);
						var bgCircles = new TimelineMax()
							.to(bgCircles, 0.5, {scale: 0.85, x: '-50%', y: "-50%", transformOrigin: "50% 50%", ease: Power2.easeOut})
							.staggerTo(bgCircles, 0.5, {scale: 1, x: '-50%', y: "-50%", transformOrigin: "50% 50%", ease: Back.easeOut}, 0.08);
					}

					bloggersLinks.on("click", "a", function() {
						var bloggerAttr = $(this).attr("data-blogger"),
							bloggerNumber = $(this).data('blogger'),
							selectedBlogger = $('.bloggers__grid').find('.blogger__item[data-blogger="'+ bloggerNumber +'"]'),
							bloggerOut = $('.bloggers__grid').find('.blogger__item.active'),
							bloggerIn = selectedBlogger;

						bloggersLinks.find('a').removeClass("active");
						$(this).addClass("active");
						bloggerSlider(bloggerIn, bloggerOut, bloggerAttr);
					});
				}
			} else if(mediaQueries == "tablet") {
				TweenMax.set(bloggerItem, {clearProps: "all", className: "-=active"})
				TweenMax.set($('.circles__bg .circle'), {clearProps: "all"})
			}
		},






		// /******************************************************************************* 
		//
		//	 Category Topics
		//
		// *******************************************************************************/
		categoryTopicsFn: function() {
			
			var topics = $('.category__topics');
			var triggerTopics = topics.find('.trigger__topics'),
				topicsCont = topics.find('ul');

				triggerTopics.on('click', function( event ) {
					event.preventDefault();
					topicsCont.toggleClass('active');
				});
		},





		// /******************************************************************************* 
		//
		//	 MENU 3D ( FUNCTION FOR Article Page )
		//
		// *******************************************************************************/
		menu3dFn: function() {
			
			var mediaQueries = checkMQ();
			var menu = $('section#menu');
			var menuInner = menu.find('.inner');
			var menuInnerWidth = menuInner.width();
			var menu3d = $('.menu__3d');
			var leftMover = menu3d.find('.left__mover');
			var rightMover = menu3d.find('.right__mover');
			var leftInnerMenu = leftMover.find('.inner__menu');
			var rightInnerMenu = rightMover.find('.inner__menu');

			var addClassTreshold = 0.1;
			var opts = {
				scale: { range: 0.4, min: 0.7 },
				translate3d_1: { amplitude: 50 },
				opacity: { range: 1, min: 0.4 },
				blur: { range: 10, offset: -5 },
				translate3d_2: { amplitude: 80, offset: 100 }
			}

			function clamp(num, min, max) {
				return Math.max(min, Math.min(num, max));
			}

			function mouseMoveHandler(e) {
				var x = e.pageX || ($(window).width() / 2);
				var xCentered = x	- (menuInnerWidth / 2);
				var xNormalized = xCentered / (menuInnerWidth / 2);
				var xClamped = clamp(xNormalized, -1, 1);
				apply3dEffect(xClamped);
			}

			function apply3dEffect(x) {
				// Vars
				var xPower = Math.pow(x, 2);
				var innerPosition = ( xPower * opts.translate3d_2.amplitude) - opts.translate3d_2.offset;
				var moverPosition = xPower * opts.translate3d_1.amplitude;
				TweenLite.set([leftMover,rightMover],{transformOrigin:"50% 50%"});
				
				TweenLite.to(leftMover, 0.3, { scale: + ((((-x + 1) / 2) * opts.scale.range) + opts.scale.min), x: moverPosition, ease:Power2.easeOut});
				TweenLite.to(rightMover, 0.3, { scale: + ((((x + 1) / 2) * opts.scale.range) + opts.scale.min), x: -moverPosition, ease:Power2.easeOut});
				
				TweenLite.set(leftInnerMenu, { x: innerPosition, y: "-50%", z: 0 });
				TweenLite.set(rightInnerMenu, { x: -innerPosition, y:"-50%", z: 0 });
				if (x < - addClassTreshold) {
					TweenLite.to(leftInnerMenu.find('h4'), 1, {height: "120px", autoAlpha: 1, ease:Power2.easeOut});
				} else if (x > addClassTreshold) {
					TweenLite.to(rightInnerMenu.find('h4'), 1, {height: "120px", autoAlpha: 1, ease:Power2.easeOut});
				} else {
					TweenLite.to(rightInnerMenu.find('h4'), 1, {height: "0px", autoAlpha: 0, ease:Power2.easeOut});
					TweenLite.to(leftInnerMenu.find('h4'), 1, {height: "0px", autoAlpha: 0, ease:Power2.easeOut});
				}
			}

			function resetStyles() {
				TweenMax.set(leftMover, {clearProps: "all"});
				TweenMax.set(rightMover, {clearProps: "all"});
				TweenMax.set(leftInnerMenu, {clearProps: "all"});
				TweenMax.set(rightInnerMenu, {clearProps: "all"});
			}

			if (mediaQueries == "desktop") {
				var menuWidth;
				menu3d.mousemove(function(e) {
					mouseMoveHandler(e);
				});
			} else if (mediaQueries == "tablet") {
				menu3d.off('mousemove');
				resetStyles();
			}

			menu3d.mousemove();
		
		},





		// /******************************************************************************* 
		//
		//	 FIX ARTICLES IMAGES ( VERTICAL CLASS )
		//
		// *******************************************************************************/
		articleImagesFn: function(){
			var articleContent = $( '.article__content' );
			var articleImages = articleContent.find( 'img' ).each( function() { 
				var imageWidth = $(this).outerWidth();
				var imageHeight = $(this).outerHeight();
				$(this).parent().not('a').addClass('image');
				if ( imageHeight > imageWidth ) {
					TweenMax.set($(this).parent(), { className:'+=vertical' });
				}
			});

			var wpCaption = articleContent.find( '.wp-caption' ).each( function() {
				TweenMax.set( $(this), { width:'100%' } );
			} );
			
		},




		// /******************************************************************************* 
		//
		//	 TABS
		//
		// *******************************************************************************/
		tabsFn: function() {
			var tabs = $('.tabs');
			tabs.each(function(){
				var tab = $(this),
					tabNavigation = tab.find('.tabs__nav li'),
					tabContentWrapper = tab.children('.tabs__contents');
				
				tabNavigation.on('click', 'a', function(event){
					event.preventDefault();
					var selectedItem = $(this);
					if( !selectedItem.hasClass('active') ) {
						
						var selectedTab = selectedItem.data('content'),
							selectedContent = tabContentWrapper.find('.tab__content[data-content="'+ selectedTab +'"]');
						
						tabNavigation.find('a.active').removeClass('active');
						selectedItem.addClass('active');
						selectedContent.addClass('active').siblings('.tab__content').removeClass('active');
					}
				});
			});
		},



		// /******************************************************************************* 
		//
		//	 RESPONSIVE IFRAMES
		//
		// *******************************************************************************/
		responsiveAdsFn: function() {

			var mediaQueries = checkMQ();
			var advBanners = $('section.banner, header .banner').each(function(index, el) {
				
				var sectionBanner = $(this);
				var sectionHeight = sectionBanner.outerHeight();
				var container = $(this).find('.advert');
				var advWidth = container.innerWidth();
				var advHeight = container.innerHeight();
				var iframe = container.find('iframe');
				var iframeWidth = iframe.width();
				var iframeHeight = iframe.height();

				// Responsive banners
				var baseBanner = {
					width: iframeWidth,
					height: iframeHeight,
					scale: 1
				};

				if (mediaQueries == "desktop") {
					TweenMax.set(sectionBanner, { height: "auto" });
					if (iframe.length > 0) {
						TweenMax.set([iframe, container], { clearProps: "all" });				
					} 
				} else if ( mediaQueries == "tablet" && iframe.length > 0 ) {
					scaleBanner(iframe, advWidth, advHeight);
				}
				
				function scaleBanner(iframe, maxWidth, maxHeight) {						
					var scaleX = 1;
					var scaleY = 1;											
					scaleX = maxWidth / baseBanner.width;
					scaleY = maxHeight / baseBanner.height;
					baseBanner.scaleX = scaleX;
					baseBanner.scaleY = scaleY;
					baseBanner.scale = (scaleX > scaleY) ? scaleY : scaleX;
					
					TweenMax.set(iframe, {
						scale: baseBanner.scale,
						transformOrigin: "left top",
						onComplete: setIframe
					});
				}

				function setIframe() {
					TweenMax.to(sectionBanner, 0.3, { delay: 0.5, height: Math.round((baseBanner.height * baseBanner.scale) + 48) });
					TweenMax.to(container, 0.5, { autoAlpha: 1 });
				}
		
			});
		},


		// /******************************************************************************* 
		//
		//	 Big Category Titles
		//
		// *******************************************************************************/
		categoryTitlesFn: function(){
			var title = $('.category__title .title h1');
			if (title && title.outerWidth() >= 600 ) {
				title.addClass('big');
			}
		},


		// /******************************************************************************* 
		//
		//	 SwipeBox
		//
		// *******************************************************************************/
		swipeboxFn: function(){
			$( '.swipebox' ).swipebox();
		},



	}// App



	document.App = App;


	////////// RUN FUNCTIONS
	App.stickyHeaderFn();
	App.heroSliderFn();
	App.stickySidebarFn();
	App.bloggersSliderFn();
	App.burgerHoverFn();
	App.sliderControlsFn();
	App.popularSliderFn();
	App.triggerSearchFn();
	App.sideNavigationFn();
	App.buttonLinesFn();
	App.categoryTopicsFn();
	//App.menu3dFn();
	//App.gallerySliderFn();
	App.articleSliderFn();
	App.articleImagesFn();
	App.tabsFn();
	App.categoryTitlesFn();
	App.swipeboxFn();
	


	////////// RUN FUNCTIONS ON RESIZE
	var timeOut = null;
	window.onresize = function(){
		if (timeOut != null)
			clearTimeout(timeOut);
			timeOut = setTimeout(function(){
				// MEDIA QUERIES
				var mediaQueries = checkMQ();
				App.stickySidebarFn();
				App.bloggersSliderFn();
				App.menu3dFn();
				App.responsiveAdsFn();
			}, 500);
	};





}); // jQuery
