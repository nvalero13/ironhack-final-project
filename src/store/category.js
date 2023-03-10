
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: []
  }),
  actions: {
    async createCategory(title, color, icon, id) {
      try {
        const {error} = await supabase.from('categories').insert([
          {
            user_id: id,
            title: title,
            color: color,
            icon: icon,
          }
        ])
      }
      catch(error) {
        throw error.message
      }
    },
    async editCategory(title, color, icon, id) {
      console.log("editing")
      try {
        const { error } = await supabase
          .from("categories")
          .update({
            title: title,
            color: color,
            icon: icon,
          })
          .match({ id: id });
      } catch (error) {
        throw error.message;
      }
    },
    async deleteCategory(id) {
      try {
        const { error } = await supabase.from("categories").delete().match({ id: id });
      } catch (error) {
        throw error.message;
      }
    },
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
