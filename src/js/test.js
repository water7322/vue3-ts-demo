var threeSum = function (nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const res = [];
    for (let i = 0; i < n - 2; i++) {
        if (nums[i] === nums[i - 1]) continue;
        let j = i + 1;
        let k = n - 1;
        while (j < k) {
            if (nums[j] === nums[j + 1] && j + 1 < k) {
                j++;
                continue;
            }
            const sum = nums[i] + nums[j] + nums[k];
            if (sum < 0) {
                j++;
            } else if (sum === 0) {
                res.push([nums[i], nums[j++], nums[k--]]);
            } else {
                k--;
            }
        }
    }
    return res;
};
