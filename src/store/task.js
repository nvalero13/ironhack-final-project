// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    creating: false,
  }),
  actions: {
    async fetchTasks(id) {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .eq('user_id', id)
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
        
      }
      catch(error) {
        
      }
    },
    // Hacer el PUT (edit)
    // Hacer el delete
    async completeTask(taskId) {
      try {
        const {error} = await supabase.from('tasks')
        .update({ is_complete: true })
        .eq('id', taskId)
      }
      catch(error) {
        
      }
    },
  },
});
