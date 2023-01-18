<template>
  <div
    class="flex flex-col justify-between w-[350px] h-screen px-6 bg-gray-100 dark:bg-slate-700 dark:text-white sticky top-0 border-x">
    <div class="flex flex-col justify-start items-left">
      <img v-if="isDark" class="object-fit ml-2 mt-10 w-6/12" src="../assets/logo-white.svg" alt="Logo" />
      <img v-else class="object-fit ml-2 mt-10 w-6/12" src="../assets/logo-black.svg" alt="Logo" />

      <div class="flex flex-col mt-14 pb-4 border-b  border-slate-500">
        <div v-for="filterButton in filterButtons" class="w-full flex justify-between">
          <button @click="$emit('filter', filterButton)"
            class="p-1.5 my-0.5 pl-4 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all flex items-center"
            :class="{ 'font-semibold bg-gray-200 dark:bg-slate-500': props.actualFilter === filterButton.title }">
            <div class="w-5 mr-2 flex justify-center"><i :class="filterButton.icon"></i></div>{{ filterButton.title }}

            <p v-if="filterButton.title == 'Today' && expiredTasks > 0"
              class="bg-red-400 px-2 py-0.5 flex justify-center items-center text-white font-semibold text-sm rounded-full">
              {{ expiredTasks }}
            </p>

          </button>
        </div>
      </div>

      <div class="flex flex-col mt-4">

        <button @click="handleActiveCat(category.id)" v-if="categories"
          v-for="category in categories" :key="category.id"
          :class="activeCat === category.id ? `bg-${category.color} bg-opacity-75 hover:bg-opacity-50 ` : 'hover:bg-gray-200 dark:hover:bg-slate-600'"
          class="p-1.5 my-0.5 pl-4 w-full rounded-full text-left flex items-center dark:hover:bg-opacity transition-all">
          <div class="w-5 mr-2 flex justify-center"><i class="m-auto" :class="`before:text-${category.color} ${category.icon}`"></i></div><span class="dark:text-white">{{
            category.title
          }}</span>
        </button>

      </div>
    </div>
    <div>
      <button v-show="!isDark" @click="toggleDark()"
        class=" p-1.5 my-0.5 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
        🌙 Dark Mode
      </button>
      <button v-show="isDark" @click="toggleDark()"
        class=" p-1.5 my-0.5 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
        ☀️ Light Mode
      </button>
      <button @click="logOut"
        class="mb-10 p-1.5 my-0.5 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
        🙋 Log out
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
import { useCategoryStore } from "../store/category"
import { useRouter } from "vue-router";
const router = useRouter();

const userStore = useUserStore();
const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);

const props = defineProps(["actualFilter", "expiredTasks"])
const emit = defineEmits(["filter", "filterCat"])

const active = ref('font-bold')
const activeCat = ref("")
const darkText = ref("🌙 Dark Mode");

function logOut() {
  userStore.logOut;
  router.push({ name: "Login" });
}

const filterButtons = ref([{
  title: "Today",
  icon: "fa-solid fa-calendar-day text-sky-400"
},
{
  title: "Upcoming",
  icon: "fa-solid fa-calendar-week text-blue-500"
},
{
  title: "Sometime",
  icon: "fa-solid fa-calendar text-indigo-400"
},
{
  title: "Anytime",
  icon: "fa-solid fa-clock text-slate-600 dark:text-gray-300"
},
{
  title: "Logbook",
  icon: "fa-solid fa-clipboard-check text-emerald-400"
}]);

const categories = ref(null)
fetchCat()

watch(
  () => categoryStore.categories,
  () => {
    categories.value = categoryStore.categories
    categories.value.forEach((category) => {
      category.coloredIcon = `${category.icon} text-${category.color}`;
    });
  }
);

async function fetchCat() {
  await categoryStore.fetchCategories(userStore.user.id);
}

function handleActiveCat(id) {
  activeCat.value === id ? activeCat.value = null : activeCat.value = id
  emit('filterCat', activeCat.value)
}

</script>

<style scoped>

</style>
