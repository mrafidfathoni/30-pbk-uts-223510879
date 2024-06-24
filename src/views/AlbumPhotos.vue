<template>
    <div class="album-photos">
      <h2>Photos in Album</h2>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else>
        <ul class="photo-list">
          <li v-for="photo in photos" :key="photo.id" class="photo-item">
            <img :src="photo.thumbnailUrl" @click="selectedPhoto = photo.url" class="photo-thumbnail" />
          </li>
        </ul>
        <div v-if="selectedPhoto" class="photo-modal" @click="selectedPhoto = null">
          <img :src="selectedPhoto" class="photo-full" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const photos = ref([]);
      const loading = ref(true);
      const selectedPhoto = ref(null);
      const route = useRoute();
  
      onMounted(() => {
        const albumId = route.params.id;
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
          .then(response => response.json())
          .then(data => {
            photos.value = data;
            loading.value = false;
          })
          .catch(error => {
            console.error('Error fetching photos:', error);
            loading.value = false;
          });
      });
  
      return {
        photos,
        loading,
        selectedPhoto,
      };
    },
  };
  </script>
  
  <style scoped>
  .loading {
    text-align: center;
    color: #888;
  }
  
  .photo-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .photo-item {
    margin: 10px;
  }
  
  .photo-thumbnail {
    width: 150px;
    height: 150px;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.3s;
  }
  
  .photo-thumbnail:hover {
    transform: scale(1.05);
  }
  
  .photo-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .photo-full {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }
  </style>
  