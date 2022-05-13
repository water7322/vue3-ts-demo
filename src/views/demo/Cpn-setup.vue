<script lang="ts" setup>
import { ref, toRefs, inject } from 'vue';
const props = defineProps({
    foo: {
        type: String,
        required: true
    },
    num: {
        type: Number,
        default: 123
    }
});
const { foo, num } = toRefs(props);
foo.value = 'sdf';
num.value = 44;
const arr = ref([0, 1, 2]);
arr.value[3] = 3
const injectValue = inject('provideValue');

const emit = defineEmits<{
    (e: 'change', value: number): void;
    (e: 'reset'): void;
}>();
const exposeValue = ref(1);
const exposeValue2 = ref(2);
defineExpose({
    exposeValue
});
</script>

<template>
    <div>测试provide: {{ injectValue }}</div>
    <div>测试props: {{ foo }}{{ num }}{{ props.num }}</div>
    {{ arr }}
    <div>测试emit</div>
    <el-button @click="emit('change', 50)">改变num的值为50</el-button>
    <el-button @click="emit('reset')">重置num的值</el-button>
</template>
