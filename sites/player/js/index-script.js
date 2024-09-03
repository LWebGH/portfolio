"use strict";
const body = document.body;
// ====================================================================================
// ====================================================================================
// !video!.play() - проиграть видео
// !video!.pause() - поставить видео на паузу
// !video!.paused - выдаст труе если видео на паузе
// !video!.currentTime - пройдено видео(в секундах)
// !video!.currentTime = 0; - задать временую позицию видео(в секундах)
// !video!.duration - общая продолжительность видео(в секундах)
// "timeupdate" - событие времени видео
// !video!.volume=1 - задать звук(1 это 100%)
/* 
// 			!video!... - на полный экран  (ХУЙНЯ)
function switchingFullScreen(event) {
	if (video.webkitEnterFullScreen) {
		video.webkitEnterFullScreen();
	} else if (video.requestFullscreen) {
		video.requestFullscreen(); // Chrome
	} else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen(); // Safari
	} else if (video.msRequestFullscreen) {
		video.msRequestFullscreen(); // IE/Edge
	}
}
 */
// ====================================================================================
let videoBlock = body.querySelector(".video");
if (videoBlock) {
	let video = videoBlock.querySelector("video");
	let videoButton = videoBlock.querySelector(".video__btn");
	//
	let videoControls = videoBlock.querySelector(".video__controls");
	//
	let btnPlay = videoBlock.querySelector(".controls__play");
	let btnStop = videoBlock.querySelector(".controls__stop");
	let btnFullScreen = videoBlock.querySelector(".controls__full-screen");
	//
	let progressTrack = videoBlock.querySelector(".controls__progress-track");
	let progressFilling = videoBlock.querySelector(
		".controls__progress-filling"
	);
	let progressThumb = videoBlock.querySelector(".controls__progress-thumb");
	//
	let volumeTrack = videoBlock.querySelector(".controls__volume-track");
	let volumeFilling = videoBlock.querySelector(".controls__volume-filling");
	let volumeThumb = videoBlock.querySelector(".controls__volume-thumb");
	//
	let time = videoBlock.querySelector(".controls__time");
	//
	let oldEventCX, usedTrack, timeDetectDblClTch, timeShowControls, flagJump;
	// ============================================================================
	videoButton.addEventListener("click", actionVideo, {
		capture: false,
		once: true,
		passive: true,
	});
	function actionVideo(event) {
		showControls();
		toggleVideoStatus();
		videoBlock.classList.add("_active");

		// ==================================================================
		videoBlock.addEventListener("click", actionsVideoBlock, {
			capture: false /*Фаза срабатывания обработчика*/,
			once: false /*Вместо removeEventListener*/,
			passive: true /*Если true, то не должен вызовется preventDefault*/,
		});
		// "timeupdate" - событие времени видео  //!!!!!!!!!!!!!!
		video.addEventListener("timeupdate", updateTimeline, {
			capture: false /*Фаза срабатывания обработчика*/,
			once: false /*Вместо removeEventListener*/,
			passive: true /*Если true, то не должен вызовется preventDefault*/,
		});
		// ----
		videoControls.addEventListener("touchstart", defineThumb, {
			capture: false,
			once: false,
			passive: true,
		});
		videoControls.addEventListener("mousedown", defineThumb, {
			capture: false,
			once: false,
			passive: true,
		});
		//--------
		videoBlock.addEventListener("mousemove", showControls, {
			capture: false,
			once: false,
			passive: true,
		});

		// =======================================================================
		document.addEventListener("keydown", actionsKeyboard, {
			capture: true /*Фаза срабатывания обработчика*/,
			once: false /*Вместо removeEventListener*/,
			passive: false /*Если true, то не должен вызовется preventDefault*/,
		});

		// ========================================================================
		// ========================================================================
		// videoBlock.addEventListener("touchend", actionsVideoBlock, {
		// 	capture: false /*Фаза срабатывания обработчика*/,
		// 	once: false /*Вместо removeEventListener*/,
		// 	passive: true /*Если true, то не должен вызовется preventDefault*/,
		// });
		// videoBlock.addEventListener("mouseup", actionsVideoBlock, {
		// 	capture: false /*Фаза срабатывания обработчика*/,
		// 	once: false /*Вместо removeEventListener*/,
		// 	passive: true /*Если true, то не должен вызовется preventDefault*/,
		// });

		// =================================================================

		function actionsVideoBlock(event) {
			console.log(event);
			if (!event.target.closest("._active-controls .video__controls")) {
				// console.log(event.pointerType);
				if (timeDetectDblClTch) {
					switchingFullScreen();
					clearTimeout(timeDetectDblClTch);
					timeDetectDblClTch = false;
				} else {
					timeDetectDblClTch = setTimeout(() => {
						otherActions(event);
						clearTimeout(timeDetectDblClTch);
						timeDetectDblClTch = false;
					}, 200);
				}
			}
			//
			else otherActions(event);
			//
			function otherActions(event) {
				if (event.target.closest("._active-controls")) {
					if (
						event.target.closest(".controls__play") ||
						event.target.closest("video")
					) {
						toggleVideoStatus();
					}
					//
					else if (event.target.closest(".controls__stop")) {
						stopVideo();
					}
					//
					else if (event.target.closest(".controls__full-screen")) {
						switchingFullScreen();
					}
					//
					else if (
						event.target.closest(".controls__progress-track") &&
						!event.target.closest(".controls__progress-thumb")
					) {
						usedTrack = "progress";
						moveScale(event.clientX, false);
					}
					//
					else if (
						event.target.closest(".controls__volume-track") &&
						!event.target.closest(".controls__volume-thumb")
					) {
						usedTrack = "volume";
						moveScale(event.clientX, false);
					}
				}
				showControls();
			}
		}
		// ======================================================================
		function showControls() {
			if (!timeShowControls) {
				setTimeout(
					() => videoBlock.classList.add("_active-controls"),
					3
				);
			} else {
				clearTimeout(timeShowControls);
			}
			timeShowControls = setTimeout(() => {
				videoBlock.classList.remove("_active-controls");
				clearTimeout(timeShowControls);
				timeShowControls = false;
			}, 3000);
		}
		// =======================================================================
		// play/pause видео
		function toggleVideoStatus() {
			if (video.paused) {
				video.play(); //!
				btnPlay.classList.add("_active");
			} else {
				video.pause(); //!
				btnPlay.classList.remove("_active");
			}
		}
		// ==========================================================================
		// стоп видео
		function stopVideo(event) {
			video.currentTime = 0; //!
			video.pause();
			btnPlay.classList.remove("_active");
		}
		// ==========================================================================
		// фулскрин
		function switchingFullScreen() {
			if (document.fullscreenEnabled || document.mozFullScreenEnabled) {
				if (
					document.fullscreenElement ||
					document.mozFullScreenElement
				) {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					}
					//
					// videoBlock.removeEventListener("mousemove", hideCursor);
					// clearTimeout(timeCursor);
					// timeCursor = 0;
					// videoBlock.classList.remove("_no-cursor");
				}
				//
				else {
					if (videoBlock.requestFullscreen) {
						videoBlock.requestFullscreen(); // Chrome
					} else if (videoBlock.webkitEnterFullScreen) {
						videoBlock.webkitEnterFullScreen();
					} else if (videoBlock.webkitRequestFullscreen) {
						videoBlock.webkitRequestFullscreen(); // Safari
					} else if (videoBlock.msRequestFullscreen) {
						videoBlock.msRequestFullscreen(); // IE/Edge
					}
					//------------
					// videoBlock.addEventListener("mousemove", hideCursor, {
					// 	capture: false,
					// 	once: false,
					// 	passive: true,
					// });
					// hideCursor();
				}
			}
		}
		// let timeCursor;
		// function hideCursor() {
		// 	if (timeCursor) {
		// 		videoBlock.classList.remove("_no-cursor");
		// 		clearTimeout(timeCursor);
		// 		timeCursor = 0;
		// 	}
		// 	timeCursor = setTimeout(
		// 		() => videoBlock.classList.add("_no-cursor"),
		// 		3000
		// 	);
		// }

		// =========================================================================
		// обновление таймера и прогресбара по событию обновления времени
		function updateTimeline() {
			updateTimer();
			updateProgressbar();
		}
		// таймер
		function updateTimer() {
			let minutes = Math.floor(video.currentTime / 60); //!!!!!!!!
			if (minutes < 10) {
				minutes = "0" + String(minutes);
			}
			let seconds = Math.floor(video.currentTime % 60); //!!!!!!!!
			if (seconds < 10) {
				seconds = "0" + String(seconds);
			}
			time.innerHTML = `${minutes}:${seconds}`;
		}
		// прогрес бар
		function updateProgressbar() {
			let progressValue = `${
				(video.currentTime / video.duration) * 100
			}%`;
			progressFilling.style.width = progressValue;
			progressThumb.style.left = progressValue;
		}
		// ======================================================================
		// функция изменения положения ползунка и заполнения трека
		// для прогресбара и звука
		function moveScale(newEventCX, checkingLimits = true) {
			let track, filling, thumb;
			if (usedTrack === "progress") {
				track = progressTrack;
				filling = progressFilling;
				thumb = progressThumb;
			} else if (usedTrack === "volume") {
				track = volumeTrack;
				filling = volumeFilling;
				thumb = volumeThumb;
			}

			let trackWidth = track.offsetWidth;
			let trackPosition = track.getBoundingClientRect();
			let newValTrack =
				((newEventCX - trackPosition.left) / trackWidth) * 100;

			if (checkingLimits) {
				if (newValTrack <= 0 || newEventCX <= trackPosition.left) {
					newValTrack = 0;
				} else if (
					newValTrack >= 100 ||
					newEventCX >= trackPosition.right
				) {
					newValTrack = 100;
				}
			}

			thumb.style.left = `${newValTrack}%`;
			filling.style.width = `${newValTrack}%`;
			if (usedTrack == "progress") {
				video.currentTime = (video.duration / 100) * newValTrack;
			} else if (usedTrack == "volume") {
				video.volume = newValTrack / 100;
			}
		}
		// ================================================================
		//
		function defineThumb(event) {
			if (event.target.closest(".controls__volume-thumb")) {
				usedTrack = "volume";
				handleTouchStart(event);
			} else if (event.target.closest(".controls__progress-thumb")) {
				usedTrack = "progress";
				handleTouchStart(event);
			}
		}
		function handleTouchStart(event) {
			// блокировка типо копипаста слайда-фото
			progressThumb.ondragstart = function () {
				return false;
			};
			// отмена выдиления текста
			progressThumb.onselectstart = function () {
				return false;
			};
			//
			videoControls.classList.add("_active");
			//
			if (event.type === "touchstart") {
				oldEventCX = event.touches[0].clientX;
				document.addEventListener("touchmove", handleTouchMove, {
					capture: false,
					once: false,
					passive: false,
				});
				document.addEventListener("touchend", handleTouchEnd, {
					capture: false,
					once: true,
					passive: true,
				});
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
		function handleTouchMove(event) {
			if (event.type === "touchmove" && event.touches.length === 1) {
				event.preventDefault(); // отключение вертикального скрола на тачскрине
				let newEventCX = event.touches[0].clientX;
				let diffCoordX = newEventCX - oldEventCX;
				if (diffCoordX !== 0) {
					moveScale(newEventCX);
					oldEventCX = newEventCX;
				}
			} else if (event.type === "mousemove" && event.which === 1) {
				let newEventCX = event.clientX;
				let diffCoordX = newEventCX - oldEventCX;
				if (diffCoordX !== 0) {
					moveScale(newEventCX);
					oldEventCX = newEventCX;
				}
			}
		}
		function handleTouchEnd(event) {
			videoControls.classList.remove("_active");
			if (event.type === "touchend") {
				document.removeEventListener("touchmove", handleTouchMove);
			} else if (event.type === "mouseup") {
				document.removeEventListener("mousemove", handleTouchMove);
			}
		}

		// =================================================================
		function actionsKeyboard(event) {
			if (event.code == "ArrowLeft" && allowJumping(event)) {
				showControls();
				video.currentTime -= 3;
			} else if (event.code == "ArrowRight" && allowJumping(event)) {
				showControls();
				video.currentTime += 3;
			} else if (
				event.code == "Space" &&
				!event.repeat &&
				checkActiveElement(document.activeElement) &&
				checkBlockInViewport()
			) {
				event.preventDefault();
				showControls();
				toggleVideoStatus();
			}
			//---
			function allowJumping(event) {
				if (!event.repeat) {
					flagJump =
						checkActiveElement(document.activeElement) &&
						checkBlockInViewport();
					if (flagJump) {
						document.addEventListener(
							"keyup",
							(e) => (flagJump = false),
							{
								capture: true,
								once: true,
								passive: true,
							}
						);
					}
				}
				return flagJump;
			}
			function checkActiveElement(docActEl) {
				let docActElTag = docActEl.tagName;
				if (docActElTag == "TEXTAREA") {
					return false;
				} else if (docActElTag == "INPUT") {
					let docActElType = docActEl.type;
					return (
						docActElType == "button" ||
						docActElType == "submit" ||
						docActElType == "reset"
					);
				} else {
					return true;
				}
			}
			function checkBlockInViewport() {
				let edgesVideoBlock = videoBlock.getBoundingClientRect();
				let viewportHeight = document.documentElement.clientHeight;
				return (
					(edgesVideoBlock.top >= 0 &&
						edgesVideoBlock.top < viewportHeight) ||
					(edgesVideoBlock.bottom > 0 &&
						edgesVideoBlock.bottom <= viewportHeight) ||
					(edgesVideoBlock.top <= 0 &&
						edgesVideoBlock.bottom >= viewportHeight)
				);
			}
		}
	}
}
//

// ====================================================================================
