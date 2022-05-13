<script setup>
import { computed } from 'vue';
import { useRouter } from './index';
const router = useRouter();
const comp = computed(() => {
    const route = router.routes.find((route) => router.current.value === route.path);
    return route?.component || null;
});
</script>

<template>
    <component :is="comp"></component>
</template>
