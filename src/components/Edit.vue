<template>
    <div class="bg-white dark:bg-slate-700 border w-10/12 pb-10">
        <button
            class="bg-red-500 absolute -top-4 -right-4 border my-1 mx-1 w-8 h-8 rounded-full transition-all hover:scale-110 hover:bg-red-600 z-20"
            @click="$emit('close'); newCategoryForm = false">
            <i class="fa-solid fa-xmark text-white text-xl"></i>
        </button>

        <h1 class="p-4 text-xl mb-2 border-b dark:text-white">
            Edit task
        </h1>

        <div class="mt-4 mx-4 flex gap-4">
            <div class="w-8/12 min-w-[300px]">
                <label class="dark:text-white text-gray-400 text-sm" for="title">Title</label>
                <input v-model="title" class="h-12 w-full block outline-none border-b dark:text-white dark:bg-slate-700"
                    name="Title" type="text" placeholder="Enter title here" />
            </div>
            <div class="w-4/12">
                <label class="dark:text-white text-gray-400 text-sm" for="title">Due date</label>
                <input v-model="date" class="h-12 w-full block outline-none border-b dark:text-white dark:bg-slate-700"
                    type="date" />
            </div>
        </div>
        <div class="mt-4 mx-4 flex gap-4">
            <div class="w-10/12">
                <label class="dark:text-white text-gray-400 text-sm" for="desc">Description</label>
                <input v-model="desc" class="block outline-none border-b w-full h-12 dark:text-white dark:bg-slate-700"
                    placeholder="Optional description" name="Desc" type="text" />
            </div>
            <div class="w-2/12">
                <label class="dark:text-white text-gray-400 text-sm" for="desc">Priority</label>
                <select v-model="prio" class="block outline-none border-b w-full h-12 dark:text-white dark:bg-slate-700"
                    name="Priority">
                    <option value=3>High</option>
                    <option value=2>Medium</option>
                    <option value=1 selected="selected">Low</option>
                </select>
            </div>
        </div>
        <div class="m-4">
            <label class="dark:text-white text-gray-400 text-sm" for="desc">Category</label>
            <div class="flex gap-2 mt-2">
                <button v-for="category in categoryStore.categories" @click="addNewCategory(category.id)"
                    class="rounded-full px-4 py-1 border border-gray-400 dark:border-slate-300 transition-all" :class="
                        selectedCategory.includes(category.id)
                            ? `text-white bg-${category.color}`
                            : 'dark:text-white text-gray-500 bg-transparent'
                    " :value="category.id">
                    <i :class="category.icon"></i> {{ category.title }}
                </button>
                <div>
                    <button @click="newCategoryForm = true; isDisabled = true"
                        class="rounded-full px-4 py-1 border border-gray-400 dark:border-slate-300 transition-all dark:text-white text-gray-500 bg-gray-200 hover:bg-gray-300 dark:bg-slate-500 hover:dark:bg-slate-600">
                        <i class="fa-solid fa-plus"></i> Add category
                    </button>

                    <div v-if="newCategoryForm"
                        class="absolute top-0 bottom-0 left-0 right-0 bg-white dark:bg-black opacity-70 dark:opacity-40">
                    </div>
                    <CreateCategory v-if="newCategoryForm" @close="newCategoryForm = false; isDisabled = false" />

                </div>
            </div>


        </div>

        <div class="absolute right-1/2 translate-x-1/2 -bottom-5 flex gap-2">
            <button @click="editTask" :disabled="isDisabled"
                class="border rounded-full h-10 px-4 bg-emerald-500 shadow-md text-white enabled:hover:scale-105 enabled:hover:bg-emerald-600 disabled:bg-gray-200 dark:disabled:bg-slate-700 transition-all">
                <i class="fa-solid fa-pencil"></i>
                Apply changes
            </button>
            <button @click="deleteTask"
                class="border rounded-full h-10 px-4 bg-red-500 shadow-md text-white enabled:hover:scale-105 enabled:hover:bg-red-600 disabled:bg-gray-200 dark:disabled:bg-slate-700 transition-all">
                <i class="fa-solid fa-trash"></i>
                Delete task
            </button>
        </div>

        <Transition name="bounce">
            <div v-if="ok"
                class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-5 border text-xl shadow-md text-white bg-emerald-500 z-30">
                Task edited succesfully!
            </div>
        </Transition>

        <Transition name="bounce">
            <div v-if="okDelete"
                class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-5 border text-xl shadow-md text-white bg-emerald-500 z-30">
                Task deleted succesfully!
            </div>
        </Transition>

        <Transition name="bounce">
            <div v-if="errorMsg.length > 0"
                class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-5 border text-xl shadow-md text-white bg-red-500 z-30">
                {{ errorMsg }}
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import CreateCategory from "./CreateCategory.vue"

import { useTaskStore } from "../store/task";
import { useCategoryStore } from "../store/category";
import { useUserStore } from "../store/user";
const emit = defineEmits(["close"]);

const taskStore = useTaskStore();
const userStore = useUserStore();
const categoryStore = useCategoryStore();

const props = defineProps(["task"])

const title = ref(props.task.title);
const date = ref(props.task.due_date);
const desc = ref(props.task.desc);
const selectedCategory = ref(props.task.categories);
const prio = ref(props.task.priority);
const ok = ref(false)
const errorMsg = ref("")
const okDelete = ref(false)

const isDisabled = computed(() => title.value.length < 3)
const newCategoryForm = ref(false);

async function editTask() {
    if (title.value.length > 3) {
        await taskStore.editTask(
            title.value,
            desc.value,
            date.value,
            selectedCategory.value,
            prio.value,
            props.task.id
        )
            .then(() => {
                ok.value = true

                setTimeout(() => {
                    emit("close");
                    taskStore.fetchTasks(userStore.user.id);
                    ok.value = false
                }, 1000)
            })
            .catch((error) => {
                errorMsg.value = error;

                setTimeout(() => {
                    errorMsg.value = "false"
                }, 1000)
            })
    }
}

async function deleteTask() {
    await taskStore.deleteTask(
        props.task.id
    );

    okDelete.value = true

    setTimeout(() => {
        emit("close");

        taskStore.fetchTasks(userStore.user.id);
        okDelete.value = false
    }, 1000)
}

function addNewCategory(catId) {
    if (selectedCategory.value.includes(catId)) {
        selectedCategory.value.splice(selectedCategory.value.indexOf(catId), 1);
    } else {
        selectedCategory.value.push(catId);
    }
}
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0) translate(-50%, -50%);
    }

    50% {
        transform: scale(1.05) translate(-50%, -50%);
    }

    100% {
        transform: scale(1) translate(-50%, -50%);
    }
}
</style>
