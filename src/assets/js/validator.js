function formatDate(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}

window.formValidate = function (formId, options) {
    const form = document.querySelector(`#${formId}`);
    const findFieldForm = (key) => form.querySelector(`[name="${key}"]`);
    
    const formData = new FormData();
    formData.append('form_id', formId);

    let isValid = true;

    Object.keys(options).forEach(key => {
        const option = options[key];
        const validateSettings = option.validate;

        function checkDefaultField(getValueFunc, htmlElement, events) {
            const checkValid = (value) => option.validate && option.validate.split('|').find((type) => {

                const isIncludes = (condition) => !type.indexOf(condition)? type : condition;

                switch (type) {
                    case 'required': {
                        return !value;
                    }
                    case 'phone': {
                        return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(value);
                    }
                    case 'abs': {
                        return !/^([a-zA-ZА-яЕЁ ]+)$/gi.test(value);
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
            });
            
            const value = getValueFunc();
            
            if (checkValid(value)) {
                htmlElement.classList.add('error');
                isValid = false;

                if (!htmlElement.hasAttribute('is-dirty')) {
                    htmlElement.setAttribute('is-dirty', '');

                    events.forEach(ev =>
                        htmlElement.addEventListener(ev, () => {
                            checkValid(getValueFunc()) ? htmlElement.classList.add('error') : htmlElement.classList.remove('error');
                        })
                    );
                }
            }
            else {
                formData.append(key, value);
            }
        }

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

                checkDefaultField(() =>  +select.value, el, ['change']);

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
                }
                else if (isChecked) {
                    formData.append(key, 'true');
                }

                break;
            }
            case 'file': {
                const file = findFieldForm(key).files[0];

                if (file) {
                    formData.append(key, findFieldForm(key).files[0]);
                }
                break;
            }
        }
    });

    const norm = {}

    for(let [name, value] of formData) {
        norm[name] = value;
    }

    //console.log(isValid, norm);

    return isValid ? formData : false;
}