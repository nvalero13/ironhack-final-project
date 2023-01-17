<template>
  <div @click="details = !details">

    <!-- INITIAL TASK  -->

      <div key="not_completed"
        class="hover:bg-slate-100 hover:dark:bg-slate-700 cursor-pointer py-5">
        <div class="flex justify-between items-center transition-all px-10 ">
          <div class="flex items-start">
            <Transition name="v" mode="out-in">
              <button v-if="!completed" @click.stop="handleCompleteTask"
                class="w-7 h-7 mr-3 border-2 rounded-full border-slate-900 dark:border-slate-300 hover:bg-slate-600 transition-all">
              </button>
              <button v-else @click.stop="handleUndoCompleteTask"
                class="w-7 h-7 mr-3 border-2 rounded-full border-emerald-700 bg-emerald-500 dark:border-emerald-300 hover:bg-emerald-900 transition-all">
                <i class="fa-solid fa-check text-white"></i>
              </button>
            </Transition>
            <div>
              <h1 class="inline-block font-light text-lg dark:text-slate-200">{{ task.title }}</h1>
              <!-- <i class="fa-solid fa-list-check text-sm dark:text-slate-200 ml-3 mr-2"></i> -->
              <i v-if="task.priority == 2" class="fa-solid fa-bell text-orange-300 ml-2"></i>
              <i v-else-if="task.priority == 3" class="fa-solid fa-bell text-red-400 ml-2"></i>
              <div class="inline" v-if="task.due_date">
                <i class="fa-regular fa-calendar text-sm dark:text-slate-400 ml-3 mr-1"></i>
                <span class="text-sm font-light dark:text-slate-400">{{ dueDateString }}</span>
              </div>

            </div>
          </div>
          <div class="flex items-center">
            <div class="flex gap-2">

              <div v-for="category in taskCategories" class="px-2 py-1 rounded-full text-xs text-white"
                :key="category.id" :class="`bg-${category.color}`">{{ category.title }}</div>

            </div>

            <button @click.stop="$emit('openEdit', task)"
              class="h-8 w-8 ml-2 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-full transition-all">
              <i class="fa-solid fa-ellipsis dark:text-white"></i>
            </button>
            <div>

            </div>
          </div>

        </div>

        <Transition name="slide">
        <div v-show="details === true" class="pl-20 w-8/12 max-h-[300px] overflow-hidden">
          <p class="text-gray-500 dark:text-slate-500 text-sm mb-2">{{ task.desc }}</p>
          <div v-for="subtask in subtasksArray">
            <button v-if="subtask.done == false"
              class="w-4 h-4 mr-3 border-2 rounded-full  border-slate-900 dark:border-slate-300 hover:bg-slate-600 transition-all">
            </button>
            <button v-else
              class="w-4 h-4 mr-3 border-2 rounded-full border-emerald-700 bg-emerald-500 dark:border-emerald-300 hover:bg-emerald-900 transition-all">
            </button>
            <span class="text-gray-500 dark:text-slate-500 text-sm">{{ subtask.title }}</span>
          </div>
          
        </div>
      </Transition>

      </div>

   

  </div>


</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useTaskStore } from '../store/task';
import { useUserStore } from '../store/user';
import { useCategoryStore } from '../store/category'


const taskStore = useTaskStore();
const userStore = useUserStore();
const categoryStore = useCategoryStore();

const props = defineProps(["task"]);
const completed = ref(props.task.is_complete);

const details = ref(false);
const subtasksArray = ref(JSON.parse(props.task.subtasks))



async function handleCompleteTask() {
  await taskStore.completeTask(props.task.id)
  taskStore.fetchTasks(userStore.user.id)
  completed.value = true;
}

async function handleUndoCompleteTask() {
  await taskStore.undoCompleteTask(props.task.id)
  taskStore.fetchTasks(userStore.user.id)
  completed.value = false;
}

const taskCategories = ref("");
const dueDate = new Date(props.task.due_date);
const dueDateString = `${dueDate.getDate()}/${('0' + (dueDate.getMonth() + 1)).slice(-2)}`;

onMounted(() => {
  if (props.task.categories) taskCategories.value = categoryStore.categories.filter(cat => props.task.categories.includes(cat.id));
})

watch(
  () => props.task.categories,
  () => taskCategories.value = categoryStore.categories.filter(cat => props.task.categories.includes(cat.id))
)


</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all 1s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>