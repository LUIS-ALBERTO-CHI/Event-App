import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import HomePage from './components/HomePage.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import CreateEvent from './components/EventsCreatePage.vue';
import EventsTable from './components/EventsTable.vue';
import Vue3Geolocation from 'vue3-geolocation'
import EventSchedule from './components/EventSchedule.vue';



const routes = [
  { path: '/', component: HomePage },
  { path: '/register', component: RegisterPage },
  { path: '/events', component: EventsTable },
  { path: '/eventSchedule', component: EventSchedule },
  { path: '/createEvent', component: CreateEvent },
  { path: '/login', component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(PrimeVue);
app.use(router); 

app.use(Vue3Geolocation)
app.mount('#app');
