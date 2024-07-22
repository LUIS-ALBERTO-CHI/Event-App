<template>
    <div class="map-container">
        <LMap :zoom="zoom" :center="center" style="height: 400px; width: 100%;">
            <LTileLayer :url="tileUrl" :attribution="attribution" />
            <LMarker :lat-lng="markerPosition" @click="onMarkerClick">
                <LPopup>
                    <div>{{ address }}</div>
                </LPopup>
            </LMarker>
        </LMap>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';

const zoom = ref(13);
const center = ref([51.505, -0.09]);
const markerPosition = ref(center.value);
const address = ref('');
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '© OpenStreetMap contributors';

const emits = defineEmits(['update-location']);

const onMarkerClick = (e) => {
    address.value = 'Your address here';
    emits('update-location', { lat: e.latlng.lat, lng: e.latlng.lng });
};
</script>

<style scoped>
.map-container {
    margin-top: 20px;
}
</style>