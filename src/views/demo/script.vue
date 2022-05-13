<script lang="ts">
import {
    defineComponent,
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
import Cpn from './Cpn.vue';
import type CpnIns from './Cpn.vue';


export default defineComponent({
    components: { Cpn },
    setup() {
        const str = ref('字符串');
        const num = ref(0);
        const clickAdd = () => {
            num.value++;
        };
        const changeNum = (value: number) => {
            num.value = value;
        };
        const resetNum = () => {
            num.value = 0;
        };
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
        const updateObj = () => {
            obj.a++;
        };

        const provideValue = reactive({ key: 1, value: 2 });
        provide('provideValue', provideValue);

        onBeforeMount(() => {
            console.log('onBeforeMount');
        });
        const cpnRef = ref<InstanceType<typeof CpnIns>>();
        onMounted(() => {
            console.log('onMounted');
            console.log(cpnRef.value!.foo);
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
        const count = computed(() => store.state.count);
        const count2 = computed(() => store.state.count2);
        const count3 = computed(() => store.state.count3);
        const double = computed(() => store.getters.doubleCount);

        return {
            cpnRef,
            str,
            num,
            computedNum,
            computedNum2,
            clickAdd,
            changeNum,
            resetNum,
            obj,
            updateObj,
            router,
            store,
            count,
            count2,
            count3,
            double
        };
    }
});
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

    <!-- props&emit -->
    <Cpn ref="cpnRef" :foo="str" @change="changeNum" @reset="resetNum" />

    <br />
    <br />

    <!-- router -->
    <el-button @click="router.push('/script-setup')">跳转到script-setup</el-button>

    <br />
    <br />

    <!-- vuex -->
    <div>state.count: {{ count }}</div>
    <div>state.count2: {{ count2 }}</div>
    <div>state.count3: {{ count3 }}</div>
    <div>getter.double: {{ double }}</div>
    <el-button @click="store.commit('increment', obj)">改变vuex的值</el-button>
</template>
