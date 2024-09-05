<template>
  <v-card>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      bg-color="deep-purple-accent-2"
      stacked
    >
      <v-tab value="tab-1">
        <v-icon icon="mdi-finance"></v-icon>

        Dashbord
      </v-tab>

      <v-tab value="tab-2">
        <v-icon icon="mdi-history"></v-icon>

        Histórico
      </v-tab>

      <v-tab value="tab-3">
        <v-icon icon="mdi-account-check"></v-icon>

        Cadastrar
      </v-tab>

      <v-tab value="tab-4">
        <v-icon icon="mdi-run-fast"></v-icon>

        Iniciar Treino
      </v-tab>
    </v-tabs>

    <v-tab-item value="tab-2">
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
      </v-tab-item>

  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'menuComponent',
  data() {
    return {
      activeTab: 'tab-2', 
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

