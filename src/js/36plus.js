function get10(char) {
    if (char < 10) {
        return char;
    } else {
        return char.charCodeAt() - 'a'.charCodeAt() + 10;
    }
}
function get36(num) {
    if (num < 10) {
        return num;
    } else {
        return String.fromCharCode(num + 87);
    }
}
function addStrings(num1, num2) {
    let m = num1.length - 1;
    let n = num2.length - 1;
    let res = '';
    let carry = 0;
    while (m >= 0 || n >= 0 || carry) {
        const sum = +get10(num1[m] ?? 0) + +get10(num2[n] ?? 0) + carry;
        carry = Math.floor(sum / 36);
        res = get36(sum % 36) + res;
        m--;
        n--;
    }
    return res;
}

console.log(addStrings('1b', '2x')); // 48
