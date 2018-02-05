function betterToFixed(value, precision) {
    'use strict';
    var string = value.toString();
    var dec = string.length;
    if (string.indexOf('.') > -1) {
        dec = string.indexOf('.');
    }
    var tempString = string.slice(0, dec) + string.slice(dec + 1, dec + 1 + precision) +
        '.' + string.slice(dec + 1 + precision);
    var newString = Math.round(Number(tempString)).toString();
    var returnString;
    if (newString.indexOf('.') > -1) {
        dec = string.indexOf('.');
        returnString = newString.slice(0, dec - precision) + '.' + newString.slice(dec + 1);
    } else {
        returnString = newString.slice(0, newString.length - precision) + '.' + newString.slice(newString.length - precision);
    }
    return returnString;
}