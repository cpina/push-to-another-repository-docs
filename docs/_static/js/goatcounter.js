function loadGoatCounter() {
	// modified from https://www.educative.io/answers/how-to-dynamically-load-a-js-file-in-javascript
	let url = "//gc.zgo.at/count.js";
	let data_goatcounter = "https://push-to-another-repository-docs.goatcounter.com/count";

	let scriptElement = document.createElement("script");

	scriptElement.setAttribute("src", url);
	scriptElement.setAttribute("type", "text/javascript");
	scriptElement.setAttribute("async", true);
	scriptElement.setAttribute("data-goatcounter", "https://push-to-another-repository-docs.goatcounter.com/count");

	document.body.appendChild(scriptElement);

	// success event 
	scriptElement.addEventListener("load", () => {
		// console.log("GoatCounter loaded");
	});
	// error event
	scriptElement.addEventListener("error", (ev) => {
		// console.log("Error: GoatCounter not loaded", ev);
	});
}


window.addEventListener('DOMContentLoaded', (event) => {
	loadGoatCounter();
});

