function ListNode(val) {
    this.val = val;
    this.next = null;
}
function createList(...arr) {
    const n = arr.length;
    const list = [];
    list[n] = null;
    for (let i = n - 1; i >= 0; i--) {
        list[i] = new ListNode(arr[i]);
        list[i].next = list[i + 1];
    }
    return list[0];
}
const head = createList(1, 2, 3, 3, 4, 4, 5);
console.log(head);
