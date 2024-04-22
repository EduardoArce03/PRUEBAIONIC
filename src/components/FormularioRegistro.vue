<template>
  <ion-page>
        <ion-title>Ingreso de datos</ion-title>
    
    <ion-content>
      <ion-item>
        <ion-label position="floating">Ingrese la cédula:</ion-label>
        <ion-input v-model="cedula" @keyup.enter="printCedula"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Ingrese su nombre</ion-label>
        <ion-input v-model="nombre" @keyup.enter="printNombre"></ion-input>
      </ion-item>
      
      <ion-button @click="imprimirValores">Crear Registro</ion-button>
      
      <ion-item v-for="(registro, index) in registros" :key="index">
        <ion-text>{{ registro.cedula }} - {{ registro.nombre }}</ion-text>
        <ion-button @click="editarRegistro(index)">Editar</ion-button>
        <ion-button @click="deleteRegistro()">Eliminar</ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonButton, IonText },
  data() {
    return {
      cedula: '',
      nombre: '',
      printedCedula: '',
      printedNombre: '',
      registros: [] as { cedula: string; nombre: string }[],
      indiceEdicion : null
    };
  },
  methods: {
    imprimirValores() {
      this.printCedula();
      this.printNombre();
      const nuevoRegistro = {
        cedula : this.cedula,
        nombre : this.nombre
      }
      this.registros.push(nuevoRegistro)
    },
    printCedula() {
      console.log("Cédula ingresada:", this.cedula);
      this.printedCedula = this.cedula;
    },
    printNombre() {
      console.log("Nombre ingresado:", this.nombre);
      this.printedNombre = this.nombre;
    },
    deleteRegistro(index: number){
      console.log('eliminar funcional')
      this.registros.splice(index,1);
      console.log('registro borrado')
      alert('jijija')
    },
    editarRegistro(index:number){
      if (index >= 0 && index < this.registros.length) {
    
        this.registros[index].cedula = this.cedula;
        this.registros[index].nombre = this.nombre;
        // Limpiar los campos después de la edición
        this.cedula = '';
        this.nombre = '';
        this.indiceEdicion = null; // Reiniciar el índice de edición
        alert('editado')
    }
  }
  }
});
</script>
