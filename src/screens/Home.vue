<template>
       
    <div class="flex mx-auto bg-gray-50 max-w-[1000px]">
        <Menu/>
    <div class="mx-10 mt-24 w-full">
        <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold mb-5">⭐ Today</h1>
            <button @click="taskStore.creating = !taskStore.creating" class="px-4 py-2 rounded-sm bg-emerald-500 hover:bg-emerald-600 text-white">Add Task</button>
        </div>
        <Create2 />
        <Task v-for="task in taskStore.tasks" :task="task"/>
     
    </div>
</div>
</template>

<script setup>
import Task from '../components/Task.vue'
import Menu from "../components/Menu.vue";
import Create2 from "../components/Create2.vue";
import { useTaskStore } from "../store/task";
import { ref } from 'vue';

const taskStore = useTaskStore();
taskStore.fetchTasks()

// const tasks = ref([{
//     title: "Do some pushups",
//     description: "Do at least 10 pushups three times during the day.",
//     done: false
// },
// {
//     title: "Add tags",
//     description: "Add a tag system to add tags and filter tasks",
//     done: true
// },
// {
//     title: "Look for references",
//     description: "Create a figma doc and look for some design examples to create the layout",
//     done: false
// },
// ]);

</script>

<style scoped>

</style>