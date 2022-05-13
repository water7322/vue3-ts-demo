<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue';

let timing = window.performance && window.performance.timing;
let navigation = window.performance && window.performance.navigation;

// DNS 解析：
let dns = timing.domainLookupEnd - timing.domainLookupStart;
console.log(dns)
// 总体网络交互耗时：
let network = timing.responseEnd - timing.navigationStart;
console.log(network)
// 渲染处理：
let processing = (timing.domComplete || timing.domLoading) - timing.domLoading;
console.log(processing)
// 可交互：
let active = timing.domInteractive - timing.navigationStart;
console.log(active)
</script>

<template>
    <router-view />
    <!-- <HelloWorld msg="asdf"/> -->
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
