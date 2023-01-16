// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks(id) {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .eq('user_id', id)
        .order("due_date", { ascending: true })
        .order("is_complete", { ascending: true });
      this.tasks = tasks;
    },
    async createTask(title, desc, date, category, prio, id) {
      try {
        const {error} = await supabase.from('tasks').insert([
          {
            user_id: id,
            title: title,
            desc: desc,
            due_date: date,
            priority: prio,
            categories: category,
          }
        ])
        
      }
      catch(error) {
        throw error.message
      }
    },
    async editTask(title, desc, date, category, prio, id) {
    const { error } = await supabase
    .from('tasks')
    .update({ title: title,
      desc: desc,
      due_date: date,
      priority: prio,
      categories: category, })
      .match({ id: id })
    
    },
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
    async undoCompleteTask(taskId) {
      try {
        const {error} = await supabase.from('tasks')
        .update({ is_complete: false })
        .eq('id', taskId)
      }
      catch(error) {
        
      }
    },
  },
});
