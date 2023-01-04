<template>
    <Transition name="v">
      <div>
    <div v-if="!task.is_complete" class="flex items-center transition-all mb-10">
        <button click="" class="w-6 h-6 mr-1 border-2 rounded-full border-slate-900 dark:border-slate-300 hover:bg-slate-600 transition-all">
            
        </button>
        <div class="px-2">
            <h1 class="font-bold text-lg dark:text-slate-200">{{ task.title }}</h1>
            <p class="text-gray-500 dark:text-slate-500 text-sm">{{ task.desc }}</p>
        </div>
    </div>
    <div v-else class="flex items-center transition-all mb-10">
        <button click="" class="w-6 h-6 mr-1 border-2 rounded-full border-emerald-700 bg-emerald-500 dark:border-emerald-300 hover:bg-emerald-900 transition-all">
          <svg  class="p-1" fill="none" viewBox="0 0 115 84" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 45.5L38 76.5L107.5 7" stroke="white" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="px-2">
            <h1 class="font-bold text-lg text-gray-500 dark:text-slate-500">{{ task.title }}</h1>
            <p class="text-gray-300 dark:text-slate-600 text-sm">{{ task.desc }}</p>
        </div>
    </div>
  </div>
    </Transition>
</template>

<script setup>
const props = defineProps(["task"]);

console.log(props.task)
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