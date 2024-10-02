<template>
    <v-app id="login-page">
      <v-main>
        <v-container fluid class="pa-0 ma-0 fill-height d-flex aling-start">
          <v-row  class="fill-height d-flex aling-start ma-0 pa-0">
            <v-col cols="12" sm="4" class="d-flex flex-column ma-0 pa-0 fill-height">
              <!-- Formulário de Login -->
              <v-card class="justify-space-between fill-height" elevation="8">
                <v-toolbar dark color="green">
                  <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="loginFormRef" v-model="isFormValid" class="mt-10">
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
                  <v-btn :loading="loading" color="primary" @click="validateAndLogin">Entrar</v-btn>
                  <v-btn color="secondary" @click="openRegisterModal">Cadastrar</v-btn>
                </v-card-actions>
                <v-card-actions class="justify-end">
                  <span class="forgot-password" @click="openResetPassword">Esqueci minha senha</span>
                </v-card-actions>
              </v-card>
            </v-col>
            </v-row>

            <v-snackbar
              v-model="snackbar"
              :color="snackbarColor"
              :timeout="timeout"
              elevation="2"
            >
              {{ snackbarMessage }}
            </v-snackbar>

        </v-container>

        <!-- Modal de redefinição de senha -->
         <v-dialog v-model="dialogResetPassword" max-width="500">
          <v-card>
            <v-card-title class="headline">Redefinir Senha</v-card-title>
            <v-card-text>
              <v-form ref="resetPasswordFormRef" v-model="isResetFormValid">
                <v-text-field 
                v-model="resetPasswordForm.email"
                :rules="[rules.required, rules.email]"
                label="E-mail"
                prepend-icon="mdi-email"
                variant="underlined"
                required>
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="closeResetPasswordModal">Cancelar</v-btn>
              <v-btn text color="green" @click="sendResetPasswordEmail">Enviar</v-btn>
            </v-card-actions>
          </v-card>
         </v-dialog>
  
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
        loading: false,
        isFormValid: false,
        dialogRegister: false, // Controle do modal de cadastro
        dialogResetPassword: false,
        timeout: 3000,
        snackbar: false,
        snackbarMessage: '',
        snackbarColor: '',
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
        isResetFormValid: false,
        resetPasswordForm: {
          email: ''
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
        this.loading = true
        this.$refs.loginFormRef.validate().then((isValid) => {
          if (isValid) {
            this.login();
          } else {
            this.loading = false;
          }
        });
        
      },
      async login() {
        try {
          await axios.post('http://127.0.0.1:8000/api/login', this.loginForm);
          this.$router.push('/home');
        } catch (error) {
          if (error.response && error.response.status === 401) {
            this.snackbarMessage = 'Usuário ou senha inválido!';
            this.snackbarColor = 'red';
            this.snackbar = true;
          } else {
            this.snackbarMessage = 'Erro ao conectar com o servidor.';
            this.snackbarColor = 'orange';
            this.snackbar = true;
          }
        } finally {
            this.loading = false;
          }
      },
      openRegisterModal() {
        // Abre o modal de cadastro
        this.dialogRegister = true;
      },
      openResetPassword() {
        this.dialogResetPassword = true;
      },
      closeResetPasswordModal() {
        this.dialogResetPassword = false;
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
      sendResetPasswordEmail() {
        if (this.$refs.resetPasswordFormRef.validate()) {
          alert ('E-mail de redefinição de senha enviado');
          this.closeResetPasswordModal();
        }
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
  }

  .forgot-password {
  color: #1976d2; /* Cor de link padrão */
  cursor: pointer;
  font-size: 0.95rem; /* Tamanho de fonte pequeno */
}
  </style>
  