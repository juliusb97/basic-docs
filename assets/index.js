document.body.onload = function() {

	document.styleSheets[2].disabled = true;
	document.styleSheets[3].disabled = false;

	routerGo = function(target) {
		const targetArray = target.split("§");
		let targetElement;

		document.querySelectorAll(".basic-docs-page").forEach((page) => {
			if(page.id == targetArray[0]) {
				page.style.display = "block";
				if(targetArray[1])
					targetElement = page.querySelector(`#${target}`);
			} else {
				page.style.display = "none";
			}
		});

		if(targetElement)
			targetElement.scrollIntoView();
	};

	scrollTop = function() {
		document.querySelector("#basic-docs-main").scroll(0, 0);
	}

	document.querySelector("#basic-docs-scroll-top").addEventListener("click", (e) => {
		scrollTop();
	});

	document.querySelector("#basic-docs-main").addEventListener("scroll", (e) => {
		const currentHeight = e.target.scrollY || e.target.scrollTop;
		if(currentHeight > 100){
			document.querySelector("#basic-docs-scroll-top").style.display = "flex";
		} else {
			document.querySelector("#basic-docs-scroll-top").style.display = "none";
		}
	});

	document.querySelector("#basic-docs-search").addEventListener("input", (e) => {
		console.log(e.target.value);

		document.querySelectorAll(".basic-docs-nav-link").forEach((nav) => {
			nav.style.display = nav.innerText.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) ? "block" : "none";
		});

	});

	document.querySelectorAll(".basic-docs-nav-link").forEach(nav => {
		nav.addEventListener("click", (e) => {
			document.querySelectorAll(".basic-docs-page").forEach((page) => {
				page.style.display = page.id == e.target.innerText.replace(" ", "") ? "block" : "none";
			});
		});
	});

	document.querySelector("#contrast").addEventListener("change", (e) => {
		if(e.target.checked) {
			//LIGHT
			document.documentElement.style.setProperty("--text-color", "#111");
			document.documentElement.style.setProperty("--low-contrast-text", "#777");
			document.documentElement.style.setProperty("--medium-contrast-text", "#333");
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
			document.documentElement.style.setProperty("--text-color", "#B8B8B8");
			document.documentElement.style.setProperty("--low-contrast-text", "#555");
			document.documentElement.style.setProperty("--medium-contrast-text", "#999");
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