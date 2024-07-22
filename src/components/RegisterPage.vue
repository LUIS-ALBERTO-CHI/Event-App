<template>
  <div class="form-container">
    <div class="form-card">
      <Card>
        <template #title>Crear una cuenta</template>
        <template #content>
          <form @submit.prevent="createUser" class="form">
            <div class="p-fluid">
              <div class="p-field">
                <label for="firstName" class="form-label">Nombre</label>
                <InputText id="firstName" v-model="user.firstName" class="form-input" />
              </div>
              <div class="p-field">
                <label for="lastName" class="form-label">Apellido</label>
                <InputText id="lastName" v-model="user.lastName" class="form-input" />
              </div>
              <div class="p-field">
                <label for="phone" class="form-label">Número de teléfono</label>
                <InputText id="phone" v-model="user.phone" class="form-input" />
              </div>
              <div class="p-field">
                <label for="email" class="form-label">Correo</label>
                <InputText id="email" v-model="user.email" class="form-input" />
              </div>
              <div class="p-field">
                <label for="userPassword" class="form-label">Contraseña</label>
                <Password id="userPassword" v-model="user.userPassword" class="form-input" feedback={false} />
              </div>
              <Button label="Submit" icon="pi pi-check" type="submit" class="submit-button" />
            </div>
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import { useRouter } from 'vue-router';

export default {
  components: {
    Card,
    InputText,
    Button,
    Password,
  },
  setup() {
    const user = ref({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      userPassword: '',
    });

    const router = useRouter();

    const createUser = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/users', user.value);
        console.log(response.data);
        router.push('/login');
      } catch (error) {
        console.error(error);
      }
    };

    return {
      user,
      createUser,
    };
  },
};
</script>

<style>
.form-container {
  display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ccc;
}

.form-card {
  width: 55%;
    height: 66vh;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 17px;
    font-weight: bold;
    color: #444;
    margin-top: 12px;
}

.form-input {
  display: flex;
    align-items: center;
    width: 300px;
    height: 42px;
    border: 2px solid #ccc;
    border-radius: 8px;
    margin-top: 12px;
}

.form-input:focus {
  border-color: #007aff;
  outline: none;
}

.submit-button {
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

.submit-button:hover {
  background-color: #0056b3;
}
</style>
