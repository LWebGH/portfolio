"use strict";
// ====================================================================================
function defineDocFontSize() {
	return parseFloat(getComputedStyle(document.documentElement).fontSize);
}
// ====================================================================================
const body = document.body;
// ====================================================================================
let bodyHasDataGoto = body.querySelector("[data-goto]") ? true : false;
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
if (bodyHasDataGoto) {
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
// ====================================================================================
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
		body.classList.add("menu-list-open");
		window.addEventListener("resize", setPropertyWhenMenu, {
			capture: false,
			once: false,
			passive: true,
		});
	} else if (event.target.closest("ul.menu__list *")) {
		window.removeEventListener("resize", setPropertyWhenMenu);
		event.target
			.closest(".menu")
			.querySelector(".menu__list")
			.classList.remove("menu-list-open");
		body.classList.remove("menu-list-open");
		body.style.removeProperty("--bodyLockPadding_js");
	}
}
function setPropertyWhenMenu() {
	let lockPaddingValue =
		window.innerWidth - body.querySelector(".wrapper").offsetWidth + "px";
	body.style.setProperty("--bodyLockPadding_js", lockPaddingValue);
}
// ====================================================================================

// ====================================================================================
function initializesSlider(
	// 		(!!! Селекторы !!!)
	// блок-контейнер в котором слайды
	selectorBlockSlider = null,
	// слайды
	selectoritemsSlides = null,
	//
	// блок в котором кнопоки-стрелки
	selectorBlockArrowBtns = null,
	// общий клас для кнопок-стрелок
	selectorButtonsArrows = null,
	//
	// блок пагинации
	selectorBlockBtnsPagination = null,
	// буллеты пагинации
	selectorButtonsPagin = null,

	// 		(!!! Опции !!!)
	// пролистование стрелками клавиатуры
	// не включать если поле ввода в экранной досягаемости
	keyboardArrowLR = false,
	// свайп слайдов мышкой или касанием
	// не включачь если слайд является текстовым блоком
	touchOrMouseMoveSlides = false,
	// учесть изменение окна если при этом перестраивается сетка
	gridWhenResizeWindow = true,
	// индекс показуемого элемента
	indexShowingItem = 0
) {
	// ----------------------------------------------
	// блок слайдера, элементы
	const blockSlider = document.querySelector(selectorBlockSlider);
	const itemsSlides = blockSlider.querySelectorAll(selectoritemsSlides);
	// ----------------------------------------------
	// индекс показуемого элемента
	let indexActiveSlide;
	// ------
	if (
		indexShowingItem > 0 &&
		matchingSizesItem_Slider() &&
		indexShowingItem < itemsSlides.length
	) {
		indexActiveSlide = indexShowingItem;
	} else {
		indexActiveSlide = 0;
	}
	// ----------------------------------------------
	/* Функция выявления: сетка или окно слайдера */
	function matchingSizesItem_Slider() {
		return (
			itemsSlides[0].offsetHeight === blockSlider.offsetHeight ||
			itemsSlides[0].offsetWidth === blockSlider.offsetWidth
		);
	}
	// ----------------------------------------------
	/* Общая функция пролистования */
	function scrollItems(indexDifference) {
		if (typeof indexDifference === Number) {
		}
		if (itemsSlides[indexActiveSlide + indexDifference]) {
			let oldIndex = indexActiveSlide;
			indexActiveSlide += indexDifference;

			if (oldIndex !== indexActiveSlide) {
				itemsSlides[oldIndex].classList.remove("active");
			}
			itemsSlides[indexActiveSlide].classList.add("active");

			itemsSlides[0].style.marginLeft = `${indexActiveSlide * -100}%`;

			// -----подсветка кнопок-----
			if (selectorBlockBtnsPagination) activeFlagBtnPagin(oldIndex);
			if (selectorBlockArrowBtns) activeFlagArrowButtons();
		}
	}

	// ================================================================================
	/* Экранные стрелочки пролистования элементов слайдера */
	// ...
	// ================================================================================
	/* Буллет-пагинация слайдера */
	let blockBtnsPagination,
		buttonsPagin,
		activeFlagBtnPagin,
		scrollItemsUseBtnPagin;
	// ------
	if (selectorBlockBtnsPagination) {
		blockBtnsPagination = document.querySelector(
			selectorBlockBtnsPagination
		);
		buttonsPagin =
			blockBtnsPagination.querySelectorAll(selectorButtonsPagin);
		// для подсветки активных кнопок
		activeFlagBtnPagin = function (oldIndex) {
			if (oldIndex !== indexActiveSlide) {
				buttonsPagin[oldIndex].classList.remove("active");
			}
			buttonsPagin[indexActiveSlide].classList.add("active");
		};
		// для выбора элементов с помощью буллетов
		scrollItemsUseBtnPagin = function (event) {
			let buttonClick = event.target.closest(selectorButtonsPagin);
			if (!buttonClick || buttonClick == buttonsPagin[indexActiveSlide]) {
				return;
			} else {
				for (let i = 0; i < buttonsPagin.length; i++) {
					if (buttonsPagin[i] == buttonClick) {
						scrollItems(i - indexActiveSlide);
						break;
					}
				}
			}
		};
		// ----
		blockBtnsPagination.addEventListener("click", scrollItemsUseBtnPagin, {
			capture: false,
			once: false,
			passive: true,
		});
	}
	// ================================================================================
	/* Свайп слайдера */
	// -----
	if (touchOrMouseMoveSlides) {
		let oldEventCX,
			oldEventCY,
			newEventCX,
			newEventCY,
			diffCoordX,
			diffCoordY;
		// -----
		blockSlider.addEventListener("touchstart", handleTouchStart, {
			capture: false,
			once: false,
			passive: true,
		});
		blockSlider.addEventListener("mousedown", handleTouchStart, {
			capture: false,
			once: false,
			passive: true,
		});
		// -----
		function handleTouchStart(event) {
			if (matchingSizesItem_Slider()) {
				// блокировка типо копипаста слайда-фото
				itemsSlides[indexActiveSlide].ondragstart = function () {
					return false;
				};

				itemsSlides[0].style.transition = "margin-left 0s";
				itemsSlides[indexActiveSlide].classList.remove("active");

				if (event.type === "touchstart") {
					oldEventCX = event.touches[0].clientX;
					oldEventCY = event.touches[0].clientY;

					document.addEventListener("touchmove", handleTouchMove, {
						capture: false,
						once: false,
						passive: true,
					});
					document.addEventListener("touchend", handleTouchEnd, {
						capture: false,
						once: true,
						passive: true,
					});
					//
				} else if (event.type === "mousedown") {
					oldEventCX = event.clientX;

					document.addEventListener("mousemove", handleTouchMove, {
						capture: false,
						once: false,
						passive: true,
					});
					document.addEventListener("mouseup", handleTouchEnd, {
						capture: false,
						once: true,
						passive: true,
					});
				}
			}
		}
		// -----------------------------------------------
		function handleTouchMove(event) {
			if (event.type === "touchmove") {
				if (event.touches.length === 1) {
					newEventCX = event.touches[0].clientX;
					newEventCY = event.touches[0].clientY;
					diffCoordX = newEventCX - oldEventCX;
					diffCoordY = newEventCY - oldEventCY;
					if (
						diffCoordX !== 0 &&
						Math.abs(diffCoordX) > Math.abs(diffCoordY / 3)
					) {
						moveSlides();
						oldEventCX = newEventCX;
						oldEventCY = newEventCY;
					}
				}
			} else if (event.type === "mousemove" && event.which === 1) {
				newEventCX = event.clientX;
				diffCoordX = newEventCX - oldEventCX;
				if (diffCoordX !== 0) {
					moveSlides();
					oldEventCX = newEventCX;
				}
			}
		}
		// ----
		function moveSlides() {
			let slideWidth = itemsSlides[0].offsetWidth;
			let viewportWidth = document.documentElement.clientWidth;
			let diffCoef = (viewportWidth / slideWidth) * 100;
			let newValMargL =
				parseFloat(itemsSlides[0].style.marginLeft) +
				(diffCoordX / viewportWidth) * diffCoef;

			if (newValMargL >= 0) {
				itemsSlides[0].style.marginLeft = "0%";
			} else if (newValMargL <= (itemsSlides.length - 1) * -100) {
				itemsSlides[0].style.marginLeft = `${
					(itemsSlides.length - 1) * -100
				}%`;
			} else {
				itemsSlides[0].style.marginLeft = `${newValMargL}%`;
			}
		}

		// --------------------------------------------------------
		function handleTouchEnd(event) {
			if (event.type === "touchend") {
				document.removeEventListener("touchmove", handleTouchMove);
			} else if (event.type === "mouseup") {
				document.removeEventListener("mousemove", handleTouchMove);
			}

			itemsSlides[0].style.transition = "";
			let x = Math.round(
				Math.abs(parseFloat(itemsSlides[0].style.marginLeft)) / 100 +
					Number.EPSILON
			);
			scrollItems(x - indexActiveSlide);
		}
	}
	// ================================================================================
	/* Пролистование элементов стрелочками клавиатуры */
	// -----
	if (keyboardArrowLR) {
		// Срабатует если блок элементов хоть както находится в въюпорте.
		function scrollItemsKeyArrow(event) {
			let edgesBlockSlider = blockSlider.getBoundingClientRect();
			let viewportHeight = document.documentElement.clientHeight;
			if (
				(edgesBlockSlider.top >= 0 &&
					edgesBlockSlider.top < viewportHeight) ||
				(edgesBlockSlider.bottom > 0 &&
					edgesBlockSlider.bottom <= viewportHeight) ||
				(edgesBlockSlider.top <= 0 &&
					edgesBlockSlider.bottom >= viewportHeight)
			) {
				if (matchingSizesItem_Slider()) {
					if (event.code == "ArrowLeft") {
						scrollItems(-1);
					} else if (event.code == "ArrowRight") {
						scrollItems(1);
					}
				}
			}
		}
		// -----
		document.addEventListener("keyup", scrollItemsKeyArrow, {
			capture: false,
			once: false,
			passive: true,
		});
	}
	// ===============================================================================
	/* сброс при изменении размера экрана, если при этом слайдер перестраивается в сетку */
	// ------
	if (gridWhenResizeWindow) {
		function resetResizeWindow(e) {
			if (indexActiveSlide !== 0 && !matchingSizesItem_Slider()) {
				scrollItems(-indexActiveSlide);
			}
		}
		// -----
		window.addEventListener("resize", resetResizeWindow, {
			capture: false,
			once: false,
			passive: true,
		});
	}
	// ================================================================================
	// !!!!!Инициализация!!!!!
	scrollItems(0);
}
let bannerSlider = initializesSlider(
	".banner__background",
	".banner__background-item",
	null,
	null,
	".banner__radio-btns",
	".banner__radio-item",
	true,
	false,
	false,
	0
);
let gallerySlider = initializesSlider(
	".blog__gallery",
	".gallery__item",
	null,
	null,
	".blog__radio-btns",
	".blog__radio-item",
	true,
	true,
	true,
	3
);
// ====================================================================================
