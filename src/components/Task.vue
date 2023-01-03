<template>
    <Transition name="v">
    <div class="flex items-start transition-all">
        <input class="mt-5" type="checkbox" name="" id="">
        <div class="p-2">
            <h1 class="font-bold text-lg">{{ task.title }}</h1>
            <p class="text-gray-500 text-sm">{{ task.desc }}</p>
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