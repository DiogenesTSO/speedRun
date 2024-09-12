<template>
    <v-card flat class="border mb-4">
      <v-card-title>Corredores</v-card-title>

      <v-table density="compact">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Data de Nascimento</th>
            <th>Sexo</th>
            <th>Criado</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="corredor in paginatedCorredores" :key="corredor.id">
            <td>{{ corredor.nome }}</td>
            <td>{{ corredor.email }}</td>
            <td>{{ corredor.telefone }}</td>
            <td>{{ formatDate(corredor.dataNascimento) }}</td>
            <td>{{ corredor.sexo }}</td>
            <td>{{ formatDate(corredor.created_at) }}</td>
            <td>
              <v-btn @click="editar(corredor.id)">
                <v-icon class="me-2" size="small" color="blue" @click="editItem(item)">mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="deletar(corredor.id)">
                <v-icon size="small" color="red" @click="deleteItem(item)">mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-pagination
      v-model="currentPage"
      :length="totalPages"
      @input="updatePage"
    ></v-pagination>

    </v-card>
</template>

<script>

  import axios from 'axios';

  export default {
    data() {
      return {
        corredores: [],
        currentPage: 1,
        itemsPerPage: 10,
      };
    },
    computed: {
    paginatedCorredores() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.corredores.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.corredores.length / this.itemsPerPage);
    }
  },
    mounted() {
      this.fetchcorredores();
    },
    methods: {
      async fetchcorredores() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/list-corredores');
          this.corredores = response.data;
        } catch (error) {
          console.error('Erro ao buscar corredores:', error);
        }
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
    }
  }
</script>
  
  <style scoped>
  /* Estilos opcionais */
  </style>
  