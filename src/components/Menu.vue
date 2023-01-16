<template>
  <div
    class="flex flex-col justify-between w-[350px] h-screen px-6 bg-gray-100 dark:bg-slate-700 dark:text-white sticky top-0 border-x">
    <div class="flex flex-col justify-start items-left">
      <img v-if="isDark" class="object-fit ml-2 mt-10 w-6/12" src="../assets/logo-white.svg" alt="Logo" />
      <img v-else class="object-fit ml-2 mt-10 w-6/12" src="../assets/logo-black.svg" alt="Logo" />

      <div class="flex flex-col mt-14 pb-4 border-b  border-slate-500">
        <div v-for="filterButton in filterButtons" class="w-full flex justify-between">
          <button  @click="$emit('filter', filterButton.title)"
            class="p-2 pl-4 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all flex justify-between" :class="{ 'font-semibold bg-gray-200 dark:bg-slate-500' : props.actualFilter === filterButton.title }">
            <div><i class="w-5 mr-2" :class="filterButton.icon"></i>{{ filterButton.title }}</div>
            
            <!-- <p class="bg-red-400 px-2 py-0.5 flex justify-center items-center text-white font-semibold text-sm rounded-full">
              {{ taskStore.tasks.length }}
            </p>  -->
          
          </button>
        </div> 
      </div>

      <div class="flex flex-col mt-4">

          <button v-if="categories" v-for="category in categories" :key="category.id" class="p-2 pl-4 w-full rounded-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
            <i class="w-5 mr-2" :class="`${category.icon} text-${category.color}`"></i>{{ category.title }}
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
import { useCategoryStore } from "../store/category"
import { useRouter } from "vue-router";
const router = useRouter();

const userStore = useUserStore();
const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);

const props = defineProps(["actualFilter"])


const active = ref('font-bold')

const darkText = ref("🌙 Dark Mode");

function logOut() {
  userStore.logOut;
  router.push({ name: "Login" });
}

const filterButtons = ref([{
  title: "Today",
  icon: "fa-solid fa-calendar-day text-yellow-400"
},
{
  title: "Upcoming",
  icon: "fa-solid fa-calendar-week text-orange-400"
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

async function fetchCat(){
  await categoryStore.fetchCategories(userStore.user.id);
  categories.value = categoryStore.categories
}

</script>

<style scoped>

</style>
