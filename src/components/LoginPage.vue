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
        <div class="button">
          <router-link to="/register" class="register">Register</router-link>
        </div>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
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
        const response = await axios.post('http://localhost:5000/api/user/login', {
          mail: this.email,
          password: this.password
        });
        const token = response.data.accessToken;
        console.log('Login successful', token);
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
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}

.container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ccc;
}

.box{
    width: 55%;
    height: 66vh;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
