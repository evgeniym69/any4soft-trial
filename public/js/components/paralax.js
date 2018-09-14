import anime from 'animejs'

class Animated {
	constructor(){
		this.el = _$('.fx-third-flour');
		this.elMap = _$('.fx-five-flour__marp-placeholder');
		this.buttonToSmoth = _$('.fx-scrolling-to-footer');
		this.img = 675;
		this.setClass = true;

		this.setSVGAnimation();

		window.addEventListener('scroll', ::this.animatedEvent)
		this.buttonToSmoth.addEventListener('click', ::this.smothScrollToElement)
	}

	setSVGAnimation(){
			let figure = anime({
			  targets: '.fx-poly-graph .polymorph',
			  points: [
			    { value: '0 300, 330 250, 755 300, 1315 180, 1920 300, 1920 450, 0 450', duration: 1000, delay: 4000 },
			    { value: '0 245, 330 315, 755 200, 1315 260, 1920 0, 1920 450, 0 450', duration: 1000, delay: 4000 },
			  ],
			  easing: 'easeOutQuad',
			  direction: 'start',
			  loop: true
			}),
			line = anime({
			  targets: '.fx-poly-graph .pline',
			  points: [
			    { value: '0 400, 330 330, 755 400, 1300 280, 1920 400', duration: 1000, delay: 4000 },
			    { value: '0 400, 330 450, 755 295, 1300 370, 1920 40', duration: 1000, delay: 4000 },
			  ],
			  easing: 'easeOutQuad',
			  direction: 'start',
			  loop: true
			});
	}

	smothScrollToElement(event){
		if(!event && !event.target && !event.target.getAttribute('href')) return;

		event.preventDefault();

		this.doScrolling(event.target.getAttribute('href'), 1000);

	}

	doScrolling(element, duration) {
		let startingY = window.pageYOffset,
			elementY = window.pageYOffset + document.querySelector(element).getBoundingClientRect().top,
			targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY,
			diff = targetY - startingY,
			easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
			start;

	  	if (!diff) return
		// Bootstrap our animation - it will get called right before next frame shall be rendered.
		window.requestAnimationFrame(function step(timestamp) {
	    if (!start) start = timestamp
	    // Elapsed miliseconds since start of scrolling.
	    var time = timestamp - start
			// Get percent of completion in range [0, 1].
	    var percent = Math.min(time / duration, 1)
	    // Apply the easing.
	    // It can cause bad-looking slow frames in browser performance tool, so be careful.
	    percent = easing(percent)

	    window.scrollTo(0, startingY + diff * percent)

		// Proceed with animation as long as we wanted it to.
	    if (time < duration) {
	      window.requestAnimationFrame(step)
	    }
	  })
	}


	animatedEvent(){

		let dh = document.documentElement.clientHeight;

		if(this.elMap.getBoundingClientRect().top - dh < 0 && this.setClass){
			this.setClass = false;
			this.elMap.classList.add('animated');
		}

		if(this.el.getBoundingClientRect().top - dh < 0){
			let height = this.el.getBoundingClientRect().top - dh;

			if(-height == this.img*1.5 || this.img*1.5 < -height) return;

			this.el.style.cssText += "background-position-y: " + (height*0.4) + "px";
		}

	}

}

export default Animated;
