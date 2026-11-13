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
  <div class="demo-wrapper">
    <div class="todo-card">
      <h2>KBE E2E-Testing Live-Demo</h2>
      <p class="subtitle">Vue 3 Frontend + Quarkus Backend</p>

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
  </div>
</template>

<style scoped>
.demo-wrapper {
  background-color: #0f1626;
  color: #f8fafc;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: system-ui, -apple-system, sans-serif;
}

.todo-card {
  background-color: #162035;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

h2 { margin-top: 0; color: #56c596; font-size: 1.5rem; }
.subtitle { color: #94a3b8; font-size: 0.9rem; margin-bottom: 20px; }

form { display: flex; gap: 10px; margin-bottom: 20px; }
input {
  flex: 1;
  background: #0f1626;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 10px;
  border-radius: 6px;
  outline: none;
}
input:focus { border-color: #56c596; }

button {
  background: #56c596;
  color: #0f1626;
  border: none;
  padding: 10px 16px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
}
button:hover { opacity: 0.9; }

ul { list-style: none; padding: 0; margin: 0; }
li {
  background: #0f1626;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.completed span {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>