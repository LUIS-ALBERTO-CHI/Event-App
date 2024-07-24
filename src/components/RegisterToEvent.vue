<template>
  <div v-if="show" class="modal-overlay" @click="close">
      <div class="modal" @click.stop>
          <div class="modal-header">
              <h3>{{ eventDetails.name }}</h3>
          </div>
          <div class="modal-content">
              <p><i class="pi pi-info-circle p-mr-2"></i>{{ eventDetails.description }}</p>
              <p><i class="pi pi-star p-mr-2"></i><strong>Invitado especial:</strong> {{ eventDetails.guest ? eventDetails.guest.name : 'No disponible' }}</p>
              <p><i class="pi pi-users p-mr-2"></i><strong>Usuarios registrados:</strong> {{ eventDetails.registeredCount }}</p>
              <div class="modal-buttons">
                  <Button @click="registerToEvent" class="p-button p-component p-button-primary">
                      <i class="pi pi-calendar-plus"></i> Registrarse al evento
                  </Button>
                  <Button @click="close" class="p-button p-component p-button-secondary">
                      <i class="pi pi-times"></i> Cerrar
                  </Button>
              </div>
          </div>
      </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  import { jwtDecode } from 'jwt-decode';
  import Button from 'primevue/button';
  

  export default {
    components: {
      Button
    },
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
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 80%;
    max-width: 500px;
    padding: 2rem;
    position: relative;
}

.modal-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

h3 {
    margin: 0;
    color: #333;
}


.modal-buttons {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.modal-buttons .p-button {
    padding: 0.5rem 1rem;
}

.p-button-primary {
    background-color: #007ad9;
    border: none;
    color: #fff;
}

.p-button-secondary {
    background-color: #f0f0f0;
    border: none;
    color: #333;
}

.p-button-secondary:hover {
    background-color: #e0e0e0;
}

.p-button-primary:hover {
    background-color: #005bb5;
}

.modal-overlay .modal {
    transition: transform 0.3s ease;
}

.modal-overlay .modal:hover {
    transform: scale(1.02);
}
  </style>
  