<template>
  <div class="flex flex-col justify-between w-[300px] h-screen px-10 bg-gray-100">
  <div
    class="flex flex-col justify-start items-left "
  >
    <h1 class="text-3xl font-black font-sans mt-10">TODO</h1>
    <div class="flex flex-col mt-10 font-semibold">
      <div class="w-full flex justify-between">
        <button class="p-2  w-full rounded-full text-left hover:bg-gray-200 transition-all flex justify-between">⭐ Today
          <p class="bg-red-400 h-6 w-6 flex justify-center items-center text-white text-sm rounded-full">3</p>
        </button>
        
      </div>
      <button class="p-2 w-full rounded-full text-left hover:bg-gray-200 transition-all">📆 Upcoming</button>
      <button class="p-2 w-full rounded-full text-left hover:bg-gray-200 transition-all">🕑 Anytime</button>
      <button class="mt-5 p-2 w-full rounded-full text-left hover:bg-gray-200 transition-all">✅ Logbook</button>
    </div>

    <div class="flex flex-col gap-2 mt-10 font-semibold">
        <div class="flex flex-col mb-3">
          <button class="p-2 w-full rounded-full text-left hover:bg-gray-200 transition-all">📂 Family</button>
          <button class="ml-3 p-2 w-full rounded-full text-left hover:bg-gray-200 transition-all">📂 Mom</button>
        </div>
        <button class="p-2 w-full rounded-full text-left hover:bg-gray-200 transition-all">📂 Work</button>
    </div>

    
  </div>
  <div>
      <button @click="userStore.logOut" class="mb-10 font-semibold p-2 w-full rounded-full text-left hover:bg-gray-200 transition-all">🙋 Log out</button>
  </div>
</div>
</template>

<script setup>

import { useUserStore } from "../store/user";
const userStore = useUserStore();






</script>

<style scoped></style>
