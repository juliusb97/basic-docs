import Page from "./Page";

export default interface Def {
	head: string;
	subhead: string;
	start: string;
	categories: string;
	pages: Page[];
	footer: string;
}