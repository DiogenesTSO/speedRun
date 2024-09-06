<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    theme="dark"
    permanent
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmailcom"
        title="Sandra Adams"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-finance" title="Dashboard" value="myfiles"></v-list-item>
      <v-list-item prepend-icon="mdi-history" title="Histórico" value="shared"></v-list-item>
      <v-list-group value="Cadastrar">
        <template #activator="{ props }">
          <v-list-item
          v-bind="props"
          prepend-icon="mdi-account-check"
          title="Cadastrar"></v-list-item>
        </template>
        <v-list-item prepend-icon="mdi-run-fast" title="Corredores" value="fast" @click="showCorredoresForms"></v-list-item>
        <v-list-item prepend-icon="mdi-run-fast" title="Listar Corredores" value="list-fast" @click="viewCorredores"></v-list-item>
      </v-list-group>
      <v-list-item prepend-icon="mdi-timer" title="Iniciar Treino" value="starred"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-container v-if="showCorredores">
    <corredores-list />
  </v-container>

  <div v-if="showForm">
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.nome"
          label="Nome"
          outlined
          required
          color="primary"
        ></v-text-field>

        <v-text-field
          v-model="formData.email"
          label="E-mail"
          type="email"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.telefone"
          label="Telefone"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.dataNascimento"
          label="Data de Nascimento"
          type="date"
          required
        ></v-text-field>

        <v-radio-group v-model="formData.sexo" label="Sexo" row>
          <v-radio label="Masculino" value="M" color="primary"></v-radio>
          <v-radio label="Feminino" value="F" color="pink"></v-radio>
        </v-radio-group>

        <v-btn color="primary" type="submit">
          Cadastrar
        </v-btn>
      </v-form>
    </div>

</template>
<v-card>
</v-card> 

<script>
import CorredoresList from './ListarCorredores.vue';
import axios from 'axios';

export default {
  name: 'menuComponent',
  components: {
    CorredoresList
  },
  data() {
    return {
      showForm: false, 
      showCorredores: false,
      formData: {
        nome: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        sexo: '',
      },
    };
  },
  methods: {
    showCorredoresForms() {
      this.showForm = true;
    },
    viewCorredores() {
      this.showCorredores = true;
    },
    async submitForm() {
      try {
        // Enviando os dados para a API
        const response = await axios.post('http://127.0.0.1:8000/api/corredores', this.formData);

        // Exibindo a resposta da API no console (ou trate como necessário)
        console.log('Resposta da API:', response.data);

        // Limpar o formulário após sucesso
        this.formData = {
          nome: '',
          email: '',
          telefone: '',
          dataNascimento: '',
          sexo: '',
        };

        // Exibir uma notificação de sucesso (opcional)
        alert('Corredor cadastrado com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar o corredor:', error);

        // Exibir uma notificação de erro (opcional)
        alert('Erro ao cadastrar o corredor. Tente novamente.');
      }
    },
  },
}; 

</script>

<style scoped>
.v-form {
  max-width: 600px;
  margin: auto;
}
</style>

