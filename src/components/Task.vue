<template>
    <div class="flex rounded-lg shadow-sm w-full bg-white border border-emerald-100">
        <div class="bg-emerald-200 rounded-l-md w-1/12">

        </div>
        <div class="p-2">
            <h1 class="font-bold text-lg">{{ task.title }}</h1>
            <p>{{ task.description }}</p>
        </div>


    </div>
</template>

<script setup>
const props = defineProps(["task"]);
</script>

<style scoped>

</style>