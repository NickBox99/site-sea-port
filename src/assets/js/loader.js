const loader = document.createElement('div');
loader.classList.add('loader');
loader.innerHTML = '<div class="loader__circle"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

document.body.append(loader);
window.loader = new Popup('.loader');