document.addEventListener("DOMContentLoaded", function() {
    
    function setVisibleTab(tab, display) {
        const node = document.querySelector(`[data-tabs="${tab.getAttribute('data-tabs-open')}"]`);

        if (node) {
            node.style.display = display;
        }
    }
    
    document.querySelectorAll('.tabs').forEach(tabs => {
        const tabsItems = tabs.querySelectorAll('.tab');
        
        tabs.addEventListener('click', ({target}) => {
            
            if (!target.classList.contains('active')) {
                tabsItems.forEach(tab => {
                    tab.classList.remove('active');

                    setVisibleTab(tab, "none");
                })

                target.classList.add('active');
                setVisibleTab(target, "");
            }
        })
    })
});