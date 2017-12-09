var writeUs = document.querySelector(".button-contacts-write-us");
var writeUsPopup = document.querySelector(".modal-write-us");
var writeUsClose = writeUsPopup.querySelector(".modal-close");

var writeUsForm = writeUsPopup.querySelector("form");
var writeUsLogin = writeUsPopup.querySelector("[name=name]");
var writeUsEmail = writeUsPopup.querySelector("[name=email]");
var writeUsMessage = writeUsPopup.querySelector("[name=text]");

function localStorageIsOk() {
	try {
		return "localStorage" in window && window["localStorage"] !== null;
	} catch(e) {
		return false;
	}
}
 
if (localStorageIsOk()) {
	var writeUsLoginCached = localStorage.getItem("writeUsLogin");
	var writeUsEmailCached = localStorage.getItem("writeUsEmail");
} else {
	console.log("localStorage is not supported, will not use cached values");
}

var map = document.querySelector(".contacts .contacts-map");
var mapPopup = document.querySelector(".modal-map");
var mapClose = mapPopup.querySelector(".modal-close");

writeUs.addEventListener("click", function(evt) {
	evt.preventDefault();
	writeUsPopup.classList.add("modal-show");
	if (writeUsLoginCached) {
		writeUsLogin.value = writeUsLoginCached;
		if (writeUsEmailCached) {
			writeUsEmail.value = writeUsEmailCached;
			writeUsMessage.focus();
		} else {
			writeUsEmail.focus();
		}
	} else {
		writeUsLogin.focus();
	}
});

writeUsClose.addEventListener("click", function(evt) {
	evt.preventDefault();
	writeUsPopup.classList.remove("modal-show");
	writeUsPopup.classList.remove("modal-error");
});

writeUsForm.addEventListener("submit", function(evt) {
	if (!writeUsLogin.value || !writeUsEmail.value || !writeUsMessage.value) {
		evt.preventDefault();
		writeUsPopup.classList.remove("modal-error");
		writeUsPopup.offsetWidth = writeUsPopup.offsetWidth;
		writeUsPopup.classList.add("modal-error");
	} else {
		localStorage.setItem("writeUsLogin", writeUsLogin.value);
		localStorage.setItem("writeUsEmail", writeUsEmail.value);
	}
});

window.addEventListener("keydown", function(evt) {
	if (evt.keyCode === 27) {
		if (writeUsPopup.classList.contains("modal-show")) {
			writeUsPopup.classList.remove("modal-show");
			writeUsPopup.classList.remove("modal-error");
		}
		if (mapPopup.classList.contains("modal-show")) {
			mapPopup.classList.remove("modal-show");
		}
	}
});

map.addEventListener("click", function(evt) {
	evt.preventDefault();
	console.log("map here");
	mapPopup.classList.add("modal-show");
});

mapClose.addEventListener("click", function(evt) {
	evt.preventDefault();
	mapPopup.classList.remove("modal-show");
});