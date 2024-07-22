<template>
    <div v-if="show" class="modal-overlay">
      <div class="modal">
          <div class="modal-content">
              <h3>{{ eventDetails.name }}</h3>
              <p> {{ eventDetails.description }}</p>
              <!-- <p>{{ formatDate(eventDetails.datetime) }}</p> -->
              <!-- <p>Costo: {{ eventDetails.cost }}</p> -->
              <p>Invitado especial: {{ eventDetails.guest ?  eventDetails.guest.name: 'No disponible' }}</p>
              <p>Usuarios registrados: {{ eventDetails.registeredCount }}</p>
              <button @click="registerToEvent">Registrarse al evento</button>
              <button @click="close">Cerrar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { jwtDecode } from 'jwt-decode';
  
  export default {
    props: ['show', 'eventId'],
    data() {
      return {
        eventDetails: {}
      };
    },
    watch: {
      eventId: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.fetchEventDetails(newVal);
          }
        }
      }
    },
    methods: {

      close() {
        this.$emit('close');
      },
      async fetchEventDetails(eventId) {
        try {
          const response = await axios.get(`http://localhost:3000/api/events/${eventId}`);
          this.eventDetails = response.data;
        } catch (error) {
          console.error('Error fetching event details:', error);
        }
      },
      async registerToEvent() {
        try {
          const token = localStorage.getItem('accessToken');
        //   console.log(token); 
          if (!token) {
            throw new Error('Usuario no autenticado');
          }
          
          console.log(typeof jwtDecode);
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.id; 
          console.log('id', userId);
  
          const response = await axios.post('http://localhost:3000/api/events/registerToEvent', {
            userId: userId,
            eventId: this.eventId
          });
          console.log(response)
          alert('Registrado con éxito');
          this.close();
        } catch (error) {
            if(error.response && error.response.status === 400) {
                alert('No se puede volver a registrar')
            } else {
                console.error('Error registrándose al evento:', error);
            }
        }
      }
    }
  }
  </script>
  
  <style>

  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Asegúrate de que el modal esté por encima de otros elementos */
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-content h3 {
  margin-bottom: 10px;
  font-size: 24px;
  color: #333;
}

.modal-content p {
  margin-bottom: 10px;
  font-size: 16px;
  color: #555;
}

.modal-content button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-content button:hover {
  background-color: #0056b3;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
  </style>
  