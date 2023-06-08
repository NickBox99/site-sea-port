window.clearInputFile = function (file) {
    if(file.value) {
        try{
            file.value = '';
        }
        catch(err){ }
        
        if (file.value) {
            const form = document.createElement('form'),
                parentNode = file.parentNode, ref = f.nextSibling;
            form.appendChild(file);
            form.reset();
            parentNode.insertBefore(file,ref);
        }

        file.dispatchEvent(new Event('change'));
    }
}

function initInputFile() {
    function init(el, onSetFile, onRemoveFile) {
        const input = el.nextElementSibling;
        const cross = input.nextElementSibling;
        const defaultText = input.innerText;

        el.classList.add('initialized');

        el.addEventListener('change', function () {
            const firstFile = this.files[0];
            if (firstFile && firstFile.size <= 5242880 && "image/jpeg,image/png,application/pdf".includes(firstFile.type)) {
                const isNew = input.innerText === defaultText;
                input.innerText = firstFile.name;
                cross.classList.remove('hide');

                if (onSetFile && isNew) {
                    onSetFile();
                }
            }
            else {
                input.innerText = defaultText;
                cross.classList.add('hide');
            }
        });
        
        cross.addEventListener('click', event => {
            event.preventDefault();
            clearInputFile(el);

            if (onRemoveFile) {
                setTimeout(() => {
                    onRemoveFile(el);
                })
            }
        })
    }

    document.querySelectorAll('input[type="file"]:not(.initialized)').forEach(el => {
        const inputGroup = el.closest('.input-group');
        const savedElement = inputGroup.cloneNode(true);
        const wrapper = inputGroup.parentNode;

        const dataMaxCount = el.getAttribute('data-max-count');
        const maxCount = dataMaxCount? +dataMaxCount : 1;
        let nowCount = wrapper.children.length;
        
        if (maxCount !== 1) {
            const onRemoveFile = (el) => {
                if(nowCount > 1) {
                    nowCount--;
                    el.closest('.input-group')?.remove();
                }
            }

            const onSetFile = () => {
                if (nowCount < maxCount) {
                    nowCount++;
                    const newInput = savedElement.cloneNode(true);
                    wrapper.append(newInput);
                    init(newInput.querySelector('input[type="file"]'), onSetFile, onRemoveFile);
                }
            };

            init(el, onSetFile, onRemoveFile);
        }
        else {
            init(el);
        }
    });
}

initInputFile();
window.initInputFile = initInputFile;