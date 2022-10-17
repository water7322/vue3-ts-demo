class RangeList {
    constructor() {
        this.arr = [];
    }
    /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify
   beginning and end of range.
    */
    add(range) {
        // TODO: implement this
        let i = 0;
        while (this.arr?.[i]?.[0] < range[0]) {
            i++;
        }
        this.arr.splice(i, 0, range);

        const res = [];
        let preArr = this.arr[0];
        for (let i = 1; i < this.arr.length; i++) {
            if (this.arr[i][0] > preArr[1]) {
                res.push(preArr);
                preArr = this.arr[i];
            } else {
                preArr[1] = Math.max(preArr[1], this.arr[i][1]);
            }
        }
        res.push(preArr);
        this.arr = res;
    }
    /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify
   beginning and end of range.
    */
    remove(range) {
        // TODO: implement this
        let i = 0;
        while (this.arr?.[i]?.[0] < range[1]) {
            if (range[1] > this.arr[i][1] && range[0] <= this.arr[i][0]) {
                this.arr.splice(i, 1);
            } else if (range[1] > this.arr[i][1] && range[0] > this.arr[i][0] && range[0] <= this.arr[i][1]) {
                this.arr[i][1] = range[0];
                i++;
            } else if (range[1] <= this.arr[i][1] && range[0] <= this.arr[i][0]) {
                this.arr[i][0] = range[1];
                i++;
            } else if (range[1] <= this.arr[i][1] && range[0] > this.arr[i][0]) {
                const x = [range[1], this.arr[i][1]];
                this.arr[i][1] = range[0];
                this.arr.splice(i + 1, 0, x);
                break;
            } else {
                i++;
            }
        }
    }
    /**
     * Prints out the list of ranges in the range list
     */
    print() {
        // TODO: implement this
        if (this.arr.length === 0) return;
        const strArr = this.arr.map((item) => `[${item[0]}, ${item[1]})`);
        console.log(strArr.join(' '));
    }
}

// Example run
const rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)
