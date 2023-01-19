<template>
    <div class="bg-white dark:bg-slate-700 border absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pb-6">
        <button
            class="bg-red-500 absolute -top-4 -right-4 my-1 mx-1 w-8 h-8 rounded-full transition-all hover:scale-110 hover:bg-red-600"
            @click="$emit('close')">
            <i class="fa-solid fa-xmark text-white text-xl"></i>
        </button>

        <h1 class="p-4 text mb-2 border-b dark:text-white">
            Edit category
        </h1>

        <div class="p-4 w-full min-w-[200px]">
            <label class="dark:text-white text-gray-400 text-sm" for="title">Title</label>
            <input v-model="title" class="h-12 w-full block outline-none border-b dark:text-white dark:bg-slate-700"
                name="Title" maxlength="16" type="text" placeholder="Enter title here" />
        </div>

        <div class="p-4">
            <label class="dark:text-white text-gray-400 text-sm" for="title">Color</label>
            <div class="flex flex-wrap pt-1">
                <button @click="selectedColor = color.color" v-for="color in colors"
                    class="h-8 w-8 rounded-full mr-1 mt-1 hover:brightness-110"
                    :class="selectedColor == color.color ? 'border-4' : ''">
                    <div class="w-full h-full rounded-full" :class="color.bg"></div>
                </button>
            </div>
        </div>

        <div class="p-4">
            <label class="dark:text-white text-gray-400 text-sm" for="title">Icon</label>
            <div class="flex flex-wrap pt-1">
                <button @click="selectedIcon = icon" v-for="icon in icons"
                    class="h-8 w-8 border rounded-full mr-1 mt-1 text-gray-600 dark:text-white dark:hover:bg-slate-600 hover:bg-gray-100"
                    :class="selectedIcon == icon ? 'bg-gray-200 dark:bg-slate-500' : ''"><i :class="icon"></i> </button>
            </div>
        </div>

        <div class="absolute right-1/2 translate-x-1/2 -bottom-5 flex gap-2">
            <button @click="editCategory" :disabled="isDisabled"
                class="rounded-full h-10 px-4 w-28 bg-emerald-500 shadow-md text-white enabled:hover:scale-105 enabled:hover:bg-emerald-600 disabled:bg-gray-200 dark:disabled:bg-slate-700 transition-all">
                <i class="fa-solid fa-pencil"></i>
                Apply
            </button>
            <button @click="deleteCategory"
                class="rounded-full h-10 px-4 w-28 bg-red-500 shadow-md text-white enabled:hover:scale-105 enabled:hover:bg-red-600 disabled:bg-gray-200 dark:disabled:bg-slate-700 transition-all">
                <i class="fa-solid fa-trash"></i>
                Delete
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCategoryStore } from '../store/category';
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
const taskStore = useTaskStore();
const categoryStore = useCategoryStore();
const userStore = useUserStore();

const props = defineProps(["category"])
const emit = defineEmits(["close"]);

const title = ref(props.category.title)
const selectedColor = ref(props.category.color);
const selectedIcon = ref(props.category.icon)

const isDisabled = computed(() => title.value.length < 3)


const colors = ref([{ bg: "bg-red-500" }, { bg: "bg-orange-500" }, { bg: "bg-yellow-500" }, { bg: "bg-lime-500" }, { bg: "bg-green-500" }, { bg: "bg-teal-500" }, { bg: "bg-blue-500" }, { bg: "bg-violet-500" }, { bg: "bg-fuchsia-500" }, { bg: "bg-pink-500" }]);
colors.value.forEach((color) => {
    color.color = color.bg.slice(3);
});


const icons = ref(["fa-solid fa-star", "fa-solid fa-fire", "fa-solid fa-house", "fa-solid fa-envelope", "fa-solid fa-cart-shopping", "fa-solid fa-book" , "fa-solid fa-car", "fa-solid fa-briefcase", "fa-solid fa-paw", "fa-solid fa-briefcase-medical", "fa-solid fa-cash-register", "fa-solid fa-person-running", "fa-solid fa-palette", "fa-solid fa-pen-nib", "fa-solid fa-plane-up", "fa-solid fa-dumbbell",  "fa-solid fa-camera", "fa-solid fa-cloud", "fa-solid fa-lock", "fa-solid fa-poo"]);

async function editCategory() {

    await categoryStore.editCategory(
        title.value,
        selectedColor.value,
        selectedIcon.value,
        props.category.id
    );

    emit("close");
    categoryStore.fetchCategories(userStore.user.id);
    taskStore.fetchTasks(userStore.user.id);
}

async function deleteCategory() {
    await categoryStore.deleteCategory(props.category.id);

    emit("close");
    emit("resetCatFilter");
    categoryStore.fetchCategories(userStore.user.id);
    taskStore.fetchTasks(userStore.user.id);
}

</script>

<style scoped>

</style>