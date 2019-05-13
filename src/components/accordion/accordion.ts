interface AccordionOptions {}

class Accordion {
	private element: Element;
	private options: AccordionOptions;
	private defaults: AccordionOptions = {};
	private accordionSections: HTMLElement[];
	private textBox: HTMLElement[];
	constructor(_element: Element, options: AccordionOptions) {
		this.element = _element;
		// ⚠️ remove options if you don't use them
		this.options = {
			...this.defaults,
			...options
		};
		// init plugin
		this.init();
		this.setupEvents();
	}

	private init() {
		var self = this;

		fetch('https://baconipsum.com/api/?type=meat-and-filler?format=text').then(function (response) {
			return response.json();
		}).then(function (json) {
			var text: string = JSON.stringify(json);

			self.textBox = Array.prototype.slice.call(self.element.querySelectorAll('.accordion__textBox'));
			self.textBox.forEach(e => e.innerHTML = text);

		});
	}

	private setupEvents() {
		this.accordionSections = [].slice.call(this.element.querySelectorAll('.accordion__sectionContainer'));
		this.accordionSections.forEach(e => e.addEventListener('click', (event) => {
			console.log(e);
			if (e.classList.contains('accordion__sectionContainer--toggled')) {
				e.classList.remove('accordion__sectionContainer--toggled');
				console.log("hey");
			} else {
				this.accordionSections.forEach((e) => {
					e.classList.remove('accordion__sectionContainer--toggled');
				});
				if (e.className == 'accordion__sectionContainer') {
					e.classList.add('accordion__sectionContainer--toggled');
				}
			}
		}));
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
