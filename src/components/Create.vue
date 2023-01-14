<template>
  <div class="bg-white dark:bg-slate-700 border w-10/12 w-200 h-1/2">
    <button
      class="bg-red-500 absolute -top-4 -right-4 border my-1 mx-1 w-8 h-8 rounded-full transition-all hover:scale-110 hover:bg-red-600"
      @click="$emit('close')">
      <i class="fa-solid fa-xmark text-white text-xl"></i>
    </button>

    <h1 class="p-4 text-xl mb-2 border-b dark:text-white">
      <i class="fa-solid fa-pencil mr-3"></i>Create a new task
    </h1>

    <div class="mt-4 mx-4 flex gap-4">
      <div class="w-8/12 min-w-[300px]">
        <label class="dark:text-white text-gray-400 text-sm" for="title">Title</label>
        <input v-model="title" class="h-12 w-full block outline-none border-b dark:text-white dark:bg-slate-700"
          name="Title" type="text" placeholder="Enter title here" />
      </div>
      <div class="w-4/12">
        <label class="dark:text-white text-gray-400 text-sm" for="title">Due date</label>
        <input v-model="date" class="h-12 w-full block outline-none border-b dark:text-white dark:bg-slate-700"
          type="date" />
      </div>
    </div>
    <div class="m-4">
      <label class="dark:text-white text-gray-400 text-sm" for="desc">Description</label>
      <input v-model="desc" class="block outline-none border-b w-full h-12 dark:text-white dark:bg-slate-700"
        placeholder="Optional description" name="Desc" type="text" />
    </div>
    <div class="m-4">
      <label class="dark:text-white text-gray-400 text-sm" for="desc">Category</label>
      <div class="flex gap-2 mt-2">
        <button v-for="category in categoryStore.categories" @click="selectedCategory = category.id;"
          class="rounded-full px-4 py-1 border border-gray-400 dark:border-slate-300 transition-all" 
          :class="selectedCategory == category.id ? `text-white bg-${category.color}` : 'dark:text-white text-gray-500 bg-transparent'" 
          :value="category.id">
          <i :class="category.icon"></i> {{ category.title }}
        </button>
      </div>
    </div>

    <button @click="createTask"
      class="absolute right-1/2 translate-x-1/2 -bottom-5 border rounded-full h-10 w-20 bg-emerald-500 shadow-md text-2xl text-white font-bold hover:scale-105 hover:bg-emerald-600 transition-all">
      <i class="fa-solid fa-plus"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../store/task";
import { useCategoryStore } from "../store/category";
import { useUserStore } from "../store/user";
const emit = defineEmits(['close'])

const taskStore = useTaskStore();
const userStore = useUserStore();
const categoryStore = useCategoryStore();

const title = ref("");
const date = ref("");
const desc = ref("");
const selectedCategory = ref(0);

async function createTask() {
  if (title.value.length > 3 && desc.value.length > 3) {
    
    await taskStore.createTask(
      title.value,
      desc.value,
      date.value,
      selectedCategory.value,
      userStore.user.id
    );

    emit('close')

    title.value = "";
    desc.value = "";
    date.value = "";
    selectedCategory.value = "";

    taskStore.fetchTasks(userStore.user.id);
  }
}

</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
