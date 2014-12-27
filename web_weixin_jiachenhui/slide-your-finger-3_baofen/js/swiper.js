/*
 * Swiper 2.0 - Mobile Touch Slider
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2012-2013, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Updated on: June 9, 2013
 */
var Swiper = function(a, b) {
	function d(a) {
		return document.querySelectorAll ? document.querySelectorAll(a) : jQuery(a)
	}

	function v() {
		var a = h - k;
		return b.freeMode && ( a = h - k), b.slidesPerView > e.slides.length && ( a = 0), 0 > a && ( a = 0), a
	}

	function x() {
		function f(a) {
			var c = new Image;
			c.onload = function() {
				e.imagesLoaded++, e.imagesLoaded == e.imagesToLoad.length && (e.reInit(), b.onImagesReady && b.onImagesReady(e))
			}, c.src = a
		}

		if (e.browser.ie10 ? (e.h.addEventListener(e.wrapper, e.touchEvents.touchStart, J, !1), e.h.addEventListener(document, e.touchEvents.touchMove, M, !1), e.h.addEventListener(document, e.touchEvents.touchEnd, N, !1)) : (e.support.touch && (e.h.addEventListener(e.wrapper, "touchstart", J, !1), e.h.addEventListener(e.wrapper, "touchmove", M, !1), e.h.addEventListener(e.wrapper, "touchend", N, !1)), b.simulateTouch && (e.h.addEventListener(e.wrapper, "mousedown", J, !1), e.h.addEventListener(document, "mousemove", M, !1), e.h.addEventListener(document, "mouseup", N, !1))), b.autoResize && e.h.addEventListener(window, "resize", e.resizeFix, !1), y(), e._wheelEvent = !1, b.mousewheelControl) {
			void 0 !== document.onmousewheel && (e._wheelEvent = "mousewheel");
			try {
				WheelEvent("wheel"), e._wheelEvent = "wheel"
			} catch(a) {
			}
			e._wheelEvent || (e._wheelEvent = "DOMMouseScroll"), e._wheelEvent && e.h.addEventListener(e.container, e._wheelEvent, B, !1)
		}
		if (b.keyboardControl && e.h.addEventListener(document, "keydown", A, !1), b.updateOnImagesReady) {
			document.querySelectorAll ? e.imagesToLoad = e.container.querySelectorAll("img") : window.jQuery && (e.imagesToLoad = d(e.container).find("img"));
			for (var c = 0; e.imagesToLoad.length > c; c++)
				f(e.imagesToLoad[c].getAttribute("src"))
		}
	}

	function y() {
		if (b.preventLinks) {
			var a = [];
			document.querySelectorAll ? a = e.container.querySelectorAll("a") : window.jQuery && ( a = d(e.container).find("a"));
			for (var c = 0; a.length > c; c++)
				e.h.addEventListener(a[c], "click", E, !1)
		}
		if (b.releaseFormElements)
			for (var f = document.querySelectorAll ? e.container.querySelectorAll("input, textarea, select") : d(e.container).find("input, textarea, select"), c = 0; f.length > c; c++)
				e.h.addEventListener(f[c], e.touchEvents.touchStart, F, !0);
		if (b.onSlideClick)
			for (var c = 0; e.slides.length > c; c++)
				e.h.addEventListener(e.slides[c], "click", C, !1);
		if (b.onSlideTouch)
			for (var c = 0; e.slides.length > c; c++)
				e.h.addEventListener(e.slides[c], e.touchEvents.touchStart, D, !1)
	}

	function z() {
		if (b.onSlideClick)
			for (var a = 0; e.slides.length > a; a++)
				e.h.removeEventListener(e.slides[a], "click", C, !1);
		if (b.onSlideTouch)
			for (var a = 0; e.slides.length > a; a++)
				e.h.removeEventListener(e.slides[a], e.touchEvents.touchStart, D, !1);
		if (b.releaseFormElements)
			for (var c = document.querySelectorAll ? e.container.querySelectorAll("input, textarea, select") : d(e.container).find("input, textarea, select"), a = 0; c.length > a; a++)
				e.h.removeEventListener(c[a], e.touchEvents.touchStart, F, !0);
		if (b.preventLinks) {
			var f = [];
			document.querySelectorAll ? f = e.container.querySelectorAll("a") : window.jQuery && ( f = d(e.container).find("a"));
			for (var a = 0; f.length > a; a++)
				e.h.removeEventListener(f[a], "click", E, !1)
		}
	}

	function A(a) {
		var b = a.keyCode || a.charCode;
		if (37 == b || 39 == b || 38 == b || 40 == b) {
			for (var c = !1, d = e.h.getOffset(e.container), f = e.h.windowScroll().left, g = e.h.windowScroll().top, h = e.h.windowWidth(), i = e.h.windowHeight(), j = [[d.left, d.top], [d.left + e.width, d.top], [d.left, d.top + e.height], [d.left + e.width, d.top + e.height]], k = 0; j.length > k; k++) {
				var l = j[k];
				l[0] >= f && f + h >= l[0] && l[1] >= g && g + i >= l[1] && ( c = !0)
			}
			if (!c)
				return
		}
		o ? ((37 == b || 39 == b) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 39 == b && e.swipeNext(), 37 == b && e.swipePrev()) : ((38 == b || 40 == b) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 40 == b && e.swipeNext(), 38 == b && e.swipePrev())
	}

	function B(a) {
		var d, c = e._wheelEvent;
		if (a.detail ? d = -a.detail : "mousewheel" == c ? d = a.wheelDelta : "DOMMouseScroll" == c ? d = -a.detail : "wheel" == c && ( d = Math.abs(a.deltaX) > Math.abs(a.deltaY) ? -a.deltaX : -a.deltaY), b.freeMode) {
			o ? e.getWrapperTranslate("x") : e.getWrapperTranslate("y");
			var g, h;
			o ? ( g = e.getWrapperTranslate("x") + d, h = e.getWrapperTranslate("y"), g > 0 && ( g = 0), -v() > g && ( g = -v())) : ( g = e.getWrapperTranslate("x"), h = e.getWrapperTranslate("y") + d, h > 0 && ( h = 0), -v() > h && ( h = -v())), e.setWrapperTransition(0), e.setWrapperTranslate(g, h, 0)
		} else
			0 > d ? e.swipeNext() : e.swipePrev();
		return b.autoplay && e.stopAutoplay(), a.preventDefault ? a.preventDefault() : a.returnValue = !1, !1
	}

	function C() {
		e.allowSlideClick && (e.clickedSlide = this, e.clickedSlideIndex = e.slides.indexOf(this), b.onSlideClick(e))
	}

	function D() {
		e.clickedSlide = this, e.clickedSlideIndex = e.slides.indexOf(this), b.onSlideTouch(e)
	}

	function E(a) {
		return e.allowLinks ?
		void 0 : (a.preventDefault ? a.preventDefault() : a.returnValue = !1, !1)
	}

	function F(a) {
		return a.stopPropagation ? a.stopPropagation() : a.returnValue = !1, !1
	}

	function J(a) {
		if (b.preventLinks && (e.allowLinks = !0), e.isTouched || b.onlyExternal)
			return !1;
		if (b.noSwiping && a.target && a.target.className && a.target.className.indexOf(b.noSwipingClass) > -1)
			return !1;
		if ( I = !1, e.isTouched = !0, G = "touchstart" == a.type, !G || 1 == a.targetTouches.length) {
			b.loop && e.fixLoop(), e.callPlugins("onTouchStartBegin"), G || (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
			var c = G ? a.targetTouches[0].pageX : a.pageX || a.clientX, d = G ? a.targetTouches[0].pageY : a.pageY || a.clientY;
			e.touches.startX = e.touches.currentX = c, e.touches.startY = e.touches.currentY = d, e.touches.start = e.touches.current = o ? c : d, e.setWrapperTransition(0), e.positions.start = e.positions.current = o ? e.getWrapperTranslate("x") : e.getWrapperTranslate("y"), o ? e.setWrapperTranslate(e.positions.start, 0, 0) : e.setWrapperTranslate(0, e.positions.start, 0), e.times.start = (new Date).getTime(), j =
			void 0, b.moveStartThreshold > 0 && ( H = !1), b.onTouchStart && b.onTouchStart(e), e.callPlugins("onTouchStartEnd")
		}
	}

	function M(a) {
		if (e.isTouched && !b.onlyExternal && (!G || "mousemove" != a.type)) {
			var c = G ? a.targetTouches[0].pageX : a.pageX || a.clientX, d = G ? a.targetTouches[0].pageY : a.pageY || a.clientY;
			if (j ===
				void 0 && o && ( j = !!(j || Math.abs(d - e.touches.startY) > Math.abs(c - e.touches.startX))),
				void 0 !== j || o || ( j = !!(j || Math.abs(d - e.touches.startY) < Math.abs(c - e.touches.startX))), j)
				return e.isTouched = !1,
				void 0;
			if (a.assignedToSwiper)
				return e.isTouched = !1,
				void 0;
			if (a.assignedToSwiper = !0, e.isMoved = !0, b.preventLinks && (e.allowLinks = !1), b.onSlideClick && (e.allowSlideClick = !1), b.autoplay && e.stopAutoplay(), !G || 1 == a.touches.length) {
				if (e.callPlugins("onTouchMoveStart"), a.preventDefault ? a.preventDefault() : a.returnValue = !1, e.touches.current = o ? c : d, e.positions.current = (e.touches.current - e.touches.start) * b.touchRatio + e.positions.start, e.positions.current > 0 && b.onResistanceBefore && b.onResistanceBefore(e, e.positions.current), e.positions.current < -v() && b.onResistanceBefore && b.onResistanceAfter(e, Math.abs(e.positions.current + v())), b.resistance && "100%" != b.resistance) {
					if (e.positions.current > 0) {
						var f = 1 - e.positions.current / k / 2;
						e.positions.current = .5 > f ? k / 2 : e.positions.current * f
					}
					if (e.positions.current < -v()) {
						var g = (e.touches.current - e.touches.start) * b.touchRatio + (v() + e.positions.start), f = (k + g) / k, h = e.positions.current - g * (1 - f) / 2, i = -v() - k / 2;
						e.positions.current = i > h || 0 >= f ? i : h
					}
				}
				if (b.resistance && "100%" == b.resistance && (e.positions.current > 0 && (!b.freeMode || b.freeModeFluid) && (e.positions.current = 0), e.positions.current < -v() && (!b.freeMode || b.freeModeFluid) && (e.positions.current = -v())), !b.followFinger)
					return;
				return b.moveStartThreshold ? Math.abs(e.touches.current - e.touches.start) > b.moveStartThreshold || H ? ( H = !0, o ? e.setWrapperTranslate(e.positions.current, 0, 0) : e.setWrapperTranslate(0, e.positions.current, 0)) : e.positions.current = e.positions.start : o ? e.setWrapperTranslate(e.positions.current, 0, 0) : e.setWrapperTranslate(0, e.positions.current, 0), (b.freeMode || b.watchActiveIndex) && e.updateActiveSlide(e.positions.current), b.grabCursor && (e.container.style.cursor = "move", e.container.style.cursor = "grabbing", e.container.style.cursor = "-moz-grabbin", e.container.style.cursor = "-webkit-grabbing"), K || ( K = e.touches.current), L || ( L = (new Date).getTime()), e.velocity = (e.touches.current - K) / ((new Date).getTime() - L) / 2, 2 > Math.abs(e.touches.current - K) && (e.velocity = 0), K = e.touches.current, L = (new Date).getTime(), e.callPlugins("onTouchMoveEnd"), b.onTouchMove && b.onTouchMove(e), !1
			}
		}
	}

	function N() {
		if (j && e.swipeReset(), !b.onlyExternal && e.isTouched) {
			e.isTouched = !1, b.grabCursor && (e.container.style.cursor = "move", e.container.style.cursor = "grab", e.container.style.cursor = "-moz-grab", e.container.style.cursor = "-webkit-grab"), e.positions.current || 0 === e.positions.current || (e.positions.current = e.positions.start), b.followFinger && ( o ? e.setWrapperTranslate(e.positions.current, 0, 0) : e.setWrapperTranslate(0, e.positions.current, 0)), e.times.end = (new Date).getTime(), e.touches.diff = e.touches.current - e.touches.start, e.touches.abs = Math.abs(e.touches.diff), e.positions.diff = e.positions.current - e.positions.start, e.positions.abs = Math.abs(e.positions.diff);
			var c = e.positions.diff, d = e.positions.abs, f = e.times.end - e.times.start;
			if (5 > d && 300 > f && 0 == e.allowLinks && (b.freeMode || 0 == d || e.swipeReset(), b.preventLinks && (e.allowLinks = !0), b.onSlideClick && (e.allowSlideClick = !0)), setTimeout(function() {
					b.preventLinks && (e.allowLinks = !0), b.onSlideClick && (e.allowSlideClick = !0)
				}, 100), !e.isMoved)
				return e.isMoved = !1, b.onTouchEnd && b.onTouchEnd(e), e.callPlugins("onTouchEnd"),
				void 0;
			e.isMoved = !1;
			var h = v();
			if (e.positions.current > 0)
				return e.swipeReset(), b.onTouchEnd && b.onTouchEnd(e), e.callPlugins("onTouchEnd"),
				void 0;
			if (-h > e.positions.current)
				return e.swipeReset(), b.onTouchEnd && b.onTouchEnd(e), e.callPlugins("onTouchEnd"),
				void 0;
			if (b.freeMode) {
				if (b.freeModeFluid) {
					var q, l = 1e3 * b.momentumRatio, m = e.velocity * l, n = e.positions.current + m, p = !1, r = 20 * Math.abs(e.velocity) * b.momentumBounceRatio;
					-h > n && (b.momentumBounce && e.support.transitions ? (-r > n + h && ( n = -h - r), q = -h, p = !0, I = !0) : n = -h), n > 0 && (b.momentumBounce && e.support.transitions ? (n > r && ( n = r), q = 0, p = !0, I = !0) : n = 0), 0 != e.velocity && ( l = Math.abs((n - e.positions.current) / e.velocity)), o ? e.setWrapperTranslate(n, 0, 0) : e.setWrapperTranslate(0, n, 0), e.setWrapperTransition(l), b.momentumBounce && p && e.wrapperTransitionEnd(function() {
						I && (b.onMomentumBounce && b.onMomentumBounce(e), o ? e.setWrapperTranslate(q, 0, 0) : e.setWrapperTranslate(0, q, 0), e.setWrapperTransition(300))
					}), e.updateActiveSlide(n)
				}
				return (!b.freeModeFluid || f >= 300) && e.updateActiveSlide(e.positions.current), b.onTouchEnd && b.onTouchEnd(e), e.callPlugins("onTouchEnd"),
				void 0
			}
			i = 0 > c ? "toNext" : "toPrev", "toNext" == i && 300 >= f && (30 > d || !b.shortSwipes ? e.swipeReset() : e.swipeNext(!0)), "toPrev" == i && 300 >= f && (30 > d || !b.shortSwipes ? e.swipeReset() : e.swipePrev(!0));
			var s = 0;
			if ("auto" == b.slidesPerView) {
				for (var w, t = Math.abs( o ? e.getWrapperTranslate("x") : e.getWrapperTranslate("y")), u = 0, x = 0; e.slides.length > x; x++)
					if ( w = o ? e.slides[x].getWidth(!0) : e.slides[x].getHeight(!0), u += w, u > t) {
						s = w;
						break
					}
				s > k && ( s = k)
			} else
				s = g * b.slidesPerView;
			"toNext" == i && f > 300 && (d >= .5 * s ? e.swipeNext(!0) : e.swipeReset()), "toPrev" == i && f > 300 && (d >= .5 * s ? e.swipePrev(!0) : e.swipeReset()), b.onTouchEnd && b.onTouchEnd(e), e.callPlugins("onTouchEnd")
		}
	}

	function O(a, c, d) {
		function k() {
			g += h, j = "toNext" == i ? g > a : a > g, j ? ( o ? e.setWrapperTranslate(Math.round(g), 0) : e.setWrapperTranslate(0, Math.round(g)), e._DOMAnimating = !0, window.setTimeout(function() {
				k()
			}, 1e3 / 60)) : (b.onSlideChangeEnd && b.onSlideChangeEnd(e), o ? e.setWrapperTranslate(a, 0) : e.setWrapperTranslate(0, a), e._DOMAnimating = !1)
		}

		if (e.support.transitions || !b.DOMAnimation) {
			o ? e.setWrapperTranslate(a, 0, 0) : e.setWrapperTranslate(0, a, 0);
			var f = "to" == c && d.speed >= 0 ? d.speed : b.speed;
			e.setWrapperTransition(f)
		} else {
			var g = o ? e.getWrapperTranslate("x") : e.getWrapperTranslate("y"), f = "to" == c && d.speed >= 0 ? d.speed : b.speed, h = Math.ceil((a - g) / f * (1e3 / 60)), i = g > a ? "toNext" : "toPrev", j = "toNext" == i ? g > a : a > g;
			if (e._DOMAnimating)
				return;
			k()
		}
		e.updateActiveSlide(a), b.onSlideNext && "next" == c && b.onSlideNext(e, a), b.onSlidePrev && "prev" == c && b.onSlidePrev(e, a), b.onSlideReset && "reset" == c && b.onSlideReset(e, a), ("next" == c || "prev" == c || "to" == c && 1 == d.runCallbacks) && P()
	}

	function P() {
		if (e.callPlugins("onSlideChangeStart"), b.onSlideChangeStart)
			if (b.queueStartCallbacks && e.support.transitions) {
				if (e._queueStartCallbacks)
					return;
				e._queueStartCallbacks = !0, b.onSlideChangeStart(e), e.wrapperTransitionEnd(function() {
					e._queueStartCallbacks = !1
				})
			} else
				b.onSlideChangeStart(e);
		if (b.onSlideChangeEnd)
			if (e.support.transitions)
				if (b.queueEndCallbacks) {
					if (e._queueEndCallbacks)
						return;
					e._queueEndCallbacks = !0, e.wrapperTransitionEnd(b.onSlideChangeEnd)
				} else
					e.wrapperTransitionEnd(b.onSlideChangeEnd);
			else
				b.DOMAnimation || setTimeout(function() {
					b.onSlideChangeEnd(e)
				}, 10)
	}

	function Q() {
		for (var a = e.paginationButtons, b = 0; a.length > b; b++)
			e.h.removeEventListener(a[b], "click", S, !1)
	}

	function R() {
		for (var a = e.paginationButtons, b = 0; a.length > b; b++)
			e.h.addEventListener(a[b], "click", S, !1)
	}

	function S(a) {
		for (var b, c = a.target || a.srcElement, d = e.paginationButtons, f = 0; d.length > f; f++)
			c === d[f] && ( b = f);
		e.swipeTo(b)
	}

	function U() {
		e.calcSlides(), b.loader.slides.length > 0 && 0 == e.slides.length && e.loadSlides(), b.loop && e.createLoop(), e.init(), x(), b.pagination && b.createPagination && e.createPagination(!0), b.loop || b.initialSlide > 0 ? e.swipeTo(b.initialSlide, 0, !1) : e.updateActiveSlide(0), b.autoplay && e.startAutoplay()
	}

	if (document.body.__defineGetter__ && HTMLElement) {
		var c = HTMLElement.prototype;
		c.__defineGetter__ && c.__defineGetter__("outerHTML", function() {
			return (new XMLSerializer).serializeToString(this)
		})
	}
	if (window.getComputedStyle || (window.getComputedStyle = function(a) {
		return this.el = a, this.getPropertyValue = function(b) {
			var c = /(\-([a-z]){1})/g;
			return "float" === b && ( b = "styleFloat"), c.test(b) && ( b = b.replace(c, function() {
				return arguments[2].toUpperCase()
			})), a.currentStyle[b] ? a.currentStyle[b] : null
		}, this
	}), Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
		for (var c = b || 0, d = this.length; d > c; c++)
			if (this[c] === a)
				return c;
		return -1
	}), (document.querySelectorAll || window.jQuery) &&
	void 0 !== a && (a.nodeType || 0 !== d(a).length)) {
		var e = this;
		e.touches = {
			start : 0,
			startX : 0,
			startY : 0,
			current : 0,
			currentX : 0,
			currentY : 0,
			diff : 0,
			abs : 0
		}, e.positions = {
			start : 0,
			abs : 0,
			diff : 0,
			current : 0
		}, e.times = {
			start : 0,
			end : 0
		}, e.id = (new Date).getTime(), e.container = a.nodeType ? a : d(a)[0], e.isTouched = !1, e.isMoved = !1, e.activeIndex = 0, e.activeLoaderIndex = 0, e.activeLoopIndex = 0, e.previousIndex = null, e.velocity = 0, e.snapGrid = [], e.slidesGrid = [], e.imagesToLoad = [], e.imagesLoaded = 0, e.wrapperLeft = 0, e.wrapperRight = 0, e.wrapperTop = 0, e.wrapperBottom = 0;
		var f, g, h, i, j, k, l = {
			mode : "horizontal",
			touchRatio : 1,
			speed : 300,
			freeMode : !1,
			freeModeFluid : !1,
			momentumRatio : 1,
			momentumBounce : !0,
			momentumBounceRatio : 1,
			slidesPerView : 1,
			slidesPerGroup : 1,
			simulateTouch : !0,
			followFinger : !0,
			shortSwipes : !0,
			moveStartThreshold : !1,
			autoplay : !1,
			onlyExternal : !1,
			createPagination : !0,
			pagination : !1,
			paginationElement : "span",
			paginationClickable : !1,
			paginationAsRange : !0,
			resistance : !0,
			scrollContainer : !1,
			preventLinks : !0,
			noSwiping : !1,
			noSwipingClass : "swiper-no-swiping",
			initialSlide : 0,
			keyboardControl : !1,
			mousewheelControl : !1,
			useCSS3Transforms : !0,
			loop : !1,
			loopAdditionalSlides : 0,
			calculateHeight : !1,
			updateOnImagesReady : !0,
			releaseFormElements : !0,
			watchActiveIndex : !1,
			visibilityFullFit : !1,
			offsetPxBefore : 0,
			offsetPxAfter : 0,
			offsetSlidesBefore : 0,
			offsetSlidesAfter : 0,
			centeredSlides : !1,
			queueStartCallbacks : !1,
			queueEndCallbacks : !1,
			autoResize : !0,
			resizeReInit : !1,
			DOMAnimation : !0,
			loader : {
				slides : [],
				slidesHTMLType : "inner",
				surroundGroups : 1,
				logic : "reload",
				loadAllSlides : !1
			},
			slideElement : "section",
			slideClass : "slide",
			slideActiveClass : "active",
			slideVisibleClass : "visible",
			wrapperClass : "swiper-wrapper",
			paginationElementClass : "swiper-pagination-switch",
			paginationActiveClass : "swiper-active-switch",
			paginationVisibleClass : "swiper-visible-switch",
			Swipercallback : 0
		};
		b = b || {};
		for (var m in l)
		if ( m in b && "object" == typeof b[m])
			for (var n in l[m]) n in b[m] || (b[m][n] = l[m][n]);
		else
			m in b || (b[m] = l[m]);
		e.params = b, b.scrollContainer && (b.freeMode = !0, b.freeModeFluid = !0), b.loop && (b.resistance = "100%");
		var o = "horizontal" === b.mode;
		e.touchEvents = {
			touchStart : e.support.touch || !b.simulateTouch ? "touchstart" : e.browser.ie10 ? "MSPointerDown" : "mousedown",
			touchMove : e.support.touch || !b.simulateTouch ? "touchmove" : e.browser.ie10 ? "MSPointerMove" : "mousemove",
			touchEnd : e.support.touch || !b.simulateTouch ? "touchend" : e.browser.ie10 ? "MSPointerUp" : "mouseup"
		};
		for (var p = e.container.childNodes.length - 1; p >= 0; p--)
			if (e.container.childNodes[p].className)
				for (var q = e.container.childNodes[p].className.split(" "), r = 0; q.length > r; r++)
					q[r] === b.wrapperClass && ( f = e.container.childNodes[p]);
		e.wrapper = f, e._extendSwiperSlide = function(a) {
			return a.append = function() {
				return b.loop ? (a.insertAfter(e.slides.length - e.loopedSlides), e.removeLoopedSlides(), e.calcSlides(), e.createLoop()) : e.wrapper.appendChild(a), e.reInit(), a
			}, a.prepend = function() {
				return b.loop ? (e.wrapper.insertBefore(a, e.slides[e.loopedSlides]), e.removeLoopedSlides(), e.calcSlides(), e.createLoop()) : e.wrapper.insertBefore(a, e.wrapper.firstChild), e.reInit(), a
			}, a.insertAfter = function(c) {
				if (c ===
					void 0)
					return !1;
				var d;
				return b.loop ? ( d = e.slides[c + 1 + e.loopedSlides], e.wrapper.insertBefore(a, d), e.removeLoopedSlides(), e.calcSlides(), e.createLoop()) : ( d = e.slides[c + 1], e.wrapper.insertBefore(a, d)), e.reInit(), a
			}, a.clone = function() {
				return e._extendSwiperSlide(a.cloneNode(!0))
			}, a.remove = function() {
				e.wrapper.removeChild(a), e.reInit()
			}, a.html = function(b) {
				return b ===
				void 0 ? a.innerHTML : (a.innerHTML = b, a)
			}, a.index = function() {
				for (var b, c = e.slides.length - 1; c >= 0; c--)
					a === e.slides[c] && ( b = c);
				return b
			}, a.isActive = function() {
				return a.index() === e.activeIndex ? !0 : !1
			}, a.swiperSlideDataStorage || (a.swiperSlideDataStorage = {}), a.getData = function(b) {
				return a.swiperSlideDataStorage[b]
			}, a.setData = function(b, c) {
				return a.swiperSlideDataStorage[b] = c, a
			}, a.data = function(b, c) {
				return c ? (a.setAttribute("data-" + b, c), a) : a.getAttribute("data-" + b)
			}, a.getWidth = function(b) {
				return e.h.getWidth(a, b)
			}, a.getHeight = function(b) {
				return e.h.getHeight(a, b)
			}, a.getOffset = function() {
				return e.h.getOffset(a)
			}, a
		}, e.calcSlides = function(a) {
			var c = e.slides ? e.slides.length : !1;
			e.slides = [], e.displaySlides = [];
			for (var d = 0; e.wrapper.childNodes.length > d; d++)
				if (e.wrapper.childNodes[d].className)
					for (var f = e.wrapper.childNodes[d].className, g = f.split(" "), h = 0; g.length > h; h++)
						g[h] === b.slideClass && e.slides.push(e.wrapper.childNodes[d]);
			for ( d = e.slides.length - 1; d >= 0; d--)
				e._extendSwiperSlide(e.slides[d]);
			c && (c !== e.slides.length || a) && (z(), y(), e.updateActiveSlide(), b.createPagination && e.params.pagination && e.createPagination(), e.callPlugins("numberOfSlidesChanged"))
		}, e.createSlide = function(a, c, d) {
			var c = c || e.params.slideClass, d = d || b.slideElement, f = document.createElement(d);
			return f.innerHTML = a || "", f.className = c, e._extendSwiperSlide(f)
		}, e.appendSlide = function(a, b, c) {
			return a ? a.nodeType ? e._extendSwiperSlide(a).append() : e.createSlide(a, b, c).append() :
			void 0
		}, e.prependSlide = function(a, b, c) {
			return a ? a.nodeType ? e._extendSwiperSlide(a).prepend() : e.createSlide(a, b, c).prepend() :
			void 0
		}, e.insertSlideAfter = function(a, b, c, d) {
			return a ===
			void 0 ? !1 : b.nodeType ? e._extendSwiperSlide(b).insertAfter(a) : e.createSlide(b, c, d).insertAfter(a)
		}, e.removeSlide = function(a) {
			if (e.slides[a]) {
				if (b.loop) {
					if (!e.slides[a + e.loopedSlides])
						return !1;
					e.slides[a + e.loopedSlides].remove(), e.removeLoopedSlides(), e.calcSlides(), e.createLoop()
				} else
					e.slides[a].remove();
				return !0
			}
			return !1
		}, e.removeLastSlide = function() {
			return e.slides.length > 0 ? (b.loop ? (e.slides[e.slides.length - 1 - e.loopedSlides].remove(), e.removeLoopedSlides(), e.calcSlides(), e.createLoop()) : e.slides[e.slides.length - 1].remove(), !0) : !1
		}, e.removeAllSlides = function() {
			for (var a = e.slides.length - 1; a >= 0; a--)
				e.slides[a].remove()
		}, e.getSlide = function(a) {
			return e.slides[a]
		}, e.getLastSlide = function() {
			return e.slides[e.slides.length - 1]
		}, e.getFirstSlide = function() {
			return e.slides[0]
		}, e.activeSlide = function() {
			return e.slides[e.activeIndex]
		};
		var s = [];
		for (var t in e.plugins)
		if (b[t]) {
			var u = e.plugins[t](e, b[t]);
			u && s.push(u)
		}
		e.callPlugins = function(a, b) {
			b || ( b = {});
			for (var c = 0; s.length > c; c++)
				a in s[c] && s[c][a](b)
		}, e.browser.ie10 && !b.onlyExternal && ( o ? e.wrapper.classList.add("swiper-wp8-horizontal") : e.wrapper.classList.add("swiper-wp8-vertical")), b.freeMode && (e.container.className += " swiper-free-mode"), e.initialized = !1, e.init = function(a, c) {
			var d = e.h.getWidth(e.container), f = e.h.getHeight(e.container);
			if (d !== e.width || f !== e.height || a) {
				e.width = d, e.height = f, k = o ? d : f;
				var i = e.wrapper;
				if (a && e.calcSlides(c), "auto" === b.slidesPerView) {
					var j = 0, l = 0;
					b.slidesOffset > 0 && (i.style.paddingLeft = "", i.style.paddingRight = "", i.style.paddingTop = "", i.style.paddingBottom = ""), i.style.width = "", i.style.height = "", b.offsetPxBefore > 0 && ( o ? e.wrapperLeft = b.offsetPxBefore : e.wrapperTop = b.offsetPxBefore), b.offsetPxAfter > 0 && ( o ? e.wrapperRight = b.offsetPxAfter : e.wrapperBottom = b.offsetPxAfter), b.centeredSlides && ( o ? (e.wrapperLeft = (k - this.slides[0].getWidth(!0)) / 2, e.wrapperRight = (k - e.slides[e.slides.length - 1].getWidth(!0)) / 2) : (e.wrapperTop = (k - e.slides[0].getHeight(!0)) / 2, e.wrapperBottom = (k - e.slides[e.slides.length - 1].getHeight(!0)) / 2)), o ? (e.wrapperLeft >= 0 && (i.style.paddingLeft = e.wrapperLeft + "px"), e.wrapperRight >= 0 && (i.style.paddingRight = e.wrapperRight + "px")) : (e.wrapperTop >= 0 && (i.style.paddingTop = e.wrapperTop + "px"), e.wrapperBottom >= 0 && (i.style.paddingBottom = e.wrapperBottom + "px"));
					var m = 0, n = 0;
					e.snapGrid = [], e.slidesGrid = [];
					for (var p = 0, q = 0; e.slides.length > q; q++) {
						var r = e.slides[q].getWidth(!0), s = e.slides[q].getHeight(!0);
						b.calculateHeight && ( p = Math.max(p, s));
						var t = o ? r : s;
						if (b.centeredSlides) {
							var u = q === e.slides.length - 1 ? 0 : e.slides[q + 1].getWidth(!0), v = q === e.slides.length - 1 ? 0 : e.slides[q + 1].getHeight(!0), w = o ? u : v;
							if (t > k) {
								for (var x = 0; Math.floor(t / (k + e.wrapperLeft)) >= x; x++)
									0 === x ? e.snapGrid.push(m + e.wrapperLeft) : e.snapGrid.push(m + e.wrapperLeft + k * x);
								e.slidesGrid.push(m + e.wrapperLeft)
							} else
								e.snapGrid.push(n), e.slidesGrid.push(n);
							n += t / 2 + w / 2
						} else {
							if (t > k)
								for (var x = 0; Math.floor(t / k) >= x; x++)
									e.snapGrid.push(m + k * x);
							else
								e.snapGrid.push(m);
							e.slidesGrid.push(m)
						}
						m += t, j += r, l += s
					}
					b.calculateHeight && (e.height = p), o ? ( h = j + e.wrapperRight + e.wrapperLeft, i.style.width = j + "px", i.style.height = e.height + "px") : ( h = l + e.wrapperTop + e.wrapperBottom, i.style.width = e.width + "px", i.style.height = l + "px")
				} else if (b.scrollContainer) {
					i.style.width = "", i.style.height = "";
					var y = e.slides[0].getWidth(!0), z = e.slides[0].getHeight(!0);
					h = o ? y : z, i.style.width = y + "px", i.style.height = z + "px", g = o ? y : z
				} else {
					if (b.calculateHeight) {
						var p = 0, z = 0;
						o || (e.container.style.height = ""), i.style.height = "";
						for (var q = 0; e.slides.length > q; q++)
							e.slides[q].style.height = "", p = Math.max(e.slides[q].getHeight(!0), p), o || (z += e.slides[q].getHeight(!0));
						var s = p;
						if (o)
							var z = s;
						k = e.height = s, o || (e.container.style.height = k + "px")
					} else
						var s = o ? e.height : e.height / b.slidesPerView, z = o ? e.height : e.slides.length * s;
					var r = o ? e.width / b.slidesPerView : e.width, y = o ? e.slides.length * r : e.width;
					g = o ? r : s, b.offsetSlidesBefore > 0 && ( o ? e.wrapperLeft = g * b.offsetSlidesBefore : e.wrapperTop = g * b.offsetSlidesBefore), b.offsetSlidesAfter > 0 && ( o ? e.wrapperRight = g * b.offsetSlidesAfter : e.wrapperBottom = g * b.offsetSlidesAfter), b.offsetPxBefore > 0 && ( o ? e.wrapperLeft = b.offsetPxBefore : e.wrapperTop = b.offsetPxBefore), b.offsetPxAfter > 0 && ( o ? e.wrapperRight = b.offsetPxAfter : e.wrapperBottom = b.offsetPxAfter), b.centeredSlides && ( o ? (e.wrapperLeft = (k - g) / 2, e.wrapperRight = (k - g) / 2) : (e.wrapperTop = (k - g) / 2, e.wrapperBottom = (k - g) / 2)), o ? (e.wrapperLeft > 0 && (i.style.paddingLeft = e.wrapperLeft + "px"), e.wrapperRight > 0 && (i.style.paddingRight = e.wrapperRight + "px")) : (e.wrapperTop > 0 && (i.style.paddingTop = e.wrapperTop + "px"), e.wrapperBottom > 0 && (i.style.paddingBottom = e.wrapperBottom + "px")), h = o ? y + e.wrapperRight + e.wrapperLeft : z + e.wrapperTop + e.wrapperBottom, i.style.width = y + "px", i.style.height = z + "px";
					var m = 0;
					e.snapGrid = [], e.slidesGrid = [];
					for (var q = 0; e.slides.length > q; q++)
						e.snapGrid.push(m), e.slidesGrid.push(m), m += g, e.slides[q].style.width = r + "px", e.slides[q].style.height = s + "px"
				}
				e.initialized ? e.callPlugins("onInit") : e.callPlugins("onFirstInit"), e.initialized = !0
			}
		}, e.reInit = function(a) {
			e.init(!0, a)
		}, e.resizeFix = function(a) {
			if (e.callPlugins("beforeResizeFix"), e.init(b.resizeReInit || a), b.freeMode) {
				var c = o ? e.getWrapperTranslate("x") : e.getWrapperTranslate("y");
				if (-v() > c) {
					var d = o ? -v() : 0, f = o ? 0 : -v();
					e.setWrapperTransition(0), e.setWrapperTranslate(d, f, 0)
				}
			} else
				b.loop ? e.swipeTo(e.activeLoopIndex, 0, !1) : e.swipeTo(e.activeIndex, 0, !1);
			e.callPlugins("afterResizeFix")
		}, e.destroy = function() {
			e.browser.ie10 ? (e.h.removeEventListener(e.wrapper, e.touchEvents.touchStart, J, !1), e.h.removeEventListener(document, e.touchEvents.touchMove, M, !1), e.h.removeEventListener(document, e.touchEvents.touchEnd, N, !1)) : (e.support.touch && (e.h.removeEventListener(e.wrapper, "touchstart", J, !1), e.h.removeEventListener(e.wrapper, "touchmove", M, !1), e.h.removeEventListener(e.wrapper, "touchend", N, !1)), b.simulateTouch && (e.h.removeEventListener(e.wrapper, "mousedown", J, !1), e.h.removeEventListener(document, "mousemove", M, !1), e.h.removeEventListener(document, "mouseup", N, !1))), b.autoResize && e.h.removeEventListener(window, "resize", e.resizeFix, !1), z(), b.paginationClickable && Q(), b.mousewheelControl && e._wheelEvent && e.h.removeEventListener(e.container, e._wheelEvent, B, !1), b.keyboardControl && e.h.removeEventListener(document, "keydown", A, !1), b.autoplay && e.stopAutoplay(), e.callPlugins("onDestroy")
		}, b.grabCursor && (e.container.style.cursor = "move", e.container.style.cursor = "grab", e.container.style.cursor = "-moz-grab", e.container.style.cursor = "-webkit-grab"), e.allowSlideClick = !0, e.allowLinks = !0;
		var H, K, L, G = !1, I = !0;
		e.swipeNext = function(a) {
			!a && b.loop && e.fixLoop(), e.callPlugins("onSwipeNext");
			var c = o ? e.getWrapperTranslate("x") : e.getWrapperTranslate("y"), d = c;
			if ("auto" == b.slidesPerView) {
				for (var f = 0; e.snapGrid.length > f; f++)
					if (-c >= e.snapGrid[f] && e.snapGrid[f + 1] > -c) {
						d = -e.snapGrid[f + 1];
						break
					}
			} else {
				var h = g * b.slidesPerGroup;
				d = -(Math.floor(Math.abs(c) / Math.floor(h)) * h + h)
			}
			return -v() > d && ( d = -v()), d == c ? !1 : (O(d, "next"), !0)
		}, e.swipePrev = function(a) {
			!a && b.loop && e.fixLoop(), !a && b.autoplay && e.stopAutoplay(), e.callPlugins("onSwipePrev");
			var d, c = Math.ceil( o ? e.getWrapperTranslate("x") : e.getWrapperTranslate("y"));
			if ("auto" == b.slidesPerView) {
				d = 0;
				for (var f = 1; e.snapGrid.length > f; f++) {
					if (-c == e.snapGrid[f]) {
						d = -e.snapGrid[f - 1];
						break
					}
					if (-c > e.snapGrid[f] && e.snapGrid[f + 1] > -c) {
						d = -e.snapGrid[f];
						break
					}
				}
			} else {
				var h = g * b.slidesPerGroup;
				d = -(Math.ceil(-c / h) - 1) * h
			}
			return d > 0 && ( d = 0), d == c ? !1 : (O(d, "prev"), !0)
		}, e.swipeReset = function() {
			e.callPlugins("onSwipeReset");
			var d, a = o ? e.getWrapperTranslate("x") : e.getWrapperTranslate("y"), c = g * b.slidesPerGroup;
			if (-v(), "auto" == b.slidesPerView) {
				d = 0;
				for (var h = 0; e.snapGrid.length > h; h++) {
					if (-a === e.snapGrid[h])
						return;
					if (-a >= e.snapGrid[h] && e.snapGrid[h + 1] > -a) {
						d = e.positions.diff > 0 ? -e.snapGrid[h + 1] : -e.snapGrid[h];
						break
					}
				}
				-a >= e.snapGrid[e.snapGrid.length - 1] && ( d = -e.snapGrid[e.snapGrid.length - 1]), -v() >= a && ( d = -v())
			} else
				d = 0 > a ? Math.round(a / c) * c : 0;
			return b.scrollContainer && ( d = 0 > a ? a : 0), -v() > d && ( d = -v()), b.scrollContainer && k > g && ( d = 0), d == a ? !1 : (O(d, "reset"), !0)
		}, e.swipeTo = function(a, c, d) {
			a = parseInt(a, 10), e.callPlugins("onSwipeTo", {
				index : a,
				speed : c
			}), b.loop && (a += e.loopedSlides);
			var f = o ? e.getWrapperTranslate("x") : e.getWrapperTranslate("y");
			if (!(a > e.slides.length - 1 || 0 > a)) {
				var h;
				return h = "auto" == b.slidesPerView ? -e.slidesGrid[a] : -a * g, -v() > h && ( h = -v()), h == f ? !1 : ( d = d === !1 ? !1 : !0, O(h, "to", {
					index : a,
					speed : c,
					runCallbacks : d
				}), !0)
			}
		}, e._queueStartCallbacks = !1, e._queueEndCallbacks = !1, e.updateActiveSlide = function(a) {
			if (e.initialized && 0 != e.slides.length) {
				if (e.previousIndex = e.activeIndex, a > 0 && ( a = 0), a ===
				void 0 && ( a = o ? e.getWrapperTranslate("x") : e.getWrapperTranslate("y")), "auto" == b.slidesPerView) {
					if (e.activeIndex = e.slidesGrid.indexOf(-a), 0 > e.activeIndex) {
						for (var d = 0; e.slidesGrid.length - 1 > d && !(-a > e.slidesGrid[d] && e.slidesGrid[d + 1] > -a); d++);
						var f = Math.abs(e.slidesGrid[d] + a), h = Math.abs(e.slidesGrid[d + 1] + a);
						e.activeIndex = h >= f ? d : d + 1
					}
				} else
					e.activeIndex = b.visibilityFullFit ? Math.ceil(-a / g) : Math.round(-a / g);
				if (e.activeIndex == e.slides.length && (e.activeIndex = e.slides.length - 1), 0 > e.activeIndex && (e.activeIndex = 0), e.slides[e.activeIndex]) {
					e.calcVisibleSlides(a);
					for (var i = RegExp("\\s*" + b.slideActiveClass), j = RegExp("\\s*" + b.slideVisibleClass), d = 0; e.slides.length > d; d++)
						e.slides[d].className = e.slides[d].className.replace(i, "").replace(j, ""), e.visibleSlides.indexOf(e.slides[d]) >= 0 && (e.slides[d].className += " " + b.slideVisibleClass);
					if (e.slides[e.activeIndex].className += " " + b.slideActiveClass, b.loop) {
						var k = e.loopedSlides;
						e.activeLoopIndex = e.activeIndex - k, e.activeLoopIndex >= e.slides.length - 2 * k && (e.activeLoopIndex = e.slides.length - 2 * k - e.activeLoopIndex), 0 > e.activeLoopIndex && (e.activeLoopIndex = e.slides.length - 2 * k + e.activeLoopIndex)
					} else
						e.activeLoopIndex = e.activeIndex;
					b.pagination && e.updatePagination(a)
				}
			}
		}, e.createPagination = function(a) {
			b.paginationClickable && e.paginationButtons && Q();
			var c = "", f = e.slides.length, g = f;
			b.loop && (g -= 2 * e.loopedSlides);
			for (var h = 0; g > h; h++)
				c += "<" + b.paginationElement + ' class="' + b.paginationElementClass + '"></' + b.paginationElement + ">";
			e.paginationContainer = b.pagination.nodeType ? b.pagination : d(b.pagination)[0], e.paginationContainer.innerHTML = c, e.paginationButtons = [], document.querySelectorAll ? e.paginationButtons = e.paginationContainer.querySelectorAll("." + b.paginationElementClass) : window.jQuery && (e.paginationButtons = d(e.paginationContainer).find("." + b.paginationElementClass)), a || e.updatePagination(), e.callPlugins("onCreatePagination"), b.paginationClickable && R()
		}, e.updatePagination = function(a) {
			if (!(1 > e.slides.length)) {
				if (document.querySelectorAll)
					var c = e.paginationContainer.querySelectorAll("." + b.paginationActiveClass);
				else if (window.jQuery)
					var c = d(e.paginationContainer).find("." + b.paginationActiveClass);
				if (c) {
					for (var f = e.paginationButtons, g = 0; f.length > g; g++)
						f[g].className = b.paginationElementClass;
					var h = b.loop ? e.loopedSlides : 0;
					if (b.paginationAsRange) {
						e.visibleSlides || e.calcVisibleSlides(a);
						for (var i = [], g = 0; e.visibleSlides.length > g; g++) {
							var j = e.slides.indexOf(e.visibleSlides[g]) - h;
							b.loop && 0 > j && ( j = e.slides.length - 2 * e.loopedSlides + j), b.loop && j >= e.slides.length - 2 * e.loopedSlides && ( j = e.slides.length - 2 * e.loopedSlides - j, j = Math.abs(j)), i.push(j)
						}
						for ( g = 0; i.length > g; g++)
							f[i[g]] && (f[i[g]].className += " " + b.paginationVisibleClass);
						b.loop ? f[e.activeLoopIndex].className += " " + b.paginationActiveClass : f[e.activeIndex].className += " " + b.paginationActiveClass
					} else
						b.loop ? f[e.activeLoopIndex].className += " " + b.paginationActiveClass + " " + b.paginationVisibleClass : f[e.activeIndex].className += " " + b.paginationActiveClass + " " + b.paginationVisibleClass
					if (!!b.Swipercallback)
						b.Swipercallback(e.activeIndex);
				}
			}
		}, e.calcVisibleSlides = function(a) {
			var c = [], d = 0, f = 0, h = 0;
			o && e.wrapperLeft > 0 && (a += e.wrapperLeft), !o && e.wrapperTop > 0 && (a += e.wrapperTop);
			for (var i = 0; e.slides.length > i; i++) {
				d += f, f = "auto" == b.slidesPerView ? o ? e.h.getWidth(e.slides[i], !0) : e.h.getHeight(e.slides[i], !0) : g, h = d + f;
				var j = !1;
				b.visibilityFullFit ? (d >= -a && -a + k >= h && ( j = !0), -a >= d && h >= -a + k && ( j = !0)) : (h > -a && -a + k >= h && ( j = !0), d >= -a && -a + k > d && ( j = !0), -a > d && h > -a + k && ( j = !0)), j && c.push(e.slides[i])
			}
			0 == c.length && ( c = [e.slides[e.activeIndex]]), e.visibleSlides = c
		};
		var T =
		void 0;
		e.startAutoplay = function() {
			return T !==
			void 0 ? !1 : (b.autoplay && !b.loop && ( T = setInterval(function() {
				e.swipeNext(!0) || e.swipeTo(0)
			}, b.autoplay)), b.autoplay && b.loop && ( autoPlay = setInterval(function() {
				e.swipeNext()
			}, b.autoplay)), e.callPlugins("onAutoplayStart"),
			void 0)
		}, e.stopAutoplay = function() {
			T && clearInterval(T), T =
			void 0, e.callPlugins("onAutoplayStop")
		}, e.loopCreated = !1, e.removeLoopedSlides = function() {
			if (e.loopCreated)
				for (var a = 0; e.slides.length > a; a++)
					e.slides[a].getData("looped") === !0 && e.wrapper.removeChild(e.slides[a])
		}, e.createLoop = function() {
			if (0 != e.slides.length) {
				e.loopedSlides = b.slidesPerView + b.loopAdditionalSlides;
				for (var a = "", c = "", d = 0; e.loopedSlides > d; d++)
					a += e.slides[d].outerHTML;
				for ( d = e.slides.length - e.loopedSlides; e.slides.length > d; d++)
					c += e.slides[d].outerHTML;
				for (f.innerHTML = c + f.innerHTML + a, e.loopCreated = !0, e.calcSlides(), d = 0; e.slides.length > d; d++)
					(e.loopedSlides > d || d >= e.slides.length - e.loopedSlides) && e.slides[d].setData("looped", !0);
				e.callPlugins("onCreateLoop")
			}
		}, e.fixLoop = function() {
			if (e.activeIndex < e.loopedSlides) {
				var a = e.slides.length - 3 * e.loopedSlides + e.activeIndex;
				e.swipeTo(a, 0, !1)
			} else if (e.activeIndex > e.slides.length - 2 * b.slidesPerView) {
				var a = -e.slides.length + e.activeIndex + e.loopedSlides;
				e.swipeTo(a, 0, !1)
			}
		}, e.loadSlides = function() {
			var a = "";
			e.activeLoaderIndex = 0;
			for (var c = b.loader.slides, d = b.loader.loadAllSlides ? c.length : b.slidesPerView * (1 + b.loader.surroundGroups), f = 0; d > f; f++)
				a += "outer" == b.loader.slidesHTMLType ? c[f] : "<" + b.slideElement + ' class="' + b.slideClass + '" data-swiperindex="' + f + '">' + c[f] + "</" + b.slideElement + ">";
			e.wrapper.innerHTML = a, e.calcSlides(!0), b.loader.loadAllSlides || e.wrapperTransitionEnd(e.reloadSlides, !0)
		}, e.reloadSlides = function() {
			var a = b.loader.slides, c = parseInt(e.activeSlide().data("swiperindex"), 10);
			if (!(0 > c || c > a.length - 1)) {
				e.activeLoaderIndex = c;
				var d = Math.max(0, c - b.slidesPerView * b.loader.surroundGroups), f = Math.min(c + b.slidesPerView * (1 + b.loader.surroundGroups) - 1, a.length - 1);
				if (c > 0) {
					var h = -g * (c - d);
					o ? e.setWrapperTranslate(h, 0, 0) : e.setWrapperTranslate(0, h, 0), e.setWrapperTransition(0)
				}
				if ("reload" === b.loader.logic) {
					e.wrapper.innerHTML = "";
					for (var i = "", j = d; f >= j; j++)
						i += "outer" == b.loader.slidesHTMLType ? a[j] : "<" + b.slideElement + ' class="' + b.slideClass + '" data-swiperindex="' + j + '">' + a[j] + "</" + b.slideElement + ">";
					e.wrapper.innerHTML = i
				} else {
					for (var k = 1e3, l = 0, j = 0; e.slides.length > j; j++) {
						var m = e.slides[j].data("swiperindex");
						d > m || m > f ? e.wrapper.removeChild(e.slides[j]) : ( k = Math.min(m, k), l = Math.max(m, l))
					}
					for (var j = d; f >= j; j++) {
						if (k > j) {
							var n = document.createElement(b.slideElement);
							n.className = b.slideClass, n.setAttribute("data-swiperindex", j), n.innerHTML = a[j], e.wrapper.insertBefore(n, e.wrapper.firstChild)
						}
						if (j > l) {
							var n = document.createElement(b.slideElement);
							n.className = b.slideClass, n.setAttribute("data-swiperindex", j), n.innerHTML = a[j], e.wrapper.appendChild(n)
						}
					}
				}
				e.reInit(!0)
			}
		}, U()
	}
};
Swiper.prototype = {
	plugins : {},
	wrapperTransitionEnd : function(a, b) {
		function f() {
			if (a(c), c.params.queueEndCallbacks && (c._queueEndCallbacks = !1), !b)
				for (var g = 0; e.length > g; g++)
					d.removeEventListener(e[g], f, !1)
		}

		var c = this, d = c.wrapper, e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];
		if (a)
			for (var g = 0; e.length > g; g++)
				d.addEventListener(e[g], f, !1)
	},
	getWrapperTranslate : function(a) {
		var c, d, b = this.wrapper;
		if (window.WebKitCSSMatrix) {
			var e = new WebKitCSSMatrix(window.getComputedStyle(b, null).webkitTransform);
			c = ("" + e).split(",")
		} else {
			var e = window.getComputedStyle(b, null).MozTransform || window.getComputedStyle(b, null).OTransform || window.getComputedStyle(b, null).MsTransform || window.getComputedStyle(b, null).msTransform || window.getComputedStyle(b, null).transform || window.getComputedStyle(b, null).getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
			c = ("" + e).split(",")
		}
		return this.params.useCSS3Transforms ? ("x" == a && ( d = 16 == c.length ? parseFloat(c[12]) : window.WebKitCSSMatrix ? e.m41 : parseFloat(c[4])), "y" == a && ( d = 16 == c.length ? parseFloat(c[13]) : window.WebKitCSSMatrix ? e.m42 : parseFloat(c[5]))) : ("x" == a && ( d = parseFloat(b.style.left, 10) || 0), "y" == a && ( d = parseFloat(b.style.top, 10) || 0)), d || 0
	},
	setWrapperTranslate : function(a, b, c) {
		var d = this.wrapper.style;
		a = a || 0, b = b || 0, c = c || 0, this.params.useCSS3Transforms ? this.support.transforms3d ? d.webkitTransform = d.MsTransform = d.msTransform = d.MozTransform = d.OTransform = d.transform = "translate3d(" + a + "px, " + b + "px, " + c + "px)" : (d.webkitTransform = d.MsTransform = d.msTransform = d.MozTransform = d.OTransform = d.transform = "translate(" + a + "px, " + b + "px)", this.support.transforms || (d.left = a + "px", d.top = b + "px")) : (d.left = a + "px", d.top = b + "px"), this.callPlugins("onSetWrapperTransform", {
			x : a,
			y : b,
			z : c
		})
	},
	setWrapperTransition : function(a) {
		var b = this.wrapper.style;
		b.webkitTransitionDuration = b.MsTransitionDuration = b.msTransitionDuration = b.MozTransitionDuration = b.OTransitionDuration = b.transitionDuration = a / 1e3 + "s", this.callPlugins("onSetWrapperTransition", {
			duration : a
		})
	},
	h : {
		getWidth : function(a, b) {
			var c = window.getComputedStyle(a, null).getPropertyValue("width"), d = parseFloat(c);
			return (isNaN(d) || c.indexOf("%") > 0) && ( d = a.offsetWidth - parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-left")) - parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-right"))), b && (d += parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-right"))), d
		},
		getHeight : function(a, b) {
			if (b)
				return a.offsetHeight;
			var c = window.getComputedStyle(a, null).getPropertyValue("height"), d = parseFloat(c);
			return (isNaN(d) || c.indexOf("%") > 0) && ( d = a.offsetHeight - parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-top")) - parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-bottom"))), b && (d += parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-top")) + parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-bottom"))), d
		},
		getOffset : function(a) {
			var b = a.getBoundingClientRect(), c = document.body, d = a.clientTop || c.clientTop || 0, e = a.clientLeft || c.clientLeft || 0, f = window.pageYOffset || a.scrollTop, g = window.pageXOffset || a.scrollLeft;
			return document.documentElement && !window.pageYOffset && ( f = document.documentElement.scrollTop, g = document.documentElement.scrollLeft), {
				top : b.top + f - d,
				left : b.left + g - e
			}
		},
		windowWidth : function() {
			return window.innerWidth ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth :
			void 0
		},
		windowHeight : function() {
			return window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight :
			void 0
		},
		windowScroll : function() {
			return "undefined" != typeof pageYOffset ? {
				left : window.pageXOffset,
				top : window.pageYOffset
			} : document.documentElement ? {
				left : document.documentElement.scrollLeft,
				top : document.documentElement.scrollTop
			} :
			void 0
		},
		addEventListener : function(a, b, c, d) {
			a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
		},
		removeEventListener : function(a, b, c, d) {
			a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
		}
	},
	setTransform : function(a, b) {
		var c = a.style;
		c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = b
	},
	setTranslate : function(a, b) {
		var c = a.style, d = {
			x : b.x || 0,
			y : b.y || 0,
			z : b.z || 0
		}, e = this.support.transforms3d ? "translate3d(" + d.x + "px," + d.y + "px," + d.z + "px)" : "translate(" + d.x + "px," + d.y + "px)";
		c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = e, this.support.transforms || (c.left = d.x + "px", c.top = d.y + "px")
	},
	setTransition : function(a, b) {
		var c = a.style;
		c.webkitTransitionDuration = c.MsTransitionDuration = c.msTransitionDuration = c.MozTransitionDuration = c.OTransitionDuration = c.transitionDuration = b + "ms"
	},
	support : {
		touch : window.Modernizr && Modernizr.touch === !0 || function() {
			return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
		}(),
		transforms3d : window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
			var a = document.createElement("div");
			return "webkitPerspective" in a.style || "MozPerspective" in a.style || "OPerspective" in a.style || "MsPerspective" in a.style || "perspective" in a.style
		}(),
		transforms : window.Modernizr && Modernizr.csstransforms === !0 || function() {
			var a = document.createElement("div").style;
			return "transform" in a || "WebkitTransform" in a || "MozTransform" in a || "msTransform" in a || "MsTransform" in a || "OTransform" in a
		}(),
		transitions : window.Modernizr && Modernizr.csstransitions === !0 || function() {
			var a = document.createElement("div").style;
			return "transition" in a || "WebkitTransition" in a || "MozTransition" in a || "msTransition" in a || "MsTransition" in a || "OTransition" in a
		}()
	},
	browser : {
		ie8 : function() {
			var a = -1;
			if ("Microsoft Internet Explorer" == navigator.appName) {
				var b = navigator.userAgent, c = RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
				null != c.exec(b) && ( a = parseFloat(RegExp.$1))
			}
			return -1 != a && 9 > a
		}(),
		ie10 : window.navigator.msPointerEnabled
	}
}, (window.jQuery || window.Zepto) && function(a) {
	a.fn.swiper = function(b) {
		var c = new Swiper(a(this)[0], b);
		return a(this).data("swiper", c), c
	}
}(window.jQuery || window.Zepto);
