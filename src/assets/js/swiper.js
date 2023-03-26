function fixLoopSwiper() {
    document.querySelectorAll('.swiper-wrapper').forEach(wrapper => {
        const { offsetWidth, scrollWidth, children } = wrapper;
        const needWidth = offsetWidth * 2.1;

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