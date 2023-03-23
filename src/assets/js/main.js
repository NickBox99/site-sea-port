function setAppHeightVariable () {
    const doc = document.documentElement;
    
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
}

window.addEventListener('resize', setAppHeightVariable);
setAppHeightVariable();