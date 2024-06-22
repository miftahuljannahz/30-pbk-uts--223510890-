import { defineStore } from 'pinia';

export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    albums: [],
    photos: []
  }),
  actions: {
    async fetchAlbums() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        this.albums = await response.json();
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    },
    async fetchPhotos(albumId) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        this.photos = await response.json();
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    }
  }
});
