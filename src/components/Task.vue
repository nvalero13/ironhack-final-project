<template>
    <Transition name="v">
    <div class="flex items-center transition-all mb-10">
        <button click="" class="w-6 h-6 mr-1 border-2 rounded-full border-slate-900 dark:border-slate-300 hover:bg-slate-600 transition-all">
            
        </button>
        <div class="px-2">
            <h1 class="font-bold text-lg dark:text-slate-200">{{ task.title }}</h1>
            <p class="text-gray-500 dark:text-slate-500 text-sm">{{ task.desc }}</p>
        </div>
    </div>
    </Transition>
</template>

<script setup>
const props = defineProps(["task"]);
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>