"use strict";
//
const body = document.body;
if (body.querySelector(".menu")) {
	body.addEventListener("click", actionMenu, {
		capture: false,
		once: false,
		passive: true,
	});
	function actionMenu(event) {
		if (event.target.closest(".menu__burger")) {
			setPropertyWhenMenu();
			event.target
				.closest(".menu")
				.querySelector(".menu__list")
				.classList.add("menu-list-open");
			body.classList.add("menu-open");
			window.addEventListener("resize", setPropertyWhenMenu, {
				capture: false,
				once: false,
				passive: true,
			});
		} else if (event.target.closest(".menu-list-open .menu__item")) {
			window.removeEventListener("resize", setPropertyWhenMenu);
			event.target
				.closest(".menu")
				.querySelector(".menu__list")
				.classList.remove("menu-list-open");
			body.classList.remove("menu-open");
			body.style.removeProperty("--bodyLockPadding_js");
		}
	}
	function setPropertyWhenMenu() {
		let lockPaddingValue =
			window.innerWidth -
			body.querySelector(".wrapper").offsetWidth +
			"px";
		body.style.setProperty("--bodyLockPadding_js", lockPaddingValue);
	}
}
// =====================================================================================
const blockTexts = document.querySelector(".box-top__text");
const textsSlids = blockTexts.getElementsByTagName("p");
const blockButtons = document.querySelector(".box-top__top-btns");
const buttonL = blockButtons.querySelector(".box-top__top-button_left");
const buttonR = blockButtons.querySelector(".box-top__top-button_right");
let indexShowingNowText = 0;
function activeFlagBtn() {
	if (indexShowingNowText == 0) {
		buttonL.classList.remove("active");
	} else {
		buttonL.classList.add("active");
	}
	if (indexShowingNowText == textsSlids.length - 1) {
		buttonR.classList.remove("active");
	} else {
		buttonR.classList.add("active");
	}
}
activeFlagBtn();
textsSlids[indexShowingNowText].classList.add("active"); // на всякий случай
function scrollTextsLeft() {
	if (textsSlids[indexShowingNowText - 1]) {
		textsSlids[indexShowingNowText].classList.remove("active");
		indexShowingNowText--;
		textsSlids[indexShowingNowText].classList.add("active");

		textsSlids[0].style.marginLeft = `-${100 * indexShowingNowText}%`;

		activeFlagBtn();
	}
}
function scrollTextsRight() {
	if (textsSlids[indexShowingNowText + 1]) {
		textsSlids[indexShowingNowText].classList.remove("active");
		indexShowingNowText++;
		textsSlids[indexShowingNowText].classList.add("active");

		textsSlids[0].style.marginLeft = `-${100 * indexShowingNowText}%`;

		activeFlagBtn();
	}
}
function scrollTextsUseBtn(event) {
	if (event.target.closest(".box-top__top-button_left")) {
		scrollTextsLeft();
	}
	if (event.target.closest(".box-top__top-button_right")) {
		scrollTextsRight();
	}
}
blockButtons.addEventListener("click", scrollTextsUseBtn, {
	capture: false,
	once: false,
	passive: true,
});
function scrollTextsKeyArrow(event) {
	if (
		(blockTexts.getBoundingClientRect().top > 0 &&
			blockTexts.getBoundingClientRect().top <
				document.documentElement.clientHeight) ||
		(blockTexts.getBoundingClientRect().bottom > 0 &&
			blockTexts.getBoundingClientRect().bottom <
				document.documentElement.clientHeight)
	) {
		if (event.code == "ArrowLeft") {
			scrollTextsLeft();
		} else if (event.code == "ArrowRight") {
			scrollTextsRight();
		}
	}
}
document.addEventListener("keyup", scrollTextsKeyArrow, {
	capture: false,
	once: false,
	passive: true,
});
