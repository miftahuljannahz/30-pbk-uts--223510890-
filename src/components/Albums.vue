<template>
  <div class="album-details-container">
    <h2 class="title">Pilih Album:</h2>
    <select v-model="selectedAlbum" @change="fetchPhotos" class="select-album">
      <option disabled value="">Silakan pilih album</option>
      <option v-for="album in albums" :key="album.id" :value="album.id">{{ album.id }} - {{ album.title }}</option>
    </select>
    <h2 class="title">Foto dalam Album (ID: {{ selectedAlbum }})</h2>
    <div v-if="photos.length" class="photos-grid">
      <div v-for="photo in photos" :key="photo.id" class="photo-item">
        <img :src="photo.thumbnailUrl" @click="showPhoto(photo.url)" class="thumbnail" alt="Thumbnail">
        <p class="photo-title">{{ photo.title }}</p>
      </div>
    </div>
    <div v-else class="no-photos">
      <p>Tidak ada foto yang tersedia.</p>
    </div>
  </div>
  
  <footer class="footer" @mouseenter="footerHover">
    <slot name="footerContent">Miftahul Jannah | 223510890 | 4D</slot>
  </footer>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAlbumsStore } from '../stores/AlbumStore';

const router = useRouter();
const selectedAlbum = ref(null);
const albums = ref([]);
const photos = ref([]);

const albumsStore = useAlbumsStore();

const fetchAlbums = async () => {
  try {
    await albumsStore.fetchAlbums();
    albums.value = albumsStore.albums;
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
};

const fetchPhotos = async () => {
  if (selectedAlbum.value) {
    try {
      await albumsStore.fetchPhotos(selectedAlbum.value);
      photos.value = albumsStore.photos;
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  }
};

const showPhoto = (url) => {
  window.open(url, '_blank');
};

onMounted(() => {
  fetchAlbums();
});

watch(selectedAlbum, (newAlbum) => {
  if (newAlbum) {
    fetchPhotos();
    router.push(`/albums/${newAlbum}`);
  }
});

const footerHover = () => {
  const footer = document.querySelector('.footer');
  footer.classList.toggle('footerHover');
};
</script>

<style scoped>
.album-details-container {
  font-family: 'Arial', sans-serif;
  max-width: 1000px;
  margin: 50px auto;
  padding: 40px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  background-image: url('https://i.pinimg.com/564x/5c/f8/93/5cf89309a937d6ec7d4267ae5531c858.jpg');
  background-size: cover;
  background-position: center;
}

.album-details-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: -1;
}

.album-details-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.title {
  color: #ffffff;
  text-align: center;
  font-weight: bold;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.select-album {
  width: 100%;
  padding: 15px;
  margin-bottom: 30px;
  border: 2px solid #007bff;
  border-radius: 15px;
  background-color: #f9f9f9;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s;
}

.select-album:focus {
  border-color: #0056b3;
  outline: none;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.photo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.thumbnail {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 2px solid #007bff;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s, border-color 0.3s;
}

.thumbnail:hover {
  transform: scale(1.1);
  border-color: #0056b3;
}

.photo-title {
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
  color: #ffffff;
}

.no-photos {
  text-align: center;
  margin-top: 30px;
}

.no-photos p {
  font-size: 1.2rem;
  color: #e74c3c; 
  text-shadow: 0 0 1px #000;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 15px 0;
  background-color: #f1f1f1;
  transition: background-color 0.5s ease;
}

.footer.footerHover {
  background-color: #3498db;
  color: white;
}

.footer:hover {
  cursor: pointer;
}
</style>
