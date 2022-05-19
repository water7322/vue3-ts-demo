import { effect } from './effect.js';
import { reactive } from './index.js';
import { ref } from './ref.js';
import { computed } from './computed.js';

// 测试响应式
// reactive基本使用
const ret = reactive({ num: 0 });
let val;
effect(() => {
    val = ret.num;
});
console.log(val); // 0
ret.num++;
console.log(val); // 1
ret.num = 10;
console.log(val); // 10

// computed测试
// computed基本使用
ret.count = 1;
const num = ref(2);
const sum = computed(() => num.value + ret.count);
console.log(sum.value); // 3
ret.count++;
console.log(sum.value); // 4
num.value = 10;
console.log(sum.value); // 12

// computed属性修改
const author = ref('阿水');
const course = ref('测试Vue3');
const title = computed({
    get() {
        return author.value + ':' + course.value;
    },
    set(val) {
        [author.value, course.value] = val.split(':');
    }
});
console.log(title.value); // 阿水:测试Vue3

author.value = 'winter';
course.value = '重学前端';
console.log(title.value); // winter:重学前端

title.value = '王争:数据结构与算法之美';
console.log(author.value); // 王争
console.log(course.value); // 数据结构与算法之美
