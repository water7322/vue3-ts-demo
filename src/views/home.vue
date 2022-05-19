<script setup lang="ts">
import TodoList from '@/components/TodoList.vue';
import { useFullscreen } from '@vueuse/core';
import Rate from '@/components/Rate.vue';
import { ref } from 'vue';

const { isFullscreen, enter, exit, toggle } = useFullscreen();

const score = ref(3);

function update(num: number) {
    score.value = num;
    console.log(num);
}
</script>

<template>
    <h1>这是首页</h1>
    <el-button @click="toggle">全屏</el-button>
    <TodoList />
    <Rate :value="3" />
    <Rate :value="score" theme="red" />
    <Rate v-model="score" theme="red" />
    <Rate :value="1" theme="green" @update-rate="update" />
</template>
