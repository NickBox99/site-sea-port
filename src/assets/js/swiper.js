window.fixLoopSwiper = function () {
    document.querySelectorAll('.swiper-wrapper').forEach(wrapper => {
        if (wrapper.hasAttribute('data-disable-fix-loop') || !wrapper.offsetWidth) {
            return;
        }

        const { offsetWidth } = wrapper.closest('.container') || wrapper.closest('.wrapper');
        const { scrollWidth, children } = wrapper;
        const needWidth = offsetWidth * 2;

        let slidersWidth = scrollWidth;
        while (slidersWidth < needWidth) {
            [...children].forEach(el => {
                wrapper.append(el.cloneNode(true));
            })

            slidersWidth = wrapper.scrollWidth;
        }
    })
}

fixLoopSwiper();