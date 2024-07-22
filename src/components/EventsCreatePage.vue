<template>
    <div class="event-form-container">
        <div class="event-form-card">
            <Card>
                <template #header>
                    <img alt="user header" src="../assets/logo.png" style="width: 150px;">
                </template>
                <template #title>Crear envento</template>
                <template #content>
                    <form @submit.prevent="createEvent" class="formgrid grid">
                        <div class="col-12 md:col-6">
                            <div class="p-fluid">
                                <div class="p-field pb-3">
                                    <label for="name" class="form-label">Nombre del evento</label>
                                    <InputText id="name" v-model="event.name" />
                                </div>
                                <div class="p-field pb-3">
                                    <label for="datetime" class="form-label">Fecha</label>
                                    <Calendar id="datetime" v-model="event.datetime" hourFormat="12" showTime
                                        showSeconds showIcon iconDisplay="input" />
                                </div>
                                <div class="p-field pb-3">
                                    <label for="description" class="form-label">Descripción</label>
                                    <InputText id="description" v-model="event.description" />
                                </div>
                                <div class="p-field pb-3">
                                    <label for="guestId" class="form-label">Invitado</label>
                                    <Dropdown id="guestId" v-model="selectedGuest" :options="guests" optionLabel="name"
                                        placeholder="Selecciona un invitado" />
                                </div>
                                <div class="p-field pb-3">
                                    <label for="cost" class="form-label">Costo</label>
                                    <InputText id="cost" v-model="event.cost" />
                                </div>
                            </div>
                        </div>
                        <div class="col-12 md:col-6">
                            <div class="p-fluid">
                                <div class="p-field pb-3">
                                    <label for="eventStatus" class="form-label">Estado del evento</label>
                                    <Dropdown id="eventStatus" v-model="selectedStatus" :options="eventStatuses"
                                        optionLabel="label" placeholder="Select a status" />
                                </div>
                                <MapComponent @update-location="updateLocation" />
                            </div>
                        </div>
                        <div class="col-12">
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import MapComponent from './MapComponent.vue';

export default {
    components: {
        Card,
        InputText,
        Button,
        Calendar,
        Dropdown,
        MapComponent,
    },
    setup() {
        onMounted(() => {
            fetchAllGuests();
        });
        const guests = ref([]);

        const event = ref({
            name: '',
            datetime: null,
            description: '',
            guestId: null,
            cost: null,
            eventStatus: '',
            location: {
                latitud: null,
                longitud: null,
                address: '',
            },
        });

        const selectedGuest = ref(null);

        const eventStatuses = ref([
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'endended' },
            { label: 'Canceled', value: 'cancelled' },
        ]);
        const selectedStatus = ref(null);

        const router = useRouter();

        const createEvent = async () => {
            try {
                console.log('Selected Guest:', selectedGuest);

                const eventData = {
                    ...event.value,
                    datetime: event.value.datetime.toISOString(),
                    guestId: selectedGuest.value.idGuest,
                    cost: parseFloat(event.value.cost),
                    eventStatus: selectedStatus.value.value,
                    location: {
                        latitud: parseFloat(event.value.location.latitud),
                        longitud: parseFloat(event.value.location.longitud),
                        address: event.value.location.address,
                    },
                };
                const response = await axios.post('http://localhost:3000/api/events', eventData);
                console.log(response.data);
                router.push('/');
            } catch (error) {
                console.error('Error creating event:', error);
            }
        };

        const updateLocation = (location) => {
  event.value.location.latitud = location.lat;
  event.value.location.longitud = location.lng;
    event.value.location.address = location.address;

};
        const fetchAllGuests = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/guests');
                guests.value = response.data.guest;
                console.log(response.data.guest);
            } catch (error) {
                console.error('Error fetching all guests:', error);
            }
        };

        return {
            event,
            eventStatuses,
            createEvent,
            selectedStatus,
            fetchAllGuests,
            guests,
            selectedGuest,
            updateLocation
        };
    },
};
</script>

<style>
.event-form-container {
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    background-color: #f5f5f7;
    padding: 20px;
}

.event-form-card {
    width: 100%;
    max-width: 900px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 40px;
}

.form-label {
    font-size: 14px;
    color: #333333;
    margin: 12px;
}

.form-input {
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 20px;
    color: #333333;
    transition: border-color 0.3s ease;
}

.form-input:focus {
    border-color: #007aff;
    outline: none;
}

.submit-button {
    background-color: #007aff;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
}

.submit-button:hover {
    background-color: #0056b3;
}
</style>