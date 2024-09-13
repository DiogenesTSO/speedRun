<template>
  <div class="d-flex justify-center align-center" style="height: 95vh;">
    <v-card flat class="border mb-4" style="margin-left: -50px;">
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
              <v-btn icon size="small" @click="editar(corredor.id)">
                <v-icon size="small" color="blue">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon size="small" @click="openDeleteModal(corredor)">
                <v-icon size="small" color="red">mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-pagination
      size="small"
      v-model="currentPage"
      :length="totalPages"
      @input="updatePage"
    ></v-pagination>

    <!-- Modal de confirmação de exclusão -->
     <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirmação</v-card-title>
        <v-card-text>Tem certeza que deseja excluir este corredor?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="cancelDelete">Cancelar</v-btn>
          <v-btn color="green darke-1" text @click="confirmDelete">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
     </v-dialog>

     <!-- Snackbar para mostrar o aviso -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      elevation="2"
    >
      {{ snackbarMessage }}
    </v-snackbar>

    </v-card>
  </div>
</template>

<script>

  import axios from 'axios';

  export default {
    data() {
      return {
        corredores: [],
        currentPage: 1,
        itemsPerPage: 10,
        dialog: false,
        corredorToDelete: null,
        snackbar: false,
        snackbarMessage: '',
        snackbarColor: '',
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
      },

      openDeleteModal(corredor) {
        this.corredorToDelete = corredor;
        this.dialog = true;
      },

      cancelDelete() {
        this.dialog = false;
        this.corredorToDelete = null;
      },
    
    async confirmDelete() {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/corredores/${this.corredorToDelete.id}`);
          this.corredores = this.corredores.filter(c => c.id !== this.corredorToDelete.id);
          this.dialog = false;
          this.corredorToDelete = null;

          this.showSnackbar('Corredor excluído com sucesso!', 'green');
        } catch (error) {
          this.showSnackbar('Erro ao excluir o corredor', 'red');
        }
      },
      showSnackbar(message, color) {
        this.snackbarMessage = message;
        this.snackbarColor = color;
        this.snackbar = true;
      }
    }
  };
</script>
  
  <style scoped>
  .mb-4 {
    width: 100%; /* Largura do formulário */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.89); /* Sombra suave */
  }
  </style>
  