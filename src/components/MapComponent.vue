<template>
    <div>
        <InputText v-model="searchInput" @keyup.enter="searchLocation" placeholder="Ingrese una dirección" class="mb-3"/>
        <div id="map" style="height: 500px;"></div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import InputText from 'primevue/inputtext';

export default {
    components: {
        InputText,
    },
    emits: ['update-location'],
    setup(props, { emit }) {
        const searchInput = ref('');
        const map = ref(null);
        const marker = ref(null);

        const initializeMap = () => {
            map.value = L.map('map').setView([40.689247, -74.044502], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map.value);

            const primeIcon = L.divIcon({
                className: 'custom-icon',
                html: '<i class="pi pi-map-marker"></i>',
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            });

            marker.value = L.marker([40.689247, -74.044502], { icon: primeIcon, draggable: true }).addTo(map.value);

            marker.value.on('moveend', () => {
                const { lat, lng } = marker.value.getLatLng();
                emit('update-location', {
                    lat: lat,
                    lng: lng,
                    address: marker.value.getPopup() ? marker.value.getPopup().getContent() : ''
                });
            });
        };

        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        map.value.setView([latitude, longitude], 15);
                        marker.value.setLatLng([latitude, longitude]);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            } else {
                console.error('Navegador no soporta geolocalización');
            }
        };

        const searchLocation = () => {
            if (L.Control.Geocoder) {
                const geocoder = L.Control.Geocoder.nominatim();
                geocoder.geocode(searchInput.value, (results) => {
                    if (results.length > 0) {
                        const { lat, lng } = results[0].center;
                        map.value.setView([lat, lng], 15);
                        marker.value.setLatLng([lat, lng])
                            .bindPopup(results[0].name)
                            .openPopup();
                        emit('update-location', {
                            lat: lat,
                            lng: lng,
                            address: results[0].name
                        });
                    } else {
                        alert('No results found');
                    }
                });
            }
        };

        onMounted(() => {
            initializeMap();
            getCurrentLocation();
        });

        return {
            searchInput,
            searchLocation,
        };
    }
};
</script>

<style scoped>
.custom-icon {
    background: none;
    border: none;
    font-size: 24px;
    color: #007bff; /* Change color as needed */
}
.custom-icon .pi {
    margin: 0;
    padding: 0;
}
</style>
