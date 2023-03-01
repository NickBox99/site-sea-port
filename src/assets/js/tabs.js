document.addEventListener("DOMContentLoaded", function() {
    
    function setVisibleTab(tab, display) {
        const nodes = document.querySelectorAll(`[data-tabs="${tab.getAttribute('data-tabs-open')}"]`);

        if (nodes && nodes.length) {
            nodes.forEach(node => node.style.display = display);
        }
    }
    
    document.querySelectorAll('.tabs').forEach(tabs => {
        const tabsItems = tabs.querySelectorAll('.tab');
        
        tabs.addEventListener('click', ({target}) => {
            
            if (!target.classList.contains('active') && target.classList.contains('tab')) {
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