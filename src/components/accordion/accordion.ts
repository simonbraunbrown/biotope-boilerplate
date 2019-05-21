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
		this.fetchText();
		this.setupEvents();
	}

	private fetchText () {
		console.log(this.options);
		fetch(this.options.APILink || this.biotope.configuration.get('global.APILink')||'https://baconipsum.com/api/?type=meat-and-filler?format=text').then((response) => {
			return response.json();
		}).then((json) => {
			var text: string = JSON.stringify(json);
			this.textBox = Array.prototype.slice.call(this.element.querySelectorAll('.accordion__textBox'));
            //this.textBox.forEach(e => e.innerHTML = text);
		});
	}

	private setupEvents() {
		this.accordionSections = [].slice.call(this.element.querySelectorAll('.accordion__itemContainer'));
		this.accordionSections.forEach(e => e.addEventListener('click', () => {
			this.toggle(e);
		}));
	}
	private toggle(accordionItem : Element){
		if (accordionItem.classList.contains('accordion__itemContainer--open')) {
			this.closeItem(accordionItem);
		} else {
			this.accordionSections.forEach((e) => {
				this.closeItem(e);
			});
			if (accordionItem.className == 'accordion__itemContainer') {
				this.openItem(accordionItem);
			}
		}
	}

	private openItem(_element : Element) {
		var e = _element;
		e.classList.add('accordion__itemContainer--open');
	}

	private closeItem(_element : Element) {
		var e = _element;
			e.classList.remove('accordion__itemContainer--open');
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
