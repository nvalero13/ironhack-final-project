<template>
  <div
    class="flex flex-col justify-between w-[350px] h-screen px-10 bg-gray-100 dark:bg-slate-700 dark:text-white sticky top-0 border-x">
    <div class="flex flex-col justify-start items-left">
      <img v-if="isDark" class="object-fit ml-2 mt-10 w-8/12" src="../assets/logo-white.svg" alt="Logo" />
      <img v-else class="object-fit ml-2 mt-10 w-8/12" src="../assets/logo-black.svg" alt="Logo" />

      <div class="flex flex-col mt-10">
        <div class="w-full flex justify-between">
          <button @click="$emit('filter', 'Today')"
            class="p-2 pl-4 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all flex justify-between">
            <div><i class="fa-solid fa-calendar-day mr-2 text-yellow-400"></i>Today</div>
            <p class="bg-red-400 px-2 py-0.5 flex justify-center items-center text-white font-semibold text-sm rounded-full">
              {{ taskStore.tasks.length }}
            </p>
          </button>
        </div>
        <button @click="$emit('filter', 'Upcoming')"
          class="p-2 pl-4  w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
          <i class="fa-solid fa-calendar-week mr-2 text-orange-400"></i>Upcoming
        </button>
        <button @click="$emit('filter', 'Anytime')"
          class="p-2 pl-4  w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
          <i class="fa-solid fa-clock mr-2 text-slate-600 dark:text-gray-300"></i>Anytime
        </button>
        <button @click="$emit('filter', 'Logbook')"
          class="flex items-center pl-4 mt-8 p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
          <div
            class="flex justify-center items-center w-4 h-4 mr-2 rounded-sm bg-emerald-500">
            <i class="fa-solid fa-check text-xs text-white"></i>
      </div>Logbook
        </button>
      </div>

      <div class="flex flex-col gap-2 mt-10">
        <div class="flex flex-col mb-3">
          <button class="p-2 pl-4 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
            <i class="fa-solid fa-folder-open m-1 text-blue-500"></i> Family
          </button>
          <button
            class="ml-4 p-2 pl-4 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
            <i class="fa-solid fa-folder-open m-1 text-blue-500"></i> Mom
          </button>
        </div>
        <button class="p-2 pl-4 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
          <i class="fa-solid fa-folder-open m-1 text-red-500"></i> Work
        </button>
      </div>
    </div>
    <div>
      <button v-show="!isDark" @click="toggleDark()"
        class=" p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
        🌙 Dark Mode
      </button>
      <button v-show="isDark" @click="toggleDark()"
        class=" p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
        ☀️ Light Mode
      </button>
      <button @click="logOut"
        class="mb-10 p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
        🙋 Log out
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
import { useRouter } from "vue-router";
const router = useRouter();

const userStore = useUserStore();
const taskStore = useTaskStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);

const darkText = ref("🌙 Dark Mode");

const myProp = ref("hola");

function logOut() {
  userStore.logOut;
  router.push({ name: "Login" });
}

const active = ref("font-semibold")

</script>

<style scoped>

</style>
