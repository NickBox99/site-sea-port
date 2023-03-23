document.addEventListener("DOMContentLoaded", () => {
    const options = {
        value: 0,
        format: '( ddd)',
        theme: 'default',
    }

    document.querySelectorAll('[data-odometer-value]').forEach(el => {
        const odometer = new Odometer({
            ...options,
            el
        });

        odometer.update(+el.getAttribute('data-odometer-value'));
    })
})