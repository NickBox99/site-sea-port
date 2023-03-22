class Select {
    constructor(element) {
        this.input = element.querySelector('.select__input');
        this.name = this.input.getAttribute('name');
        element.setAttribute('data-select-name', this.name);
        this.select = element;
        this.valueWrapper = this.select.querySelector('.select__value');

        const items = [...this.select.querySelectorAll('.select__item')];
        this.items = items.map(el => ({ value: el.getAttribute('data-value'), text: el.textContent, el }));

        this.set(this.input.value);
        this.initEvents();
    }

    initEvents() {
        document.body.addEventListener('click', ({ target }) => {
            if (!target.closest(`[data-select-name="${this.name}"]`)) {
                this.hide();
            }
        });

        this.select.addEventListener('click', ({ target }) => {
            if (target.closest('.select__wrapper')) {
                const item = target.closest('.select__item');

                if (item) {
                    this.set(item.getAttribute('data-value'));
                    this.hide();
                }
            }
            else
            {
                if (this.select.classList.contains('select_string')) {
                    this.toggle();
                }
                else {
                    this.show();
                }
            }
        });
    }

    set(value) {
        const item = this.items.find(item => item.value === value);
        
        if (item) {
            this.valueWrapper.textContent = item.text;
            this.value = this.input.value = item.value;
            this.items.forEach(({el}) => el.classList.remove('active'));
            item.el.classList.add('active');
        }
        else {
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
        }
        else {
            this.show();
        }
    }
    
    getItem(val) {
        return this.items.find(el => el.value === String(val));
    }
}

window.selects = [];

window.initSelects = (target) => {
    target.querySelectorAll('.select').forEach(el =>
        {
            const formId = el.closest('form')?.getAttribute('id');
            const name = el.querySelector('.select__input').getAttribute('name');
            
            
            const key = formId? `${formId}_${name}` : name;
            
            if (!window.selects[key]) {
                window.selects[key] = new Select(el);
            }
        }
    );
}

initSelects(document);

