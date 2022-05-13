import { ref, watchEffect } from 'vue';

type Todo = {
    title: string,
    done: boolean
}
function useStorege(name: string, value?: Todo[]) {
    const data = ref(value || JSON.parse(localStorage.getItem(name) || '[]') as Todo[] );
    watchEffect(() => {
        localStorage.setItem(name, JSON.stringify(data.value));
    });
    return data;
}

export default useStorege