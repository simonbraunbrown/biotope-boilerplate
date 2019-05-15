interface AccordionOptions {
	APILink: string
}

class Accordion {
	private element: Element;
	private options: AccordionOptions;
	private defaults: AccordionOptions = {
		APILink: 'https://baconipsum.com/api/?type=meat-and-filler?format=text'
	};
	private accordionSections: HTMLElement[];
	private textBox: HTMLElement[];
	private biotope: any = (<any>window).biotope;
	constructor(_element: Element, options: AccordionOptions) {
		this.element = _element;
		// ⚠️ remove options if you don't use them
		this.options = {
			...this.defaults,
			...options
		};
		// init plugin
		this.init();
	}

	private init() {
		console.log(this.options);
		fetch(this.options.APILink || this.biotope.configuration.get('global.APILink')||'https://baconipsum.com/api/?type=meat-and-filler?format=text').then((response) => {
			return response.json();
		}).then((json) => {
			var text: string = JSON.stringify(json);
			this.textBox = Array.prototype.slice.call(this.element.querySelectorAll('.accordion__textBox'));
            this.textBox.forEach(e => e.innerHTML = text);
            this.textBox[this.textBox.length - 1].parentElement.style.borderBottom = '1px solid black';
		});
		this.setupEvents();

	}

	private setupEvents() {
		this.accordionSections = [].slice.call(this.element.querySelectorAll('.accordion__sectionContainer'));
		this.accordionSections.forEach(e => e.addEventListener('click', (event) => {
			if (e.classList.contains('accordion__sectionContainer--toggled')) {
				e.classList.remove('accordion__sectionContainer--toggled');
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
