<template>
    <div class="flex justify-center mx-auto w-[1200px]">
        <div class="rounded-sm shadow-lg bg-gray-100 w-[400px] p-5 z-10">
            <h1 class="text-emerald-500 text-2xl font-bold uppercase">Login</h1>
            <form action="" class="mt-5 mb-10">
                <label for="Email" class="text-emerald-300 block my-2">Email</label>
                <input type="text" name="Email" class="w-full p-2 rounded-sm outline-none">
                <label for="Password" class="text-emerald-300 block my-2">Password</label>
                <input type="password" name="Password" class="w-full p-2 rounded-sm outline-none">

                <input type="submit" value="Login" class="block bg-emerald-500 text-white px-5 py-2 my-3 w-full hover:bg-emerald-600 pointer">
            </form>
            <p class="text-center my-5">Don't have an account? <router-link class="text-emerald-500 hover:underline" to="/register">Register</router-link></p>
        </div>

        
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';

    


</script>

<style lang="scss" scoped>

</style>