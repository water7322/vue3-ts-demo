<script lang="ts" setup>
import { ref, computed, Ref } from 'vue';
import useStorege from '@/utils/useStorage';
const title = ref('');

const todos = useStorege('todos');
const active = computed(() => {
    return todos.value.filter((todo) => todo.done).length;
});
const all = computed(() => todos.value.length);
const allDone = computed({
    get: () => active.value !== 0,
    set: (val) => {
        todos.value.forEach((item) => (item.done = val));
    }
});
function addTodo() {
    todos.value.push({
        title: title.value,
        done: false
    });
    title.value = '';
}
function clear() {
    todos.value = todos.value.filter((v) => !v.done);
}
</script>

<template>
    <el-input v-model="title" type="text" @keydown.enter="addTodo" />
    <el-button @click="clear">清理</el-button>
    <ul v-if="todos.length">
        <li v-for="todo of todos">
            <el-checkbox v-model="todo.done"></el-checkbox>
            <span :class="{ done: todo.done }">{{ todo.title }}</span>
        </li>
    </ul>
    <div v-else>暂无数据</div>
    <div>
        全选<el-checkbox v-model="allDone" />
        <span>{{ active }}/{{ all }}</span>
    </div>
</template>
