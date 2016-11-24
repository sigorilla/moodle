chrome.storage.sync.get({
    remember: false
}, function (item) {
    try {
        localStorage.remember = item.remember;
    } catch (err) {
        localStorage.remember = false;
    }
});

var s = document.createElement('script');
s.src = chrome.extension.getURL('src/script.js');
s.onload = function () {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);
