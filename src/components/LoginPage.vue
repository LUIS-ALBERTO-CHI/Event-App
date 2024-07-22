<template>
  <div class="container">
    <div class="box">
      <img class="logo" src="../assets/logo.png" alt="">
      <p>Eventify</p>
      <span class="p1">Inicia sesión para navegar</span>
      <form @submit.prevent="login">
        <div class="input">
          <input type="email" id="email" v-model="email" required placeholder="Correo">
        </div>
        <div class="input">
          <input type="password" id="password" v-model="password" required placeholder="Contraseña"/>
        </div>
        <button type="submit">Log In</button>
          <router-link to="/register">
            <Button label="Registrarse" text plain/>
          </router-link>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Button from 'primevue/button';

export default {
  name: 'LoginPage',
  components: {
    Button
  },
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email: this.email,
        password: this.password
      });

      const token = response.data.jwt;
      const user = response.data.user;

      console.log('Login successful', token);
      localStorage.setItem('accessToken', token);
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      this.$emit('login-success', token);
      this.$router.push('/');
    } catch (err) {
      this.error = 'Login failed. Please check your credentials and try again.';
    }
  }
  }
};
</script>

<style scoped>
*{
    margin: 20px;
    padding: 0;
    font-family: sans-serif;
}

.container{
    display: flex;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f7;
}

.box{
    width: 55%;
    height: 66vh;
    background-color: #f9fafb;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.logo{
    width: 100px;
    cursor: pointer;
    margin: 12px 0;
}

p{
    font-size: 26px;
    font-weight: bold;
}

.p1{
    font-size: 15px;
    margin-top: 8px;
}

.input{
    display: flex;
    align-items: center;
    width: 300px;
    height: 42px;
    border: 2px solid #ccc;
    border-radius: 8px;
    margin-top: 12px;
}

.input input{
    outline: 0;
    border: 0;
    font-size: 17px;
    width: 100%;
    padding: 5px 8px;
    background-color: transparent;
}

button {
    width: 300px;
    border: 0;
    background-color: #ccc;
    margin-top: 12px;
    font-size: 18px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 12px;
    cursor: pointer;
}

.button{
  width: 300px;
    border: 0;
    background-color: #ccc;
    margin-top: 12px;
    font-size: 18px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 12px;
    cursor: pointer;
}

label{
    font-size: 17px;
    font-weight: bold;
    color: #444;
    margin-top: 12px;
}

label input{
    margin-right: 5px;
    cursor: pointer;
}
</style>
