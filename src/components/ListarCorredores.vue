<template>
  <v-data-table :headers="headers" :items="items" :loading="loading">
    <template v-slot:loading>
      <v-progress-linear indeterminate color="primary"></v-progress-linear>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch("http://127.0.0.1:8000/api/list-corredores")
    const data = await response.json()

    items.value = data

  } catch (error) {
    console.error('Erro ao carregar os dados da API', error)
  } finally {
    loading.value = false
  }
})
</script>



  
 <!-- <script>
  export default {
    data() {
      return {
        corredores: [],
        headers: [
        { text: 'Nome', value: 'nome' },
        { text: 'E-mail', value: 'email' },
        { text: 'Telefone', value: 'telefone' },
        { text: 'Data de Nascimento', value: 'dataNascimento' },
        { text: 'Sexo', value: 'sexo' },
      ],
      };
    },
    created() {
      this.fetchCorredores();
    },
    methods: {
      async fetchCorredores() {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/list-corredores");
          const data = await response.json();
          this.corredores = data;
        } catch (error) {
          console.error("Erro ao buscar corredores:", error);
        }
      },
    },
  };
  </script> -->
  
  <style scoped>
  /* Estilos opcionais */
  </style>
  