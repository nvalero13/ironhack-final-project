<template>
    <div class="flex mx-auto w-[1000px]">
        <Menu />
    <div class="ml-10 mt-24">
        <Task v-for="task in tasks" :task="task"/>
     
    </div>
</div>
</template>

<script setup>
import Task from '../components/Task.vue'
import Menu from "../components/Menu.vue";

import { ref } from 'vue';

const tasks = ref([{
    title: "Do some pushups",
    description: "Do at least 10 pushups three times during the day.",
    done: false
},
{
    title: "Add tags",
    description: "Add a tag system to add tags and filter tasks",
    done: true
},
{
    title: "Look for references",
    description: "Create a figma doc and look for some design examples to create the layout",
    done: false
},
])

</script>

<style scoped>

</style>