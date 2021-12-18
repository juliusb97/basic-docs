import fs from "fs";
import path from "path";
import Def from "./Def";
import { JSDOM } from "jsdom";
import Showdown from "showdown";
import hljs from "highlight.js";

if(fs.existsSync(path.join(__dirname, "../def/def.json"))) {

	//TODO copy default.css to public

	const converter = new Showdown.Converter();

	//Copy static assets
	fs.copyFileSync(path.join(__dirname, "../assets/styles.css"), path.join(__dirname, "../public/styles.css"));
	fs.copyFileSync(path.join(__dirname, "../assets/index.js"), path.join(__dirname, "../public/index.js"));
	fs.copyFileSync(path.join(__dirname, "../node_modules/highlight.js/styles/github-dark.css"), path.join(__dirname, "../public/codeDark.css"));
	fs.copyFileSync(path.join(__dirname, "../node_modules/highlight.js/styles/googlecode.css"), path.join(__dirname, "../public/codeLight.css"));


	//Read def file
	const defFile = fs.readFileSync(path.join(__dirname, "../def/def.json"));
	const def: Def = (JSON.parse(defFile.toString()) as Def);

	//Read pages
	const pageNames = fs.readdirSync(path.join(__dirname, "../def/")).filter(pageName => pageName.includes(".md"));
	const pageContents = new Map<string, string>();

	//Generate page contents
	for(let pageName of pageNames) {
		const content = converter.makeHtml(fs.readFileSync(path.join(__dirname, `../def/${pageName}`)).toString());

		const pageNameId = pageName.split(".")[0].split(" ").join(""); //TODO somehow both '.replace(" ", "")' and '.trim()' don't work here
		const htmlContent = new JSDOM(`<section style="display: ${pageNameId == def.start ? 'block' : 'none'};" class="basic-docs-page" id="${pageNameId}">${content}</section>`);
		
		//syntax highlighting
		htmlContent.window.document.querySelectorAll("code").forEach(code => {
			if(code.classList.item(0))
				code.innerHTML = hljs.highlight(code.innerHTML, { language: code.classList.item(0) }).value;
		});

		//Add headline id's
		htmlContent.window.document.querySelectorAll("h1, h2").forEach(headline => {
			headline.id = `${pageNameId}§${headline.innerHTML}`.split(" ").join(""); //TODO somehow both '.replace(" ", "")' and '.trim()' don't work here
		});

		//Make anchors work
		htmlContent.window.document.querySelectorAll("a").forEach(anchor => {
			anchor.setAttribute("onclick", `routerGo('${anchor.href}')`);
			// anchor.href = `#${anchor.href.split("§")[1]}`;
			anchor.href = "#";
			anchor.innerHTML = `&rdsh;${anchor.innerHTML}`;
			anchor.classList.add("anchor");
		});

		pageContents.set(pageName, htmlContent.window.document.body.innerHTML);
	}

	//Parse
	if(!Object.prototype.hasOwnProperty.call(def, "head")) {
		def.head = "New BasicDocs Site";
	}

	//TODO add more defaults for missing items...

	const htmlTemplate = fs.readFileSync(path.join(__dirname, "../assets/index.html"));
	const dom = new JSDOM(htmlTemplate.toString());
	const doc = dom.window.document;
	const q = function(selector: string) {return dom.window.document.querySelector(selector);};
	const qa = function(selector: string) {return dom.window.document.querySelectorAll(selector);};

	q("#basic-docs-head").innerHTML = def.head;
	q("#basic-docs-subhead").innerHTML = def.subhead;
	q("#basic-docs-footer").innerHTML = def.footer;
	q("#basic-docs-footer-mobile").innerHTML = def.footer;

	//Clear templates
	// q("#basic-docs-nav").innerHTML = "";
	q("#basic-docs-main").innerHTML = "";

	//Create nav items
	const cats = new Map<string, HTMLLIElement>();
	for(const cat of def.categories) {
		const catElement = doc.createElement("li");
		const aElement = doc.createElement("a");
		aElement.href = "#";
		aElement.classList.add("basic-docs-nav-link");
		aElement.innerHTML = cat;
		catElement.append(aElement);

		cats.set(cat, catElement);
	}

	//Create nav sub-items
	const pages = new Map<string, HTMLLIElement>();
	for(const page of def.pages) {
		const liElement = doc.createElement("li");
		const aElement = doc.createElement("a");
		aElement.innerHTML = page.name;
		aElement.href = "#";
		aElement.classList.add("basic-docs-nav-link");
		aElement.classList.add("basic-docs-nav-link-nested");
		liElement.append(aElement);
		
		pages.set(page.name, liElement);

		//Append to nav item
		if(cats.has(page.parent)) {
			let ulElement; 
			if(cats.get(page.parent).childElementCount == 1) {
				ulElement = doc.createElement("ul");
				cats.get(page.parent).append(ulElement);
			} else {
				ulElement = cats.get(page.parent).querySelector("ul");
			}
			

			ulElement.append(pages.get(page.name));
		}
	}

	//Append nav items to dom
	cats.forEach(cat => {
		q("#basic-docs-nav-items").append(cat);
	});

	pageContents.forEach(page => {
		q("#basic-docs-main").innerHTML += page;
	});

	const output = dom.serialize();
	fs.writeFileSync(path.join(__dirname, "../public/index.html"), output);

	console.log("Generated basic-docs, see public directory.");

} else console.error("'def.json' not found. Exiting.");