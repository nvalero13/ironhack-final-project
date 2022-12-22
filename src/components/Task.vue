<template>
    <div class="flex items-start bg-white ">
        <input class="mt-4" type="checkbox" name="" id="">
        <div class="p-2">
            <h1 class="font-bold text-lg">{{ task.title }}</h1>
            <p class="text-gray-500 text-sm">{{ task.description }}</p>
        </div>


    </div>
</template>

<script setup>
const props = defineProps(["task"]);
</script>

<style scoped>

</style>