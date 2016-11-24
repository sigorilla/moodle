var savedTimer;

document.querySelector('#solve').onclick = function () {
    chrome.tabs.executeScript(null, {
        file: 'src/load-source.js'
    }, function () {
        if (chrome.extension.lastError) {
            console.log('Error: %o', chrome.extension.lastError.message);
        }
    });
};

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
    clearTimeout(savedTimer);
    document.querySelector('#saved').innerText = '(save)';
    savedTimer = setTimeout(function () {
        document.querySelector('#saved').innerText = '';
    }, 1500);
};

document.querySelector('#about').onclick = function () {
    chrome.tabs.create({url: 'option.html'});
};
