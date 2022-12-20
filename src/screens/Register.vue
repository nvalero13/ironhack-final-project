<template>
    <div class="flex justify-center mx-auto w-[1200px]">
        <div class="rounded-sm shadow-lg bg-gray-100 w-[400px] p-5 z-10">
            <h1 class="text-emerald-500 text-2xl font-bold uppercase">Register</h1>
            <form @submit.prevent="register" class="mt-5 mb-10">
                <label for="Email" class="text-emerald-300 block my-2">Email</label>
                <input v-model="email" type="text" name="Email" class="w-full p-2 rounded-sm outline-none">
                <label for="Password" class="text-emerald-300 block my-2">Password</label>
                <input v-model="password" type="password" name="Password" class="w-full p-2 rounded-sm outline-none">
                <label for="ConfirmPassword" class="text-emerald-300 block my-2">Confirm Password</label>
                <input v-model="confirmPassword" type="password" name="ConfirmPassword" class="w-full p-2 rounded-sm outline-none">
               
                <input type="submit" value="Register" class="block bg-emerald-500 text-white px-5 py-2 my-3 w-full hover:bg-emerald-600 cursor-pointer">
                <div v-show="errorMsg" class="w-full text-red-400 text-center mt-3 p-2">{{ errorMsg }}</div>
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

const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);

const register = async () => {
    if (password.value === confirmPassword.value) {
        try {
            const { error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value
            });
            if ( error ) throw error;
            router.push({ name: "Login"})
        }
        catch (error) {
            errorMsg.value = error.message;
            setTimeout(() => {
            errorMsg.value = null
            }, 5000);
        }
        return
    }
        errorMsg.value = "Error: Passwords do not match";
        setTimeout(() => {
            errorMsg.value = null
        }, 5000);

  
    
};

</script>

<style lang="scss" scoped>

</style>