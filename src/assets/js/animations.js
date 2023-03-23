document.querySelectorAll('.animate-text-top').forEach((el) => {
    const content = el.innerHTML;

    el.classList.remove('animate-text-top');
    el.classList.add('animate-text-vertical');
    el.innerHTML = `
      <span class="animate-text-vertical__container">
        ${content}
      </span>
      <span class="animate-text-vertical__wrapper">
        <span class="animate-text-vertical__content">
          ${content}
        </span>
      </span>
    `;
});

const animateTextOnScroll = (el) => {
    const observerCallback = ([{ isIntersecting }]) => {
        if (isIntersecting) {
            el.classList.remove('animate-text-on-scroll');
            observer.unobserve(el.nextElementSibling);
        }
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5,
        rootMargin: '0px'
    });

    const nextEl = el.nextElementSibling;

    if (nextEl) {
        observer.observe(nextEl);
    }
};

document.querySelectorAll('.animate-text-on-scroll').forEach(animateTextOnScroll);