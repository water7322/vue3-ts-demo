<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps({
    modelValue: Number,
    value: {
        type: Number,
        default: 0
    },
    theme: {
        type: String,
        default: 'yellow'
    }
});
console.log(props);
const emits = defineEmits<{
    (e: 'update-rate', num: number): void;
    (e: 'update:modelValue', num: number): void;
}>();
const rate = computed(() => '★★★★★☆☆☆☆☆'.slice(5 - props.value, 10 - props.value));
const fontStyle = computed(() => `color:${props.theme}`);
</script>

<template>
    <div :style="fontStyle">{{ rate }}</div>
    <el-button @click="emits('update-rate', 2)"></el-button>
    <el-button @click="emits('update:modelValue', 2)"></el-button>
</template>
