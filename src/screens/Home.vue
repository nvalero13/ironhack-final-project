<template>
        <Navigation />
    <div class="grid grid-cols-4 gap-4">
        <Task v-for="task in tasks" :task="task"/>
     
    </div>
</template>

<script setup>
import Task from '../components/Task.vue'
import Navigation from "../components/Navigation.vue";

import { ref } from 'vue';

const tasks = ref([{
    title: "Do some pushups",
    description: "Do at least 10 pushups three times during the day."
},
{
    title: "Add tags",
    description: "Add a tag system to add tags and filter tasks"
},
{
    title: "Look for references",
    description: "Create a figma doc and look for some design examples to create the layout"
},
])

</script>

<style scoped>

</style>