class Select {
    constructor(element) {
        this.name = element.getAttribute('name');
        this.select = element;
        this.valueWrapper = this.select.querySelector('.select__value');

        const items = [...this.select.querySelectorAll('.select__item')];
        this.items = items.map(el => ({ value: el.getAttribute('data-value'), text: el.textContent, el }));

        this.clear();
        this.initEvents();
    }

    initEvents() {
        document.body.addEventListener('click', ({ target }) => {
            if (!target.closest(`[name="${this.name}"]`)) {
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
                this.show();
            }
        });
    }

    set(value) {
        const item = this.items.find(item => item.value === value);
        
        this.valueWrapper.textContent = item.text;
        this.value = item.value;
        this.items.forEach(({el}) => el.classList.remove('active'));
        item.el.classList.add('active');

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
}

window.selects = [];

window.initSelects = (target) => {
    target.querySelectorAll('.select').forEach(el =>
        {
            const formId = el.closest('form')?.getAttribute('id');
            const name = el.getAttribute('name');
            window.selects[formId? `${formId}_${name}` : name] = new Select(el);
        }
    );
}

initSelects(document);

