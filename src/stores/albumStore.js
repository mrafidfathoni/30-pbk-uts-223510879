import { defineStore } from 'pinia';
import axios from 'axios';

export const useAlbumStore = defineStore('albumStore', {
  state: () => ({
    albums: [],
    photos: [],
  }),
  actions: {
    async fetchAlbums() {
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
      this.albums = response.data;
    },
    async fetchPhotos(albumId) {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
      this.photos = response.data;
    },
  },
});
