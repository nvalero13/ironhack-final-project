<template>
  <section class="bg-gray-200 bg-gradient-to-b from-gray-300 dark:bg-slate-900 dark:bg-gradient-to-b dark:from-slate-800">
    <router-view class="app-main" />
  </section>
</template>

<script setup>


import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./store/user.js";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: "/login" });
    } else {
      // continue to dashboard
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<style>
/* width */
::-webkit-scrollbar {

width: 5px;

}

/* Track */
::-webkit-scrollbar-track {
background: #a4a9bd;
}

/* Handle */
::-webkit-scrollbar-thumb {
background: #4c485a;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
background: #2c2f38;
}
</style>