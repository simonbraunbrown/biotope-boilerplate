interface FilterListOptions { }
interface People {
	_id: string;
	age: number;
	eyeColor: string;
	name: Name;
	company: string;
	address: string;
}

type Name = {
	first: string;
	last: string;
}

class FilterList {
	private element: Element;
	private options: FilterListOptions;
	private defaults: FilterListOptions = {};
	private filterValues = {
		textinput: '',
		ageSlider: 0,
		eyeColors: {
			green: false,
			blue: false,
			brown: false
		}
	}
	private inputListSource: string = './components/filterList/people.json';
	private inputList: Array<People> = [];
	constructor(element: Element, options: FilterListOptions) {
		this.element = element;
		// ⚠️ remove options if you don't use them
		this.options = { ...this.defaults, ...options };
		// init plugin
		this.init();
	}
	private init() {
		// init plugin here
		this.fetchData();
		this.setupEvents();
	}

	private fetchData() {
		fetch(this.inputListSource)
			.then(blob => blob.json())
			.then(data => {
				this.inputList.push(...data.personalData);
				this.filterList(this.inputList);
			});
	}

	private setupEvents() {
		this.element.querySelector('.filterList__sortButton').addEventListener('click', event => {
			this.filterList(this.inputList);
		});

		const ageSlider = this.element.querySelector('.filterList__ageRangeSlider');
		ageSlider.addEventListener('change', event => {
			const slider = <HTMLInputElement>event.target;
			this.filterValues.ageSlider = parseInt(slider.value);
			this.filterList(this.inputList);
			this.element.querySelector('.filterList__ageRangeSliderValue').innerHTML = 'filter by age from ' + this.filterValues.ageSlider + ' to 100 years';
		});

		const searchInput = this.element.querySelector('.filterList__textInput');
		searchInput.addEventListener('change', event => {
			const text = <HTMLInputElement>event.target;
			this.filterValues.textinput = text.value;
			this.filterList(this.inputList);
		});

		searchInput.addEventListener('keyup', event => {
			const text = <HTMLInputElement>event.target;
			this.filterValues.textinput = text.value;
			this.filterList(this.inputList);
		});

		const eyeColorButtons = Array.prototype.slice.call(this.element.querySelectorAll('.filterList__checkBox')); // Why not with [...] or Array.from()
		eyeColorButtons.forEach(el => el.addEventListener('click', event => {
			if (event.target == eyeColorButtons[0]) {
				eyeColorButtons[0].classList.toggle('filterList__checkBox--clicked');
				this.filterValues.eyeColors.green = !this.filterValues.eyeColors.green;
			} else if (event.target == eyeColorButtons[1]) {
				eyeColorButtons[1].classList.toggle('filterList__checkBox--clicked');
				this.filterValues.eyeColors.blue = !this.filterValues.eyeColors.blue;
			} else if (event.target == eyeColorButtons[2]) {
				eyeColorButtons[2].classList.toggle('filterList__checkBox--clicked');
				this.filterValues.eyeColors.brown = !this.filterValues.eyeColors.brown;
			}
			this.filterList(this.inputList);
			console.log(this.filterValues.eyeColors);
		}))
	}


	private filterList(list: Array<People>) {
		let listToFilter = list;
		console.log(this.filterValues.ageSlider);
		listToFilter = this.filterByAge(listToFilter, this.filterValues.ageSlider);
		listToFilter = this.filterByName(listToFilter, this.filterValues.textinput);
		listToFilter = this.filterByEyeColor(listToFilter, this.filterValues.eyeColors)
		this.renderResults(listToFilter);
	}

	private filterByAge(unsortedList: Array<People>, age: number) {
		if (age >= 1) {
			return unsortedList.filter((item) => item.age >= age);
		}
		else {
			return unsortedList;
		}
	};


	private filterByName(unsortedList: Array<People>, name: string) {
		const regex = new RegExp(name, 'gi');

		return unsortedList.filter((item) => {
			return item.name.first.match(regex) || item.name.last.match(regex)
		});
	}

	private filterByEyeColor(unsortedList: Array<People>, colorToggled: { green: boolean, blue: boolean, brown: boolean }) {
		console.log(colorToggled);
		if (colorToggled.green && colorToggled.blue && colorToggled.brown) {
			return unsortedList;
		}
		else if (colorToggled.green && colorToggled.blue) {
			return unsortedList.filter((item) => item.eyeColor !== 'brown');
		} else if (colorToggled.green && colorToggled.brown) {
			return unsortedList.filter((item) => item.eyeColor !== 'blue');
		}else if (colorToggled.blue && colorToggled.brown) {
			return unsortedList.filter((item) => item.eyeColor !== 'green');
		}else if (colorToggled.green) {
			return unsortedList.filter((item) => item.eyeColor === 'green');
		} else if (colorToggled.blue) {
			return unsortedList.filter((item) => item.eyeColor === 'blue');
		} else if (colorToggled.brown) {
			return unsortedList.filter((item) => item.eyeColor === 'brown');
		}  
		else {
			return unsortedList;
		}
	}

	private renderResults(filteredList: Array<People>) {
		this.getEyeColor();

		const filterItemTpl = (<any>window).biotope.configuration.get('tpl.filterItem');

		let listItems = '';
		filteredList.forEach(item => {

			const regex = new RegExp('(' + this.filterValues.textinput + ')', 'gi');
			let _matchName = item.name.first + ' ' + item.name.last;
			const matchName = _matchName.replace(regex, '<span class="hl">$1</span>');

			let newItem = filterItemTpl({
				name: item.name.first + ' ' + item.name.last,
				matchName: matchName,
				age: item.age,
				eyeColor: item.eyeColor,
				company: item.company
			})

			listItems += newItem;

		});
		const itemDisplayBox = document.querySelector('.filterList__display');
		itemDisplayBox.innerHTML = listItems;

	}

	private getEyeColor() {
		const eyes = [];
		for (let i = 0; i < this.inputList.length; i++) {
			if (this.inputList[i].eyeColor === 'green') {
				eyes.push(this.inputList[i].name.first + ' got ' + this.inputList[i].eyeColor + ' eyes')
			}
		}

		let totalYears: number = this.inputList.reduce((sum, people) => {

			return sum + people.age
		}, 0);


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
