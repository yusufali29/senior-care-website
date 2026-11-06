(function ($) {
	"use strict";

	if (typeof gsap === "undefined") {
		return;
	}

	gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

	/* ================================
		Smooth Scroller Js Start
	================================ */

	if ($("#smooth-wrapper").length && $("#smooth-content").length) {
		gsap.config({
			nullTargetWarn: false
		});

		ScrollSmoother.create({
			wrapper: "#smooth-wrapper",
			content: "#smooth-content",
			smooth: 2,
			effects: true,
			smoothTouch: 0.1,
			normalizeScroll: false,
			ignoreMobileResize: true
		});
	}

	/* ================================
		Text Title Animation Js Start
	================================ */

	function animateChars(selector, fromOpacity, fromX, start, splits) {
		$(selector).each(function (index, el) {
			var split = new SplitText(el, {
				type: "lines,words,chars",
				linesClass: "split-line"
			});

			splits.push(split);

			gsap.set(split.chars, {
				opacity: fromOpacity,
				x: fromX
			});

			gsap.to(split.chars, {
				scrollTrigger: {
					trigger: el,
					start: start,
					end: "top 60%",
					scrub: 1
				},
				x: 0,
				opacity: 1,
				duration: 0.7,
				stagger: 0.2
			});
		});
	}

	gsap.matchMedia().add("(min-width: 1200px)", function () {
		var splits = [];

		animateChars(".tz-sub-tilte", 0, 7, "top 90%", splits);
		animateChars(".tz-itm-title", 0.3, -7, "top 92%", splits);

		ScrollTrigger.refresh();

		return function () {
			splits.forEach(function (split) {
				split.revert();
			});
			ScrollTrigger.getAll().forEach(function (trigger) {
				trigger.kill();
			});
		};
	});

	/* ================================
		Char Animation Js Start
	================================ */

	gsap.utils.toArray(".char-animation").forEach(function (el) {
		var tl = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				start: "top 90%",
				end: "bottom 60%",
				scrub: false,
				markers: false,
				toggleActions: "play none none none"
			}
		});

		var itemSplitted = new SplitText(el, { type: "chars, words" });

		gsap.set(el, { perspective: 300 });
		tl.from(itemSplitted.chars, {
			duration: 1,
			delay: 0.5,
			x: 100,
			autoAlpha: 0,
			stagger: 0.05
		});
	});

	/* ================================
		Service Panel Js Start
	================================ */

	gsap.matchMedia().add("(min-width: 1199px)", function () {
		var tl = gsap.timeline();
		var baseOffset = 50;
		var offsetIncrement = 10;

		document.querySelectorAll(".tp-service-panel").forEach(function (section, index) {
			var topOffset = baseOffset + (index * offsetIncrement);

			tl.to(section, {
				scrollTrigger: {
					trigger: section,
					pin: section,
					scrub: 1,
					start: "top " + topOffset + "px",
					end: "bottom 50%",
					endTrigger: ".tp-service-pin",
					pinSpacing: false,
					markers: false
				}
			});
		});
	});

})(jQuery);
