<template>
    <div class="schedule">
        <div class="day-tabs">
            <button v-for="day in days" :key="day" @click="selectedDay = day" :class="{ active: selectedDay === day }">
                {{ day }}
            </button>
        </div>
        <div v-for="event in filteredEvents" :key="event.id" class="event">
            <div class="time gap-3">
                <p>Hora del evento</p><i class="fas fa-clock"></i> {{ formatTime(event.datetime) }}
            </div>
            <div class="details">
             <div>
                <h3>Nombre del evento: {{ event.name }}</h3>
                <p>{{ event.description }}</p>
             </div>
                <div class="location mb-3">
                    <i class="fas fa-map-marker-alt"></i> {{ event.location.address }}
                </div>
                <div class="cost">
                    <i class="fas fa-dollar-sign"></i> {{ event.cost }}
                </div>
                <div class="guests">
                    <img :src="getAvatarUrl(event.guest.name)" :alt="event.guest.name" class="avatar" />
                    {{ event.guest.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            selectedDay: 'Lunes',
            events: []
        };
    },
    created() {
        this.fetchAllEvents();
    },
    computed: {
        days() {
            return ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        },
        filteredEvents() {
            const selectedDate = new Date();
            selectedDate.setDate(selectedDate.getDate() + this.days.indexOf(this.selectedDay));
            return this.events.filter(event => {
                const eventDate = new Date(event.datetime);
                return eventDate.toDateString() === selectedDate.toDateString();
            });
        }
    },
    methods: {
        formatTime(datetime) {
            const date = new Date(datetime);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
        getAvatarUrl(name) {
            const initials = name.split(' ').map(word => word[0]).join('');
            return `https://avatars.dicebear.com/api/initials/${initials}.svg`;
        }
    }
};
</script>

<style>
@import '@fortawesome/fontawesome-free/css/all.css';

.schedule {
    max-width: 800px;
    margin: auto;
    padding: 20px;
}

.day-tabs {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.day-tabs button {
    padding: 10px 20px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
}

.day-tabs button.active {
    background-color: #6200ea;
    color: white;
}

.event {
    border-bottom: 1px solid #e0e0e0;
    padding: 20px 0;
}

.time {
    font-size: 1.2em;
    font-weight: bold;
    display: flex;
    align-items: center;
}

.time i {
    margin-right: 8px;
}

.details {
    margin-top: 10px;
}

.location {
    font-style: italic;
    color: #555;
    display: flex;
    align-items: center;
}

.location i {
    margin-right: 8px;
}

.cost {
    font-size: 1em;
    color: #000;
    display: flex;
    align-items: center;
}

.cost i {
    margin-right: 8px;
}

.guests {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.guests .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}
</style>
