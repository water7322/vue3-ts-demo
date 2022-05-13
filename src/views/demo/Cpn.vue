<script lang="ts">
import { ref, toRefs, inject, defineComponent } from 'vue';

export default defineComponent({
    props: {
        foo: String,
        num: {
            type: Number,
            default: 123
        }
    },
    // emits: {
    //     change: null,
    //     reset: null
    // },
    emits: ['change', 'reset'],
    setup(props, context) {
        const { foo, num } = toRefs(props);
        const injectValue = inject('provideValue');

        const exposeValue = ref(1);
        const exposeValue2 = ref(2);
        context.expose({exposeValue})
        return {
            injectValue,
            foo,
            num,
            emit: context.emit
        };
    }
});
</script>

<template>
    <div>测试provide: {{ injectValue }}</div>
    <div>测试props: {{ foo }}{{ num }}</div>
    <div>测试emit</div>
    <el-button @click="emit('change', 50)">改变num的值为50</el-button>
    <el-button @click="emit('reset')">重置num的值</el-button>
</template>
