# basic-docs.js

This is a generator for a quick and simple documentation website.  
It's created as a single page application.
  
  
## Generating a site

- run `npm i`
- edit/rewrite the definition file in `def/def.json`
- write page files in Markdown, also in the `def` directory; basic-docs will automatically match the file names to the page names in the definition file
- run `npm run start`

That's it, the generated page is located in the `public` directory!

Tip: 
I've also integrated syntax hightlighting for code. In your Markdown files, write three backticks and then the name of your language.

This project uses [JSDOM](https://github.com/jsdom/jsdom), [highlight.js](https://github.com/highlightjs/highlight.js/) and [showdown.js](https://github.com/showdownjs/showdown), so many thanks to everyone involved there, this would have been way harder without you!