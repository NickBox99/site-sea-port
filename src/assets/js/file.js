window.clearInputFile = function (file) {
    if(file.value){
        try{
            file.value = '';
        }catch(err){ }
        if(file.value){
            var form = document.createElement('form'),
                parentNode = file.parentNode, ref = f.nextSibling;
            form.appendChild(file);
            form.reset();
            parentNode.insertBefore(file,ref);
        }

        file.dispatchEvent(new Event('change'));
    }
}

function initInputFile() {
    document.querySelectorAll('input[type="file"]:not(.initialized)').forEach(el => {
        const fileName = el.nextElementSibling;
        const cross = fileName.nextElementSibling;
        const defaultText = fileName.innerText;
        el.classList.add('initialized');

        el.addEventListener('change', function () {
            if (this.files.length) {
                fileName.innerText = this.files[0].name;
                cross.classList.remove('hide');
            }
            else {
                fileName.innerText = defaultText;
                cross.classList.add('hide');
            }
        });

        cross.addEventListener('click', (event) => {
            event.preventDefault();
            clearInputFile(el);
        })
    });
}

initInputFile();
window.initInputFile = initInputFile;