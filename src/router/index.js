import { createRouter, createWebHistory } from 'vue-router';
import Post from '../components/Post.vue';
import Todos from '../components/Todos.vue';
import Albums from '../components/Albums.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/todos',
      name: 'Todos',
      component: Todos
    },
    {
      path: '/albums',
      name: 'Albums',
      component: Albums
    },
    {
      path: '/albums/:id',
      name: 'AlbumDetailComponent',
      component: Albums
    }
  ]
})

export default router