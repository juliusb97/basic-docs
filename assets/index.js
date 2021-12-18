document.body.onload = function() {

	document.styleSheets[2].disabled = true;
	document.styleSheets[3].disabled = false;

	document.querySelector("#basic-docs-search").addEventListener("input", (e) => {
		console.log(e.target.value);

		document.querySelectorAll(".basic-docs-nav-link").forEach((nav) => {
			nav.style.display = nav.innerText.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) ? "block" : "none";
		});

	});

	document.querySelectorAll(".basic-docs-nav-link").forEach(nav => {
		nav.addEventListener("click", (e) => {
			document.querySelectorAll(".basic-docs-page").forEach((page) => {
				page.style.display = page.id == e.target.innerText ? "block" : "none";
			});
		});
	});

	document.querySelector("#contrast").addEventListener("change", (e) => {
		if(e.target.checked) {
			//LIGHT
			document.documentElement.style.setProperty("--text-color", "#111");
			document.documentElement.style.setProperty("--low-contrast-text", "#777");
			document.documentElement.style.setProperty("--text-color-invert", "white");
			document.documentElement.style.setProperty("--bg1", "#BBB");
			document.documentElement.style.setProperty("--bg2", "#AAA");
			document.documentElement.style.setProperty("--bg3", "#999");
			document.documentElement.style.setProperty("--bg4", "#888");

			//Switch syntax highlighting
			document.styleSheets[2].disabled = false;
			document.styleSheets[3].disabled = true;
		} else {
			//DARK
			document.documentElement.style.setProperty("--text-color", "white");
			document.documentElement.style.setProperty("--low-contrast-text", "#555");
			document.documentElement.style.setProperty("--text-color-invert", "#111");
			document.documentElement.style.setProperty("--bg1", "#222");
			document.documentElement.style.setProperty("--bg2", "#333");
			document.documentElement.style.setProperty("--bg3", "#444");
			document.documentElement.style.setProperty("--bg4", "#555");
			
			//Switch syntax highlighting
			document.styleSheets[2].disabled = true;
			document.styleSheets[3].disabled = false;
		}
	});

}