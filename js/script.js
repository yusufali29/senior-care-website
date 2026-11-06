(function ($) {
	"use strict";

	/* ================================
		Preloader Js Start
	================================ */

	$(window).on("load", function () {
		$(".preloader").addClass("loaded").delay(600).fadeOut();
	});

	/* ================================
		Sticky Header Js Start
	================================ */

	function headerStyle() {
		if (!$(".main-header").length) {
			return;
		}

		var windowPos = $(window).scrollTop();
		var siteHeader = $(".header-style-one");
		var stickyHeader = $(".main-header .sticky-header");

		if (windowPos > 100) {
			stickyHeader.addClass("fixed-header animated slideInDown");
		} else {
			stickyHeader.removeClass("fixed-header animated slideInDown");
		}

		if (windowPos > 1) {
			siteHeader.addClass("fixed-header");
		} else {
			siteHeader.removeClass("fixed-header");
		}
	}

	headerStyle();

	$(window).on("scroll", function () {
		headerStyle();
	});

	/* ================================
		Back To Top Js Start
	================================ */

	var backToTopWrapper = $(".back-to-top-wrapper");

	$(window).on("scroll", function () {
		if ($(window).scrollTop() > 300) {
			backToTopWrapper.addClass("back-to-top-btn-show");
		} else {
			backToTopWrapper.removeClass("back-to-top-btn-show");
		}
	});

	$("#back_to_top").on("click", function (e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, 300);
	});

	/* ================================
		Header Search Js Start
	================================ */

	if ($(".search-btn").length) {
		$(".search-btn").on("click", function () {
			$(".main-header").addClass("moblie-search-active");
		});

		$(".close-search, .search-back-drop").on("click", function () {
			$(".main-header").removeClass("moblie-search-active");
		});
	}

	/* ================================
		Parallax Js Start
	================================ */

	if ($(window).width() > 991) {
		$(".parallaxie").parallaxie({
			speed: 0.55,
			offset: 0
		});
	}

	/* ================================
		Mobile Menu Js Start
	================================ */

	if ($(".main-header li.dropdown ul").length) {
		$(".main-header .navigation li.dropdown").append("<div class=\"dropdown-btn\"><i class=\"fa fa-angle-down\"></i></div>");
	}

	if ($(".mobile-menu").length) {
		var mobileMenuContent = $(".main-header .main-menu .navigation").html();

		$(".mobile-menu .navigation").append(mobileMenuContent);
		$(".sticky-header .navigation").append(mobileMenuContent);

		$(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
			$(this).prev("ul").slideToggle(500);
			$(this).toggleClass("active");
		});

		$(".mobile-nav-toggler").on("click", function () {
			$("body").addClass("mobile-menu-visible");
		});

		$(".mobile-menu .menu-backdrop, .mobile-menu .close-btn").on("click", function () {
			$("body").removeClass("mobile-menu-visible");
		});
	}

	/* ================================
		Fact Counter Js Start
	================================ */

	if ($(".count-box").length) {
		$(".count-box").appear(function () {
			var $box = $(this);
			var $text = $box.find(".count-text");
			var stop = $text.attr("data-stop");
			var speed = parseInt($text.attr("data-speed"), 10);

			if ($box.hasClass("counted")) {
				return;
			}

			$box.addClass("counted");
			$({ countNum: $text.text() }).animate({ countNum: stop }, {
				duration: speed,
				easing: "linear",
				step: function () {
					$text.text(Math.floor(this.countNum));
				},
				complete: function () {
					$text.text(this.countNum);
				}
			});
		}, { accY: 0 });
	}

	/* ================================
		Count Bar Js Start
	================================ */

	if ($(".count-bar").length) {
		$(".count-bar").appear(function () {
			var $bar = $(this);
			$bar.css("width", $bar.data("percent")).addClass("counted");
		}, { accY: -50 });
	}

	/* ================================
		Price Range Slider Js Start
	================================ */

	if ($(".price-range-slider").length) {
		$(".price-range-slider").slider({
			range: true,
			min: 10,
			max: 99,
			values: [10, 60],
			slide: function (event, ui) {
				$("input.property-amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
			}
		});

		$("input.property-amount").val(
			"$" + $(".price-range-slider").slider("values", 0) +
			" - $" + $(".price-range-slider").slider("values", 1)
		);
	}

	/* ================================
		Product Details Slider Js Start
	================================ */

	if ($(".product-details .bxslider").length) {
		$(".product-details .bxslider").bxSlider({
			nextSelector: ".product-details #slider-next",
			prevSelector: ".product-details #slider-prev",
			nextText: "<i class=\"fa fa-angle-right\"></i>",
			prevText: "<i class=\"fa fa-angle-left\"></i>",
			mode: "fade",
			auto: true,
			speed: 700,
			pagerCustom: ".product-details .slider-pager .thumb-box"
		});
	}

	/* ================================
		Quantity Box Js Start
	================================ */

	$(".quantity-box .add").on("click", function () {
		var $input = $(this).prev();
		if ($input.val() < 999) {
			$input.val(+$input.val() + 1);
		}
	});

	$(".quantity-box .sub").on("click", function () {
		var $input = $(this).next();
		if ($input.val() > 1) {
			$input.val(+$input.val() - 1);
		}
	});

	/* ================================
		Accordion Js Start
	================================ */

	if ($(".accordion-box").length) {
		$(".accordion-box").on("click", ".acc-btn", function () {
			var accBtn = $(this);
			var outerBox = accBtn.closest(".accordion-box");
			var target = accBtn.closest(".accordion");
			var accContent = accBtn.next(".acc-content");

			if (target.hasClass("active-block")) {
				accBtn.removeClass("active");
				target.removeClass("active-block");
				accContent.slideUp(300);
			} else {
				outerBox.find(".accordion").removeClass("active-block");
				outerBox.find(".acc-btn").removeClass("active");
				outerBox.find(".acc-content").slideUp(300);

				accBtn.addClass("active");
				target.addClass("active-block");
				accContent.slideDown(300);
			}
		});
	}

	/* ================================
		Tabs Js Start
	================================ */

	if ($(".tabs-box").length) {
		$(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
			e.preventDefault();

			var target = $($(this).attr("data-tab"));
			var tabsBox = target.parents(".tabs-box");

			if (target.is(":visible")) {
				return;
			}

			tabsBox.find(".tab-buttons .tab-btn").removeClass("active-btn");
			$(this).addClass("active-btn");
			tabsBox.find(".tabs-content .tab").fadeOut(0).removeClass("active-tab animated fadeIn");
			target.fadeIn(300).addClass("active-tab animated fadeIn");
		});
	}

	/* ================================
		MixItUp Gallery Js Start
	================================ */

	if ($(".filter-list").length) {
		$(".filter-list").mixItUp({});
	}

	/* ================================
		Nice Select Js Start
	================================ */

	$("select").niceSelect();

	/* ================================
		Hover Active Js Start
	================================ */

	$(".pricing-block-items-1, .how-it-block-items-2").on("mouseenter", function () {
		$(".pricing-block-items-1, .how-it-block-items-2").removeClass("active");
		$(this).addClass("active");
	});

	/* ================================
		Mouse Cursor Js Start
	================================ */

	if ($(".mouseCursor").length) {
		var cursorInner = document.querySelector(".cursor-inner");
		var cursorOuter = document.querySelector(".cursor-outer");

		window.onmousemove = function (e) {
			var position = "translate(" + e.clientX + "px, " + e.clientY + "px)";
			cursorOuter.style.transform = position;
			cursorInner.style.transform = position;
		};

		$("body").on("mouseenter", "button, a, .cursor-pointer", function () {
			cursorInner.classList.add("cursor-hover");
			cursorOuter.classList.add("cursor-hover");
		});

		$("body").on("mouseleave", "button, a, .cursor-pointer", function () {
			if (!($(this).is("a, button") && $(this).closest(".cursor-pointer").length)) {
				cursorInner.classList.remove("cursor-hover");
				cursorOuter.classList.remove("cursor-hover");
			}
		});

		cursorInner.style.visibility = "visible";
		cursorOuter.style.visibility = "visible";
	}

	/* ================================
		WOW Animation Js Start
	================================ */

	if ($(".wow").length) {
		new WOW({
			boxClass: "wow",
			animateClass: "animated",
			offset: 0,
			mobile: false,
			live: true
		}).init();
	}

	/* ================================
		Brand Slider Js Start
	================================ */

	if ($(".brand-slider").length) {
		new Swiper(".brand-slider", {
			spaceBetween: 0,
			speed: 1300,
			loop: true,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: ".array-next",
				prevEl: ".array-prev"
			},
			breakpoints: {
				0: { slidesPerView: 1 },
				475: { slidesPerView: 2 },
				767: { slidesPerView: 3 },
				991: { slidesPerView: 4 },
				1199: { slidesPerView: 5 }
			}
		});
	}

	/* ================================
		Testimonial Slider Js Start
	================================ */

	if ($(".testimonial-slider").length) {
		new Swiper(".testimonial-slider", {
			spaceBetween: 30,
			speed: 1500,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: ".array-prev",
				prevEl: ".array-next"
			}
		});
	}

	/* ================================
		Banner Slider Three Js Start
	================================ */

	if ($(".banner-slider-three").length) {
		new Swiper(".banner-slider-three", {
			spaceBetween: 0,
			speed: 500,
			loop: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: ".banner-array-prev",
				prevEl: ".banner-array-next"
			}
		});
	}

	/* ================================
		Project Slider Js Start
	================================ */

	if ($(".project-slider").length) {
		new Swiper(".project-slider", {
			spaceBetween: 30,
			speed: 1500,
			loop: true,
			pagination: {
				el: ".dot2",
				clickable: true
			},
			breakpoints: {
				400: { slidesPerView: 1.2 },
				575: { slidesPerView: 1.4 },
				767: { slidesPerView: 2.1 },
				991: { slidesPerView: 2.8 },
				1199: { slidesPerView: 3.2 },
				1399: { slidesPerView: 4 }
			}
		});
	}

	/* ================================
		Services Slider Js Start
	================================ */

	if ($(".services-slider").length) {
		new Swiper(".services-slider", {
			spaceBetween: 30,
			speed: 1500,
			loop: true,
			pagination: {
				el: ".services-dot",
				clickable: true
			},
			breakpoints: {
				400: { slidesPerView: 1 },
				768: { slidesPerView: 2 },
				992: { slidesPerView: 3 }
			}
		});
	}

	/* ================================
		Team Slider Js Start
	================================ */

	if ($(".team-slider").length) {
		new Swiper(".team-slider", {
			spaceBetween: 30,
			speed: 1500,
			loop: true,
			breakpoints: {
				400: { slidesPerView: 1 },
				768: { slidesPerView: 2 },
				992: { slidesPerView: 3 },
				1400: { slidesPerView: 4 }
			}
		});
	}

	/* ================================
		Scroll To Fixed Js Start
	================================ */

	(function () {
		var parent = document.querySelector(".scroll-to-fixed-parent");
		var child = document.querySelector(".scroll-to-fixed-child");
		var headerHeight = 100;

		if (!parent || !child) {
			return;
		}

		parent.style.position = "relative";
		child.style.position = "absolute";
		child.style.top = "0";
		child.style.willChange = "transform";
		child.style.transition = "none";

		function syncScroll() {
			if (window.innerWidth < 1200) {
				child.style.position = "relative";
				child.style.transform = "translate3d(0, 0px, 0)";
				requestAnimationFrame(syncScroll);
				return;
			}

			var parentRect = parent.getBoundingClientRect();
			var maxScroll = parent.offsetHeight - child.offsetHeight;
			var transformValue = 0;

			if (parentRect.top <= headerHeight) {
				transformValue = Math.min(headerHeight - parentRect.top, maxScroll);
			}

			child.style.transform = "translate3d(0, " + transformValue + "px, 0)";
			requestAnimationFrame(syncScroll);
		}

		requestAnimationFrame(syncScroll);
	})();

})(window.jQuery);
