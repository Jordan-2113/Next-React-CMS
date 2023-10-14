String.isNullOrWhitespace = function (str) {
    if (str === null || str === undefined || str.length === 0 || !str) {
        return true;
    }
    return false;
}

Array.isNullOrEmpty = function (arr) {
    if (arr == null || arr.length === 0) {
        return true;
    }
    return false;
}

Element.prototype.addListener = window.addListener = document.addListener = function(event, callback) {
    var events = event.split(" ");
    for (var i=0; i<events.length; i++){
        this.addEventListener(events[i], callback);
    }
};

Element.prototype.removeListener = window.removeListener = document.removeListener = function(event, callback) {
    var events = event.split(" ");
    for (var i=0; i<events.length; i++){
        this.removeEventListener(events[i], callback);
    }
};

export {}