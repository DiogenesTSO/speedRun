<template>
      <v-data-table
        :headers="headers"
        :items="corredores"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Lista de Corredores</v-toolbar-title>
          </v-toolbar>
        </template>
      </v-data-table>
  </template>
  
  <script>
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
  </script>
  
  <style scoped>
  /* Estilos opcionais */
  </style>
  