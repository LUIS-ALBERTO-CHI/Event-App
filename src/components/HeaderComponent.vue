<template>
    <header class="header">
        <div class="flex align-items-center flex-wrap">
            <template v-if="isLoggedIn">
                <h3 style="color: aliceblue;">Hola, {{ username }}</h3>
                <Button style="color: aliceblue;" label="Log out" text icon="pi pi-sign-out" @click="handleLogout" />
            </template>
            <template v-else>
                <router-link to="/login" style="color: aliceblue;" class="p-button p-button-text">Log in</router-link>
            </template>
        </div>
    </header>
</template>

<script>
import Button from 'primevue/button';

export default {
    name: 'HeaderComponent',
    components: {
        Button
    },
    props: {
        isLoggedIn: Boolean,
        username: String
    },
    methods: {
        handleLogout() {
            localStorage.removeItem('accessToken');
            this.$emit('logout');
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