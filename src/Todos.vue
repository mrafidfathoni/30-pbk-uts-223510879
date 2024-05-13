<template>
    <main class="app">

        <section v-if="activeTab === 'todos' || activeTab === 'post'" class="content-section">
            <section v-if="activeTab === 'todos'" class="todo-section">
                <!-- Konten Todos -->
                <section class="greeting">
                    <h2 class="title">
                        <input type="text" id="name" placeholder="TaskMaster" v-model="name">
                    </h2>
                </section>

                <!-- Bagian membuat todo -->
                <section class="create-todo">
                    <h3>MEMBUAT LIST</h3>
                    <!-- Form untuk menambahkan todo -->
                    <form id="new-todo-form" @submit.prevent="addTodo">
                        <h4>Apa Yang Ingin Kamu List?</h4>
                        <input 
                            type="text" 
                            name="content" 
                            id="content" 
                            placeholder="Tuliskan"
                            v-model="input_content" />
                        
                        <h4>Pilih Kategori</h4>
                        <div class="options">
                            <label>
                                <input 
                                    type="radio" 
                                    name="category" 
                                    id="category1" 
                                    value="business"
                                    v-model="input_category" />
                                <span class="bubble business"></span>
                                <div>Pribadi</div>
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="category" 
                                    id="category2" 
                                    value="personal"
                                    v-model="input_category" />
                                <span class="bubble personal"></span>
                                <div>Umum</div>
                            </label>      
                        </div>
                        <input type="submit" value="Simpan Kegiatan" />
                    </form>
                </section>

                <!-- Daftar Todos -->
                <section class="todo-list">
                    <h3>LIST KEGIATAN</h3>
                    <div class="list" id="todo-list">
                        <div v-for="todo in todos_asc" :class="['todo-item', { 'done': todo.done }]">
                            <label>
                                <input type="checkbox" v-model="todo.done" />
                                <span :class="'bubble ' + (todo.category === 'business' ? 'business' : 'personal')"></span>
                            </label>
                            <div class="todo-content">
                                <input type="text" v-model="todo.content" />
                            </div>
                            <div class="actions">
                                <button class="delete" @click="removeTodo(todo)">Delete</button>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <section v-else-if="activeTab === 'post'" class="post-section">
                <h3>Postingan Pengguna</h3>
            </section>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref([])
const name = ref('')
const activeTab = ref('todos') // Menyimpan status tab yang sedang aktif

const input_content = ref('')
const input_category = ref(null)

const todos_asc = computed(() => todos.value.sort((a,b) => a.createdAt - b.createdAt))

watch(name, (newVal) => {
    localStorage.setItem('name', newVal)
})

watch(todos, (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
}, {
    deep: true
})

const addTodo = () => {
    if (input_content.value.trim() === '' || input_category.value === null) {
        return
    }

    todos.value.push({
        content: input_content.value,
        category: input_category.value,
        done: false,
        editable: false,
        createdAt: new Date().getTime()
    })
}

const removeTodo = (todo) => {
    todos.value = todos.value.filter((t) => t !== todo)
}

onMounted(() => {
    name.value = localStorage.getItem('name') || ''
    todos.value = JSON.parse(localStorage.getItem('todos')) || []
})
</script>

<style scoped>
/* Styling bisa disesuaikan */


.header nav ul {
    list-style: none;
    display: flex;
}

.header nav ul li {
    margin-right: 20px;
    cursor: pointer;
}

.header nav ul li.active {
    font-weight: bold;
}

.content-section {
    display: flex;
    justify-content: center;
    align-items: center;
}

.todo-section, .post-section {
    max-width: 600px;
}

.todo-section {
    margin-right: 20px;
}

.post-section {
    margin-left: 20px;
}

.todo-item.done {
    text-decoration: line-through;
}

.bubble {
    /* styling bubble bisa disesuaikan */
}

.bubble.business {
    background-color: #ff0000; /* warna untuk kategori 'business' */
}

.bubble.personal {
    background-color: #0984ff; /* warna untuk kategori 'personal' */
}
</style>
