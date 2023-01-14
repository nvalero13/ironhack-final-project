<template>
  <div
    class="flex mx-auto bg-gray-50 dark:bg-slate-800 max-w-[1200px] h-min-screen border-x relative"
  >
    <Menu @filter="handleFilter" :actualFilter="actualFilter" />
    <div class="w-full">
      <div
        class="flex justify-between items-center sticky top-0 z-10 bg-gray-50 dark:bg-slate-800 px-10 pt-12 pb-6 border-b h-10/12"
      >
        <div>
          <h1 class="text-3xl mb-2 dark:text-white">
            <i v-if="actualFilter === 'Upcoming'" class="fa-solid fa-calendar-week m-2 text-orange-400"></i>
            <i v-if="actualFilter === 'Today'" class="fa-solid fa-calendar-day m-2 text-yellow-400"></i>
            <i v-if="actualFilter === 'Anytime'" class="fa-solid fa-clock m-2 text-slate-600 dark:text-gray-300"></i>
            <div class="inline-block" v-if="actualFilter === 'Logbook'">
              <i class="fa-solid fa-clipboard-check m-2 text-emerald-400"></i>
          </div>
            
            
            {{ title }}</h1>
          <h2 v-if="actualFilter!='Logbook'" class="text-md font-light ml-2 dark:text-slate-400">
            {{ doneTaskNum }} out of {{ taskNum }} tasks completed
          </h2>
          <h2 v-else class="text-md font-light ml-2 dark:text-slate-400">
            {{ taskNum }} tasks completed
          </h2>
        </div>
        <button
          @click="creating = true"
          class="px-4 py-2 rounded-full border bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          New task
        </button>
      </div>



      <div class="max-h-10/12">
     
        <Task v-for="task in tasks" :task="task" :key="task.id" />

      </div>
    </div>


      

    <Transition name="create">
        <div v-show="creating" class="absolute z-10 top-0 left-0 right-0 bottom-0">
            <Create class="create-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg" v-show="creating" @close="creating = false"/>
            <div class="w-full h-full dark:bg-black bg-gray-300 opacity-50"></div>
        </div>
    </Transition>
    
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

import Task from "../components/Task.vue";
import Menu from "../components/Menu.vue";
import Create from "../components/Create.vue";

import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";

const userStore = useUserStore();
const taskStore = useTaskStore();

taskStore.fetchTasks(userStore.user.id);

const creating = ref(false);

const title = ref("Today");

const tasks = ref(taskStore.tasks);
const taskNum = computed(() => tasks.value.length);
const doneTaskNum = computed(() => tasks.value.filter((task) => task.is_complete === true).length);

const actualFilter = ref("Today");

watch(
  () => taskStore.tasks,
  () => {
    applyFilter(actualFilter.value);
  }
);

function handleFilter(param) {
  actualFilter.value = param;
  applyFilter(actualFilter.value);
}

function applyFilter() {
  switch (actualFilter.value) {
    case "Today":
      title.value = "Today";
      tasks.value = taskStore.tasks.filter((task) =>
        task.title.includes("Prova")
      );
      break;
    case "Upcoming":
      title.value = "Upcoming";
      tasks.value = taskStore.tasks;
      break;
    case "Anytime":
      title.value = "Anytime";
      tasks.value = taskStore.tasks;
      break;
    case "Logbook":
      title.value = "Logbook";
      tasks.value = taskStore.tasks.filter((task) => task.is_complete === true);
      break;
  }
}
</script>

<style scoped>

.create-enter-active, .create-leave-active {
  transition: opacity .5s;
}
.create-enter, .create-leave-to {
  opacity: 0;
}

</style>
