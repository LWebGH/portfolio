"use strict";function setHeightFromFilling(e){let t=e.children,s=0;for(let e of t)s+=e.offsetHeight;e.style.height=`${s}px`}function defineTransDur(e){return parseFloat(getComputedStyle(e).transitionDuration)}const langButtonsElms=document.querySelectorAll("[data-lang-btn]");if(langButtonsElms.length>0){let e,t;const s=[];for(let c of langButtonsElms){let r=c.dataset.langBtn.toLowerCase();s.push(r),c.classList.contains("_selected")&&(e=c,t=r)}let l=!!localStorage.getItem("language")&&localStorage.getItem("language").toLowerCase()||t||"ua";if(l!==t&&s.includes(l)){e&&e.classList.remove("_selected");for(let u of langButtonsElms){if(u.dataset.langBtn.toLowerCase()===l){n(u);break}}}else e||n(langButtonsElms[0]);function n(s){e=s,t=e.dataset.langBtn.toLowerCase(),e.classList.add("_selected")}let a,o=document.querySelector(".site-language__preview-content");function i(){o&&(o.textContent=e.textContent)}function g(e){if(a){if(e.target.closest(".site-language__btn")){document.querySelector(".site-language__btn._selected").classList.remove("_selected"),n(e.target.closest(".site-language__btn")),localStorage.setItem("language",t),i()}s(),a=!1}else(e.target.closest(".site-language__icon")||e.target.closest(".site-language__preview"))&&(s(),a=!a);function s(){let e=body.querySelector(".site-language__body"),t=e.querySelector(".site-language__box-selection"),s=1;e.classList.contains("_active")||(s=1e3*defineTransDur(t)),setHeightFromFilling(t),e.classList.toggle("_active"),setTimeout((()=>t.style.removeProperty("height")),s)}}i(),document.addEventListener("click",g,{capture:!1,once:!1,passive:!0})}else document.querySelector(".site-language").style.display="none";