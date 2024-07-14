<template>
  <div class="container">
    <div class="box">
      <img class="logo" src="../assets/logo.png" alt="">
      <p>Crea una cuenta</p>
      <form @submit.prevent="register">
        <div class="input">
          <input type="text" id="name" v-model="name" required placeholder="Nombre">
        </div>
        <div class="input">
          <input type="text" id="lastname" v-model="lastname" required placeholder="Apellido">
        </div>
        <div class="input">
          <input type="email" id="mail" v-model="mail" required placeholder="Correo">
        </div>
        <div class="input">
          <input type="password" id="password" v-model="password" required placeholder="Contraseña"/>
        </div>
        <button type="submit">Register</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      lastname: '',
      mail: '',
      password: '',
      pfp: null,
      error: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      this.pfp = event.target.files[0];
    },
    async register() {
      try {
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('lastname', this.lastname);
        formData.append('mail', this.mail);
        formData.append('password', this.password);
        if (this.pfp) {
          formData.append('pfp', this.pfp);
        }

        const response = await fetch('http://localhost:5000/api/user/registerUser', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to register');
        }
        const data = await response.json();
        console.log(data);
        this.$router.push('/login');
      } catch (error) {
        console.error('Error registering user:', error);
        this.error = 'Failed to register. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

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
