
export function timing(timestamp, unix = false) {
    var a = new Date(unix ? timestamp * 1000 : timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    return (date + ' ' + month) + ' ' + (("" + hour).length == 1 ? '0' + hour : hour) + ':' + (("" + min).length == 1 ? '0' + min : min);
}

export function diff(obj1, obj2) {
    let ret = {};
    for (let i in obj1) {
        if (obj1[i] != obj2[i]) {
            ret[i] = obj1[i];
        }
    }
    return ret;
}
export function clone(arr) {
    let newObj = (arr instanceof Array) ? [] : {};
    for (let i in arr) {
        if (i == 'clone')
            continue;
        if (arr[i] && typeof arr[i] == "object") {
            newObj[i] = arr[i].clone();
        }
        else
            newObj[i] = arr[i]
    } return newObj;
};
export function sum(arr, prop) {
    let total = 0, i;
    for (i in arr) {
        total = add(total, arr[i][prop]);
    }
    return total
}
export function add(a, b) {
    let p = 1000000;
    if (a < 1 || b < 1) {
        a = (a + "").substr(0, 8);
        b = (b + "").substr(0, 8);
        a = Number(a) * p;
        b = Number(b) * p;
        return (a + b) / p;
    }
    return (a + b);
}
export function isFloat(amount) {
    return (amount < 1 && amount > 0)
}
export function amountLen(amount) {
    if (isFloat(amount)) {
        return 6;
    }

    return 0;
}
export function toMoney(amount) {
    if (typeof amount == 'undefined' || amount == 'null')
        return 0;
    if (amount.length < 2)
        return amount + '';
    return ("" + amount).replace(/,/g, '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}
export function numFa(num, dontTrim) {
    if (num == 'undefined' || typeof num == 'undefined')
        return '';
    dontTrim = dontTrim || false
    num = dontTrim ? num + "" : (num + "").trim();
    let i = 0,
        len = num.length,
        res = '',
        pos,
        persianNumbers = typeof persianNumber == 'undefined' ?
            ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] :
            persianNumbers;

    for (; i < len; i++)
        if ((pos = persianNumbers[num.charAt(i)]))
            res += pos;
        else
            res += num.charAt(i);

    return res;
}
export function num(txt) {
    let ret = 0;
    if (typeof txt == 'string')
        ret = txt.replace(/[^\d\.]*/g, '')
    else
        ret = txt;
    return parseInt(ret)
}