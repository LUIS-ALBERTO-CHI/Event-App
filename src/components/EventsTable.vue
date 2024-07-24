<template>
    <Message v-if="showMessage" :severity="messageSeverity">{{ messageText }}</Message>
    <Card>
        
        <template #title>Eventos</template>
        <template #content>
            
            <DataTable v-model:editingRows="editingRows" :value="events" paginator :rows="10"
                :rowsPerPageOptions="[5, 10, 20, 50]" editMode="row" dataKey="id" @row-edit-save="onRowEditSave" :pt="{
                    table: { style: 'min-width: 50rem' },
                    column: {
                        bodycell: ({ state }) => ({
                            style: state['d_editing'] && 'padding-top: 0.6rem; padding-bottom: 0.6rem;'
                        })
                    }
                }">
                <Column field="name" header="Evento">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="price" header="Fecha">
                    <template #editor="{ data, field }">
                        <Calendar v-model="data[field]" hourFormat="12" showTime showSeconds showIcon
                            iconDisplay="input" />
                    </template>
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.datetime) }}
                    </template>
                </Column>
                <Column field="description" header="Descripción">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="guest.name" header="Invitado">
                    <template #editor="{ data, field }">
                        <Dropdown v-model="data[field]" :options="guests" optionLabel="name" optionValue="name"
                            placeholder="Seleccione un invitado">
                        </Dropdown>
                    </template>
                </Column>
                <Column field="cost" header="Costo">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="eventStatus" header="Estado">
                    <template #editor="{ data, field }">
                        <Dropdown v-model="data[field]" :options="eventStatuses" optionLabel="label" optionValue="label"
                            placeholder="Seleccione una opcion">
                        </Dropdown>
                    </template>
                </Column>
                <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
                <Column style="width: 10%">
                    <template #body="slotProps">
                        <Button  icon="pi pi-trash" class="p-button-danger" @click="onDelete(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>

        </template>
    </Card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';
import axios from 'axios';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Message from 'primevue/message';



const events = ref([]);
const editingRows = ref([]);
const guests = ref([]);
const showMessage = ref(false);
const messageText = ref('');
const messageSeverity = ref('info');
const eventStatuses = ref([
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'endended' },
    { label: 'Canceled', value: 'cancelled' },
]);

const fetchAllEvents = async () => {
    try {
        let page = 1;
        const limit = 100;
        const allEvents = [];
        let totalPages = 1;

        do {
            const response = await axios.get('http://localhost:3000/api/events', {
                params: { page: page, limit: limit }
            });

            const { events: newEvents, totalPages: newTotalPages } = response.data;

            allEvents.push(...newEvents);

            totalPages = newTotalPages;

            page++;
        } while (page <= totalPages);

        events.value = allEvents;
    } catch (error) {
        console.error('Error fetching all events:', error);
    }
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

const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date);
};

const onRowEditSave = async (event) => {
    let { newData, index } = event;
    events.value[index] = newData;
    showMessage.value = false;

    try {
        console.log(newData);
        await axios.put(`http://localhost:3000/api/events/${newData.id}`,newData);
        showMessage.value = true;
        messageSeverity.value = 'success';
        messageText.value = `Evento con el id: ${newData.id} actualizado`
    } catch (error) {
        if (error.response && error.response.status === 400) {

            showMessage.value = true;
            messageSeverity.value = 'error';
            messageText.value = `${error.response.data.errors[0].msg}`;
        } else {
            messageText.value = 'Oops! Algo salio mal, Intentelo mas tarde';
            showMessage.value = true;
            messageSeverity.value = 'error';
        }
    }
};
const onDelete = async (rowData) => {
    showMessage.value = false;
    try {
        await axios.delete(`http://localhost:3000/api/events/${rowData.id}`);
        events.value = events.value.filter(event => event.id !== rowData.id);
        showMessage.value = true;
        messageSeverity.value = 'success';
        messageText.value = 'Evento Eliminado'
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log(error.response.data.errors[0].msg);
            showMessage.value = true;
            messageSeverity.value = 'error';
            messageText.value = `${error.response.data.errors[0].msg}`;
        } else {
            messageText.value = 'Oops! Algo salio mal, Intentelo mas tarde';
            showMessage.value = true;
            messageSeverity.value = 'error';
        }
    }
};

onMounted(() => {
    fetchAllEvents();
    fetchAllGuests();
});
</script>

<style scoped>
* {
    margin: 20px;
    padding: 0;
    font-family: sans-serif;
}
</style>
