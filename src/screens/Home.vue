<template>
  <div class="flex mx-auto bg-gray-50 dark:bg-slate-800 max-w-[1200px] h-min-screen">
    <Menu />
    <div class="w-full">
      <div class="flex justify-between items-center sticky top-0 bg-gray-50 dark:bg-slate-800 px-10 pt-12 pb-6">
        <h1 class="text-2xl font-bold mb-5 dark:text-white">⭐ Today</h1>
        <button
          @click="taskStore.creating = !taskStore.creating"
          class="px-4 py-2 rounded-sm bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Add Task
        </button>
      </div>
      <Create />
      
      <Task class="px-10 transition-all" v-for="task in taskStore.tasks" :task="task" />

    </div>
  </div>
</template>

<script setup>
import Task from "../components/Task.vue";
import Menu from "../components/Menu.vue";
import Create from "../components/Create.vue";

import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";

const userStore = useUserStore();
const taskStore = useTaskStore();

taskStore.fetchTasks(userStore.user.id)

</script>

<style scoped></style>
