<template>
  <div class="flex flex-col justify-between w-[400px] h-screen px-10 bg-gray-100 dark:bg-slate-700 dark:text-white sticky top-0 border-x">
  <div
    class="flex flex-col justify-start items-left"
  >
    <h1 class="text-4xl font-black font-sans mt-10 dark:text-white">LOGO</h1>
    <div class="flex flex-col mt-10 font-semibold">
      <div class="w-full flex justify-between">
        <button @click="$emit('filter', 'Today')" class="p-2  w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all flex justify-between">⭐ Today
          <p class="bg-red-400 px-2 py-0.5 flex justify-center items-center text-white text-sm rounded-full">{{ taskStore.tasks.length }}</p>
        </button>
        
      </div>
      <button @click="$emit('filter', 'Upcoming')" class="p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">📆 Upcoming</button>
      <button @click="$emit('filter', 'Anytime')" class="p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">🕑 Anytime</button>
      <button @click="$emit('filter', 'Logbook')" class="mt-5 p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">✅ Logbook</button>
    </div>

    <div class="flex flex-col gap-2 mt-10 font-semibold">
        <div class="flex flex-col mb-3">
          <button class="p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">📂 Family</button>
          <button class="ml-3 p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">📂 Mom</button>
        </div>
        <button class="p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">📂 Work</button>
    </div>

    
  </div>
  <div>
      <button v-show=!isDark @click="toggleDark()" class="font-semibold p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">🌙 Dark Mode</button>
      <button v-show=isDark @click="toggleDark()" class="font-semibold p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">☀️ Light Mode</button>
      <button @click="logOut" class="mb-10 font-semibold p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">🙋 Log out</button>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core'
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
import { useRouter } from 'vue-router';
const router = useRouter();

const userStore = useUserStore();
const taskStore = useTaskStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);

const darkText = ref("🌙 Dark Mode");

const myProp = ref("hola")

function logOut() {
  userStore.logOut
  router.push({name: "Login"})
}


</script>

<style scoped></style>
