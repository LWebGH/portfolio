"use strict";function defineDocFontSize(){return parseFloat(getComputedStyle(document.documentElement).fontSize)}const body=document.body;let header=body.querySelector(".header"),bodyHasDataGoto=!!body.querySelector("[data-goto]");//!!!
function goTo(e){try{e.scrollIntoView({block:"start",inline:"center",behavior:"smooth"})}catch(t){e.scrollIntoView(top)}}function setHeaderVariableHeight(){body.style.setProperty("--headerVariableHeight_js",header.offsetHeight/defineDocFontSize()+"rem")}if(bodyHasDataGoto&&body.addEventListener("click",(function(e){if(e.target.closest("[data-goto]")){e.preventDefault();let t=e.target.closest("[data-goto]").dataset.goto,o=!!t&&document.querySelector(t);o&&goTo(o)}}),{capture:!1,once:!1,passive:!1}),document.querySelector(".menu")){function e(e){e.target.closest(".burger")?body.classList.contains("menu-open")?c():(o(),body.classList.add("menu-open"),goTo(header),window.addEventListener("resize",t,{capture:!1,once:!1,passive:!0})):e.target.closest(".menu__item")&&c()}function t(){o(),s()}function o(){setHeaderVariableHeight();let e=window.innerWidth-body.querySelector(".wrapper").offsetWidth+"px";body.style.setProperty("--bodyLockPadding_js",e)}function s(){let e=body.querySelector(".burger");"none"===getComputedStyle(e).display&&c()}function c(){window.removeEventListener("resize",t),body.classList.remove("menu-open"),body.style.removeProperty("--bodyLockPadding_js")}header.addEventListener("click",e,{capture:!1,once:!1,passive:!0})}let cardsElm=body.querySelector(".onset__cards"),cardsList=cardsElm.querySelectorAll("[data-select-location]"),cardsSelect=body.querySelector(".cards-select"),wrapSelection=cardsSelect.querySelector(".cards-select__wrap-selection"),boxSelection=wrapSelection.querySelector(".cards-select__box-selection");if(cardsList){let a=[];for(let r of cardsList){let n=r.dataset.selectLocation;if(!a.includes(n)){a.push(n);let l=`\n\t\t\t<li class='cards-select__box-option'>\n\t\t\t\t<button\n\t\t\t\t\tclass='cards-select__box-option-btn' \n\t\t\t\t\tdata-select-location="${n}"\n\t\t\t\t>\n\t\t\t\t\t${n}\n\t\t\t\t</button>\n\t\t\t</li>\n\t\t\t`;boxSelection.insertAdjacentHTML("beforeend",l)}}}function setHeightSelectBody(){let e=boxSelection.offsetHeight;wrapSelection.style.height=`${e}px`}function defineTransDur(e){return parseFloat(getComputedStyle(e).transitionDuration)}function actionsLocation(e){if(e.target.closest(".cards-select")){if(e.target.closest(".cards-select__preview")){let e=1;cardsSelect.classList.contains("_active")||(e=1e3*defineTransDur(wrapSelection)),setHeightSelectBody(),cardsSelect.classList.toggle("_active"),setTimeout((()=>wrapSelection.style.removeProperty("height")),e)}else if(e.target.closest("[data-select-location]")){let t=e.target.closest("[data-select-location]"),o=t.dataset.selectLocation;t.classList.toggle("_active");for(let e of cardsList)e.dataset.selectLocation===o&&e.classList.toggle("_show");cardsElm.querySelector("._show")?cardsElm.classList.contains("_filter")||cardsElm.classList.add("_filter"):cardsElm.classList.remove("_filter")}}else if(e.target.closest(".card__star")){e.target.closest(".card__star").classList.toggle("_active")}}document.addEventListener("click",actionsLocation,{capture:!1,once:!1,passive:!0});