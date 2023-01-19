// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useRouter } from 'vue-router';
import router from '../router';


export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    getUserId() {
      return this.user.id
    },
    async fetchUser() {
      const user = supabase.auth.user();
      this.user = user;
    },
    async signIn(email, password) {
      const {error} = await supabase.auth.signIn({
      email: email,
      password: password
    })
    if (error) throw error
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async logOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error;
    },
    // Hacer sign in

    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
