interface HeadlineOptions {}

class Headline {
	private element: any;
	private options: HeadlineOptions;
    private defaults: HeadlineOptions = {};
    private quad: HTMLElement;
	constructor(element: Element, options: HeadlineOptions) {
		this.element = element;
		// ⚠️ remove options if you don't use them
		this.options = { ...this.defaults, ...options };
		// init plugin
		this.init();
	}
	private init() {
        // var simon: string = 'Entwickler';
        // this.element.style.color = 'lime';
        this.quad = this.element.querySelector('.headline__quad');
     
        this.quad.innerHTML = 'i am a gradient';
        
        
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