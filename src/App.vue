<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-brown text-white" height-hint="98">
      <q-toolbar class="q-space-between">
        <q-avatar class="q-mr-sm" @click="showDialog = true">
          <img src="https://i.pinimg.com/736x/a2/5e/47/a25e47fce1c5202c0c2c67470ba70b3c.jpg">
        </q-avatar>
        <div class="arrow-container">
          <div class="arrow"></div>
          <div class="arrow-text">Click me!</div>
        </div>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/todos" label="Todos" />
        <q-route-tab to="/post" label="Post" />
        <q-route-tab to="/albums" label="Album" />
      </q-tabs>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-brown text-white" @mouseover="footerHover">
      <q-toolbar>
        <q-toolbar-title>
          <div>Miftahul Jannah | 223510890 | 4D</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Assalamualaikum pak, izin mengumpulkan UAS Part2</div>
          <div>Nama: Miftahul Jannah</div>
          <div>NPM: 223510890</div>
          <div>Kelas: 4 D</div>
          <div>Matakuliah: Pemrograman Berbasis Komponen</div>
          <div>Dosen Pengampu: @mrizkifadhilah</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const showDialog = ref(false);

const footerHover = () => {
  const footer = document.querySelector('.q-footer');
  footer.classList.add('footerHover');
  setTimeout(() => {
    footer.classList.remove('footerHover');
  }, 500);
};
</script>

<style scoped>
.footerHover {
  color: white;
}

.q-mr-sm {
  margin-right: 8px;
}

.q-px-none {
  padding-left: 0;
  padding-right: 0;
}

.arrow-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.arrow {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid rgb(0, 0, 0);
  animation: bounce 1s infinite;
  margin-right: 5px;
}

.arrow-text {
  font-size: 12px;
  color: rgb(0, 0, 0);
  animation: bounce-text 1s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: rotate(0deg);
  }
  40% {
    transform: rotate(-45deg); 
  }
  60% {
    transform: rotate(-25deg); 
  }
}

@keyframes bounce-text {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-2.5px);
  }
}
</style>
