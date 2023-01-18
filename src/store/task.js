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
        .eq("user_id", id)
        .order("is_complete", { ascending: true })
        .order("due_date", { ascending: true })
        .order("priority", { ascending: false })
      this.tasks = tasks;
    },

    async createTask(title, desc, date, category, prio, subtasks, id) {
      try {
        const { error } = await supabase.from("tasks").insert([
          {
            user_id: id,
            title: title,
            desc: desc,
            due_date: date,
            priority: prio,
            categories: category,
            subtasks: subtasks
          },
        ]);
      } catch (error) {
        throw error.message;
      }
    },

    async editTask(title, desc, date, category, prio, subtasks, id) {
      try {
        const { error } = await supabase
          .from("tasks")
          .update({
            title: title,
            desc: desc,
            due_date: date,
            priority: prio,
            categories: category,
            subtasks: subtasks,
          })
          .match({ id: id });
      } catch (error) {
        throw error.message;
      }
    },

    async deleteTask(id) {
      try {
        const { error } = await supabase.from("tasks").delete().match({ id: id });
      } catch (error) {}
    },

    async completeTask(id) {
      try {
        const { error } = await supabase
          .from("tasks")
          .update({ is_complete: true })
          .eq("id", id);
      } catch (error) {}
    },

    async completeSubtask(subtasks, id) {
      try {
        const { error } = await supabase
          .from("tasks")
          .update({ subtasks: subtasks })
          .eq("id", id);
      } catch (error) {}
    },

    async undoCompleteTask(taskId) {
      try {
        const { error } = await supabase
          .from("tasks")
          .update({ is_complete: false })
          .eq("id", taskId);
      } catch (error) {}
    },
  },
});
