<template>
    <div class="post-section">
      <div class="column">
        <h3>User Details:</h3>
        <p v-if="selectedUserName"><strong>Name:</strong> {{ selectedUserName }}</p>
        <p v-if="selectedUserEmail"><strong>Email:</strong> {{ selectedUserEmail }}</p>
        <p v-if="selectedUserPhone"><strong>Phone:</strong> {{ selectedUserPhone }}</p>
      </div>
      <div class="column">
        <select v-model="selectedUser" @change="fetchPosts">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div class="column">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="posts.length > 0">
          <h2>Postingan User: {{ selectedUserName }}</h2>
          <ul>
            <li v-for="post in posts" :key="post.id">
              <h3>{{ post.title }}</h3>
              <p>{{ post.body }}</p>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Tidak ada postingan untuk pengguna ini.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        selectedUser: null,
        selectedUserName: '',
        selectedUserEmail: '',
        selectedUserPhone: '',
        posts: [],
        loading: false
      };
    },
    methods: {
      fetchUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(data => {
            this.users = data;
          })
          .catch(error => {
            console.error('Error fetching users:', error);
          });
      },
      fetchPosts() {
        if (this.selectedUser) {
          this.loading = true;
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`)
            .then(response => response.json())
            .then(data => {
              this.posts = data;
              const selectedUser = this.users.find(user => user.id === parseInt(this.selectedUser));
              if (selectedUser) {
                this.selectedUserName = selectedUser.name;
                this.selectedUserEmail = selectedUser.email;
                this.selectedUserPhone = selectedUser.phone;
              }
              this.loading = false;
            })
            .catch(error => {
              console.error('Error fetching posts:', error);
              this.loading = false;
            });
        }
      }
    },
    watch: {
      selectedUser() {
        this.fetchPosts();
      }
    },
    created() {
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  .post-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .column {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f4f4f4;
    margin: 0 10px;
    border-radius: 10px;
    border: 1px solid #ddd;
  }
  
  .loading {
    color: #888;
  }
  </style>
  