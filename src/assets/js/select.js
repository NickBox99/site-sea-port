class Select {
    isEnable = true;
    
    constructor(element) {
        this.select = element;
        this.input = element.querySelector('.select__input');
        const wrapper = element.querySelector('.select__items');
        this.wrapper = wrapper ?? element.querySelector('.select__wrapper');
        this.name = this.input.getAttribute('name');
        this.valueWrapper = this.select.querySelector('.select__value');

        element.setAttribute('data-select-name', this.name);

        const items = [...this.select.querySelectorAll('.select__item')];
        this.items = items.map(el => ({value: el.getAttribute('data-value'), text: el.textContent, el}));

        this.set(this.input.value);
        this.initEvents();
    }

    initEvents() {
        if (!this.select.hasAttribute('data-select-disable-close')) {
            document.body.addEventListener('click', ({target}) => {
                if (!target.closest(`[data-select-name="${this.name}"]`)) {
                    this.hide();
                }
            });
        }

        this.select.addEventListener('click', ({target}) => {
            if (!this.isEnable) {
                return;
            }
            
            if (target.closest('.select__wrapper')) {
                const item = target.closest('.select__item');

                if (item) {
                    this.set(item.getAttribute('data-value'));
                    this.input.dispatchEvent(new Event('change'));
                    this.hide();
                }
            } else {
                if (this.select.classList.contains('select_string')) {
                    this.toggle();
                } else {
                    this.show();
                }
            }
        });
    }

    set(value) {
        const item = this.items.find(item => item.value === value);

        if (item) {
            if (this.valueWrapper) {
                this.valueWrapper.textContent = item.text;
            }
            
            this.value = this.input.value = item.value;
            this.items.forEach(({el}) => el.classList.remove('active'));
            item.el.classList.add('active');
        } else {
            this.clear();
        }

        this.select.dispatchEvent(new Event('change'));
    }

    clear() {
        this.set(this.items[0].value);
    }

    show() {
        this.select.classList.add('active');
    }

    hide() {
        this.select.classList.remove('active');
    }

    toggle() {
        if (this.select.classList.contains('active')) {
            this.hide();
        } else {
            this.show();
        }
    }

    getItem(val) {
        return this.items.find(el => el.value === String(val));
    }
    
    updateItems(items) {
        this.items = items;

        this.wrapper.innerHTML = '';
        
        if (items.length) {
            items.forEach((item) => {
                const { text, value } = item;

                const newItem = document.createElement('div');
                newItem.classList.add('select__item','btn', 'btn_secondary');
                newItem.innerHTML = text;
                newItem.setAttribute('data-value', value);

                item['el'] = newItem;
                this.wrapper.append(newItem);
            });

            this.clear();
        }
    }

    setEnabled(isEnable) {
        this.isEnable = isEnable;
    }
}

window.Select = Select;

window.selects = [];

window.initSelects = (target) => {
    target.querySelectorAll('.select').forEach(el => {
            const formId = el.closest('form')?.getAttribute('id');
            const name = el.querySelector('.select__input').getAttribute('name');

            const key = formId ? `${formId}_${name}` : name;
            el.setAttribute('data-select-key', key);

            if (!window.selects[key]) {
                window.selects[key] = new Select(el);
            }
        }
    );
}

initSelects(document);