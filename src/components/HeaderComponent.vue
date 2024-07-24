<template>
    <Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem; height: auto; box-shadow: 0 2px 4px rgb(0, 0, 0, 0.4);">
        <template #start>
            <div class="flex align-items-center gap-2">
                <router-link to="/">
                    <img src="../assets/logo.png" alt="" style="width: 50px;"/>
                </router-link>
                <router-link to="/">
                    <Button label="Inicio" text plain/>
                </router-link>
                
                <router-link to="/eventSchedule">
                    <Button label="Calendario" text plain />
                </router-link>
                <router-link to="/createEvent" v-if="isAdmin">
                    <Button label="Crear evento" text plain/>
                </router-link>
                <router-link to="/events" v-if="isAdmin">
                    <Button label="Eventos" text plain />
                </router-link>
            </div>
        </template>
        <template #end>
            <div class="flex align-items-center gap-2">
                <div v-if="isLoggedIn" class="flex align-items-center gap-2">
                    <h3>Hola, {{ username }}</h3>
                    <Button label="Salir" text plain icon="pi pi-sign-out" @click="handleLogout" />
                </div>
                <div v-else>
                    <router-link to="/login">
                        <Button label="Log in" text plain />
                    </router-link>
                </div>
            </div>
        </template>
    </Toolbar>
</template>

<script>
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';

export default {
    name: 'HeaderComponent',
    components: {
        Button,
        Toolbar
    },
    props: {
        isLoggedIn: Boolean,
        username: String,
        userRole: String
    },
    methods: {
        handleLogout() {
            localStorage.removeItem('accessToken');
            this.$emit('logout');
        }
    }, 
    computed: {
        isAdmin() {
            return this.userRole == 2 ? true : false;
        }
    }
};
</script>

<style scoped>
.header {
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-image: radial-gradient(circle at 25%, hsla(0, 0%, 100%, .2), rgba(50, 50, 50, .2) 80%);
    background-color: rgba(37, 38, 40, .21);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(14px);
}

.header-left .logo {
    height: 30px;
}
</style>