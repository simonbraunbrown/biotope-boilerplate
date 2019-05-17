interface FilterListOptions {}

class FilterList {
	private element: Element;
	private options: FilterListOptions;
	private defaults: FilterListOptions = {};
	constructor(element: Element, options: FilterListOptions) {
		this.element = element;
		// ⚠️ remove options if you don't use them
		this.options = { ...this.defaults, ...options };
		// init plugin
		this.init();
	}
	private init() {
		// init plugin here
	}
}

window['biotope'] = window['biotope'] || {};

window['biotope'].FilterList = (
	element: HTMLElement,
	options: FilterListOptions
) => {
	(() => {
		new FilterList(element, options);
	})();
};
