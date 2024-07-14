<template>
  <div id="app">
    <HeaderComponent :isLoggedIn="isLoggedIn" :username="username" @logout="handleLogout" />
    <router-view @login-success="handleLogin"></router-view>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent
  },
  data() {
    return {
      isLoggedIn: false,
      username: ''
    };
  },
  methods: {
    handleLogin(token) {
      console.log('User logged in', token);

      if (!token) {
        console.error('Invalid token received:', token);
        return;
      }

      try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        console.log('Decoded token:', decodedPayload);

        localStorage.setItem('accessToken', token);

        this.isLoggedIn = true;
        this.username = decodedPayload.name;
      } catch (error) {
        console.error('Error decoding or storing token:', error);
      }
    },
    handleLogout() {
      localStorage.removeItem('accessToken');
      this.isLoggedIn = false;
      this.username = '';
    },
    checkAuth() {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const payloadBase64 = token.split('.')[1];
          const decodedPayload = JSON.parse(atob(payloadBase64));
          this.isLoggedIn = true;
          this.username = decodedPayload.name;
        } catch (error) {
          console.error('Invalid token', error);
          this.isLoggedIn = false;
          this.username = '';
        }
      }
    }
  },
  created() {
    this.checkAuth();
  }
};
</script>

<style>
#app {
  font-family: SF Pro Text, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 14px;
  height: 100%;
  background: linear-gradient(to bottom right, #007AFF, #00A3E3);
  position: relative;
  overflow: hidden;
}

#app::before, #app::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  opacity: 0.5;
}

#app::before {
  width: 200px;
  height: 200px;
  top: 20%;
  left: 10%;
}

#app::after {
  width: 300px;
  height: 300px;
  bottom: 15%;
  right: 20%;
}

@media (max-width: 768px) {
  #app::before {
    width: 150px;
    height: 150px;
    top: 25%;
    left: 15%;
  }

  #app::after {
    width: 200px;
    height: 200px;
    bottom: 20%;
    right: 25%;
  }
}
</style>
