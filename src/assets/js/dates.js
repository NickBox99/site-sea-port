window.dates = [];

window.initDates = (target) => {
    target.querySelectorAll('.datetime').forEach(el => {
        const formId = el.closest('form')?.getAttribute('id');
        const name = el.getAttribute('name');
        const key = formId? `${formId}_${name}` : name;
        
        if (window.dates[key]) {
            return;
        }
        
        const hasPlaceholderFocus = el.hasAttribute('data-placeholder-focus');
        const hasFlatpickrMultiple = el.hasAttribute('data-flatpickr-multiple');
        const flatpickrMinDate = el.getAttribute('data-flatpickr-minDate');
        const flatpickrMaxDate = el.getAttribute('data-flatpickr-maxDate');
        
        const mask = hasFlatpickrMultiple? null : IMask(el, {
            mask: Date,
            lazy: hasPlaceholderFocus
        });
    
        if (hasPlaceholderFocus && mask) {
            el.addEventListener('focus', function() {
                mask.updateOptions({ lazy: false });
            });
        }
        
        const flatpickrOptions = {
            locale: 'ru',
            allowInput: true,
            disableMobile: true,
            dateFormat: 'd.m.Y',
            monthSelectorType: 'static',
            onChange: function(_, dateStr) {
                mask.value = dateStr;
    
                if (hasPlaceholderFocus && mask.value === '__.__.____') {
                    mask.updateOptions({ lazy: true });
                }
            }
        };
        
        if (hasFlatpickrMultiple) {
            flatpickrOptions['mode'] = 'multiple';
            flatpickrOptions['allowInput'] = false;
            delete flatpickrOptions['onChange'];
        }
        
        if (flatpickrMinDate) {
            flatpickrOptions['minDate'] = flatpickrMinDate;
        }
        
        if (flatpickrMaxDate) {
            flatpickrOptions['maxDate'] = flatpickrMaxDate;
        }
        
        el.setAttribute('data-dates-key', key);
    
        window.dates[key] = flatpickr(el, flatpickrOptions);
    });
}

initDates(document);