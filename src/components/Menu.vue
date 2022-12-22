<template>
  <div
    class="flex flex-col justify-start items-left w-[300px] h-screen px-10 bg-gray-100"
  >
    <h1 class="text-3xl font-black font-sans mt-10">TODO</h1>
    <div class="flex flex-col gap-2 mt-10 font-semibold">
      <div class="w-full flex justify-between">
      <a href="#">⭐ Today</a>
        <p class="bg-red-400 px-2 flex justify-center items-center text-white text-sm rounded-full">3</p>
      </div>
      <a href="#">📆 Upcoming </a>
      <a href="#">📦 Anytime</a>
      <a class="mt-5" href="#">✅ Logbook</a>
    </div>

    <div class="flex flex-col gap-2 mt-10 font-semibold">
        <div class="flex flex-col mb-3">
        <a href="#">📂 Family</a>
        <a class="ml-4" href="#">📂 Mom</a>
        </div>
        <a href="#">📂 Work</a>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
