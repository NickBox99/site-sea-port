﻿function formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}

window.formValidate = function (form, options, isReturnFormData = true) {
    const findFieldForm = (key) => form.querySelector(`[name="${key}"]`);

    const formData = {};

    const formIdInput = findFieldForm('form_id');
    if (formIdInput && formIdInput.value) {
        formData['form_id'] = formIdInput.value;
    }

    let isValid = true;

    Object.keys(options).forEach(key => {
        const option = options[key];
        const validateSettings = option.validate;

        function checkDefaultField(getValueFunc, htmlElement, events, classTarget) {
            const checkValid = (value) => option.validate && (option.validate.split && option.validate.split('|').find((type) => {

                const isIncludes = (condition) => !type.indexOf(condition) ? type : condition;

                switch (type) {
                    case 'required': {
                        if (option.mode === 'array') {
                            return !value.length;
                        }
                        
                        return !value;
                    }
                    case 'abs': {
                        return value && !/^([a-zA-ZА-яЕЁ ]+)$/gi.test(value);
                    }
                    case 'email': {
                        return !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
                    }
                    case isIncludes('min-length'): {
                        const num = type.replace(/[^0-9]/gi, '');
                        return num.length && +num > value.length;
                    }
                    case isIncludes('max-length'): {
                        const num = type.replace(/[^0-9]/gi, '');
                        return num.length && +num < value.length;
                    }
                    case isIncludes('length'): {
                        const num = type.replace(/[^0-9]/gi, '');
                        return num.length && +num !== value.length;
                    }
                    default: {
                        return false;
                    }
                }
            }) || typeof option.validate === 'function' && option.validate(value));
            const target = classTarget || htmlElement;
            const value = getValueFunc();

            if (checkValid(value)) {
                target.classList.add('error');
                isValid = false;

                if (!htmlElement.hasAttribute('is-dirty')) {
                    htmlElement.setAttribute('is-dirty', '');

                    (option.events ?? events).forEach(ev =>
                        htmlElement.addEventListener(ev, () => {
                            checkValid(getValueFunc()) ? target.classList.add('error') : target.classList.remove('error');
                        })
                    );
                }
            } else if (value) {
                formData[key] = value;
            }
        }

        const formId = form.getAttribute('id');

        switch (option.type) {
            case 'input': {
                const el = findFieldForm(key);
                checkDefaultField(() => el.value, el, ['keyup']);

                break;
            }
            case 'date': {
                const dateObj = dates[`${formId}_${key}`];
                const el = dateObj.input;

                checkDefaultField(() => dateObj.selectedDates.map(date => dateObj.formatDate(date, 'd.m.Y')).join(', '), el, ['change']);

                break;
            }
            case 'select': {
                const select = selects[`${formId}_${key}`];
                const el = select.select;

                checkDefaultField(() => select.value, el, ['change']);

                break;
            }
            case 'checkbox': {
                const el = findFieldForm(key);
                const isChecked = el.checked;

                if (validateSettings && validateSettings.includes('required')) {
                    if (!isChecked) {
                        el.parentNode.classList.add('error');
                        isValid = false;
                    }
                } else if (isChecked) {
                    formData[key] = true;
                }

                break;
            }
            case 'file': {
                if (option.mode === 'array') {
                    const files = [...form.querySelectorAll(`[name="${key}"]`)];
                    const firstElement = files[0];
                    checkDefaultField(() => files.map(el => el.files[0]).filter(el => el), firstElement, ['change'], firstElement.parentNode);
                }
                else {
                    const el = findFieldForm(key);
                    checkDefaultField(() => el.files[0], el, ['change'], el.parentNode);
                }
                
                break;
            }
        }
    });

    if (isValid) {
        if (isReturnFormData) {
            const newFormData = new FormData();
            Object.keys(formData).forEach(key => {
                const value = formData[key];
                
                if (Array.isArray(value)) {
                    value.forEach(val => {
                        newFormData.append(`${key}[]`, val);
                    })
                }
                else {
                    newFormData.append(key, value);
                }
            });

            return newFormData;
        }

        return formData;
    }

    return false;

}

window.clearForm = function (form) {
    const formId = form.getAttribute('id');
    const removeErrorClass = (el) => el.classList.remove('error');

    form.querySelectorAll('.input:not(.datetime), .textarea').forEach(el => {
        el.value = '';
        removeErrorClass(el);
    });

    form.querySelectorAll('.checkbox input').forEach(el => {
        el.checked = false;
        removeErrorClass(el.parentNode);
    });

    form.querySelectorAll('.select').forEach(el => {
        const select = selects[el.getAttribute('data-select-key')];

        if (select) {
            select.clear();
            removeErrorClass(select.select);
        }
    });

    form.querySelectorAll('.datetime').forEach(el => {
        const date = dates[`${formId}_${el.getAttribute('name')}`];

        if (date) {
            date.clear();
            removeErrorClass(date.element);
        }
    });

    form.querySelectorAll('input[type="file"]').forEach(el => {
        const wrapper = el.closest('.input-group');
        const files = wrapper.parentNode.children;
        
        if (files.length > 1) {
            wrapper.remove();
        }
        else {
            clearInputFile(el);
        }
    });
}

window.initValidateOptions = function (options) {
    const newOptions = { ...options };

    Object.keys(options).forEach(key => {
        const validate = document.querySelector(`[name="${key}"]`)?.getAttribute('data-validate');

        if (validate) {
            const oldValidate = options[key].validate;
            const newValidate = `${oldValidate? `${oldValidate}|`: ''}${validate}`;

            if (newValidate) {
                newOptions[key].validate = newValidate;
            }
        }
    });

    return newOptions;
}