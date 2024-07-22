<template>
    <div class="home-page">
        <main class="main-content">
            <section class="events">
                <h2 class="p-text-center">Próximos Eventos</h2>
                <div class="event-list">
                    <Card v-for="event in events" :key="event.id" style="width: 300px; box-shadow: 0 2px 4px rgb(0, 0, 0, 0.6);">
                        <template #title>
                            <h3>{{ event.name }}</h3>
                        </template>
                        <template #subtitle>
                            <p>{{ formatDate(event.datetime) }}</p>
                        </template>
                        <template #content>
                            <p>{{ event.description }}</p>
                        </template>
                    </Card>
                </div>
            </section>
        </main>
    </div>
</template>

<script>

import Card from 'primevue/card';
import axios from 'axios'

export default {
    components: {
        Card
    },
    data() {
        return {
            events: []
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
</style>