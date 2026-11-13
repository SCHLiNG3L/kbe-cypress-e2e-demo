<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const todos = ref<Todo[]>([])
const newTodoText = ref('')
const API_URL = 'http://localhost:8080/api/todos'

onMounted(async () => {
  try {
    const res = await fetch(API_URL)
    if (res.ok) todos.value = await res.json()
  } catch {
    // Fallback für reine Frontend-Demo
  }
})

const addTodo = async () => {
  if (!newTodoText.value.trim()) return
  const payload = { id: Date.now(), text: newTodoText.value.trim(), completed: false }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      const saved = await res.json()
      todos.value.push(saved)
    } else {
      todos.value.push(payload)
    }
  } catch {
    todos.value.push(payload)
  }
  newTodoText.value = ''
}

const toggleTodo = (id: number) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.completed = !todo.completed
}
</script>

<template>
  <div class="todo-container">
    <h2>KBE E2E-Testing Demo: To-Do Liste</h2>

    <form @submit.prevent="addTodo">
      <input
          v-model="newTodoText"
          data-cy="todo-input"
          placeholder="Neue Aufgabe eingeben..."
      />
      <button type="submit" data-cy="todo-submit">Hinzufügen</button>
    </form>

    <ul data-cy="todo-list">
      <li
          v-for="todo in todos"
          :key="todo.id"
          data-cy="todo-item"
          :class="{ completed: todo.completed }"
      >
        <span data-cy="todo-text">{{ todo.text }}</span>
        <button data-cy="todo-toggle" @click="toggleTodo(todo.id)">
          {{ todo.completed ? 'Rückgängig' : 'Erledigt' }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todo-container { max-width: 400px; margin: 2rem auto; font-family: sans-serif; }
form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
input { flex: 1; padding: 0.5rem; }
.completed span { text-decoration: line-through; opacity: 0.6; }
</style>