<template>
  <div class="flex flex-col justify-between w-[300px] h-screen px-10 bg-gray-100">
  <div
    class="flex flex-col justify-start items-left "
  >
    <h1 class="text-3xl font-black font-sans mt-10">TODO</h1>
    <div class="flex flex-col gap-2 mt-10 font-semibold">
      <div class="w-full flex justify-between">
      <a href="#">⭐ Today</a>
        <p class="bg-red-400 px-2 flex justify-center items-center text-white text-sm rounded-full">3</p>
      </div>
      <a href="#">📆 Upcoming </a>
      <a href="#">📦 Anytime</a>
      <button href="#" class="mt-5 p-2 rounded-full text-left hover:bg-gray-200 transition-all">✅ Logbook</button>
    </div>

    <div class="flex flex-col gap-2 mt-10 font-semibold">
        <div class="flex flex-col mb-3">
        <a href="#">📂 Family</a>
        <a class="ml-4" href="#">📂 Mom</a>
        </div>
        <a href="#">📂 Work</a>
    </div>

    
  </div>
  <div>
      <button @click="userStore.logOut" class="mb-10 py-2 px-5 font-semibold rounded-full hover:bg-gray-200">Log out</button>
  </div>
</div>
</template>

<script setup>

import { useUserStore } from "../store/user";
const userStore = useUserStore();






</script>

<style scoped></style>
