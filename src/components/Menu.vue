<template>
  <div
    class="flex flex-col justify-between w-[350px] h-screen px-6 bg-gray-100 dark:bg-slate-700 dark:text-white sticky top-0 border-x">
    <div class="flex flex-col justify-start items-left">
      <img v-if="isDark" class="object-fit ml-2 mt-10 w-6/12" src="../assets/logo-white.svg" alt="Logo" />
      <img v-else class="object-fit ml-2 mt-10 w-6/12" src="../assets/logo-black.svg" alt="Logo" />

      <div class="flex flex-col mt-14 pb-4 border-b  border-slate-500">
        <div class="w-full flex justify-between">
          <button @click="$emit('filter', 'Today')"
            class="p-2 pl-4 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all flex justify-between" :class="{ 'font-semibold bg-gray-200 dark:bg-slate-500' : props.actualFilter === 'Today' }">
            <div><i class="fa-solid fa-calendar-day w-5 mr-2 text-yellow-400"></i>Today</div>
            <p class="bg-red-400 px-2 py-0.5 flex justify-center items-center text-white font-semibold text-sm rounded-full">
              {{ taskStore.tasks.length }}
            </p>
          </button>
        </div>
        <button @click="$emit('filter', 'Upcoming')"
          class="p-2 pl-4 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all" :class="{ 'font-semibold bg-gray-200 dark:bg-slate-500' : props.actualFilter === 'Upcoming' }">
          <i class="fa-solid fa-calendar-week w-5 mr-2 text-orange-400"></i>Upcoming
        </button>
        <button @click="$emit('filter', 'Anytime')"
          class="p-2 pl-4 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all" :class="{ 'font-semibold bg-gray-200 dark:bg-slate-500' : props.actualFilter === 'Anytime' }">
          <i class="fa-solid fa-clock w-5 mr-2 text-slate-600 dark:text-gray-300"></i>Anytime
        </button>
        <button @click="$emit('filter', 'Logbook')"
          class="flex items-center pl-4 p-2 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all" :class="{ 'font-semibold bg-gray-200 dark:bg-slate-500' : props.actualFilter === 'Logbook' }">
          <i class="fa-solid fa-clipboard-check w-5 mr-2 text-emerald-400"></i>
          Logbook
        </button>
      </div>

      <div class="flex flex-col mt-4">
        <div class="flex flex-col">
          <button class="p-2 pl-4 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
            <i class="fa-solid fa-people-roof w-5 mr-2 text-blue-500"></i> Family
          </button>
          
        </div>
        <button class="p-2 pl-4 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
          <i class="fa-solid fa-laptop w-5  mr-2 text-red-500"></i> Work
        </button>
        <button class="p-2 pl-4 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
          <i class="fa-solid fa-home w-5  mr-2 text-orange-500"></i> Home
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
import { ref, watch, computed} from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
import { useRouter } from "vue-router";
const router = useRouter();

const userStore = useUserStore();
const taskStore = useTaskStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);

const props = defineProps(["actualFilter"])


const active = ref('font-bold')

const darkText = ref("🌙 Dark Mode");

function logOut() {
  userStore.logOut;
  router.push({ name: "Login" });
}



</script>

<style scoped>

</style>
