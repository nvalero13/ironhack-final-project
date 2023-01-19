<template>
    <div class="flex flex-col justify-center items-center h-screen mx-auto bg-slate-600 bg-gradient-to-t from-slate-500 w-full">
        <img class="object-fit w-64 mb-4" src="../assets/logo-white.svg" alt="Logo"/>
        <h1 class="text-3xl font-light text-white mb-10 uppercase">Welcome</h1>
        <div class="rounded-sm shadow-lg bg-slate-100 w-[400px] p-5 z-10">
            <h1 class="text-slate-500 text-2xl uppercase">Register</h1>
            <form @submit.prevent="handleRegister()" class="mt-5 mb-10">
                <label for="Email" class="text-slate-500 block my-2">Email</label>
                <input v-model="email" type="text" name="Email" class="w-full p-2 rounded-sm outline-none">
                <label for="Password" class="text-slate-500 block my-2">Password</label>
                <input v-model="password" type="password" name="Password" class="w-full p-2 rounded-sm outline-none">
                <label for="ConfirmPassword" class="text-slate-500 block my-2">Confirm Password</label>
                <input v-model="confirmPassword" type="password" name="ConfirmPassword" class="w-full p-2 rounded-sm outline-none">
               
                <input type="submit" value="Register" class="block bg-emerald-500 text-white px-5 py-2 my-3 w-full hover:bg-slate-600 cursor-pointer">
                <Transition name="fade">
                <div v-show="errorMsg" class="w-full text-red-400 text-center mt-3 p-2">{{ errorMsg }}</div>
                </Transition>
            </form>
            <p class="text-center my-5">Already have an account? <router-link class="text-emerald-500 hover:underline" to="/login">Login</router-link></p>
        </div>

        
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import router from '../router';
import { useUserStore } from "../store/user";

const userStore = useUserStore();

const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);

async function handleRegister() {
    if (password.value === confirmPassword.value) {
    await userStore
      .signUp(email.value, password.value)
      .then(async () => {
        router.push("/login");
      })
    
      .catch((err) => {
        errorMsg.value = `Error: ${err.message}`
        setTimeout(() => {
            errorMsg.value = null
        }, 5000);
      });
    } else {
        errorMsg.value = "Error: Passwords do not match";
        setTimeout(() => {
            errorMsg.value = null
        }, 5000);
    }
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>