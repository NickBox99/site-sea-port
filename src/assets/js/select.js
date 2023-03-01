class Select {
    constructor(element) {
        this.id = element.getAttribute('id');
        this.select = element;
        this.valueWrapper = this.select.querySelector('.select__value');

        this.itemsElements = [...this.select.querySelectorAll('.select__item')];
        this.items = this.itemsElements.map(el => ({ value: el.getAttribute('data-value'), text: el.textContent }));

        this.set(this.itemsElements[0]);
        this.initEvents();
    }

    initEvents() {
        document.body.addEventListener('click', ({ target }) => {
            if (!target.closest(`#${this.id}`)) {
                this.hide();
            }
        });

        this.select.addEventListener('click', ({ target }) => {
            if (target.closest('.select__wrapper')) {
                const item = target.closest('.select__item');

                if (item) {
                    this.set(item);
                    this.hide();
                }
            }
            else
            {
                this.show();
            }
        });
    }

    set(item) {
        if (item) {
            this.valueWrapper.textContent = item.textContent;
            this.value = item.getAttribute('data-value');
            this.itemsElements.forEach(el => el.classList.remove('active'));
            item.classList.add('active');

            this.select.dispatchEvent(new Event('change'));
        }
    }

    show() {
        this.select.classList.add('active');
    }

    hide() {
        this.select.classList.remove('active');
    }
}

window.selects = [];

document.querySelectorAll('.select').forEach(el => {
    const id = el.getAttribute('id');
    window.selects[id] = new Select(el);
});