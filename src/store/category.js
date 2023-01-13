
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: []
  }),
  actions: {
    async fetchCategories(id) {
        const { data: categories } = await supabase
          .from("categories")
          .select("*")
          .eq('user_id', id)
          .order("created_at", { ascending: false });
        this.categories = categories;
      },
  },
});
