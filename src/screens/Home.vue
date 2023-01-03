<template>
  <div class="flex mx-auto bg-gray-50 max-w-[1000px]">
    <Menu />
    <div class="mx-10 mt-24 w-full">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold mb-5">⭐ Today</h1>
        <button
          @click="taskStore.creating = !taskStore.creating"
          class="px-4 py-2 rounded-sm bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Add Task
        </button>
      </div>
      <Create />
      <Task class="transition-all" v-for="task in taskStore.tasks" :task="task" />
    </div>
  </div>
</template>

<script setup>
import Task from "../components/Task.vue";
import Menu from "../components/Menu.vue";
import Create from "../components/Create.vue";
import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";
import { storeToRefs } from 'pinia'
import { ref, watch } from "vue";

const userStore = useUserStore();
const taskStore = useTaskStore();

const { user } = storeToRefs(userStore);

taskStore.fetchTasks(user.value.id)

</script>

<style scoped></style>
