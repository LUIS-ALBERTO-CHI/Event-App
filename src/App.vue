<template>
  <div id="app">
    <HeaderComponent :isLoggedIn="isLoggedIn" :username="username" :userRole="userRole" @logout="handleLogout" style="width: 100%;"/>
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
      username: '',
      userRole: null
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
      const user = JSON.parse(localStorage.getItem('loggedInUser'));

      this.isLoggedIn = true;
      this.username = user.firstName;
      this.userRole = user.role.id;

    } catch (error) {
      console.error('Error accessing user data:', error);
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
          console.log('User logged in', decodedPayload);
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
  background: #f5f5f7;
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
