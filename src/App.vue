<template>
  <div class="menu-container">
    <div class="button-group">
      <button @click="handleMenuClick('Todos')" :class="{ active: selectedMenu === 'Todos' }">Todos</button>
      <button @click="handleMenuClick('Post')" :class="{ active: selectedMenu === 'Post' }">Post</button>
    </div>
    
    <div class="content">
      <Todos v-if="selectedMenu === 'Todos'" />
      <Post v-if="selectedMenu === 'Post'" />
      <p v-if="!selectedMenu" class="no-selection">Pilih Salah Satu Menu Diatas.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Todos from './components/Todos.vue';
import Post from './components/Post.vue';

const selectedMenu = ref('');

const handleMenuClick = (menu) => {
  selectedMenu.value = menu;
};
</script>

<style scoped>
.menu-container {
  text-align: center;
  margin: 20px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.button-group button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.button-group button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.button-group button.active {
  background-color: #2c3e50;
}

.content {
  margin-top: 20px;
}

.no-selection {
  font-size: 18px;
  color: #e74c3c;
}
</style>
