<template>
  <div class="container">
    <header>
      <nav class="navbar">
        <ul>
          <li :class="{ active: $route.path === '/posts' }">
            <router-link to="/posts"><i class="fas fa-file-alt"></i> Post</router-link>
          </li>
          <li :class="{ active: $route.path === '/todos' }">
            <router-link to="/todos"><i class="fas fa-list"></i> Todos</router-link>
          </li>
          <li :class="{ active: $route.path === '/albums' }">
            <router-link to="/albums"><i class="fas fa-images"></i> Albums</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #4CAF50, #2E8B57);
  padding: 10px;
  box-sizing: border-box;
}

header {
  background-color: transparent;
  width: 100%;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
}

nav ul {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  list-style: none;
}

nav ul li {
  margin: 0 20px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  position: relative;
}

nav ul li.active {
  font-weight: bold;
}

nav ul li:hover {
  transform: translateY(-3px);
}

nav ul li::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: #fff;
  transition: width 0.3s;
  position: absolute;
  bottom: -5px;
  left: 0;
}

nav ul li:hover::after {
  width: 100%;
}

.router-link-active {
  font-weight: bold;
  color: #ffeb3b;
}

i {
  margin-right: 8px;
  color: #fff;
}

@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
    align-items: center;
  }

  nav ul li {
    margin: 10px 0;
  }
}
</style>
