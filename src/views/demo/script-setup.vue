<script lang="ts" setup>
import {
    ref,
    reactive,
    provide,
    computed,
    watch,
    onMounted,
    onBeforeMount,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
    nextTick
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
// import { useRouter } from '@/router/grouter/index';
// import { useStore } from '@/store/gvuex';
import Cpn from './Cpn-setup.vue';
import type CpnIns from './Cpn-setup.vue';

const str = ref('字符串');
const num = ref(0);
function clickAdd() {
    num.value++;
}
function changeNum(value: number) {
    num.value = value;
}
function resetNum() {
    num.value = 0;
}
const computedNum = computed(() => {
    return num.value * 2;
});
const computedNum2 = computed({
    get: () => num.value + 1,
    set: (val) => {
        num.value = val - 1;
    }
});
watch(computedNum, (newValue, oldValue) => {
    console.log('computedNum从' + oldValue + '变成了' + newValue);
});

const obj = reactive({ a: 1, b: 'str' });
function updateObj() {
    obj.a++;
}

const arr = ref([0, 1, 2, 3]);
function push() {
    arr.value.push(10);
}
function index() {
    arr.value[2] = 10;
}

const provideValue = reactive({ key: 1, value: 2 });
provide('provideValue', provideValue);

onBeforeMount(() => {
    console.log('onBeforeMount');
});
const cpnRef = ref<InstanceType<typeof CpnIns>>();
onMounted(() => {
    console.log('onMounted');
    // console.log(cpnRef.value?.exposeValue);
    // console.log(cpnRef.value!.exposeValue2);
});
onBeforeUpdate(() => {
    console.log('onBeforeUpdate');
});
onUpdated(() => {
    console.log('onUpdated');
});
onBeforeUnmount(() => {
    console.log('onBeforeUnmount');
});
onUnmounted(() => {
    console.log('onUnmounted');
});
nextTick(() => {
    console.log('nextTick');
});

const router = useRouter();
const route = useRoute();
console.log(route.query);

const store = useStore();
console.log(store);
const count = computed<number>(() => store.state.count);
const count2 = computed<number>(() => store.state.count2);
const count3 = computed<number>(() => store.state.count3);
const double = computed<number>(() => store.getters.doubleCount);
</script>

<template>
    <!-- ref -->
    <div>str: {{ str }}</div>
    <div>num: {{ num }}</div>
    <div>computedNum: {{ computedNum }}</div>
    <el-button @click="clickAdd">点击加1</el-button>

    <br />
    <br />

    <!-- reactive -->
    <div>obj: {{ obj }}</div>
    <el-button @click="updateObj">点击修改对象属性a的值</el-button>

    <br />
    <br />

    <!-- 数组 -->
    <div>array: {{ arr }}</div>
    <el-button @click="push">测试数组push</el-button>
    <el-button @click="index">测试数组下标监听</el-button>

    <br />
    <br />

    <!-- props&emit -->
    <Cpn ref="cpnRef" :foo="str" :num="num" @change="changeNum" @reset="resetNum" />
    {{ str }}

    <br />
    <br />

    <!-- router -->
    <el-button @click="router.push('/script')">跳转到script</el-button>

    <br />
    <br />

    <!-- vuex -->
    <div>state.count: {{ count }}</div>
    <div>state.count2: {{ count2 }}</div>
    <div>state.count3: {{ count3 }}</div>
    <div>getter.double: {{ double }}</div>
    <el-button @click="store.commit('increment', obj)">mutations改变vuex的值</el-button>
    <el-button @click="store.dispatch('asyncAdd', obj)">actions改变vuex的值</el-button>
</template>
