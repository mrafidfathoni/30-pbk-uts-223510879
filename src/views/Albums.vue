<template>
    <div class="albums">
      <h2>Albums</h2>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else>
        <ul class="album-list">
          <li v-for="album in albums" :key="album.id" class="album-item">
            <router-link :to="`/albums/${album.id}`" class="album-link">{{ album.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const albums = ref([]);
      const loading = ref(true);
  
      onMounted(() => {
        fetch('https://jsonplaceholder.typicode.com/albums')
          .then(response => response.json())
          .then(data => {
            albums.value = data;
            loading.value = false;
          })
          .catch(error => {
            console.error('Error fetching albums:', error);
            loading.value = false;
          });
      });
  
      return {
        albums,
        loading,
      };
    },
  };
  </script>
  
  <style scoped>
  .albums {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #f4f4f4;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  
  .loading {
    text-align: center;
    color: #888;
  }
  
  .album-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .album-item {
    margin-bottom: 10px;
  }
  
  .album-link {
    display: block;
    padding: 10px;
    background: #fff;
    border-radius: 5px;
    text-decoration: none;
    color: #333;
    transition: background 0.3s, transform 0.3s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .album-link:hover {
    background: #e0e0e0;
    transform: translateY(-3px);
  }
  </style>
  