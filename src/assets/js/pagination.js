const arrowSvg = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2997 6.94866H2V9.05134H10.2997L7.11648 12.5134L8.48332 14L14 8L8.48332 2L7.11648 3.4866L10.2997 6.94866Z" fill="currentColor"/>
</svg>`;

document.addEventListener("DOMContentLoaded", function() {
    const options = {
        totalItems: 10,
        itemsPerPage: 1,
        visiblePages: 3,
        template: {
            page: '<button class="circle btn swiper-btn pagination__item pagination__item_page">{{page}}</button>',
            currentPage: '<button class="circle active swiper-btn btn pagination__item pagination__item_page">{{page}}</button>',
            moreButton: '<button class="circle btn swiper-btn swiper-btn_icon-disable pagination__item pagination__item_icon-disable {{type}}"></button>',
            moveButton: `<button class="circle btn swiper-btn pagination__item {{type}}">${arrowSvg}</button>`,
            disabledMoveButton: '<button class="circle btn swiper-btn pagination__item {{type}} disabled"></button>',
        }
    };

    const pagination = document.querySelector('#pagination');
    
    if (pagination) {
        window.pagination = new tui.Pagination(pagination, options);
    }
});