<template>
  <div>
    <h2>Post</h2>
    <select v-model="selectedUser" @change="fetchPosts" class="select-user">
      <option value="">Select User</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <div v-if="loading" class="loader"></div> 
    <ul v-else-if="posts.length" class="post-list">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <slot name="post-extra" :post="post"></slot> 
      </li>
    </ul>
    <p v-else-if="selectedUser && !posts.length" class="no-posts">Tidak ada postingan yang tersedia untuk user ini</p>
    <p v-else class="no-posts">Tidak ada postingan yang tersedia</p>
    <div class="additional-content">
      <slot name="additional"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  initialUsers: {
    type: Array,
    default: () => []
  },
  initialPosts: {
    type: Array,
    default: () => []
  }
});

const users = ref(props.initialUsers);
const selectedUser = ref('');
const posts = ref(props.initialPosts);
const loading = ref(false); 

const fetchUsers = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await response.json();
    users.value = data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const fetchPosts = async () => {
  try {
    if (!selectedUser.value) return;
    loading.value = true;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
    const data = await response.json();
    posts.value = data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    loading.value = false; 
  }
};

onMounted(() => {
  if (!props.initialUsers.length) {
    fetchUsers();
  }
});

watch(selectedUser, (newValue) => {
  if (newValue) {
    fetchPosts();
  }
});
</script>

<style scoped>
h2 {
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 20px;
  text-align: center;
}

.select-user {
  display: block;
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin: 0 auto 20px auto;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.select-user:focus {
  border-color: #3498db;
  outline: none;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-item {
  padding: 20px;
  margin: 15px auto;
  max-width: 600px;
  border: 1px solid #e1e4e8;
  border-radius: 10px;
  background-color: #ffffff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.post-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.post-item h3 {
  margin: 0 0 10px;
  font-size: 22px;
  color: #34495e;
}

.post-item p {
  margin: 0;
  font-size: 16px;
  color: #7f8c8d;
}

.no-posts {
  font-size: 16px;
  color: #e74c3c;
  text-shadow: 0 0 1px #000;
  margin-top: 20px;
  text-align: center;
}

.loader {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
