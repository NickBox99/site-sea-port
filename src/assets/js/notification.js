window.showNotification = (params) => {
    if (params) {
        if (!params.position) {
            params.position = 'bottomCenter'
        }
        iziToast.show(params);
    }
}