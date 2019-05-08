interface HeadlineOptions {}

class Headline {
	private element: Element;
	private options: HeadlineOptions;
	private defaults: HeadlineOptions = {};
	constructor(element: Element, options: HeadlineOptions) {
		this.element = element;
		// ⚠️ remove options if you don't use them
		this.options = { ...this.defaults, ...options };
		// init plugin
		this.init();
	}
	private init() {
       // var simon: string = 'Entwickler';
        console.log('component initialized');
	}
}

window['biotope'] = window['biotope'] || {};

window['biotope'].Headline = (
	element: HTMLElement,
	options: HeadlineOptions
) => {
	(() => {
		new Headline(element, options);
	})();
};
