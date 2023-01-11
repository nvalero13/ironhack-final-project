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
            <i class="fa-regular fa-calendar text-sm dark:text-slate-400 mx-1"></i>
            <span class="text-sm font-light dark:text-slate-400">12/01</span>
      
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex gap-2">
          <div class="px-2 py-1 bg-red-500 rounded-full text-xs text-white">Work</div>
          
          </div>
         
          <button class="h-8 w-8 m-2 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-full transition-all">
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
            <i class="fa-regular fa-calendar text-sm dark:text-slate-400 mx-1"></i>
            <span class="text-sm font-light dark:text-slate-400">12/01</span>
        </div>
      
      </div> 
        <div class="flex items-center">
          <div class="flex gap-2">
          <div class="px-2 py-1 bg-orange-500 rounded-full text-xs text-white">Home</div>
          <div class="px-2 py-1 bg-blue-500 rounded-full text-xs text-white">Mom</div>
          </div>
          <button class="h-8 w-8 m-2 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-full transition-all">
            <i class="fa-solid fa-ellipsis dark:text-white"></i>
          </button>
          <div>
          
          </div>
        </div>
    </div>

    <!-- <Transition name="collapse"> -->
    <div v-if="details===true" class="px-20">
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
  <!-- </Transition> -->

  </div>
</Transition>
 
  </div>
  
 
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../store/task';
import { useUserStore } from '../store/user';

const taskStore = useTaskStore();
const userStore = useUserStore();

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

</script>

<style scoped>
.v-enter-active, .v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}


</style>