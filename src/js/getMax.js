function getMax(n, arr) {
    let max = -Infinity;
    arr.sort((a, b) => b - a);
    const s = String(n);
    const len = s.length;
    const min = String(arr[arr.length - 1]).repeat(len);
    if (min >= n) return String(arr[0]).repeat(len - 1);
    function dfs(curStr) {
        if (max !== -Infinity) return;
        for (let i = 0; i < arr.length; i++) {
            if (max !== -Infinity) return;
            const curStrlen = curStr.length;
            if (curStrlen === len && curStr < n) max = curStr;
            if (arr[i] === +s[curStrlen]) {
                dfs(curStr + arr[i]);
            } else if (arr[i] < +s[curStrlen]) {
                max = curStr + arr[i] + String(arr[0]).repeat(len - curStrlen - 1);
            }
        }
    }
    dfs('');
    return +max;
}

console.log(getMax(23121, [1, 2, 3]));
console.log(getMax(23121, [4, 0, 9]));
console.log(getMax(23121, [9, 2, 4]));
console.log(getMax(46215, [4, 6, 3]));
console.log(getMax(23121, [5, 6, 3]));
console.log(getMax(5, [5, 6, 3]));
console.log(getMax(7, [5, 6, 3]));
console.log(getMax(2, [5, 6, 3]));
console.log(getMax(40001, [4, 0, 9]));
console.log(getMax(5416, [5, 4, 8, 2]));
console.log(getMax(2222, [2]));
console.log(getMax(2222, [2, 1]));
console.log(getMax(2221, [2]));
console.log(getMax(2222, [2, 3]));
console.log(getMax(2533, [2, 3, 5]));
console.log(getMax(41048, [1, 4, 8]));
console.log(getMax(11048, [4, 1, 8]));
console.log(getMax(14048, [4, 1, 8]));
