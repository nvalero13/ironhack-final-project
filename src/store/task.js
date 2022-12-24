// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
    creating: false,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
    },
    async createTask(title, desc, id) {
      try {
        const {error} = await supabase.from('tasks').insert([
          {
            user_id: id,
            title: title,
            desc: desc,
          }
        ])
        console.log(error)
      }
      catch(error) {
        
      }
    }
    // Hacer el PUT (edit)
    // Hacer el delete
    // Hacer el PUT (cambiar entre completada y pendiente)
  },
});
