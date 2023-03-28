document.addEventListener("DOMContentLoaded", () => {
    const options = {
        value: 0,
        duration: 3000,
        format: '( ddd)',
        theme: 'default',
    }
    
    function showOdometer(el) {
        const newValue = el.innerText;
        el.innerText = Array(newValue.length).fill('0').join('');
        
        const odometer = new Odometer({
            ...options,
            el
        });

        el.removeAttribute('data-odometer');
        odometer.update(+newValue);
    }
    
    document.querySelectorAll('[data-odometer]:not([data-odometer-on-scroll])').forEach(showOdometer);
    window.scrollNodes.addNodes('[data-odometer][data-odometer-on-scroll]', showOdometer);
})