class Popup {
    isVisible = false;

    constructor(selector) {
        this.popup = document.querySelector(selector);

        const isPopup = this.popup.classList.contains('popup');

        this.popup.addEventListener('click', ({target}) => {
            if (isPopup && (target.closest('[data-popup-close]') || !target.closest('.popup__wrapper'))) {
                this.hide();
            }
        })
    }

    show() {
        this.popup.classList.add('show');
        this.popup.classList.add('animate');
        document.body.style.overflow = document.documentElement.style.overflow = "hidden";
        this.isVisible = true;
    }

    hide() {
        this.popup.classList.remove('show');
        document.body.style.overflow = document.documentElement.style.overflow = "";
        this.isVisible = false;
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        }
        else {
            this.show();
        }
    }
}

window.Popup = Popup;