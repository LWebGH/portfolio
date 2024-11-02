"use strict";

// ====================================================================================
function defineDocFontSize() {
	return parseFloat(getComputedStyle(document.documentElement).fontSize);
}
// ====================================================================================
const body = document.body;
// ====================================================================================
let header = body.querySelector(".onset"); //!!!
let bodyHasDataGoto = body.querySelector("[data-goto]") ? true : false;
let goTo; // функция прокрутки до блока
// ====================================================================================
//                     ДЛЯ ПРОКРУТКИ ПО ССЫЛКЕ(даже если не в меню)
if (bodyHasDataGoto) {
	goTo = function (elm) {
		try {
			elm.scrollIntoView({
				block: "start",
				inline: "center",
				behavior: "smooth",
			});
		} catch (err) {
			elm.scrollIntoView(top);
		}
	};
	body.addEventListener(
		"click",
		function (event) {
			if (event.target.closest("[data-goto]")) {
				event.preventDefault();
				let strDestination =
					event.target.closest("[data-goto]").dataset.goto;
				let destination = strDestination
					? document.querySelector(strDestination)
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
//                            ФУНКЦИИ МЕНЮ

// ---
if (document.querySelector(".menu")) {
	header.addEventListener("click", actionMenu, {
		capture: false,
		once: false,
		passive: true,
	});

	function actionMenu(event) {
		if (event.target.closest(".burger")) {
			setPropertyWhenMenu();
			body.classList.add("menu-open");
			// для меняющихся размеро в зависимости от размера экрана
			window.addEventListener("resize", setGetPropertyWhenMenu, {
				capture: false,
				once: false,
				passive: true,
			});
		}
		//
		else if (event.target.closest(".menu__item")) {
			closeMenu();
		}
	}
	//---
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
	//---
	function closeMenu() {
		window.removeEventListener("resize", setGetPropertyWhenMenu);
		body.classList.remove("menu-open");
		body.style.removeProperty("--bodyLockPadding_js");
	}
}
//
// ====================================================================================
// ====================================================================================
// ====================================================================================
// ====================================================================================
let filterBlocksButtons = document.querySelectorAll("[data-filter-buttons]");
for (let elm of filterBlocksButtons) {
	let elmValue = elm.dataset.filterButtons;
	if (document.querySelector(`[data-filter-list=${elmValue}]`)) {
		let btnAll = elm.querySelector("[data-filter-btn='all']");
		if (btnAll) btnAll.classList.add("_active");

		elm.addEventListener("click", actionsFilterButtons, {
			capture: false /*Фаза срабатывания обработчика*/,
			once: false /*Вместо removeEventListener*/,
			passive: true /*Если true, то не должен вызовется preventDefault*/,
		});
	}
}
//------
function actionsFilterButtons(event) {
	if (event.target.closest("[data-filter-btn]")) {
		let clickBtn = event.target.closest("[data-filter-btn]");
		let clickBtnValue = clickBtn.dataset.filterBtn;

		let btnsBlock = event.target.closest("[data-filter-buttons]");
		let btnsBlockValue = btnsBlock.dataset.filterButtons;
		let flagMulti = btnsBlock.hasAttribute("data-multi");
		let btnAll = btnsBlock.querySelector("[data-filter-btn='all']");

		let filterListElm = document.querySelector(
			`[data-filter-list=${btnsBlockValue}]`
		);
		let filterItemsElms =
			filterListElm.querySelectorAll("[data-filter-item]");

		if (clickBtn == btnAll) {
			if (!btnAll.classList.contains("_active")) {
				let activeBtnsElms = btnsBlock.querySelectorAll(
					"[data-filter-btn]._active"
				);
				for (let button of activeBtnsElms) {
					button.classList.remove("_active");
				}
				showAll();
			}
		}
		// если клик не по батон ол
		else {
			if (flagMulti) {
				clickBtn.classList.toggle("_active");
				for (let i of filterItemsElms) {
					if (i.dataset.filterItem === clickBtnValue) {
						i.classList.toggle("_show");
					}
				}
				// ----
				let isActiveBtn = btnsBlock.querySelector(
					"[data-filter-btn]._active"
				);
				let listIsFilter = filterListElm.classList.contains("_filter");
				if (
					(isActiveBtn && !listIsFilter) ||
					(!isActiveBtn && listIsFilter)
				) {
					filterListElm.classList.toggle("_filter");
					if (btnAll) btnAll.classList.toggle("_active");
				}
			} else if (!flagMulti) {
				if (clickBtn.classList.contains("_active")) {
					clickBtn.classList.remove("_active");
					showAll();
				}
				//
				else {
					let activeBtn = btnsBlock.querySelector(
						"[data-filter-btn]._active"
					);
					let activeBtnValue = false;
					if (activeBtn) {
						activeBtn.classList.remove("_active");
						activeBtnValue = activeBtn.dataset.filterBtn;
					}

					for (let i of filterItemsElms) {
						if (
							activeBtn &&
							activeBtnValue !== "all" &&
							i.dataset.filterItem === activeBtnValue
						) {
							i.classList.remove("_show");
						}
						if (i.dataset.filterItem === clickBtnValue) {
							i.classList.add("_show");
						}
					}

					let listIsFilter =
						filterListElm.classList.contains("_filter");
					if (!listIsFilter) filterListElm.classList.add("_filter");
					clickBtn.classList.add("_active");
				}
			}
		}

		function showAll() {
			for (let i of filterItemsElms) {
				if (i.classList.contains("_show")) i.classList.remove("_show");
			}
			filterListElm.classList.remove("_filter");
			if (btnAll) btnAll.classList.add("_active");
		}
	}
}
// ====================================================================================
