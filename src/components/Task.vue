<template>
  <div @click="details=!details">

<!-- INITIAL TASK  -->    
<Transition name="v" mode="out-in">
  <div key="not_completed" v-if="!completed " class="hover:bg-slate-100 hover:dark:bg-slate-700 cursor-pointer py-5">
  <div  class="flex justify-between items-center transition-all px-10 ">
      <div class="flex items-start">   
      <button @click.stop="handleCompleteTask" class="w-7 h-7 mr-3 border-2 rounded-full border-slate-900 dark:border-slate-300 hover:bg-slate-600 transition-all">   
        </button>
            <div>
            <h1 class="inline-block font-light text-lg dark:text-slate-200">{{ task.title }}</h1>
            <i class="fa-solid fa-list-check text-sm dark:text-slate-200 ml-3"></i>
            <i class="fa-solid fa-bell text-sm dark:text-slate-200 ml-2 mr-3"></i>
            <div class="inline" v-if="task.due_date">
              <i class="fa-regular fa-calendar text-sm dark:text-slate-400 mx-1"></i>
              <span class="text-sm font-light dark:text-slate-400">{{ dueDateString }}</span>
            </div>
      
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex gap-2">
          
            <div v-for="category in taskCategories" class="px-2 py-1 rounded-full text-xs text-white" :class="`bg-${category.color}`">{{ category.title }}</div>
          
          </div>
         
          <button @click.stop="" class="h-8 w-8 ml-2 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-full transition-all">
            <i class="fa-solid fa-ellipsis dark:text-white"></i>
          </button>
          <div>
          
          </div>
        </div>
        
    </div>
    <div v-if="details===true" class="pl-20">
        <p class="text-gray-500 dark:text-slate-500 text-sm mb-2">{{ task.desc }}</p>
        <div>
          <button class="w-3 h-3 mr-3 border-2 rounded-full border-emerald-700 bg-emerald-500 dark:border-emerald-300 hover:bg-emerald-900 transition-all">
        </button>
        <span class="text-gray-500 dark:text-slate-500 text-sm">Bla bla bla </span>
        </div>
        <div>
          <button class="w-3 h-3 mr-3 border-2 rounded-full border-emerald-700 bg-emerald-500 dark:border-emerald-300 hover:bg-emerald-900 transition-all">
        </button>
        <span class="text-gray-500 dark:text-slate-500 text-sm">Bla bla bla </span>
        </div>
        <div>
          <button class="w-3 h-3 mr-3 border-2 rounded-full  border-slate-900 dark:border-slate-300 hover:bg-slate-600 transition-all">
        </button>
        <span class="text-gray-500 dark:text-slate-500 text-sm">Bla bla bla </span>
        </div>
    </div>
  </div>  

  <!-- COMPLETED TASK ------------------------------------------------------------------------------------- -->

    <div key="completed" v-else class="hover:bg-slate-100 hover:dark:bg-slate-700 cursor-pointer py-5">
    <div class="relative flex justify-between items-center transition-all px-10 hover:bg-slate-100 hover:dark:bg-slate-700 cursor-pointer">
      <div class="flex items-start"> 
      <button @click.stop="handleUndoCompleteTask" class="w-7 h-7 mr-3 border-2 rounded-full border-emerald-700 bg-emerald-500 dark:border-emerald-300 hover:bg-emerald-900 transition-all">
          <i class="fa-solid fa-check text-white"></i>
        </button>
        <div>
            <h1 class="inline-block font-light text-lg dark:text-slate-200">{{ task.title }}</h1>
            <i class="fa-solid fa-list-check text-sm dark:text-slate-200 ml-3"></i>
            <i class="fa-solid fa-bell text-sm dark:text-slate-200 ml-2 mr-3"></i>
            <div class="inline" v-if="task.due_date">
              <i class="fa-regular fa-calendar text-sm dark:text-slate-400 mx-1"></i>
              <span class="text-sm font-light dark:text-slate-400">{{ dueDateString }}</span>
            </div>
           
        </div>
      
      </div> 
        <div class="flex items-center">
          <div class="flex gap-2">
            <div v-for="category in taskCategories" class="px-2 py-1 rounded-full text-xs text-white" :class="`bg-${category.color}`">{{ category.title }}</div>
          </div>
          <button @click.stop="" class="h-8 w-8 ml-2 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-full transition-all">
            <i class="fa-solid fa-ellipsis dark:text-white"></i>
          </button>
          <div>
          
          </div>
        </div>
    </div>

    <Transition name="slide">
    <div v-if="details" class="px-20">
        <p class="text-gray-500 dark:text-slate-500 text-sm mb-2">{{ task.desc }}</p>
        <div>
          <button class="w-3 h-3 mr-3 border-2 rounded-full border-emerald-700 bg-emerald-500 dark:border-emerald-300 hover:bg-emerald-900 transition-all">
        </button>
        <span class="text-gray-500 dark:text-slate-500 text-sm">Bla bla bla </span>
        </div>
        <div>
          <button class="w-3 h-3 mr-3 border-2 rounded-full border-emerald-700 bg-emerald-500 dark:border-emerald-300 hover:bg-emerald-900 transition-all">
        </button>
        <span class="text-gray-500 dark:text-slate-500 text-sm">Bla bla bla </span>
        </div>
        <div>
          <button class="w-3 h-3 mr-3 border-2 rounded-full  border-slate-900 dark:border-slate-300 hover:bg-slate-600 transition-all">
        </button>
        <span class="text-gray-500 dark:text-slate-500 text-sm">Bla bla bla </span>
        </div>
    </div>
  </Transition>

  </div>
</Transition>
 
  </div>
  
 
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTaskStore } from '../store/task';
import { useUserStore } from '../store/user';
import { useCategoryStore } from '../store/category'


const taskStore = useTaskStore();
const userStore = useUserStore();
const categoryStore = useCategoryStore();

const props = defineProps(["task"]);
const completed = ref(props.task.is_complete);

const details = ref(false);

async function handleCompleteTask() {
  await taskStore.completeTask(props.task.id)
  taskStore.fetchTasks(userStore.user.id)
  completed.value = true;
}

async function handleUndoCompleteTask() {
  await taskStore.undoCompleteTask(props.task.id)
  taskStore.fetchTasks(userStore.user.id)
  completed.value = false;
}

const taskCategories = ref("");
const dueDate = new Date(props.task.due_date);
const dueDateString = `${dueDate.getDate()}/${('0'+(dueDate.getMonth()+1)).slice(-2)}`;

onMounted(() => {
  if(props.task.categories) taskCategories.value = categoryStore.categories.filter(cat => props.task.categories.includes(cat.id));
})

</script>

<style scoped>
.v-enter-active, .v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}

.slide-enter-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}

</style>