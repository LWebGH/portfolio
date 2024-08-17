"use strict";
const body = document.body;
// ====================================================================================
function goTo(elm) {
	try {
		elm.scrollIntoView({
			block: "start",
			inline: "center",
			behavior: "smooth",
		});
	} catch (err) {
		elm.scrollIntoView(top);
	}
}
if (body.querySelector("[data-goto]")) {
	body.addEventListener(
		"click",
		function (event) {
			if (event.target.closest("[data-goto]")) {
				event.preventDefault();
				let strDestination =
					event.target.closest("[data-goto]").dataset.goto;
				let destination = strDestination
					? body.querySelector(strDestination)
					: false;
				if (destination) goTo(destination);
			}
		},
		{
			capture: false,
			once: false,
			passive: false,
		}
	);
}
// ==================================================================================
let header = body.querySelector(".banner__header");
if (document.querySelector(".menu")) {
	header.addEventListener("click", actionMenu, {
		capture: false,
		once: false,
		passive: true,
	});
	function actionMenu(event) {
		if (event.target.closest(".burger")) {
			if (!body.classList.contains("menu-open")) {
				setPropertyWhenMenu();
				body.classList.add("menu-open");
				goTo(body);
				window.addEventListener("resize", setGetPropertyWhenMenu, {
					capture: false,
					once: false,
					passive: true,
				});
			} else closeMenu();
		} else if (event.target.closest(".menu-open .menu__item")) closeMenu();
	}
	function setGetPropertyWhenMenu() {
		setPropertyWhenMenu();
		closeMenuIfNotUse();
	}
	function setPropertyWhenMenu() {
		let lockPaddingValue =
			window.innerWidth -
			body.querySelector(".wrapper").offsetWidth +
			"px";
		body.style.setProperty("--bodyLockPadding_js", lockPaddingValue);
	}
	function closeMenuIfNotUse() {
		let burger = body.querySelector(".burger");
		if (getComputedStyle(burger).display === "none") closeMenu();
	}
	function closeMenu() {
		window.removeEventListener("resize", setGetPropertyWhenMenu);
		body.classList.remove("menu-open");
		body.style.removeProperty("--bodyLockPadding_js");
	}
}
