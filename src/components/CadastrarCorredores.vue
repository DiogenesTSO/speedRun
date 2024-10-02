<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-form class="formCad" @submit.prevent="submitForm">
      <h2>Cadastrar Corredores</h2>
      <v-text-field
        v-model="formData.nome"
        color="primary"
        label="Nome"
        variant="underlined"
      ></v-text-field>

        <v-text-field
          v-model="formData.email"
          label="E-mail"
          type="email"
          color="primary"
          variant="underlined"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.cpf"
          label="CPF"
          type="text"
          color="primary"
          variant="underlined"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.telefone"
          label="Telefone"
          color="primary"
          variant="underlined"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.dataNascimento"
          label="Data de Nascimento"
          color="primary"
          variant="underlined"
          type="date"
          required
        ></v-text-field>

        <v-radio-group v-model="formData.sexo" label="Sexo" row>
          <v-radio label="Masculino" value="M" color="primary"></v-radio>
          <v-radio label="Feminino" value="F" color="pink"></v-radio>
        </v-radio-group>

        <v-sheet class="d-flex justify-center">
          <v-btn class="btn-1"
            type="submit"
            color="deep-purple-darken-2"
            size="small"
            block
            >
                Cadastrar
          </v-btn>
        </v-sheet>

        <v-dialog v-model="dialogSuccess" max-width="600">
           <v-card
              v-if="dialogSuccess"
              append-icon="$close"
              elevation="16"
              max-width="600"
              title="Sucesso"
              >
              <template v-slot:append>
                <v-btn icon="$close" variant="text" @click="dialogSuccess = false"></v-btn>
              </template>

                <v-divider></v-divider>

              <div class="py-12 text-center">
                <v-icon
                  class="mb-6"
                  color="success"
                  icon="mdi-check-circle-outline"
                  size="128"
                ></v-icon>

                <div class="text-h5 font-weight-bold">Corredor cadastrado com sucesso!</div>
              </div>

                  <v-divider></v-divider>
             </v-card>
         </v-dialog>

          <v-dialog v-model="dialogError" max-width="600">
            <v-card
                v-if="dialogError"
                append-icon="$close"
                elevation="16"
                max-width="600"
                title="Erro"
                >
                <template v-slot:append>
                  <v-btn icon="$close" variant="text" @click="dialogError = false"></v-btn>
                </template>

                <v-divider></v-divider>

              <div class="py-12 text-center">
                <v-icon
                  class="mb-6"
                  color="error"
                  icon="mdi-alert-circle-outline"
                  size="100"
                ></v-icon>

                <div class="text-h5 font-weight-bold">Ocorreu um erro no cadastro!</div>
              </div>

              <v-divider></v-divider>

            </v-card>
        </v-dialog>
    </v-form>
  </v-container>
</template>

<script>

export default {
    data() {
        return {
            formData: {
                nome: "",
                email: "",
                cpf: "",
                telefone: "",
                dataNascimento: "",
                sexo: "",
            },
            dialogSuccess: false,
            dialogError: false,
        };
    },
    methods: {
        submitForm() {
            const corredor = this.formData;

            fetch("http://127.0.0.1:8000/api/corredores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(corredor),
            })
            .then(() => {
                this.dialogSuccess = true;

                this.formData = {
                    nome: "",
                    email: "",
                    cpf: "", 
                    telefone: "",
                    dataNascimento: "",
                    sexo: "",
                };
            })
            .catch(() => {
                this.dialogError = true;
            });
        },
    },
};

</script>

<style scoped>

.fill-height {
  height: 100vh; /* Faz o container ocupar 100% da altura da tela */
}

.formCad {
  width: 100%; /* Largura do formulário */
  padding: 8px; /* Espaçamento interno */
  border-radius: 8px; /* Bordas arredondadas */
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.89); /* Sombra suave */
}

h2 {
  text-align: center;
}
</style>

