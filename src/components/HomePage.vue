<template>
    <div class="home-page">
        <main class="main-content">
            <section class="events">
                <h2 class="p-text-center">Próximos Eventos</h2>
                <div class="event-list">
                    <div class="p-col-12 p-md-6 p-lg-4" v-for="event in events" :key="event.id">
                        <Card class="event-card" @click="openModal(event.id)">
                            <template #title>
                                <div class="card-header">
                                    <i class="pi pi-calendar p-mr-2"></i>
                                    <h3>{{ event.name }}</h3>
                                </div>
                            </template>
                            <template #subtitle>
                                <p><i class="pi pi-clock p-mr-2"></i>{{ formatDate(event.datetime) }}</p>
                            </template>
                            <template #content>
                                <p><i class="pi pi-info-circle p-mr-2"></i>{{ event.description }}</p>
                            </template>
                            <template #footer>
                                <button class="p-button p-component p-button-text p-button-secondary">
                                    <i class="pi pi-calendar-plus"></i> Añadir al Calendario
                                </button>
                            </template>
                        </Card>
                    </div>
                </div>
            </section>
        </main>

        <RegisterToEvent :show="showModal" :eventId="selectedEventId" @close="showModal = false"/>
    </div>
</template>

<script>

import Card from 'primevue/card';
import axios from 'axios'
import RegisterToEvent from './RegisterToEvent.vue';

export default {
    components: {
        Card,
        RegisterToEvent
    },
    data() {
        return {
            events: [],
            showModal: false,
            selectedEventId: null
        };
    },
    created() {
        this.fetchAllEvents();
    },
    methods: {
        formatDate(isoString) {
            const date = new Date(isoString);
            return new Intl.DateTimeFormat('es-ES', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).format(date);
        },
        async fetchAllEvents() {
        try {
            let page = 1;
            const limit = 100;
            const allEvents = [];
            let totalPages = 1;

            do {
                const response = await axios.get('http://localhost:3000/api/events', {
                    params: { page: page, limit: limit }
                });

                const { events, totalPages: newTotalPages } = response.data;

                allEvents.push(...events);

                totalPages = newTotalPages;

                page++;
            } while (page <= totalPages);

            this.events = allEvents;
        } catch (error) {
            console.error('Error fetching all events:', error);
        }
    },
    openModal(eventId) {
        this.selectedEventId = eventId;
        this.showModal = true;
    }
    }
    
};
</script>

<style>
.home-page {
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
}

.main-content {
    padding: 20px;
}

.event-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.events {
    margin-bottom: 40px;
}

.event-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    overflow: hidden;
    height: 400px;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
}

.event-card:hover {
    transform: scale(1.05);
}

.card-subtitle {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #f4f4f4;
    border-bottom: 1px solid #ddd;
}

.card-subtitle h3 {
    margin: 0;
}

.card-content {
    flex: 1;
    padding: 1rem;
}
.card-footer {
    padding: 1rem;
    border-top: 1px solid #ddd;
    background-color: #f4f4f4;
    text-align: center;
}
.card-subtitle i {
    font-size: 1.5rem;
}

.p-text-center {
    text-align: center;
}

.p-mr-2 {
    margin-right: 0.5rem;
}
</style>