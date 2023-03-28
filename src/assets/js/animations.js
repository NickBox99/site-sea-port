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

scrollNodes.addNodes('.animate-text-on-scroll', (el) => el.classList.remove('animate-text-on-scroll'));