<template>
  <div class="flex mx-auto bg-gray-50 dark:bg-slate-800 max-w-[1200px] min-w-[800px] min-h-screen border-x relative">
    <Menu @filter="handleFilter" @filterCat="handleFilterCat" :actualFilter="actualFilter" :expiredTasks="expiredTasks.length" />
    <div class="w-full">
      <div class="sticky top-0">
      <div
        class="flex justify-between items-center  z-10 bg-gray-50 dark:bg-slate-800 px-10 pt-12 pb-6 border-b h-10/12">
        <div>
          <h1 class="text-3xl mb-2 dark:text-white">
            <i v-if="actualFilter === 'Upcoming'" class="fa-solid fa-calendar-week m-2 text-orange-400"></i>
            <i v-if="actualFilter === 'Today'" class="fa-solid fa-calendar-day m-2 text-yellow-400"></i>
            <i v-if="actualFilter === 'Anytime'" class="fa-solid fa-clock m-2 text-slate-600 dark:text-gray-300"></i>
            <div class="inline-block" v-if="actualFilter === 'Logbook'">
              <i class="fa-solid fa-clipboard-check m-2 text-emerald-400"></i>
            </div>
            {{ title }}
          </h1>
          <h2 v-if="actualFilter != 'Logbook' && tasks.length > 0" class="text-md font-light ml-2 dark:text-slate-400">
            {{ doneTaskNum }} out of {{ taskNum }} tasks completed
          </h2>
          <h2 v-if="actualFilter == 'Logbook' " class="text-md font-light ml-2 dark:text-slate-400">
            {{ taskNum }} tasks completed
          </h2>
        </div>
        <button @click="creating = true"
          class="px-4 py-2 rounded-full border bg-emerald-500 hover:bg-emerald-600 text-white">
          New task
        </button>
      </div>
      <div
          v-if="expiredTasks.length > 0 && actualFilter === 'Today'" class="border-b sticky top-0 bg-red-500 bg-opacity-20 dark:bg-opacity-30 backdrop-blur-lg text-red-500 dark:text-white text-center p-2 hover:brightness-125">
          <button @click="seeExpired = !seeExpired" class="p-3"><span v-if="!seeExpired"> Show</span><span
              v-else> Hide</span> {{ expiredTasks.length }} expired tasks</button>
      
      </div>
    </div>
      <div class="max-h-10/12">
        <Transition name="slide">
        <div v-show="seeExpired && actualFilter === 'Today'" class="bg-red-500 bg-opacity-10 border-b overflow-hidden max-h-[500px]">
          <Task v-for="task in expiredTasks" :task="task" :key="task.id" @openEdit="edit" />
        </div>
      </Transition>
        <div v-if="tasks.length > 0">
          <Task v-for="task in tasks" :task="task" :key="task.id" @openEdit="edit" />
        </div>
        <div v-if="tasks.length == 0 && actualFilter != 'Logbook'" class="flex flex-col mt-32 justify-center items-center">
          <h1 class="text-3xl text-gray-300 dark:text-slate-600 mb-6">No tasks yet as {{ actualFilter.toLowerCase() }}
            :(</h1>
          <button @click="creating = true"
            class="px-4 py-2 rounded-full border bg-emerald-500 hover:bg-emerald-600 text-white">
            Add your first {{ actualFilter.toLowerCase() }} task
          </button>
        </div>
      </div>
    </div>

    <Transition name="create">
      <div v-show="creating || editing" class="absolute z-10 top-0 left-0 right-0 bottom-0">
        
        <Create class="create-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg"
          v-if="creating" @close="creating = false" />
       
        <Edit class="create-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg"
          v-if="editing" @close="editing = false" :task="editingTask" />
          
        <div class="w-full h-full dark:bg-black bg-gray-300 opacity-50"></div>
        
      </div>
    </Transition>
 

  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";

import Task from "../components/Task.vue";
import Menu from "../components/Menu.vue";
import Create from "../components/Create.vue";
import Edit from "../components/Edit.vue";

import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";
import { useCategoryStore } from "../store/category"

const userStore = useUserStore();
const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

taskStore.fetchTasks(userStore.user.id);

const creating = ref(false);
const editing = ref(false);
const editingTask = ref()

function edit(task) {
  editingTask.value = task;
  editing.value = true;
}

const title = ref("Today");

const tasks = ref(taskStore.tasks);
const taskNum = computed(() => tasks.value.length);
const doneTaskNum = computed(() => tasks.value.filter((task) => task.is_complete === true).length);

const actualFilter = ref("Today");

onMounted(async () => {
  await taskStore.fetchTasks(userStore.user.id)
  await categoryStore.fetchCategories(userStore.user.id);
})

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


function handleFilterCat(param) {
console.log(param)
    if (param) {
    applyFilter()
    tasks.value = tasks.value.filter((task) =>
        task.categories.includes(param)
      );
    } else {
    applyFilter()
    }
}

const expiredTasks = ref([])
const seeExpired = ref(false)

function applyFilter() {
  if (seeExpired.value == true) seeExpired.value = false
  
  switch (actualFilter.value) {
    case "Today":
      title.value = "Today";
      tasks.value = taskStore.tasks.filter((task) =>
        isToday(new Date(task.due_date))
      );
      expiredTasks.value = taskStore.tasks.filter((task) =>
        isExpired(new Date(task.due_date)) && !task.is_complete && task.due_date)
      break;
    case "Upcoming":
      title.value = "Upcoming";
      tasks.value = taskStore.tasks.filter((task) =>
        isWithinNext7Days(new Date(task.due_date))
      );
      break;
    case "Anytime":
      title.value = "Anytime";
      tasks.value = taskStore.tasks.filter((task) =>
        !task.due_date
      );
      break;
    case "Logbook":
      title.value = "Logbook";
      tasks.value = taskStore.tasks.filter((task) => task.is_complete === true);
      break;
  }
}

const today = new Date();
const isToday = (first) =>
  first.getFullYear() === today.getFullYear() &&
  first.getMonth() === today.getMonth() &&
  first.getDate() === today.getDate();

function isWithinNext7Days(date) {
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  return (date.setHours(0,0,0,0) - today.setHours(0,0,0,0)) < oneWeek && (date.setHours(0,0,0,0) - today.setHours(0,0,0,0)) > 0;
}

function isExpired(date) {
  return date.setHours(0,0,0,0) < today.setHours(0,0,0,0);
}

// Observar amplitud per amagar menu
// watch(() => window.innerWidth,
// () => {
//   if(window.innerWidth > 600) {

//   }
// })

</script>

<style scoped>
.create-enter-active,
.create-leave-active {
  transition: opacity 0.5s ease;
}

.create-enter-from,
.create-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: all 0.7s ease;
}

.slide-leave-active {
  transition: all 0.1s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
