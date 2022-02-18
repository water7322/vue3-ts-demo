<script setup lang="ts">
import { AppMain, Navbar } from './components';
</script>

<template>
    <Navbar />
    <AppMain />
    <el-button type="primary">asdfsf</el-button>
    <el-input />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
<style lang="scss" scoped>
    button {
        width: 100px;
    }
</style>