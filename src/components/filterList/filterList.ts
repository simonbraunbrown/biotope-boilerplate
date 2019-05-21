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
		this.setupEvents();
		this.fetchData();
	}

	private setupEvents() {
		this.element.querySelector('.filterList__sortButton').addEventListener('click', event => {
			this.filterList(this.inputList);
		});

		const ageSlider = this.element.querySelector('.filterList__ageRangeSlider');
		ageSlider.addEventListener('change', event => {

			//console.log(this.inputList);
			const slider = <HTMLInputElement>event.target;
			this.filterByAge(this.inputList, slider.value);
		});

		const searchInput = this.element.querySelector('.filterList__textInput');
		searchInput.addEventListener('change', event => {
			const text = <HTMLInputElement> event.target;
			this.filterByName(this.inputList, text.value);
		});
		searchInput.addEventListener('keyup', event => {
			const text = <HTMLInputElement> event.target;
			this.filterByName(this.inputList, text.value);
		});
	}

	private fetchData() {
		fetch(this.inputListSource)
			.then(blob => blob.json())
			.then(data => {
				this.inputList.push(...data.personalData);
				this.filterList(this.inputList);
			});
	}

	private filterList(list: Array<People>) {
		this.filterByAge(list, '0');
	}

	private filterByAge(unsortedList: Array<People>, age: string) {
		if(age >= '1') {
		const filterThis = (_list) => {
			return _list.filter((item) => item.age >= age);
		};
		this.renderResults(filterThis(unsortedList));
		this.element.querySelector('.filterList__ageRangeSliderValue').innerHTML = ' ' + age;
	}
	else {
		this.renderResults(unsortedList);
	}
	};
		

	private filterByName(unsortedList: Array<People>, name: string) {
		const filterThis = (_list) => {
			const regex = new RegExp(name, 'gi');
			return _list.filter((item) => {
				return item.name.first.match(regex) || item.name.last.match(regex);
				console.log(regex);
				
				console.log(item.name.first);
			});
		}
		this.renderResults(filterThis(unsortedList));
	}

	private renderResults(filteredList: Array<People>) {
		this.clearDom();

		filteredList.forEach(item => {

			const newItemName = document.createElement("div");
			newItemName.classList.add('filterList__itemName');
			const newContentName = document.createTextNode(<string>item.name.first + ' ' + <string>item.name.last);
			newItemName.appendChild(newContentName);


			const newItemDetails = document.createElement("div");
			newItemDetails.classList.add('filterList__itemDetails');
			const newItemDetail = document.createElement("div");
			newItemDetail.classList.add('filterList__itemDetail');
			const newContentDetail = document.createTextNode(item.age + ' ' + <string>item.eyeColor + ' ' + <string>item.company);
			newItemDetail.appendChild(newContentDetail);
			newItemDetails.appendChild(newItemDetail);


			const newItem = document.createElement("div");
			newItem.classList.add('filterList__item');
			newItem.appendChild(newItemName);
			newItem.appendChild(newItemDetails);


			const itemDisplayBox = document.querySelector('.filterList__display');
			itemDisplayBox.appendChild(newItem);
		})
	}

	private clearDom() {
		const items = this.element.querySelectorAll('.filterList__item');
		if (items.length > 0) {
			for (let i = 0; i < items.length; i++) {
				items[i].remove();
			}
		}
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
