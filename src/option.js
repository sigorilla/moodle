chrome.storage.sync.get({
    remember: false
}, function (item) {
    document.querySelector('#remember').checked = item.remember;
});

document.querySelector('#remember').onchange = function () {
    chrome.storage.sync.set({
        remember: this.checked
    }, function () {
        if (chrome.extension.lastError) {
            console.log('Error: %o', chrome.extension.lastError.message);
        }
    });
    document.querySelector('#callback').innerText = 'Saved!';
};
