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

        function checkDefaultField(initFunc, getValueFunc, htmlElement, events) {
            const value = getValueFunc();
            if (initFunc(value)) {
                htmlElement.classList.add('error');
                isValid = false;

                if (!htmlElement.hasAttribute('is-dirty')) {
                    htmlElement.setAttribute('is-dirty', '');

                    events.forEach(ev =>
                        htmlElement.addEventListener(ev, () => {
                            initFunc(getValueFunc()) ? htmlElement.classList.add('error') : htmlElement.classList.remove('error');
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

                checkDefaultField((value) => {
                        return validateSettings &&
                            (
                                (validateSettings.includes('required') && !value) ||
                                (validateSettings.includes('abs') && value && !/^([a-zA-ZА-яЕЁ ]+)$/gi.test(value)) ||
                                (validateSettings.includes('phone') && !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(value)) ||
                                (validateSettings.includes('email') && !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)) ||
                                (validateSettings.includes('inn') && (!/^([0-9]+)$/gi.test(value) || !(12 >= value.length && value.length >= 10)))
                            )
                    },
                    () => el.value, el, ['keyup']);

                break;
            }
            case 'date': {
                const dateObj = dates[`${formId}_${key}`];
                const el = dateObj.input;

                checkDefaultField((value) => validateSettings && (validateSettings.includes('required') && !value),
                    () => dateObj.selectedDates.map(date => dateObj.formatDate(date, 'd.m.Y')).join(', '), el, ['change']);

                break;
            }
            case 'select': {
                const select = selects[`${formId}_${key}`];
                const el = select.select;

                checkDefaultField((value) => validateSettings && (validateSettings.includes('required') && !value),
                    () =>  +select.value, el, ['change']);

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

    console.log(isValid, norm);

    return isValid ? formData : false;
}