<template>
  <Transition name="bounce">
        <div v-if="taskStore.creating === true" class="p-2 mb-10 mx-10 box-border rounded-md shadow-md bg-white dark:bg-slate-700 relative">
            <h1 class="p-2 font-bold text-lg mb-2 pb-2 border-b dark:text-white">✏️ Create new task</h1>
   
            <input v-model="title" class="font-semibold p-2 block w-10/12 dark:text-white dark:bg-slate-700" name="Title" type="text" placeholder="Title">
            <input v-model="desc" class="p-2 block w-10/12 dark:text-white dark:bg-slate-700" name="Desc" type="text" placeholder="Description">
            <div class="p-2 mt-10 absolute right-0 bottom-0">
                <button @click="createTask" class="h-10 w-10 rounded-full bg-emerald-500 shadow-md text-2xl text-white font-bold hover:scale-105 hover:bg-emerald-600 transition-all"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";
const taskStore = useTaskStore();
const userStore = useUserStore();



const title = ref("");
const desc = ref("");

async function createTask() {
    if(title.value.length > 3 && desc.value.length > 3) {
    await taskStore.createTask(title.value, desc.value, userStore.user.id)
    title.value = ""
    desc.value = ""
    taskStore.creating = false;
    taskStore.fetchTasks(userStore.user.id)
    }
}
</script>

<style  scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}
</style>