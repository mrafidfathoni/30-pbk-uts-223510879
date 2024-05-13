<template>
  <div class="container">
    <header>
      <nav>
        <ul>
          <li @click="selectedMenu = 'Post'" :class="{ active: selectedMenu === 'Post' }">Post</li>
          <li @click="selectedMenu = 'Todos'" :class="{ active: selectedMenu === 'Todos' }">Todos</li>
        </ul>
      </nav>
    </header>
    <div class="content">
      <div v-if="selectedMenu === 'Post'" class="post-section">
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
      <div v-else-if="selectedMenu === 'Todos'" class="todos-section">
        <Todos :todos="todos" />
      </div>
    </div>
  </div>
</template>

<script>
import Todos from './Todos.vue'; // Sesuaikan dengan path file komponen Todos Anda

export default {
  components: {
    Todos
  },
  data() {
    return {
      selectedMenu: 'Post', // Default menu selection
      users: [],
      selectedUser: null,
      selectedUserName: '',
      selectedUserEmail: '',
      selectedUserPhone: '',
      posts: [],
      todos: [],
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


<style>

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #4CAF50, #2E8B57); /* Gradient background */
}

header {
  background-color: transparent; /* Hapus background color header */
  padding: 20px 0;
  box-shadow: none; /* Hapus shadow */
}

nav ul li {
  display: inline-block;
  margin-right: 20px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease; /* Transisi */
}

nav ul li.active {
  font-weight: bold;
}

nav ul li:hover {
  transform: translateY(-3px); /* Efek hover */
}

nav ul li::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: #fff;
  transition: width 0.3s; /* Transisi */
}

nav ul li:hover::after {
  width: 100%; /* Lebar penuh saat hover */
}

/* Tambahkan icon untuk setiap menu */
nav ul li::before {
  content: '\25CF';
  margin-right: 5px;
}

/* Tambahkan border pada kolom */
.column {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f4f4f4;
  margin: 0 10px;
  border-radius: 10px;
  border: 1px solid #ddd; /* Tambahkan border */
}

/* Tambahkan font */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Tambahkan spasi */
h2, h3 {
  margin-bottom: 10px;
}

/* Tambahkan gaya untuk loading */
.loading {
  color: #888;
}
</style>