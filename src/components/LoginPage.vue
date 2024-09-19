<template>
    <v-app id="login-page">
      <v-main>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <!-- Formulário de Login -->
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="loginForm.email"
                      label="E-mail"
                      prepend-icon="mdi-email"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="loginForm.password"
                      label="Senha"
                      prepend-icon="mdi-lock"
                      type="password"
                      required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="login">Entrar</v-btn>
                </v-card-actions>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- Botão para abrir o modal de cadastro -->
                  <v-btn color="secondary" @click="openRegisterModal">Cadastrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
  
        <!-- Modal para Cadastro -->
        <v-dialog v-model="dialogRegister" max-width="500">
          <v-card>
            <v-card-title class="headline">Cadastrar Novo Usuário</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="registerForm.nome"
                  label="Nome Completo"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="registerForm.email"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="registerForm.password"
                  label="Senha"
                  type="password"
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
  export default {
    data() {
      return {
        dialogRegister: false, // Controle do modal de cadastro
        loginForm: {
          email: '',
          password: ''
        },
        registerForm: {
          nome: '',
          email: '',
          password: ''
        }
      };
    },
    methods: {
      login() {
        // Lógica para login
        console.log('Login realizado com:', this.loginForm);
      },
      openRegisterModal() {
        // Abre o modal de cadastro
        this.dialogRegister = true;
      },
      cancelRegister() {
        // Fecha o modal de cadastro
        this.dialogRegister = false;
      },
      registerUser() {
        // Lógica para cadastro de novo usuário
        console.log('Cadastro de novo usuário:', this.registerForm);
        this.dialogRegister = false; // Fecha o modal após o cadastro
      }
    }
  };
  </script>
  
  <style scoped>
  #login-page {
    background-color: #f5f5f5;
    height: 100vh;
  }
  </style>
  