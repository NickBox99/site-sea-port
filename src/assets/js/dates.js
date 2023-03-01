window.dates = [];

document.querySelectorAll('.datetime').forEach(el => {
    const hasPlaceholderFocus = el.hasAttribute('data-placeholder-focus');
    const hasFlatpickrMultiple = el.hasAttribute('data-flatpickr-multiple');
    
    const mask = hasFlatpickrMultiple? null : IMask(el, {
        mask: Date,
        lazy: hasPlaceholderFocus
    });

    if (hasPlaceholderFocus && mask) {
        el.addEventListener('focus', function() {
            mask.updateOptions({ lazy: false });
        });
    }

    const id = el.getAttribute('id');
    
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

    window.dates[id] = flatpickr(el, flatpickrOptions);
});