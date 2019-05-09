interface AccordionOptions {}

class Accordion {
	private element: any;
	private options: AccordionOptions;
    private defaults: AccordionOptions = {};
    private textBox: HTMLElement[];
	constructor(element: Element, options: AccordionOptions) {
		this.element = element;
		// ⚠️ remove options if you don't use them
		this.options = { ...this.defaults, ...options };
		// init plugin
		this.init();
	}
	private init() {
        this.textBox = this.element.querySelectorAll('.accordion__textBox');
        this.textBox.forEach(e => e.innerHTML = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.');
        
	}
}

window['biotope'] = window['biotope'] || {};

window['biotope'].Accordion = (
	element: HTMLElement,
	options: AccordionOptions
) => {
	(() => {
		new Accordion(element, options);
	})();
};