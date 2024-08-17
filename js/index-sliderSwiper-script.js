/**
 * Swiper 11.0.7
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2024 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 27, 2024
 */

// ============================================================================
import { S as Swiper } from "./sliderSwiper/shared/swiper-core.min.mjs";
// import Virtual from "./sliderSwiper/modules/virtual.min.mjs";
// import Keyboard from "./sliderSwiper/modules/keyboard.min.mjs";
// import Mousewheel from "./sliderSwiper/modules/mousewheel.min.mjs";
// import Navigation from "./sliderSwiper/modules/navigation.min.mjs";
// import Pagination from "./sliderSwiper/modules/pagination.min.mjs";
// import Scrollbar from "./sliderSwiper/modules/scrollbar.min.mjs";
// import Parallax from "./sliderSwiper/modules/parallax.min.mjs";
// import Zoom from "./sliderSwiper/modules/zoom.min.mjs";
// import Controller from "./sliderSwiper/modules/controller.min.mjs";
// import A11y from "./sliderSwiper/modules/a11y.min.mjs";
// import History from "./sliderSwiper/modules/history.min.mjs";
// import HashNavigation from "./sliderSwiper/modules/hash-navigation.min.mjs";
import Autoplay from "./sliderSwiper/modules/autoplay.min.mjs";
// import Thumb from "./sliderSwiper/modules/thumbs.min.mjs";
// import freeMode from "./sliderSwiper/modules/free-mode.min.mjs";
// import Grid from "./sliderSwiper/modules/grid.min.mjs";
// import Manipulation from "./sliderSwiper/modules/manipulation.min.mjs";
// import EffectFade from "./sliderSwiper/modules/effect-fade.min.mjs";
// import EffectCube from "./sliderSwiper/modules/effect-cube.min.mjs";
// import EffectFlip from "./sliderSwiper/modules/effect-flip.min.mjs";
// import EffectCoverflow from "./sliderSwiper/modules/effect-coverflow.min.mjs";
// import EffectCreative from "./sliderSwiper/modules/effect-creative.min.mjs";
// import EffectCards from "./sliderSwiper/modules/effect-cards.min.mjs";
const modules = [
	// Virtual,
	// Keyboard,
	// Mousewheel,
	// Navigation,
	// Pagination,
	// Scrollbar,
	// Parallax,
	// Zoom,
	// Controller,
	// A11y,
	// History,
	// HashNavigation,
	Autoplay,
	// Thumb,
	// freeMode,
	// Grid,
	// Manipulation,
	// EffectFade,
	// EffectCube,
	// EffectFlip,
	// EffectCoverflow,
	// EffectCreative,
	// EffectCards,
];
Swiper.use(modules);
export { Swiper, Swiper as default };
//# sourceMappingURL=swiper-bundle.min.mjs.map

//-----------------------------------------------------------------------------

const sliderSwiper1 = new Swiper(".foods-slider", {
	direction: "horizontal",
	loop: true,
	slidesPerView: 1,
	freeMode: true,
	speed: 2500,

	observer: true,
	observeParents: true,
	observeSlideChildren: true,

	grabCursor: true,

	autoplay: {
		delay: 50,
		// Закончить на последнем слайде
		stopOnLastSlide: false,
		// Отключить после ручного переключения
		disableOnInteraction: true,
	},

	breakpoints: {
		320: {
			slidesPerView: 1.2,
		},
		535: {
			slidesPerView: 2.25,
		},
		992: {
			slidesPerView: 3.3,
		},
		/* 1600: {
			slidesPerView: 4.3,

		}, */
	},
});
