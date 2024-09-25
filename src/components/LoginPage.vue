<template>
    <v-app id="login-page">
      <v-main>
        <v-container fluid fill-height>
              <!-- Formulário de Login -->
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="loginFormRef" v-model="isFormValid">
                    <v-text-field
                      v-model="loginForm.email"
                      :rules="[rules.required, rules.email]"
                      label="E-mail"
                      variant="underlined"
                      color="primary"
                      prepend-icon="mdi-email"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="loginForm.password"
                      :rules="[rules.required, rules.minPassword]"
                      label="Senha"
                      variant="underlined"
                      color="primary"
                      prepend-icon="mdi-lock"
                      type="password"
                      required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="validateAndLogin">Entrar</v-btn>
                </v-card-actions>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- Botão para abrir o modal de cadastro -->
                  <v-btn color="secondary" @click="openRegisterModal">Cadastrar</v-btn>
                </v-card-actions>
              </v-card>
        </v-container>
  
        <!-- Modal para Cadastro -->
        <v-dialog v-model="dialogRegister" max-width="500">
          <v-card>
            <v-card-title class="headline">Novo Acesso</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="registerForm.name"
                  :rules="[rules.required, rules.nome]"
                  label="Nome Completo"
                  variant="underlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="registerForm.email"
                  :rules="[rules.required, rules.email]"
                  label="E-mail"
                  variant="underlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="registerForm.password"
                  :rules="[rules.required, rules.minPassword]"
                  label="Senha"
                  type="password"
                  variant="underlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="registerForm.password_confirmation"
                  :rules="[rules.required, rules.minPassword]"
                  label="Confirmar Senha"
                  type="password"
                  variant="underlined"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="cancelRegister">Cancelar</v-btn>
              <v-btn color="green darken-1" text @click="registerUser">Cadastrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        isFormValid: false,
        dialogRegister: false, // Controle do modal de cadastro
        loginForm: {
          email: '',
          password: ''
        },
        registerForm: {
          nome: '',
          email: '',
          password: '',
          password_confirmation: '',
        },
        rules: {
          required: value => !!value || 'Campo obrigatório',
          email: value => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return pattern.test(value) || 'Email inválido'
          },
          minPassword: value => (value && value.length >= 8) || 'A senha deve conter no mínimo 8 ou mais caracteres'
        }
      }
    },
    methods: {
      validateAndLogin() {
        this.$refs.loginFormRef.validate()
        if (this.isFormValid) {
          this.login()
        }
      },
      async login() {
        try {
          await axios.post('http://127.0.0.1:8000/api/login', this.loginForm);

          this.$router.push('/home');
        } catch (error) {
          if (error.response && error.response.status === 401) {
            alert('Erro ao realizar login: ' + error.response.data.message);
          } else {
            alert('Tente novamente');
          }
        }
      },
      openRegisterModal() {
        // Abre o modal de cadastro
        this.dialogRegister = true;
      },
      cancelRegister() {
        // Fecha o modal de cadastro
        this.dialogRegister = false;
        this.resetRegisterForm();
      },
      resetRegisterForm() {
        this.registerForm.name = '';
        this.registerForm.email = '';
        this.registerForm.password = '';
        this.registerForm.password_confirmation = '';
      },
      async registerUser() {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/registrar', this.registerForm);
          alert(response.data.message);
          this.dialogRegister = false;
          this.resetRegisterForm();
        } catch (error) {
          console.error(error);
          if (error.response && error.response.data) {
            alert('erro:' + Object.values(error.response.data).flat().join(', '));
          } else {
            alert('erro ao cadastrar');
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  #login-page {
    background-color: #ddd6d6;
    height: 100vh;
  }
  </style>
  