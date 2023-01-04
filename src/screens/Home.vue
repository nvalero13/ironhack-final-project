<template>
  <div class="flex mx-auto bg-gray-50 dark:bg-slate-800 max-w-[1200px] h-min-screen border-r">
    <Menu @filter="handleFilter" :my-prop="parentProp"/>
    <div class="w-full">
      <div class="flex justify-between items-start sticky top-0 bg-gray-50 dark:bg-slate-800 px-10 pt-12 pb-6 border-b mb-6 h-10/12">
        <div>
        <h1 class="text-3xl mb-2 font-bold dark:text-white">{{ title }}</h1>
        <h2 class="text-md font-semibold ml-2 dark:text-white">{{ taskNum }} tasks</h2>
      </div>
        <button
          @click="taskStore.creating = !taskStore.creating"
          class="px-4 py-2 rounded-sm bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Add Task
        </button>
      </div>

      <Create />

      <div class="h-10/12 overflow-auto">
      <Task class="px-10" v-for="task in tasks" :task="task" />
    </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed  } from "vue";

import Task from "../components/Task.vue";
import Menu from "../components/Menu.vue";
import Create from "../components/Create.vue";

import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";

const userStore = useUserStore();
const taskStore = useTaskStore();

taskStore.fetchTasks(userStore.user.id)

const parentProp = ref(null)
console.log(parentProp.value)



const title = ref("⭐ Today");

const tasks = ref(taskStore.tasks)
const taskNum = computed(() => tasks.value.length)

const actualFilter = ref("Today");

watch(() => taskStore.tasks, () => {
  console.log(actualFilter.value)
  applyFilter(actualFilter.value)
})

function handleFilter(param) {
  actualFilter.value = param
  applyFilter(actualFilter.value)
}

function applyFilter(filter) {
  switch(actualFilter.value) {
    case "Today":
    title.value = "⭐ Today";
    tasks.value = taskStore.tasks.filter(task => task.title.includes("Prova"))
    break;
    case "Upcoming":
    title.value = "📆 Upcoming";
    tasks.value = taskStore.tasks
    break;
    case "Anytime":
    title.value = "🕑 Anytime";
    tasks.value = taskStore.tasks
    break;
    case "Logbook":
    title.value = "✅ Logbook";
    tasks.value = taskStore.tasks.filter(task => task.is_complete === true)
    break;
  }
}


</script>

<style scoped></style>
