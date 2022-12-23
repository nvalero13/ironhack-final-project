<template>
    <div class="flex justify-center items-center h-screen mx-auto w-[1200px]">
        <div class="rounded-sm shadow-lg bg-gray-100 w-[400px] p-5 z-10">
            <h1 class="text-emerald-500 text-2xl font-bold uppercase">Login</h1>
            <form @submit.prevent="login" class="mt-5 mb-10">
                <label for="Email" class="text-emerald-300 block my-2">Email</label>
                <input v-model="email" type="text" name="Email" class="w-full p-2 rounded-sm outline-none">
                <label for="Password" class="text-emerald-300 block my-2">Password</label>
                <input v-model="password" type="password" name="Password" class="w-full p-2 rounded-sm outline-none">

                <input type="submit" value="Login" class="block bg-emerald-500 text-white px-5 py-2 my-3 w-full hover:bg-emerald-600 pointer">
                <div v-show="errorMsg" class="w-full text-red-400 text-center mt-3 p-2">{{ errorMsg }}</div>
            </form>
            <p class="text-center my-5">Don't have an account? <router-link class="text-emerald-500 hover:underline" to="/register">Register</router-link></p>
        </div>

        
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';

const email = ref(null);
const password = ref(null);
const errorMsg = ref(null);
const router = useRouter();
    
const login = async () => {
    try {
        const {error} = await supabase.auth.signIn({
            email: email.value,
            password: password.value
        });
        if (error) throw error;
        router.push({name: "Home"})
    } catch(error) {
        errorMsg.value = `Error: ${error.message}`
        setTimeout(() => {
            errorMsg.value = null
        }, 5000);
    }
}

</script>

<style lang="scss" scoped>

</style>